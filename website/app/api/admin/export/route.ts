import { getRequestSession } from "@/lib/auth";
import { getDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  const session = await getRequestSession(request);
  if (!session) return Response.json({ error: "Authentication required." }, { status: 401 });
  const type = new URL(request.url).searchParams.get("type");
  const data = await getDashboardData();
  const rows = type === "invoices"
    ? [
        ["Invoice", "Client", "Email", "Issue date", "Due date", "Currency", "Total", "Status"],
        ...data.invoices.map((invoice) => [invoice.invoice_number, invoice.client_name, invoice.client_email, invoice.issue_date, invoice.due_date, invoice.currency, (invoice.total_cents / 100).toFixed(2), invoice.status]),
      ]
    : [
        ["Created", "Name", "Email", "Phone", "Vessel", "Market", "Challenge", "Status", "Priority", "Follow up"],
        ...data.leads.map((lead) => [lead.created_at, lead.name, lead.email, lead.phone, lead.vessel_type, lead.location, lead.challenge, lead.status, lead.priority, lead.follow_up_at ?? ""]),
      ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  return new Response(csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="charterx-${type === "invoices" ? "invoices" : "leads"}.csv"`, "cache-control": "no-store" } });
}
