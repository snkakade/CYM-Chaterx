"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { AuditRecord, ExpenseRecord, InvoiceLineItem, InvoiceRecord, LeadRecord, LeadStatus } from "@/lib/admin-data";
import type { AdminRole } from "@/lib/auth";
import { ArrowIcon } from "./ArrowIcon";
import { CharterXWordmark } from "./CharterXWordmark";

type DashboardData = {
  leads: LeadRecord[];
  invoices: InvoiceRecord[];
  expenses: ExpenseRecord[];
  activity: AuditRecord[];
  metrics: {
    newLeads: number; activePipeline: number; followUpsDue: number; outstandingInvoices: number; receivedThisMonth: number;
    responseQueue: number; pipelineValue: number; weightedPipeline: number; outstandingValue: number; receivedThisMonthValue: number; expenseThisMonthValue: number; gstInputThisMonthValue: number; conversionRate: number;
  };
};

type View = "overview" | "leads" | "invoices" | "archive" | "expenses";
type LeadFilter = "all" | "attention" | "priority" | "no-followup" | "won";

const leadStages: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];
const invoiceStages = ["draft", "sent", "received", "overdue", "void"];
const expenseCategories = ["marketing", "software", "professional_services", "travel", "office", "banking", "tax_and_compliance", "contractors", "other"] as const;
const stageProbability: Record<LeadStatus, number> = { new: 15, contacted: 30, qualified: 55, proposal: 75, won: 100, lost: 0 };
const today = () => new Date().toISOString().slice(0, 10);
const futureDate = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
const futureDateTime = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();
const pretty = (value: string) => value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "Not set";
const dateTime = (value: string | null) => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value)) : "Not set";
const money = (cents: number, currency = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(cents / 100);
const sourceLabel = (source: string) => ({
  "website-contact": "Website form", "growth-score": "Growth score", "concierge-message": "Direct message", "concierge-whatsapp": "WhatsApp", "concierge-callback": "Callback",
}[source] ?? pretty(source || "Website"));
const parseItems = (value: string): InvoiceLineItem[] => { try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; } catch { return []; } };

function readiness(lead: LeadRecord) {
  return Math.min(100, (lead.email || lead.phone ? 25 : 0) + (lead.vessel_type ? 15 : 0) + (lead.location ? 10 : 0) + (lead.website ? 10 : 0) + (lead.platforms ? 10 : 0) + (lead.monthly_goal ? 10 : 0) + (lead.message.length > 80 ? 10 : 0) + (lead.source === "growth-score" ? 10 : 0));
}

function isClosed(lead: LeadRecord) { return lead.status === "won" || lead.status === "lost"; }
function isDue(lead: LeadRecord) { return Boolean(!isClosed(lead) && lead.follow_up_at && new Date(lead.follow_up_at) <= new Date()); }
function suggestedAction(lead: LeadRecord) {
  if (lead.next_action) return lead.next_action;
  if (lead.status === "new") return lead.phone ? "Call and qualify the opportunity" : "Reply and qualify the opportunity";
  if (lead.status === "contacted") return "Confirm the commercial gap and decision path";
  if (lead.status === "qualified") return "Shape scope, value and timing";
  if (lead.status === "proposal") return "Follow up on the proposal";
  if (lead.status === "won") return "Confirm onboarding and first milestone";
  return lead.lost_reason ? "Keep for future reactivation" : "Record why the opportunity was lost";
}
function attentionScore(lead: LeadRecord) { return (isDue(lead) ? 100 : 0) + (lead.status === "new" ? 70 : 0) + (lead.priority === "high" ? 45 : 0) + (lead.follow_up_at ? 0 : 10); }

