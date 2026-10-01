import { currencies, invoiceStatuses, softDeleteVoidInvoice, updateDraftInvoice, updateInvoiceStatus, type InvoiceLineItem } from "@/lib/admin-data";
import { getRequestSession, isSameOrigin } from "@/lib/auth";

export const dynamic = "force-dynamic";
const clean = (value: unknown, maximum: number) => typeof value === "string" ? value.trim().slice(0, maximum) : "";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request rejected." }, { status: 403 });
  const session = await getRequestSession(request);
  if (!session) return Response.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json() as Record<string, unknown>;
  if (body.status) {
    if (!invoiceStatuses.includes(body.status as typeof invoiceStatuses[number])) return Response.json({ error: "Invalid invoice status." }, { status: 422 });
    const updated = await updateInvoiceStatus(id, body.status as typeof invoiceStatuses[number], session.email);
    return updated ? Response.json({ ok: true }) : Response.json({ error: "Invoice not found." }, { status: 404 });
  }
  const currency = clean(body.currency ?? "USD", 3);
  const items = Array.isArray(body.items) ? body.items.slice(0, 20).map((item) => {
    const source = item as Record<string, unknown>;
    return { description: clean(source.description, 240), quantity: Number(source.quantity), unitCents: Math.round(Number(source.unitCents)) } satisfies InvoiceLineItem;
  }) : [];
  const taxRateBps = Math.round(Number(body.taxRateBps));
  const issueDate = clean(body.issueDate, 10);
  const dueDate = clean(body.dueDate, 10);
  const clientName = clean(body.clientName, 160);
  const clientEmail = clean(body.clientEmail, 180).toLowerCase();
  if (!clientName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail) || !/^\d{4}-\d{2}-\d{2}$/.test(issueDate) || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) || !currencies.includes(currency as typeof currencies[number]) || !Number.isInteger(taxRateBps) || taxRateBps < 0 || taxRateBps > 3000 || !items.length || items.some((item) => !item.description || !Number.isFinite(item.quantity) || item.quantity <= 0 || item.quantity > 1000 || !Number.isInteger(item.unitCents) || item.unitCents < 0 || item.unitCents > 100_000_000)) {
    return Response.json({ error: "Check the client, dates, tax, and line items." }, { status: 422 });
  }
  const updated = await updateDraftInvoice(id, { clientName, clientEmail, clientAddress: clean(body.clientAddress, 1000), vesselName: clean(body.vesselName, 180), currency: currency as typeof currencies[number], issueDate, dueDate, taxRateBps, notes: clean(body.notes, 3000), leadId: clean(body.leadId, 80) || null, items }, session.email);
  return updated ? Response.json({ ok: true }) : Response.json({ error: "Invoice not found." }, { status: 404 });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request rejected." }, { status: 403 });
  const session = await getRequestSession(request);
  if (!session) return Response.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json() as { remark?: unknown };
  const remark = clean(body.remark, 1000);
  if (remark.length < 5) return Response.json({ error: "A deletion remark of at least 5 characters is required." }, { status: 422 });
  const deleted = await softDeleteVoidInvoice(id, remark, session.email);
  return deleted ? Response.json({ ok: true }) : Response.json({ error: "Only active void invoices can be deleted." }, { status: 409 });
}
