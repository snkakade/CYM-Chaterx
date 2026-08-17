import { getRequestSession, isSameOrigin } from "@/lib/auth";
import { leadStatuses, updateLead } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request rejected." }, { status: 403 });
  const session = await getRequestSession(request);
  if (!session) return Response.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  const status = String(body.status ?? "");
  const priority = body.priority === "high" ? "high" : "normal";
  const followUpAt = typeof body.followUpAt === "string" && body.followUpAt ? new Date(body.followUpAt).toISOString() : null;
  const internalNotes = typeof body.internalNotes === "string" ? body.internalNotes : "";
  if (!leadStatuses.includes(status as typeof leadStatuses[number])) return Response.json({ error: "Invalid lead status." }, { status: 422 });
  const updated = await updateLead(id, { status: status as typeof leadStatuses[number], priority, followUpAt, internalNotes }, session.email);
  return updated ? Response.json({ ok: true }) : Response.json({ error: "Lead not found." }, { status: 404 });
}