export function AdminDashboard({ data, adminEmail, adminRole }: { data: DashboardData; adminEmail: string; adminRole: AdminRole }) {
  const [view, setView] = useState<View>("overview");
  const [leadFilter, setLeadFilter] = useState<LeadFilter>("all");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [leads, setLeads] = useState(data.leads);
  const [invoices, setInvoices] = useState(data.invoices);
  const [expenses, setExpenses] = useState(data.expenses);
  const [showInvoice, setShowInvoice] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceRecord | null>(null);
  const [deletingInvoice, setDeletingInvoice] = useState<InvoiceRecord | null>(null);
  const [showExpense, setShowExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseRecord | null>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);
  const [invoiceCurrency, setInvoiceCurrency] = useState("USD");
  const [items, setItems] = useState<Array<{ description: string; quantity: string; unit: string }>>([{ description: "CharterX commercial growth services", quantity: "1", unit: "0.00" }]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setSelectedLead(null); setShowInvoice(false); setShowExpense(false); setDeletingInvoice(null); } };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leads.filter((lead) => !query || [lead.name, lead.email, lead.phone, lead.vessel_type, lead.location, lead.challenge, lead.source, lead.next_action].some((value) => value.toLowerCase().includes(query))).filter((lead) => {
      if (leadFilter === "attention") return isDue(lead) || lead.status === "new";
      if (leadFilter === "priority") return lead.priority === "high" && !isClosed(lead);
      if (leadFilter === "no-followup") return !lead.follow_up_at && !isClosed(lead);
      if (leadFilter === "won") return lead.status === "won";
      return true;
    });
  }, [leads, leadFilter, search]);

  const attentionLeads = useMemo(() => [...leads].filter((lead) => !isClosed(lead)).sort((left, right) => attentionScore(right) - attentionScore(left) || new Date(right.created_at).getTime() - new Date(left.created_at).getTime()).slice(0, 6), [leads]);
  const pipelineCounts = useMemo(() => leadStages.map((stage) => ({ stage, count: leads.filter((lead) => lead.status === stage).length })), [leads]);
  const sourceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    leads.forEach((lead) => counts.set(sourceLabel(lead.source), (counts.get(sourceLabel(lead.source)) ?? 0) + 1));
    return [...counts.entries()].sort((left, right) => right[1] - left[1]).slice(0, 5);
  }, [leads]);
  const maxPipelineCount = Math.max(...pipelineCounts.map((item) => item.count), 1);
  const maxSourceCount = Math.max(...sourceCounts.map((item) => item[1]), 1);
  const activeInvoices = useMemo(() => invoices.filter((invoice) => !invoice.deleted_at), [invoices]);
  const deletedInvoices = useMemo(() => invoices.filter((invoice) => invoice.deleted_at), [invoices]);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const outstandingInvoices = activeInvoices.filter((invoice) => ["sent", "overdue"].includes(invoice.status));
  const receivedInvoices = activeInvoices.filter((invoice) => invoice.status === "received" && invoice.updated_at.startsWith(currentMonth));
  const outstandingValue = outstandingInvoices.reduce((total, invoice) => total + invoice.total_cents, 0);
  const receivedValue = receivedInvoices.reduce((total, invoice) => total + invoice.total_cents, 0);
  const currentMonthExpenses = expenses.filter((expense) => expense.expense_date.startsWith(currentMonth));
  const expenseMonthValue = currentMonthExpenses.filter((expense) => expense.currency === "INR").reduce((total, expense) => total + expense.total_cents, 0);
  const gstInputValue = currentMonthExpenses.filter((expense) => expense.currency === "INR").reduce((total, expense) => total + expense.gst_cents, 0);

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.assign("/admin/login"); }

  async function saveLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedLead) return;
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const status = String(form.get("status")) as LeadStatus;
    const priority = form.get("priority") === "high" ? "high" as const : "normal" as const;
    const followUpValue = String(form.get("followUpAt") ?? "");
    const lastContactValue = String(form.get("lastContactAt") ?? "");
    const estimatedValueCents = Math.round(Number(form.get("estimatedValue")) * 100);
    const probability = Number(form.get("probability"));
    const nextAction = String(form.get("nextAction") ?? "");
    const lostReason = String(form.get("lostReason") ?? "");
    const internalNotes = String(form.get("internalNotes") ?? "");
    const response = await fetch(`/api/admin/leads/${selectedLead.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({
      status, priority, followUpAt: followUpValue, lastContactAt: lastContactValue, estimatedValueCents, probability, nextAction, lostReason, internalNotes,
    }) });
    const result = await response.json().catch(() => null) as { error?: string } | null;
    setBusy(false);
    if (!response.ok) return setToast(result?.error || "The lead could not be updated.");
    setLeads((current) => current.map((lead) => lead.id === selectedLead.id ? {
      ...lead,
      status,
      priority,
      follow_up_at: followUpValue ? new Date(followUpValue).toISOString() : null,
      last_contact_at: lastContactValue ? new Date(lastContactValue).toISOString() : null,
      estimated_value_cents: estimatedValueCents,
      probability,
      next_action: nextAction,
      lost_reason: lostReason,
      internal_notes: internalNotes,
      updated_at: new Date().toISOString(),
    } : lead));
    setToast("Lead intelligence and next action saved.");
    setSelectedLead(null);
  }

  async function createInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true);
    const form = new FormData(event.currentTarget);
    const invoiceItems: InvoiceLineItem[] = items.map((item) => ({ description: item.description, quantity: Number(item.quantity), unitCents: Math.round(Number(item.unit) * 100) }));
    const payload = { clientName: form.get("clientName"), clientEmail: form.get("clientEmail"), clientAddress: form.get("clientAddress"), vesselName: form.get("vesselName"), currency: form.get("currency"), issueDate: form.get("issueDate"), dueDate: form.get("dueDate"), taxRateBps: Math.round(Number(form.get("taxRate")) * 100), notes: form.get("notes"), leadId: form.get("leadId"), items: invoiceItems };
    const response = await fetch(editingInvoice ? `/api/admin/invoices/${editingInvoice.id}` : "/api/admin/invoices", { method: editingInvoice ? "PATCH" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json() as { error?: string; invoiceNumber?: string; id?: string }; setBusy(false);
    if (!response.ok) return setToast(result.error || "The invoice could not be created.");
    const invoiceId = editingInvoice?.id ?? result.id;
    if (invoiceId) window.location.assign(`/admin/invoices/${invoiceId}`);
  }

  function openInvoiceForm(invoice: InvoiceRecord | null = null) {
    setEditingInvoice(invoice);
    setInvoiceCurrency(invoice?.currency ?? "USD");
    setItems(invoice ? parseItems(invoice.line_items_json).map((item) => ({ description: item.description, quantity: String(item.quantity), unit: (item.unitCents / 100).toFixed(2) })) : [{ description: "CharterX commercial growth services", quantity: "1", unit: "0.00" }]);
    setShowInvoice(true);
  }

  async function deleteVoidInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!deletingInvoice) return;
    const remark = String(new FormData(event.currentTarget).get("remark") ?? "").trim();
    setBusy(true);
    const response = await fetch(`/api/admin/invoices/${deletingInvoice.id}`, { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ remark }) });
    const result = await response.json().catch(() => null) as { error?: string } | null;
    setBusy(false);
    if (!response.ok) return setToast(result?.error || "The invoice could not be deleted.");
    const deletedAt = new Date().toISOString();
    setInvoices((current) => adminRole === "superadmin" ? current.map((invoice) => invoice.id === deletingInvoice.id ? { ...invoice, deleted_at: deletedAt, deletion_remark: remark, deleted_by: adminEmail } : invoice) : current.filter((invoice) => invoice.id !== deletingInvoice.id));
    setDeletingInvoice(null);
    setToast(`${deletingInvoice.invoice_number} moved to the restricted archive.`);
  }

  async function saveExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { expenseDate: form.get("expenseDate"), vendorName: form.get("vendorName"), vendorGstin: form.get("vendorGstin"), category: form.get("category"), description: form.get("description"), referenceNumber: form.get("referenceNumber"), currency: form.get("currency"), subtotalCents: Math.round(Number(form.get("subtotal")) * 100), gstRateBps: Math.round(Number(form.get("gstRate")) * 100), paymentMethod: form.get("paymentMethod"), notes: form.get("notes") };
    setBusy(true);
    const response = await fetch(editingExpense ? `/api/admin/expenses/${editingExpense.id}` : "/api/admin/expenses", { method: editingExpense ? "PATCH" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => null) as { error?: string; expense?: ExpenseRecord } | null;
    setBusy(false);
    if (!response.ok || !result?.expense) return setToast(result?.error || "The expense could not be saved.");
    setExpenses((current) => editingExpense ? current.map((expense) => expense.id === result.expense!.id ? result.expense! : expense) : [result.expense!, ...current]);
    setShowExpense(false); setEditingExpense(null); setToast(editingExpense ? "Expense updated." : "Expense recorded for accounts and GST review.");
  }

  function openExpenseForm(expense: ExpenseRecord | null = null) { setEditingExpense(expense); setShowExpense(true); }

  async function changeInvoiceStatus(invoice: InvoiceRecord, status: string) {
    const response = await fetch(`/api/admin/invoices/${invoice.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) return setToast("Invoice status could not be changed.");
    setInvoices((current) => current.map((entry) => entry.id === invoice.id ? { ...entry, status: status as InvoiceRecord["status"], updated_at: new Date().toISOString() } : entry));
    setToast(`${invoice.invoice_number} marked ${status}.`);
  }

  function invoiceForLead(lead: LeadRecord) {
    setSelectedLead(null); openInvoiceForm();
    window.setTimeout(() => { const form = document.querySelector<HTMLFormElement>("#invoice-form"); if (!form) return; (form.elements.namedItem("clientName") as HTMLInputElement).value = lead.name; (form.elements.namedItem("clientEmail") as HTMLInputElement).value = lead.email; (form.elements.namedItem("vesselName") as HTMLInputElement).value = lead.vessel_type; (form.elements.namedItem("leadId") as HTMLInputElement).value = lead.id; });
  }
  function setFollowUp(days: number) { if (selectedLead) setSelectedLead({ ...selectedLead, follow_up_at: futureDateTime(days) }); }

  const itemSubtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit) || 0), 0);
  const metricCards = [
    ["Action queue", data.metrics.responseQueue, "New and due now", data.metrics.responseQueue ? "needs-attention" : "is-clear"],
    ["Weighted pipeline", money(data.metrics.weightedPipeline), `${money(data.metrics.pipelineValue)} gross potential`, ""],
    ["Follow-ups due", data.metrics.followUpsDue, "Protect every live conversation", data.metrics.followUpsDue ? "needs-attention" : "is-clear"],
    ["Outstanding", money(outstandingValue), `${outstandingInvoices.length} open invoice${outstandingInvoices.length === 1 ? "" : "s"}`, ""],
    ["Win rate", `${data.metrics.conversionRate}%`, "Won from closed opportunities", ""],
  ] as const;
  const navigation: Array<{ id: View; label: string }> = [
    { id: "overview", label: "Command desk" },
    { id: "leads", label: "Leads" },
    { id: "invoices", label: "Active invoices" },
    ...(adminRole === "superadmin" ? [{ id: "archive" as const, label: "Deleted invoices" }] : []),
    { id: "expenses", label: "Expenses" },
  ];

  return <div className="admin-dashboard admin-page">
    <aside className="admin-sidebar">
      <a className="admin-wordmark" href="/admin"><CharterXWordmark tone="light" compact /><small>Commercial command</small></a>
      <nav aria-label="Admin navigation">{navigation.map((item) => <button className={view === item.id ? "is-active" : ""} key={item.id} onClick={() => setView(item.id)}><i aria-hidden="true" />{item.label}</button>)}</nav>
      <div className="admin-sidebar-signal"><span>Today’s signal</span><strong>{data.metrics.responseQueue ? `${data.metrics.responseQueue} action${data.metrics.responseQueue === 1 ? "" : "s"} waiting` : "Desk is clear"}</strong><small>{data.metrics.followUpsDue ? `${data.metrics.followUpsDue} follow-up${data.metrics.followUpsDue === 1 ? "" : "s"} overdue` : "No overdue follow-ups"}</small></div>
      <div className="admin-sidebar-foot"><span>{adminEmail}</span><button onClick={logout}>Sign out</button><a href="/" target="_blank" rel="noreferrer">View website <ArrowIcon /></a></div>
    </aside>

    <main className="admin-main">
      <header className="admin-topbar"><div><p>Private command centre · {new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</p><h1>{view === "overview" ? "Commercial command" : view === "leads" ? "Opportunity pipeline" : view === "invoices" ? "Revenue desk" : view === "archive" ? "Deleted invoice archive" : "Expense ledger"}</h1></div><div><span className="admin-live">Encrypted session</span>{view === "expenses" ? <button className="admin-primary" onClick={() => openExpenseForm()}>New expense</button> : view !== "archive" && <button className="admin-primary" onClick={() => openInvoiceForm()}>New invoice</button>}</div></header>
      {toast && <div className="admin-toast" role="status">{toast}<button aria-label="Dismiss notification" onClick={() => setToast("")}>×</button></div>}

      {view === "overview" && <>
        <section className="admin-metrics" aria-label="Business metrics">{metricCards.map(([label, value, note, tone], index) => <article className={tone} key={label}><span>0{index + 1}</span><p>{label}</p><strong>{value}</strong><small>{note}</small></article>)}</section>
        <div className="admin-command-grid">
          <section className="admin-panel admin-focus-panel"><div className="admin-panel-head"><div><p>Priority desk</p><h2>What needs a move now</h2></div><button onClick={() => { setLeadFilter("attention"); setView("leads"); }}>Open action queue</button></div><div className="admin-focus-list">{attentionLeads.map((lead, index) => <button key={lead.id} onClick={() => setSelectedLead(lead)}><span className="admin-focus-rank">{String(index + 1).padStart(2, "0")}</span><span className="admin-focus-person"><strong>{lead.name}</strong><small>{sourceLabel(lead.source)} · {lead.vessel_type || lead.challenge}</small></span><span className="admin-focus-action"><strong>{suggestedAction(lead)}</strong><small>{isDue(lead) ? `Due ${dateTime(lead.follow_up_at)}` : lead.follow_up_at ? `Next ${dateTime(lead.follow_up_at)}` : "No follow-up set"}</small></span><span className={`admin-priority-mark ${isDue(lead) ? "is-due" : lead.priority === "high" ? "is-high" : ""}`}>{isDue(lead) ? "Due" : lead.priority === "high" ? "High" : pretty(lead.status)}</span></button>)}{!attentionLeads.length && <p className="admin-empty">The action queue is clear. New enquiries will appear here.</p>}</div></section>
          <section className="admin-panel admin-pipeline-panel"><div className="admin-panel-head"><div><p>Pipeline signal</p><h2>{money(data.metrics.weightedPipeline)} weighted</h2></div></div><div className="admin-bar-list">{pipelineCounts.map(({ stage, count }) => <div key={stage}><span>{pretty(stage)}</span><i><b style={{ width: `${Math.max(count / maxPipelineCount * 100, count ? 8 : 0)}%` }} /></i><strong>{count}</strong></div>)}</div><div className="admin-panel-insight"><span>Commercial read</span><p>{data.metrics.activePipeline ? `${data.metrics.activePipeline} opportunities are moving between first contact and proposal.` : "No active opportunities have moved beyond first response yet."}</p></div></section>
        </div>
        <div className="admin-lower-grid">
          <section className="admin-panel admin-source-panel"><div className="admin-panel-head"><div><p>Demand intelligence</p><h2>Where conversations begin</h2></div></div><div className="admin-source-list">{sourceCounts.map(([source, count]) => <div key={source}><span>{source}</span><i><b style={{ width: `${Math.max(count / maxSourceCount * 100, 7)}%` }} /></i><strong>{count}</strong></div>)}{!sourceCounts.length && <p className="admin-empty">Source patterns will appear as enquiries arrive.</p>}</div></section>
          <section className="admin-panel"><div className="admin-panel-head"><div><p>Operating log</p><h2>Recent activity</h2></div></div><div className="admin-activity">{data.activity.slice(0, 7).map((event) => <div key={event.id}><i /><p><strong>{pretty(event.action)}</strong><span>{event.detail || event.entity_type}</span>{event.ip_address && <small>{event.ip_address} · {event.device} · {event.location}</small>}</p><time>{dateTime(event.created_at)}</time></div>)}{!data.activity.length && <p className="admin-empty">Secure actions will be recorded here.</p>}</div></section>
        </div>
      </>}

      {view === "leads" && <section className="admin-panel admin-table-panel"><div className="admin-panel-head admin-lead-tools"><div><p>Opportunity intelligence</p><h2>{filteredLeads.length} visible lead{filteredLeads.length === 1 ? "" : "s"}</h2></div><div className="admin-tools"><input aria-label="Search leads" placeholder="Search contact, yacht, source or action…" value={search} onChange={(event) => setSearch(event.target.value)} /><a href="/api/admin/export?type=leads">Export intelligence</a></div></div><div className="admin-filter-row" aria-label="Lead filters">{(["all", "attention", "priority", "no-followup", "won"] as const).map((filter) => <button className={leadFilter === filter ? "is-active" : ""} key={filter} onClick={() => setLeadFilter(filter)}>{filter === "no-followup" ? "No follow-up" : pretty(filter)}</button>)}</div><div className="admin-table-scroll"><table><thead><tr><th>Contact</th><th>Opportunity</th><th>Signal</th><th>Stage</th><th>Next move</th><th /></tr></thead><tbody>{filteredLeads.map((lead) => <tr className={isDue(lead) ? "is-due" : ""} key={lead.id}><td><strong>{lead.name}</strong><span>{lead.email || lead.phone || "Contact detail missing"}</span><small>{date(lead.created_at)} · {sourceLabel(lead.source)}</small></td><td><strong>{lead.vessel_type || "Vessel not supplied"}</strong><span>{lead.location || lead.challenge}</span><small>{lead.estimated_value_cents ? money(lead.estimated_value_cents) : "Value not set"}</small></td><td><strong>{readiness(lead)}% ready</strong><span>{lead.probability}% confidence</span>{lead.priority === "high" && <small className="admin-high-copy">High priority</small>}</td><td><span className={`admin-status status-${lead.status}`}>{pretty(lead.status)}</span></td><td><strong>{suggestedAction(lead)}</strong><span>{lead.follow_up_at ? dateTime(lead.follow_up_at) : "No follow-up scheduled"}</span></td><td><button onClick={() => setSelectedLead(lead)}>Open</button></td></tr>)}</tbody></table></div>{!filteredLeads.length && <p className="admin-empty">No leads match this view.</p>}</section>}

      {view === "invoices" && <><section className="admin-revenue-strip"><article><span>Outstanding</span><strong>{money(outstandingValue)}</strong><small>{outstandingInvoices.length} invoice{outstandingInvoices.length === 1 ? "" : "s"}</small></article><article><span>Received this month</span><strong>{money(receivedValue)}</strong><small>{receivedInvoices.length} payment{receivedInvoices.length === 1 ? "" : "s"}</small></article><article><span>Drafts</span><strong>{activeInvoices.filter((invoice) => invoice.status === "draft").length}</strong><small>Awaiting issue</small></article></section><section className="admin-panel admin-table-panel"><div className="admin-panel-head"><div><p>CYM CharterX billing</p><h2>{activeInvoices.length} invoice{activeInvoices.length === 1 ? "" : "s"}</h2></div><div className="admin-tools"><a href="/api/admin/export?type=invoices">Export CSV</a><button className="admin-primary" onClick={() => openInvoiceForm()}>New invoice</button></div></div><div className="admin-table-scroll"><table><thead><tr><th>Invoice</th><th>Client</th><th>Dates</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>{activeInvoices.map((invoice) => <tr key={invoice.id}><td><strong>{invoice.invoice_number}</strong><span>{invoice.vessel_name || "Commercial services"}</span></td><td><strong>{invoice.client_name}</strong><span>{invoice.client_email}</span></td><td><strong>{date(invoice.issue_date)}</strong><span>Due {date(invoice.due_date)}</span></td><td><strong>{money(invoice.total_cents, invoice.currency)}</strong><span>{invoice.currency}</span></td><td><select aria-label={`Status for ${invoice.invoice_number}`} value={invoice.status} onChange={(event) => changeInvoiceStatus(invoice, event.target.value)}>{invoiceStages.map((status) => <option key={status} value={status}>{status === "received" ? "Received" : pretty(status)}</option>)}</select></td><td><div className="admin-row-actions"><a href={`/admin/invoices/${invoice.id}`} target="_blank" rel="noreferrer">Open</a>{invoice.status === "draft" && <button onClick={() => openInvoiceForm(invoice)}>Edit</button>}{invoice.status === "void" && <button className="is-danger" onClick={() => setDeletingInvoice(invoice)}>Delete</button>}</div></td></tr>)}</tbody></table></div>{!activeInvoices.length && <p className="admin-empty">Create the first CharterX invoice.</p>}</section></>}

      {adminRole === "superadmin" && view === "archive" && <section className="admin-panel admin-table-panel admin-archive"><div className="admin-panel-head"><div><p>Superadmin only</p><h2>{deletedInvoices.length} deleted invoice{deletedInvoices.length === 1 ? "" : "s"}</h2></div></div><div className="admin-table-scroll"><table><thead><tr><th>Invoice</th><th>Client</th><th>Deleted</th><th>Mandatory remark</th><th /></tr></thead><tbody>{deletedInvoices.map((invoice) => <tr key={invoice.id}><td><strong>{invoice.invoice_number}</strong></td><td>{invoice.client_name}</td><td>{dateTime(invoice.deleted_at)}</td><td>{invoice.deletion_remark}</td><td><a href={`/admin/invoices/${invoice.id}`} target="_blank" rel="noreferrer">View</a></td></tr>)}</tbody></table></div>{!deletedInvoices.length && <p className="admin-empty">No deleted invoices are stored.</p>}</section>}

      {view === "expenses" && <><section className="admin-revenue-strip"><article><span>This month</span><strong>{money(expenseMonthValue, "INR")}</strong><small>Total recorded spend</small></article><article><span>Input GST</span><strong>{money(gstInputValue, "INR")}</strong><small>INR expenses this month</small></article><article><span>Records</span><strong>{expenses.length}</strong><small>Ready for accounts export</small></article></section><section className="admin-panel admin-table-panel"><div className="admin-panel-head"><div><p>India accounts register</p><h2>Expenses and input GST</h2></div><div className="admin-tools"><a href="/api/admin/export?type=expenses">Export GST CSV</a><button className="admin-primary" onClick={() => openExpenseForm()}>New expense</button></div></div><div className="admin-table-scroll"><table><thead><tr><th>Date</th><th>Vendor</th><th>Category</th><th>Reference</th><th>Taxable</th><th>GST</th><th>Total</th><th /></tr></thead><tbody>{expenses.map((expense) => <tr key={expense.id}><td>{date(expense.expense_date)}</td><td><strong>{expense.vendor_name}</strong><span>{expense.vendor_gstin || "GSTIN not recorded"}</span></td><td>{pretty(expense.category)}</td><td><strong>{expense.reference_number || "Not recorded"}</strong><span>{expense.description}</span></td><td>{money(expense.subtotal_cents, expense.currency)}</td><td><strong>{money(expense.gst_cents, expense.currency)}</strong><span>{(expense.gst_rate_bps / 100).toFixed(2)}%</span></td><td><strong>{money(expense.total_cents, expense.currency)}</strong></td><td><button onClick={() => openExpenseForm(expense)}>Edit</button></td></tr>)}</tbody></table></div>{!expenses.length && <p className="admin-empty">Record the first business expense.</p>}</section></>}
    </main>

    {selectedLead && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedLead(null)}><section className="admin-modal admin-lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title"><button className="admin-modal-close" onClick={() => setSelectedLead(null)} aria-label="Close lead">×</button><div className="admin-lead-heading"><div><p className="admin-eyebrow">{sourceLabel(selectedLead.source)} · received {date(selectedLead.created_at)}</p><h2 id="lead-title">{selectedLead.name}</h2><p>{selectedLead.vessel_type || "Vessel not supplied"}{selectedLead.location ? ` · ${selectedLead.location}` : ""}</p></div><div className="admin-readiness"><strong>{readiness(selectedLead)}%</strong><span>Brief readiness</span></div></div><div className="admin-contact-strip">{selectedLead.email && <a href={`mailto:${selectedLead.email}`}>Email</a>}{selectedLead.phone && <a href={`tel:${selectedLead.phone}`}>Call</a>}{selectedLead.phone && <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a>}{selectedLead.website && <a href={selectedLead.website} target="_blank" rel="noreferrer">Website</a>}</div><div className="admin-intelligence-strip"><div><span>Estimated value</span><strong>{selectedLead.estimated_value_cents ? money(selectedLead.estimated_value_cents) : "Not set"}</strong></div><div><span>Confidence</span><strong>{selectedLead.probability}%</strong></div><div><span>Weighted value</span><strong>{money(Math.round(selectedLead.estimated_value_cents * selectedLead.probability / 100))}</strong></div><div><span>Last contact</span><strong>{dateTime(selectedLead.last_contact_at)}</strong></div></div><div className="admin-lead-brief"><div><span>Commercial challenge</span><p>{selectedLead.challenge || "Not supplied"}</p></div><div><span>Monthly goal</span><p>{selectedLead.monthly_goal || "Not supplied"}</p></div><div><span>Booking platforms</span><p>{selectedLead.platforms || "Not supplied"}</p></div></div><div className="admin-lead-message"><span>Original enquiry</span><p>{selectedLead.message}</p></div><form className="admin-edit-form" key={`${selectedLead.id}-${selectedLead.follow_up_at}`} onSubmit={saveLead}><div className="admin-commercial-fields"><label><span>Stage</span><select name="status" defaultValue={selectedLead.status}>{leadStages.map((stage) => <option value={stage} key={stage}>{pretty(stage)}</option>)}</select></label><label><span>Priority</span><select name="priority" defaultValue={selectedLead.priority}><option value="normal">Normal</option><option value="high">High</option></select></label><label><span>Estimated value (USD)</span><input name="estimatedValue" type="number" min="0" step="50" defaultValue={(selectedLead.estimated_value_cents / 100).toFixed(0)} /></label><label><span>Confidence %</span><input name="probability" type="number" min="0" max="100" step="5" defaultValue={selectedLead.probability || stageProbability[selectedLead.status]} /></label><label><span>Follow-up</span><input name="followUpAt" type="datetime-local" defaultValue={selectedLead.follow_up_at?.slice(0, 16) ?? ""} /></label><label><span>Last contact</span><input name="lastContactAt" type="datetime-local" defaultValue={selectedLead.last_contact_at?.slice(0, 16) ?? ""} /></label></div><div className="admin-quick-followup"><span>Set next follow-up</span><div><button type="button" onClick={() => setFollowUp(0)}>Today</button><button type="button" onClick={() => setFollowUp(1)}>Tomorrow</button><button type="button" onClick={() => setFollowUp(3)}>In 3 days</button><button type="button" onClick={() => setFollowUp(7)}>Next week</button></div></div><label><span>Next best action</span><input name="nextAction" defaultValue={selectedLead.next_action} placeholder={suggestedAction(selectedLead)} /></label><label><span>Lost reason</span><input name="lostReason" defaultValue={selectedLead.lost_reason} placeholder="Complete only when closing an opportunity as lost" /></label><label><span>Internal notes</span><textarea name="internalNotes" rows={4} defaultValue={selectedLead.internal_notes} placeholder="Decision makers, objections, call notes and useful context…" /></label><div className="admin-form-actions"><button type="button" onClick={() => invoiceForLead(selectedLead)}>Create invoice</button><button className="admin-primary" disabled={busy} type="submit">{busy ? "Saving…" : "Save opportunity"}</button></div></form></section></div>}

    {showInvoice && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowInvoice(false); setEditingInvoice(null); } }}><section className="admin-modal admin-invoice-modal" role="dialog" aria-modal="true" aria-labelledby="invoice-title"><button className="admin-modal-close" onClick={() => { setShowInvoice(false); setEditingInvoice(null); }} aria-label="Close invoice form">×</button><p className="admin-eyebrow">CYM CharterX billing</p><h2 id="invoice-title">{editingInvoice ? `Edit ${editingInvoice.invoice_number}` : "Create an invoice"}</h2><form key={editingInvoice?.id ?? "new-invoice"} id="invoice-form" className="admin-invoice-form" onSubmit={createInvoice}><input name="leadId" type="hidden" defaultValue={editingInvoice?.lead_id ?? ""} /><div className="admin-form-grid"><label><span>Client name</span><input name="clientName" defaultValue={editingInvoice?.client_name ?? ""} required /></label><label><span>Client email</span><input name="clientEmail" type="email" defaultValue={editingInvoice?.client_email ?? ""} required /></label><label><span>Client address</span><textarea name="clientAddress" rows={3} defaultValue={editingInvoice?.client_address ?? ""} /></label><label><span>Yacht / project</span><input name="vesselName" defaultValue={editingInvoice?.vessel_name ?? ""} /></label><label><span>Issue date</span><input name="issueDate" type="date" defaultValue={editingInvoice?.issue_date ?? today()} required /></label><label><span>Due date</span><input name="dueDate" type="date" defaultValue={editingInvoice?.due_date ?? futureDate(14)} required /></label><label><span>Currency</span><select name="currency" value={invoiceCurrency} onChange={(event) => setInvoiceCurrency(event.target.value)}><option>USD</option><option>EUR</option><option>GBP</option><option>INR</option></select></label><label><span>Tax / GST / VAT %</span><input name="taxRate" type="number" min="0" max="30" step="0.01" defaultValue={editingInvoice ? (editingInvoice.tax_rate_bps / 100).toFixed(2) : "20"} /></label></div><div className="admin-line-items"><div className="admin-line-head"><span>Line items</span><button type="button" onClick={() => setItems([...items, { description: "", quantity: "1", unit: "0.00" }])}>Add item</button></div>{items.map((item, index) => <div className="admin-line-item" key={index}><input aria-label={`Item ${index + 1} description`} placeholder="Service description" value={item.description} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, description: event.target.value } : entry))} required /><input aria-label={`Item ${index + 1} quantity`} type="number" min="0.01" step="0.01" value={item.quantity} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, quantity: event.target.value } : entry))} required /><input aria-label={`Item ${index + 1} unit price`} type="number" min="0" step="0.01" value={item.unit} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, unit: event.target.value } : entry))} required />{items.length > 1 && <button type="button" aria-label={`Remove item ${index + 1}`} onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}>×</button>}</div>)}</div><label><span>Notes / payment instructions</span><textarea name="notes" rows={3} defaultValue={editingInvoice?.notes ?? ""} placeholder="Bank details, scope note, or payment terms…" /></label><div className="admin-invoice-total"><span>Subtotal before tax</span><strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: invoiceCurrency }).format(itemSubtotal)}</strong></div><div className="admin-form-actions"><button type="button" onClick={() => { setShowInvoice(false); setEditingInvoice(null); }}>Cancel</button><button className="admin-primary" disabled={busy} type="submit">{busy ? "Saving…" : editingInvoice ? "Save and open invoice" : "Create and open invoice"}</button></div></form></section></div>}

    {deletingInvoice && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDeletingInvoice(null)}><section className="admin-modal admin-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-invoice-title"><button className="admin-modal-close" onClick={() => setDeletingInvoice(null)} aria-label="Close delete confirmation">×</button><p className="admin-eyebrow">Restricted archive</p><h2 id="delete-invoice-title">Delete {deletingInvoice.invoice_number}</h2><p>This void invoice will disappear from normal admin accounts. Its full record and your mandatory remark remain available to superadmins.</p><form className="admin-edit-form" onSubmit={deleteVoidInvoice}><label><span>Deletion remark</span><textarea name="remark" minLength={5} rows={4} required placeholder="Explain why this void invoice is being removed from the working list." /></label><div className="admin-form-actions"><button type="button" onClick={() => setDeletingInvoice(null)}>Cancel</button><button className="admin-danger" disabled={busy} type="submit">{busy ? "Deleting…" : "Delete to archive"}</button></div></form></section></div>}

    {showExpense && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setShowExpense(false); setEditingExpense(null); } }}><section className="admin-modal admin-expense-modal" role="dialog" aria-modal="true" aria-labelledby="expense-title"><button className="admin-modal-close" onClick={() => { setShowExpense(false); setEditingExpense(null); }} aria-label="Close expense form">×</button><p className="admin-eyebrow">Accounts and GST register</p><h2 id="expense-title">{editingExpense ? "Edit expense" : "Record an expense"}</h2><form key={editingExpense?.id ?? "new-expense"} className="admin-invoice-form" onSubmit={saveExpense}><div className="admin-form-grid"><label><span>Expense date</span><input name="expenseDate" type="date" defaultValue={editingExpense?.expense_date ?? today()} required /></label><label><span>Vendor name</span><input name="vendorName" defaultValue={editingExpense?.vendor_name ?? ""} required /></label><label><span>Vendor GSTIN</span><input name="vendorGstin" defaultValue={editingExpense?.vendor_gstin ?? ""} maxLength={20} /></label><label><span>Category</span><select name="category" defaultValue={editingExpense?.category ?? "software"}>{expenseCategories.map((category) => <option key={category} value={category}>{pretty(category)}</option>)}</select></label><label><span>Invoice / reference number</span><input name="referenceNumber" defaultValue={editingExpense?.reference_number ?? ""} /></label><label><span>Payment method</span><input name="paymentMethod" defaultValue={editingExpense?.payment_method ?? ""} placeholder="Bank transfer, card, UPI or cash" /></label><label><span>Currency</span><select name="currency" defaultValue={editingExpense?.currency ?? "INR"}><option>INR</option><option>USD</option><option>EUR</option><option>GBP</option></select></label><label><span>Taxable amount</span><input name="subtotal" type="number" min="0" step="0.01" defaultValue={editingExpense ? (editingExpense.subtotal_cents / 100).toFixed(2) : "0.00"} required /></label><label><span>GST rate %</span><input name="gstRate" type="number" min="0" max="30" step="0.01" defaultValue={editingExpense ? (editingExpense.gst_rate_bps / 100).toFixed(2) : "18.00"} required /></label></div><label><span>Description</span><input name="description" defaultValue={editingExpense?.description ?? ""} placeholder="Business purpose or purchased service" /></label><label><span>Accounts notes</span><textarea name="notes" rows={3} defaultValue={editingExpense?.notes ?? ""} placeholder="Supporting details for bookkeeping or returns" /></label><div className="admin-form-actions"><button type="button" onClick={() => { setShowExpense(false); setEditingExpense(null); }}>Cancel</button><button className="admin-primary" disabled={busy} type="submit">{busy ? "Saving…" : "Save expense"}</button></div></form></section></div>}
  </div>;
}
