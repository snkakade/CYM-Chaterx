import { clearLoginFailures, createSession, isLoginBlocked, isSameOrigin, loginThrottleKey, registerLoginFailure, sessionCookie, verifyPassword } from "@/lib/auth";
import { getRuntimeEnv } from "@/lib/database";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request rejected." }, { status: 403 });
  const config = getRuntimeEnv();
  if (!config.ADMIN_EMAIL || !config.ADMIN_PASSWORD_HASH || !config.SESSION_SECRET) {
    return Response.json({ error: "Admin access is not configured." }, { status: 503 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json() as { email?: string; password?: string };
  } catch {
    return Response.json({ error: "Invalid credentials." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 180);
  const password = String(body.password ?? "").slice(0, 300);
  const throttleKey = await loginThrottleKey(request, email || "unknown");
  if (await isLoginBlocked(throttleKey)) {
    return Response.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429, headers: { "cache-control": "no-store" } });
  }

  const correctPassword = password ? await verifyPassword(password, config.ADMIN_PASSWORD_HASH) : false;
  const correctEmail = email === config.ADMIN_EMAIL.toLowerCase();
  if (!correctEmail || !correctPassword) {
    await registerLoginFailure(throttleKey);
    return Response.json({ error: "Email or password is incorrect." }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  await clearLoginFailures(throttleKey, config.ADMIN_EMAIL);
  const token = await createSession(config.ADMIN_EMAIL);
  return Response.json({ ok: true }, {
    headers: {
      "set-cookie": sessionCookie(token, request),
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
