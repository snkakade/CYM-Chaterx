import { clearLoginFailures, createSession, isLoginBlocked, isSameOrigin, loginThrottleKey, recordSuccessfulLogin, registerLoginFailure, sessionCookie, verifyPassword, type AdminRole } from "@/lib/auth";
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

  const superadminConfigured = Boolean(config.SUPERADMIN_EMAIL && config.SUPERADMIN_PASSWORD_HASH);
  const credentials: Array<{ email: string; hash: string; role: AdminRole }> = [
    { email: config.ADMIN_EMAIL, hash: config.ADMIN_PASSWORD_HASH, role: superadminConfigured ? "admin" : "superadmin" },
  ];
  if (superadminConfigured) credentials.push({ email: config.SUPERADMIN_EMAIL!, hash: config.SUPERADMIN_PASSWORD_HASH!, role: "superadmin" });
  const credential = credentials.find((entry) => entry.email.toLowerCase() === email);
  const correctPassword = password && credential ? await verifyPassword(password, credential.hash) : false;
  const correctEmail = Boolean(credential);
  if (!correctEmail || !correctPassword) {
    await registerLoginFailure(throttleKey);
    return Response.json({ error: "Email or password is incorrect." }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  await clearLoginFailures(throttleKey);
  await recordSuccessfulLogin(credential!.email, credential!.role, request);
  const token = await createSession(credential!.email, credential!.role);
  return Response.json({ ok: true }, {
    headers: {
      "set-cookie": sessionCookie(token, request),
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
