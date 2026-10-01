import { createExpense, currencies, expenseCategories } from "@/lib/admin-data";
import { getRequestSession, isSameOrigin } from "@/lib/auth";

export const dynamic = "force-dynamic";
const clean = (value: unknown, maximum: number) => typeof value === "string" ? value.trim().slice(0, maximum) : "";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Request rejected." }, { status: 403 });
  const session = await getRequestSession(request);
  if (!session) return Response.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const expenseDate = clean(body.expenseDate, 10);
  const vendorName = clean(body.vendorName, 180);
  const category = clean(body.category, 60);
  const currency = clean(body.currency ?? "INR", 3);
  const subtotalCents = Math.round(Number(body.subtotalCents));
  const gstRateBps = Math.round(Number(body.gstRateBps));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expenseDate) || !vendorName || !expenseCategories.includes(category as typeof expenseCategories[number]) || !currencies.includes(currency as typeof currencies[number]) || !Number.isInteger(subtotalCents) || subtotalCents < 0 || subtotalCents > 1_000_000_000 || !Number.isInteger(gstRateBps) || gstRateBps < 0 || gstRateBps > 3000) return Response.json({ error: "Check the date, vendor, category, amount, and GST rate." }, { status: 422 });
  const expense = await createExpense({ expense_date: expenseDate, vendor_name: vendorName, vendor_gstin: clean(body.vendorGstin, 20).toUpperCase(), category: category as typeof expenseCategories[number], description: clean(body.description, 500), reference_number: clean(body.referenceNumber, 120), currency: currency as typeof currencies[number], subtotal_cents: subtotalCents, gst_rate_bps: gstRateBps, payment_method: clean(body.paymentMethod, 80), notes: clean(body.notes, 2000) }, session.email);
  return Response.json({ ok: true, expense }, { status: 201 });
}
