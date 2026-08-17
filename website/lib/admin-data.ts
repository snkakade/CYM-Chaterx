import { getDatabase, recordAudit } from "./database";

export const leadStatuses = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
export const invoiceStatuses = ["draft", "sent", "paid", "overdue", "void"] as const;
export const currencies = ["GBP", "EUR", "USD"] as const;

export type LeadStatus = typeof leadStatuses[number];
export type InvoiceStatus = typeof invoiceStatuses[number];

export type LeadRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
  vessel_type: string;
  location: string;
  platforms: string;
  website: string;
  challenge: string;
  monthly_goal: string;
  message: string;
  source: string;
  status: LeadStatus;
  priority: "normal" | "high";
  follow_up_at: string | null;
  internal_notes: string;
};

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitCents: number;
};

export type InvoiceRecord = {
  id: string;
  invoice_number: string;
  created_at: string;
  updated_at: string;
  issue_date: string;
  due_date: string;
  client_name: string;
  client_email: string;
  client_address: string;
  vessel_name: string;
  currency: "GBP" | "EUR" | "USD";
  subtotal_cents: number;
  tax_rate_bps: number;
  tax_cents: number;
  total_cents: number;
  status: InvoiceStatus;
  notes: string;
  line_items_json: string;
  lead_id: string | null;
};

export type AuditRecord = {
  id: string;
  created_at: string;
  actor_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  detail: string;
};

export async function getDashboardData() {
  const database = await getDatabase();
  const [leadsResult, invoicesResult, auditResult] = await Promise.all([
    database.prepare("SELECT id, created_at, updated_at, name, email, phone, vessel_type, location, platforms, website, challenge, monthly_goal, message, source, status, priority, follow_up_at, internal_notes FROM leads ORDER BY created_at DESC LIMIT 200").all<LeadRecord>(),
    database.prepare("SELECT * FROM invoices ORDER BY created_at DESC LIMIT 200").all<InvoiceRecord>(),
    database.prepare("SELECT * FROM audit_events ORDER BY created_at DESC LIMIT 20").all<AuditRecord>(),
  ]);

  const leads = leadsResult.results;
  const invoices = invoicesResult.results;
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();

  return {
    leads,
    invoices,
    activity: auditResult.results,
    metrics: {
      newLeads: leads.filter((lead) => lead.status === "new").length,
      activePipeline: leads.filter((lead) => ["contacted", "qualified", "proposal"].includes(lead.status)).length,
      followUpsDue: leads.filter((lead) => lead.follow_up_at && new Date(lead.follow_up_at) <= now && !["won", "lost"].includes(lead.status)).length,
      outstandingInvoices: invoices.filter((invoice) => ["sent", "overdue"].includes(invoice.status)).length,
      paidThisMonth: invoices.filter((invoice) => invoice.status === "paid" && invoice.updated_at >= monthStart).length,
    },
  };
}

export async function getInvoiceById(id: string) {
  const database = await getDatabase();
  return database.prepare("SELECT * FROM invoices WHERE id = ?").bind(id).first<InvoiceRecord>();
}

export async function updateLead(
  id: string,
  updates: { status: LeadStatus; priority: "normal" | "high"; followUpAt: string | null; internalNotes: string },
  actorEmail: string,
) {
  const database = await getDatabase();
  const changed = await database.prepare(
    `UPDATE leads SET status = ?, priority = ?, follow_up_at = ?, internal_notes = ?, updated_at = ? WHERE id = ?`,
  ).bind(updates.status, updates.priority, updates.followUpAt, updates.internalNotes.slice(0, 5000), new Date().toISOString(), id).run();
  if (!changed.meta.changes) return false;
  await recordAudit(actorEmail, "lead_updated", "lead", id, `${updates.status} · ${updates.priority} priority`);
  return true;
}

export async function createInvoice(input: {
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  vesselName: string;
  currency: "GBP" | "EUR" | "USD";
  issueDate: string;
  dueDate: string;
  taxRateBps: number;
  notes: string;
  leadId: string | null;
  items: InvoiceLineItem[];
}, actorEmail: string) {
  const database = await getDatabase();
  const sequence = await database.prepare("UPDATE sequences SET value = value + 1 WHERE key = 'invoice' RETURNING value").first<{ value: number }>();
  if (!sequence) throw new Error("Invoice sequence is unavailable.");
  const invoiceNumber = `CYM-${new Date().getUTCFullYear()}-${String(sequence.value).padStart(4, "0")}`;
  const subtotalCents = input.items.reduce((total, item) => total + Math.round(item.quantity * item.unitCents), 0);
  const taxCents = Math.round(subtotalCents * input.taxRateBps / 10_000);
  const totalCents = subtotalCents + taxCents;
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await database.prepare(
    `INSERT INTO invoices(id, invoice_number, created_at, updated_at, issue_date, due_date, client_name, client_email, client_address, vessel_name, currency, subtotal_cents, tax_rate_bps, tax_cents, total_cents, status, notes, line_items_json, lead_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?)`,
  ).bind(id, invoiceNumber, now, now, input.issueDate, input.dueDate, input.clientName, input.clientEmail, input.clientAddress, input.vesselName, input.currency, subtotalCents, input.taxRateBps, taxCents, totalCents, input.notes, JSON.stringify(input.items), input.leadId).run();
  await recordAudit(actorEmail, "invoice_created", "invoice", id, `${invoiceNumber} · ${input.currency} ${(totalCents / 100).toFixed(2)}`);
  return { id, invoiceNumber };
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus, actorEmail: string) {
  const database = await getDatabase();
  const changed = await database.prepare("UPDATE invoices SET status = ?, updated_at = ? WHERE id = ?").bind(status, new Date().toISOString(), id).run();
  if (!changed.meta.changes) return false;
  await recordAudit(actorEmail, "invoice_status_changed", "invoice", id, status);
  return true;
}

export function parseInvoiceItems(value: string): InvoiceLineItem[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
