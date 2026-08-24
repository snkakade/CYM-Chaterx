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
  const dateValue = (value: unknown) => {
    if (typeof value !== "string" || !value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
  };
  const followUpAt = dateValue(body.followUpAt);
  const lastContactAt = dateValue(body.lastContactAt);
  const internalNotes = typeof body.internalNotes === "string" ? body.internalNotes : "";
  const estimatedValueCents = Math.round(Number(body.estimatedValueCents));
  const probability = Math.round(Number(body.probability));
  const nextAction = typeof body.nextAction === "string" ? body.nextAction.trim() : "";
  const lostReason = typeof body.lostReason === "string" ? body.lostReason.trim() : "";
  if (!leadStatuses.includes(status as typeof leadStatuses[number])) return Response.json({ error: "Invalid lead status." }, { status: 422 });
  if (!Number.isInteger(estimatedValueCents) || estimatedValueCents < 0 || estimatedValueCents > 1_000_000_000 || !Number.isInteger(probability) || probability < 0 || probability > 100 || nextAction.length > 500 || lostReason.length > 500) {
    return Response.json({ error: "Check the commercial value, confidence and next action." }, { status: 422 });
  }
  const updated = await updateLead(id, { status: status as typeof leadStatuses[number], priority, followUpAt, internalNotes, estimatedValueCents, probability, nextAction, lostReason, lastContactAt }, session.email);
  return updated ? Response.json({ ok: true }) : Response.json({ error: "Lead not found." }, { status: 404 });
}
