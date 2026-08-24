"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { AuditRecord, InvoiceLineItem, InvoiceRecord, LeadRecord, LeadStatus } from "@/lib/admin-data";
import { ArrowIcon } from "./ArrowIcon";
import { CharterXWordmark } from "./CharterXWordmark";

type DashboardData = {
  leads: LeadRecord[];
  invoices: InvoiceRecord[];
  activity: AuditRecord[];
  metrics: {
    newLeads: number; activePipeline: number; followUpsDue: number; outstandingInvoices: number; paidThisMonth: number;
    responseQueue: number; pipelineValue: number; weightedPipeline: number; outstandingValue: number; paidThisMonthValue: number; conversionRate: number;
  };
};

type View = "overview" | "leads" | "invoices";
type LeadFilter = "all" | "attention" | "priority" | "no-followup" | "won";

const leadStages: LeadStatus[] = ["new", "contacted", "qualified", "proposal", "won", "lost"];
const invoiceStages = ["draft", "sent", "paid", "overdue", "void"];
const stageProbability: Record<LeadStatus, number> = { new: 15, contacted: 30, qualified: 55, proposal: 75, won: 100, lost: 0 };
const today = () => new Date().toISOString().slice(0, 10);
const futureDate = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
const futureDateTime = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();
const pretty = (value: string) => value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "Not set";
const dateTime = (value: string | null) => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value)) : "Not set";
const money = (cents: number, currency = "GBP") => new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(cents / 100);
const sourceLabel = (source: string) => ({
  "website-contact": "Website form", "growth-score": "Growth score", "concierge-message": "Direct message", "concierge-whatsapp": "WhatsApp", "concierge-callback": "Callback",
}[source] ?? pretty(source || "Website"));

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

