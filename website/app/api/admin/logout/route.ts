import { expiredSessionCookie, getRequestSession, isSameOrigin } from "@/lib/auth";
import { recordAudit } from "@/lib/database";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request rejected." }, { status: 403 });
  const session = await getRequestSession(request);
  if (session) await recordAudit(session.email, "signed_out", "session");
  return Response.json({ ok: true }, { headers: { "set-cookie": expiredSessionCookie(request), "cache-control": "no-store" } });
}
