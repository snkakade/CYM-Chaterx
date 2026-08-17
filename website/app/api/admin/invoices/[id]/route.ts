import { invoiceStatuses, updateInvoiceStatus } from "@/lib/admin-data";
import { getRequestSession, isSameOrigin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request rejected." }, { status: 403 });
  const session = await getRequestSession(request);
  if (!session) return Response.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json() as { status?: string };
  if (!invoiceStatuses.includes(body.status as typeof invoiceStatuses[number])) return Response.json({ error: "Invalid invoice status." }, { status: 422 });
  const updated = await updateInvoiceStatus(id, body.status as typeof invoiceStatuses[number], session.email);
  return updated ? Response.json({ ok: true }) : Response.json({ error: "Invoice not found." }, { status: 404 });
}