export function AdminDashboard({ data, adminEmail }: { data: DashboardData; adminEmail: string }) {
  const [view, setView] = useState<View>("overview");
  const [leadFilter, setLeadFilter] = useState<LeadFilter>("all");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState<Array<{ description: string; quantity: string; unit: string }>>([{ description: "CharterX commercial growth services", quantity: "1", unit: "0.00" }]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setSelectedLead(null); setShowInvoice(false); } };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.leads.filter((lead) => !query || [lead.name, lead.email, lead.phone, lead.vessel_type, lead.location, lead.challenge, lead.source, lead.next_action].some((value) => value.toLowerCase().includes(query))).filter((lead) => {
      if (leadFilter === "attention") return isDue(lead) || lead.status === "new";
      if (leadFilter === "priority") return lead.priority === "high" && !isClosed(lead);
      if (leadFilter === "no-followup") return !lead.follow_up_at && !isClosed(lead);
      if (leadFilter === "won") return lead.status === "won";
      return true;
    });
  }, [data.leads, leadFilter, search]);

  const attentionLeads = useMemo(() => [...data.leads].filter((lead) => !isClosed(lead)).sort((left, right) => attentionScore(right) - attentionScore(left) || new Date(right.created_at).getTime() - new Date(left.created_at).getTime()).slice(0, 6), [data.leads]);
  const pipelineCounts = useMemo(() => leadStages.map((stage) => ({ stage, count: data.leads.filter((lead) => lead.status === stage).length })), [data.leads]);
  const sourceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    data.leads.forEach((lead) => counts.set(sourceLabel(lead.source), (counts.get(sourceLabel(lead.source)) ?? 0) + 1));
    return [...counts.entries()].sort((left, right) => right[1] - left[1]).slice(0, 5);
  }, [data.leads]);
  const maxPipelineCount = Math.max(...pipelineCounts.map((item) => item.count), 1);
  const maxSourceCount = Math.max(...sourceCounts.map((item) => item[1]), 1);

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.assign("/admin/login"); }

  async function saveLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedLead) return;
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/leads/${selectedLead.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({
      status: form.get("status"), priority: form.get("priority"), followUpAt: form.get("followUpAt"), lastContactAt: form.get("lastContactAt"), estimatedValueCents: Math.round(Number(form.get("estimatedValue")) * 100), probability: Number(form.get("probability")), nextAction: form.get("nextAction"), lostReason: form.get("lostReason"), internalNotes: form.get("internalNotes"),
    }) });
    const result = await response.json().catch(() => null) as { error?: string } | null;
    setBusy(false);
    if (!response.ok) return setToast(result?.error || "The lead could not be updated.");
    setToast("Lead intelligence and next action saved."); setSelectedLead(null); window.setTimeout(() => window.location.reload(), 450);
  }

  async function createInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true);
    const form = new FormData(event.currentTarget);
    const invoiceItems: InvoiceLineItem[] = items.map((item) => ({ description: item.description, quantity: Number(item.quantity), unitCents: Math.round(Number(item.unit) * 100) }));
    const response = await fetch("/api/admin/invoices", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ clientName: form.get("clientName"), clientEmail: form.get("clientEmail"), clientAddress: form.get("clientAddress"), vesselName: form.get("vesselName"), currency: form.get("currency"), issueDate: form.get("issueDate"), dueDate: form.get("dueDate"), taxRateBps: Math.round(Number(form.get("taxRate")) * 100), notes: form.get("notes"), leadId: form.get("leadId"), items: invoiceItems }) });
    const result = await response.json() as { error?: string; invoiceNumber?: string }; setBusy(false);
    if (!response.ok) return setToast(result.error || "The invoice could not be created.");
    setToast(`${result.invoiceNumber} created as a draft.`); setShowInvoice(false); window.setTimeout(() => window.location.reload(), 650);
  }

  async function changeInvoiceStatus(invoice: InvoiceRecord, status: string) {
    const response = await fetch(`/api/admin/invoices/${invoice.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) return setToast("Invoice status could not be changed.");
    setToast(`${invoice.invoice_number} marked ${status}.`); window.setTimeout(() => window.location.reload(), 500);
  }

  function invoiceForLead(lead: LeadRecord) {
    setSelectedLead(null); setShowInvoice(true);
    window.setTimeout(() => { const form = document.querySelector<HTMLFormElement>("#invoice-form"); if (!form) return; (form.elements.namedItem("clientName") as HTMLInputElement).value = lead.name; (form.elements.namedItem("clientEmail") as HTMLInputElement).value = lead.email; (form.elements.namedItem("vesselName") as HTMLInputElement).value = lead.vessel_type; (form.elements.namedItem("leadId") as HTMLInputElement).value = lead.id; });
  }
  function setFollowUp(days: number) { if (selectedLead) setSelectedLead({ ...selectedLead, follow_up_at: futureDateTime(days) }); }

  const itemSubtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit) || 0), 0);
  const metricCards = [
    ["Action queue", data.metrics.responseQueue, "New and due now", data.metrics.responseQueue ? "needs-attention" : "is-clear"],
    ["Weighted pipeline", money(data.metrics.weightedPipeline), `${money(data.metrics.pipelineValue)} gross potential`, ""],
    ["Follow-ups due", data.metrics.followUpsDue, "Protect every live conversation", data.metrics.followUpsDue ? "needs-attention" : "is-clear"],
    ["Outstanding", money(data.metrics.outstandingValue), `${data.metrics.outstandingInvoices} open invoice${data.metrics.outstandingInvoices === 1 ? "" : "s"}`, ""],
    ["Win rate", `${data.metrics.conversionRate}%`, "Won from closed opportunities", ""],
  ] as const;

  return <div className="admin-dashboard admin-page">
    <aside className="admin-sidebar">
      <a className="admin-wordmark" href="/admin"><CharterXWordmark tone="light" compact /><small>Commercial command</small></a>
      <nav aria-label="Admin navigation">{(["overview", "leads", "invoices"] as const).map((item) => <button className={view === item ? "is-active" : ""} key={item} onClick={() => setView(item)}><i aria-hidden="true" />{item === "overview" ? "Command desk" : pretty(item)}</button>)}</nav>
      <div className="admin-sidebar-signal"><span>Today’s signal</span><strong>{data.metrics.responseQueue ? `${data.metrics.responseQueue} action${data.metrics.responseQueue === 1 ? "" : "s"} waiting` : "Desk is clear"}</strong><small>{data.metrics.followUpsDue ? `${data.metrics.followUpsDue} follow-up${data.metrics.followUpsDue === 1 ? "" : "s"} overdue` : "No overdue follow-ups"}</small></div>
      <div className="admin-sidebar-foot"><span>{adminEmail}</span><button onClick={logout}>Sign out</button><a href="/" target="_blank" rel="noreferrer">View website <ArrowIcon /></a></div>
    </aside>

    <main className="admin-main">
      <header className="admin-topbar"><div><p>Private command centre · {new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</p><h1>{view === "overview" ? "Commercial command" : view === "leads" ? "Opportunity pipeline" : "Revenue desk"}</h1></div><div><span className="admin-live">Encrypted session</span><button className="admin-primary" onClick={() => setShowInvoice(true)}>New invoice</button></div></header>
      {toast && <div className="admin-toast" role="status">{toast}<button aria-label="Dismiss notification" onClick={() => setToast("")}>×</button></div>}

      {view === "overview" && <>
        <section className="admin-metrics" aria-label="Business metrics">{metricCards.map(([label, value, note, tone], index) => <article className={tone} key={label}><span>0{index + 1}</span><p>{label}</p><strong>{value}</strong><small>{note}</small></article>)}</section>
        <div className="admin-command-grid">
          <section className="admin-panel admin-focus-panel"><div className="admin-panel-head"><div><p>Priority desk</p><h2>What needs a move now</h2></div><button onClick={() => { setLeadFilter("attention"); setView("leads"); }}>Open action queue</button></div><div className="admin-focus-list">{attentionLeads.map((lead, index) => <button key={lead.id} onClick={() => setSelectedLead(lead)}><span className="admin-focus-rank">{String(index + 1).padStart(2, "0")}</span><span className="admin-focus-person"><strong>{lead.name}</strong><small>{sourceLabel(lead.source)} · {lead.vessel_type || lead.challenge}</small></span><span className="admin-focus-action"><strong>{suggestedAction(lead)}</strong><small>{isDue(lead) ? `Due ${dateTime(lead.follow_up_at)}` : lead.follow_up_at ? `Next ${dateTime(lead.follow_up_at)}` : "No follow-up set"}</small></span><span className={`admin-priority-mark ${isDue(lead) ? "is-due" : lead.priority === "high" ? "is-high" : ""}`}>{isDue(lead) ? "Due" : lead.priority === "high" ? "High" : pretty(lead.status)}</span></button>)}{!attentionLeads.length && <p className="admin-empty">The action queue is clear. New enquiries will appear here.</p>}</div></section>
          <section className="admin-panel admin-pipeline-panel"><div className="admin-panel-head"><div><p>Pipeline signal</p><h2>{money(data.metrics.weightedPipeline)} weighted</h2></div></div><div className="admin-bar-list">{pipelineCounts.map(({ stage, count }) => <div key={stage}><span>{pretty(stage)}</span><i><b style={{ width: `${Math.max(count / maxPipelineCount * 100, count ? 8 : 0)}%` }} /></i><strong>{count}</strong></div>)}</div><div className="admin-panel-insight"><span>Commercial read</span><p>{data.metrics.activePipeline ? `${data.metrics.activePipeline} opportunities are moving between first contact and proposal.` : "No active opportunities have moved beyond first response yet."}</p></div></section>
        </div>
        <div className="admin-lower-grid">
          <section className="admin-panel admin-source-panel"><div className="admin-panel-head"><div><p>Demand intelligence</p><h2>Where conversations begin</h2></div></div><div className="admin-source-list">{sourceCounts.map(([source, count]) => <div key={source}><span>{source}</span><i><b style={{ width: `${Math.max(count / maxSourceCount * 100, 7)}%` }} /></i><strong>{count}</strong></div>)}{!sourceCounts.length && <p className="admin-empty">Source patterns will appear as enquiries arrive.</p>}</div></section>
          <section className="admin-panel"><div className="admin-panel-head"><div><p>Operating log</p><h2>Recent activity</h2></div></div><div className="admin-activity">{data.activity.slice(0, 7).map((event) => <div key={event.id}><i /><p><strong>{pretty(event.action)}</strong><span>{event.detail || event.entity_type}</span></p><time>{dateTime(event.created_at)}</time></div>)}{!data.activity.length && <p className="admin-empty">Secure actions will be recorded here.</p>}</div></section>
        </div>
      </>}

      {view === "leads" && <section className="admin-panel admin-table-panel"><div className="admin-panel-head admin-lead-tools"><div><p>Opportunity intelligence</p><h2>{filteredLeads.length} visible lead{filteredLeads.length === 1 ? "" : "s"}</h2></div><div className="admin-tools"><input aria-label="Search leads" placeholder="Search contact, yacht, source or action…" value={search} onChange={(event) => setSearch(event.target.value)} /><a href="/api/admin/export?type=leads">Export intelligence</a></div></div><div className="admin-filter-row" aria-label="Lead filters">{(["all", "attention", "priority", "no-followup", "won"] as const).map((filter) => <button className={leadFilter === filter ? "is-active" : ""} key={filter} onClick={() => setLeadFilter(filter)}>{filter === "no-followup" ? "No follow-up" : pretty(filter)}</button>)}</div><div className="admin-table-scroll"><table><thead><tr><th>Contact</th><th>Opportunity</th><th>Signal</th><th>Stage</th><th>Next move</th><th /></tr></thead><tbody>{filteredLeads.map((lead) => <tr className={isDue(lead) ? "is-due" : ""} key={lead.id}><td><strong>{lead.name}</strong><span>{lead.email || lead.phone || "Contact detail missing"}</span><small>{date(lead.created_at)} · {sourceLabel(lead.source)}</small></td><td><strong>{lead.vessel_type || "Vessel not supplied"}</strong><span>{lead.location || lead.challenge}</span><small>{lead.estimated_value_cents ? money(lead.estimated_value_cents) : "Value not set"}</small></td><td><strong>{readiness(lead)}% ready</strong><span>{lead.probability}% confidence</span>{lead.priority === "high" && <small className="admin-high-copy">High priority</small>}</td><td><span className={`admin-status status-${lead.status}`}>{pretty(lead.status)}</span></td><td><strong>{suggestedAction(lead)}</strong><span>{lead.follow_up_at ? dateTime(lead.follow_up_at) : "No follow-up scheduled"}</span></td><td><button onClick={() => setSelectedLead(lead)}>Open</button></td></tr>)}</tbody></table></div>{!filteredLeads.length && <p className="admin-empty">No leads match this view.</p>}</section>}

      {view === "invoices" && <><section className="admin-revenue-strip"><article><span>Outstanding</span><strong>{money(data.metrics.outstandingValue)}</strong><small>{data.metrics.outstandingInvoices} invoice{data.metrics.outstandingInvoices === 1 ? "" : "s"}</small></article><article><span>Paid this month</span><strong>{money(data.metrics.paidThisMonthValue)}</strong><small>{data.metrics.paidThisMonth} payment{data.metrics.paidThisMonth === 1 ? "" : "s"}</small></article><article><span>Drafts</span><strong>{data.invoices.filter((invoice) => invoice.status === "draft").length}</strong><small>Awaiting issue</small></article></section><section className="admin-panel admin-table-panel"><div className="admin-panel-head"><div><p>CYM CharterX billing</p><h2>{data.invoices.length} invoice{data.invoices.length === 1 ? "" : "s"}</h2></div><div className="admin-tools"><a href="/api/admin/export?type=invoices">Export CSV</a><button className="admin-primary" onClick={() => setShowInvoice(true)}>New invoice</button></div></div><div className="admin-table-scroll"><table><thead><tr><th>Invoice</th><th>Client</th><th>Dates</th><th>Total</th><th>Status</th><th /></tr></thead><tbody>{data.invoices.map((invoice) => <tr key={invoice.id}><td><strong>{invoice.invoice_number}</strong><span>{invoice.vessel_name || "Commercial services"}</span></td><td><strong>{invoice.client_name}</strong><span>{invoice.client_email}</span></td><td><strong>{date(invoice.issue_date)}</strong><span>Due {date(invoice.due_date)}</span></td><td><strong>{money(invoice.total_cents, invoice.currency)}</strong><span>{invoice.currency}</span></td><td><select aria-label={`Status for ${invoice.invoice_number}`} value={invoice.status} onChange={(event) => changeInvoiceStatus(invoice, event.target.value)}>{invoiceStages.map((status) => <option key={status} value={status}>{pretty(status)}</option>)}</select></td><td><a href={`/admin/invoices/${invoice.id}`} target="_blank" rel="noreferrer">Open</a></td></tr>)}</tbody></table></div>{!data.invoices.length && <p className="admin-empty">Create the first CharterX invoice.</p>}</section></>}
    </main>

    {selectedLead && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedLead(null)}><section className="admin-modal admin-lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title"><button className="admin-modal-close" onClick={() => setSelectedLead(null)} aria-label="Close lead">×</button><div className="admin-lead-heading"><div><p className="admin-eyebrow">{sourceLabel(selectedLead.source)} · received {date(selectedLead.created_at)}</p><h2 id="lead-title">{selectedLead.name}</h2><p>{selectedLead.vessel_type || "Vessel not supplied"}{selectedLead.location ? ` · ${selectedLead.location}` : ""}</p></div><div className="admin-readiness"><strong>{readiness(selectedLead)}%</strong><span>Brief readiness</span></div></div><div className="admin-contact-strip">{selectedLead.email && <a href={`mailto:${selectedLead.email}`}>Email</a>}{selectedLead.phone && <a href={`tel:${selectedLead.phone}`}>Call</a>}{selectedLead.phone && <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a>}{selectedLead.website && <a href={selectedLead.website} target="_blank" rel="noreferrer">Website</a>}</div><div className="admin-intelligence-strip"><div><span>Estimated value</span><strong>{selectedLead.estimated_value_cents ? money(selectedLead.estimated_value_cents) : "Not set"}</strong></div><div><span>Confidence</span><strong>{selectedLead.probability}%</strong></div><div><span>Weighted value</span><strong>{money(Math.round(selectedLead.estimated_value_cents * selectedLead.probability / 100))}</strong></div><div><span>Last contact</span><strong>{dateTime(selectedLead.last_contact_at)}</strong></div></div><div className="admin-lead-brief"><div><span>Commercial challenge</span><p>{selectedLead.challenge || "Not supplied"}</p></div><div><span>Monthly goal</span><p>{selectedLead.monthly_goal || "Not supplied"}</p></div><div><span>Booking platforms</span><p>{selectedLead.platforms || "Not supplied"}</p></div></div><div className="admin-lead-message"><span>Original enquiry</span><p>{selectedLead.message}</p></div><form className="admin-edit-form" key={`${selectedLead.id}-${selectedLead.follow_up_at}`} onSubmit={saveLead}><div className="admin-commercial-fields"><label><span>Stage</span><select name="status" defaultValue={selectedLead.status}>{leadStages.map((stage) => <option value={stage} key={stage}>{pretty(stage)}</option>)}</select></label><label><span>Priority</span><select name="priority" defaultValue={selectedLead.priority}><option value="normal">Normal</option><option value="high">High</option></select></label><label><span>Estimated value (GBP)</span><input name="estimatedValue" type="number" min="0" step="50" defaultValue={(selectedLead.estimated_value_cents / 100).toFixed(0)} /></label><label><span>Confidence %</span><input name="probability" type="number" min="0" max="100" step="5" defaultValue={selectedLead.probability || stageProbability[selectedLead.status]} /></label><label><span>Follow-up</span><input name="followUpAt" type="datetime-local" defaultValue={selectedLead.follow_up_at?.slice(0, 16) ?? ""} /></label><label><span>Last contact</span><input name="lastContactAt" type="datetime-local" defaultValue={selectedLead.last_contact_at?.slice(0, 16) ?? ""} /></label></div><div className="admin-quick-followup"><span>Set next follow-up</span><div><button type="button" onClick={() => setFollowUp(0)}>Today</button><button type="button" onClick={() => setFollowUp(1)}>Tomorrow</button><button type="button" onClick={() => setFollowUp(3)}>In 3 days</button><button type="button" onClick={() => setFollowUp(7)}>Next week</button></div></div><label><span>Next best action</span><input name="nextAction" defaultValue={selectedLead.next_action} placeholder={suggestedAction(selectedLead)} /></label><label><span>Lost reason</span><input name="lostReason" defaultValue={selectedLead.lost_reason} placeholder="Complete only when closing an opportunity as lost" /></label><label><span>Internal notes</span><textarea name="internalNotes" rows={4} defaultValue={selectedLead.internal_notes} placeholder="Decision makers, objections, call notes and useful context…" /></label><div className="admin-form-actions"><button type="button" onClick={() => invoiceForLead(selectedLead)}>Create invoice</button><button className="admin-primary" disabled={busy} type="submit">{busy ? "Saving…" : "Save opportunity"}</button></div></form></section></div>}

    {showInvoice && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowInvoice(false)}><section className="admin-modal admin-invoice-modal" role="dialog" aria-modal="true" aria-labelledby="invoice-title"><button className="admin-modal-close" onClick={() => setShowInvoice(false)} aria-label="Close invoice form">×</button><p className="admin-eyebrow">CYM CharterX billing</p><h2 id="invoice-title">Create an invoice</h2><form id="invoice-form" className="admin-invoice-form" onSubmit={createInvoice}><input name="leadId" type="hidden" /><div className="admin-form-grid"><label><span>Client name</span><input name="clientName" required /></label><label><span>Client email</span><input name="clientEmail" type="email" required /></label><label><span>Client address</span><textarea name="clientAddress" rows={3} /></label><label><span>Yacht / project</span><input name="vesselName" /></label><label><span>Issue date</span><input name="issueDate" type="date" defaultValue={today()} required /></label><label><span>Due date</span><input name="dueDate" type="date" defaultValue={futureDate(14)} required /></label><label><span>Currency</span><select name="currency" defaultValue="GBP"><option>GBP</option><option>EUR</option><option>USD</option></select></label><label><span>Tax / VAT %</span><input name="taxRate" type="number" min="0" max="30" step="0.01" defaultValue="20" /></label></div><div className="admin-line-items"><div className="admin-line-head"><span>Line items</span><button type="button" onClick={() => setItems([...items, { description: "", quantity: "1", unit: "0.00" }])}>Add item</button></div>{items.map((item, index) => <div className="admin-line-item" key={index}><input aria-label={`Item ${index + 1} description`} placeholder="Service description" value={item.description} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, description: event.target.value } : entry))} required /><input aria-label={`Item ${index + 1} quantity`} type="number" min="0.01" step="0.01" value={item.quantity} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, quantity: event.target.value } : entry))} required /><input aria-label={`Item ${index + 1} unit price`} type="number" min="0" step="0.01" value={item.unit} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, unit: event.target.value } : entry))} required />{items.length > 1 && <button type="button" aria-label={`Remove item ${index + 1}`} onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}>×</button>}</div>)}</div><label><span>Notes / payment instructions</span><textarea name="notes" rows={3} placeholder="Bank details, scope note, or payment terms…" /></label><div className="admin-invoice-total"><span>Subtotal before tax</span><strong>£{itemSubtotal.toFixed(2)}</strong></div><div className="admin-form-actions"><button type="button" onClick={() => setShowInvoice(false)}>Cancel</button><button className="admin-primary" disabled={busy} type="submit">{busy ? "Creating…" : "Create draft invoice"}</button></div></form></section></div>}
  </div>;
}
