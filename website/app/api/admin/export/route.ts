import { getRequestSession } from "@/lib/auth";
import { getDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  const session = await getRequestSession(request);
  if (!session) return Response.json({ error: "Authentication required." }, { status: 401 });
  const type = new URL(request.url).searchParams.get("type");
  const data = await getDashboardData(session.role);
  const rows = type === "expenses"
    ? [
        ["Expense date", "Vendor", "GSTIN", "Category", "Description", "Reference", "Currency", "Taxable amount", "GST rate", "GST amount", "Total", "Payment method", "Notes"],
        ...data.expenses.map((expense) => [expense.expense_date, expense.vendor_name, expense.vendor_gstin, expense.category, expense.description, expense.reference_number, expense.currency, (expense.subtotal_cents / 100).toFixed(2), (expense.gst_rate_bps / 100).toFixed(2), (expense.gst_cents / 100).toFixed(2), (expense.total_cents / 100).toFixed(2), expense.payment_method, expense.notes]),
      ]
    : type === "invoices"
    ? [
        ["Invoice", "Client", "Email", "Issue date", "Due date", "Currency", "Total", "Status", "Deleted", "Deletion remark"],
        ...data.invoices.map((invoice) => [invoice.invoice_number, invoice.client_name, invoice.client_email, invoice.issue_date, invoice.due_date, invoice.currency, (invoice.total_cents / 100).toFixed(2), invoice.status, invoice.deleted_at ?? "", invoice.deletion_remark]),
      ]
    : [
        ["Created", "Name", "Email", "Phone", "Vessel", "Market", "Source", "Challenge", "Status", "Priority", "Estimated value", "Probability", "Weighted value", "Next action", "Follow up", "Last contact", "Lost reason"],
        ...data.leads.map((lead) => [lead.created_at, lead.name, lead.email, lead.phone, lead.vessel_type, lead.location, lead.source, lead.challenge, lead.status, lead.priority, (lead.estimated_value_cents / 100).toFixed(2), lead.probability, (lead.estimated_value_cents * lead.probability / 10_000).toFixed(2), lead.next_action, lead.follow_up_at ?? "", lead.last_contact_at ?? "", lead.lost_reason]),
      ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  const exportName = type === "expenses" ? "expenses" : type === "invoices" ? "invoices" : "leads";
  return new Response(csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="charterx-${exportName}.csv"`, "cache-control": "no-store" } });
}
