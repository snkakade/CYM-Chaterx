import { notFound, redirect } from "next/navigation";
import { PrintButton } from "@/components/PrintButton";
import { getInvoiceById, parseInvoiceItems } from "@/lib/admin-data";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
const money = (cents: number, currency: string) => new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(cents / 100);
const date = (value: string) => new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const invoice = await getInvoiceById((await params).id);
  if (!invoice) notFound();
  const items = parseInvoiceItems(invoice.line_items_json);

  return <div className="invoice-page admin-page"><div className="invoice-toolbar"><a href="/admin">Back to operations</a><PrintButton /></div><article className="invoice-document"><header><div><p className="invoice-brand">CharterX</p><span>Yacht Growth &amp; Management</span></div><div><p>Invoice</p><strong>{invoice.invoice_number}</strong><span className={`admin-status status-${invoice.status}`}>{invoice.status}</span></div></header><section className="invoice-meta"><div><span>Issued by</span><strong>Collabrative Yatch Managemnet Limited</strong><p>Trading as CharterX<br />United Kingdom</p></div><div><span>Prepared for</span><strong>{invoice.client_name}</strong><p>{invoice.client_email}<br />{invoice.client_address}</p></div><div><span>Invoice details</span><p>Issue date <strong>{date(invoice.issue_date)}</strong><br />Due date <strong>{date(invoice.due_date)}</strong><br />Currency <strong>{invoice.currency}</strong></p></div></section>{invoice.vessel_name && <p className="invoice-project"><span>Yacht / project</span>{invoice.vessel_name}</p>}<table><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>{items.map((item, index) => <tr key={`${item.description}-${index}`}><td>{item.description}</td><td>{item.quantity}</td><td>{money(item.unitCents, invoice.currency)}</td><td>{money(Math.round(item.quantity * item.unitCents), invoice.currency)}</td></tr>)}</tbody></table><div className="invoice-summary"><p><span>Subtotal</span><strong>{money(invoice.subtotal_cents, invoice.currency)}</strong></p><p><span>Tax / VAT ({(invoice.tax_rate_bps / 100).toFixed(2)}%)</span><strong>{money(invoice.tax_cents, invoice.currency)}</strong></p><p><span>Total due</span><strong>{money(invoice.total_cents, invoice.currency)}</strong></p></div>{invoice.notes && <section className="invoice-notes"><span>Notes &amp; payment instructions</span><p>{invoice.notes}</p></section>}<footer><p>You operate the yacht. We help grow the business.</p><span>CYM CharterX · {invoice.invoice_number}</span></footer></article></div>;
}
