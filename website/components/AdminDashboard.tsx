"use client";

import { FormEvent, useMemo, useState } from "react";
import type { AuditRecord, InvoiceLineItem, InvoiceRecord, LeadRecord } from "@/lib/admin-data";
import { ArrowIcon } from "./ArrowIcon";

type DashboardData = {
  leads: LeadRecord[];
  invoices: InvoiceRecord[];
  activity: AuditRecord[];
  metrics: { newLeads: number; activePipeline: number; followUpsDue: number; outstandingInvoices: number; paidThisMonth: number };
};

const leadStages = ["new", "contacted", "qualified", "proposal", "won", "lost"];
const invoiceStages = ["draft", "sent", "paid", "overdue", "void"];
const today = () => new Date().toISOString().slice(0, 10);
const futureDate = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
const pretty = (value: string) => value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "Not set";
const money = (cents: number, currency: string) => new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(cents / 100);

export function AdminDashboard({ data, adminEmail }: { data: DashboardData; adminEmail: string }) {
  const [view, setView] = useState<"overview" | "leads" | "invoices">("overview");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState<Array<{ description: string; quantity: string; unit: string }>>([{ description: "Yacht growth management services", quantity: "1", unit: "0.00" }]);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? data.leads.filter((lead) => [lead.name, lead.email, lead.vessel_type, lead.location, lead.challenge].some((value) => value.toLowerCase().includes(query))) : data.leads;
  }, [data.leads, search]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  async function saveLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedLead) return;
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/leads/${selectedLead.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: form.get("status"), priority: form.get("priority"), followUpAt: form.get("followUpAt"), internalNotes: form.get("internalNotes") }),
    });
    setBusy(false);
    if (!response.ok) return setToast("The lead could not be updated.");
    setToast("Lead record updated.");
    setSelectedLead(null);
    window.setTimeout(() => window.location.reload(), 450);
  }

  async function createInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const invoiceItems: InvoiceLineItem[] = items.map((item) => ({ description: item.description, quantity: Number(item.quantity), unitCents: Math.round(Number(item.unit) * 100) }));
    const response = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        clientName: form.get("clientName"), clientEmail: form.get("clientEmail"), clientAddress: form.get("clientAddress"), vesselName: form.get("vesselName"),
        currency: form.get("currency"), issueDate: form.get("issueDate"), dueDate: form.get("dueDate"), taxRateBps: Math.round(Number(form.get("taxRate")) * 100),
        notes: form.get("notes"), leadId: form.get("leadId"), items: invoiceItems,
      }),
    });
    const result = await response.json() as { error?: string; invoiceNumber?: string };
    setBusy(false);
    if (!response.ok) return setToast(result.error || "The invoice could not be created.");
    setToast(`${result.invoiceNumber} created as a draft.`);
    setShowInvoice(false);
    window.setTimeout(() => window.location.reload(), 650);
  }

  async function changeInvoiceStatus(invoice: InvoiceRecord, status: string) {
    const response = await fetch(`/api/admin/invoices/${invoice.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) return setToast("Invoice status could not be changed.");
    setToast(`${invoice.invoice_number} marked ${status}.`);
    window.setTimeout(() => window.location.reload(), 500);
  }

  function invoiceForLead(lead: LeadRecord) {
    setSelectedLead(null);
    setShowInvoice(true);
    window.setTimeout(() => {
      const form = document.querySelector<HTMLFormElement>("#invoice-form");
      if (!form) return;
      (form.elements.namedItem("clientName") as HTMLInputElement).value = lead.name;
      (form.elements.namedItem("clientEmail") as HTMLInputElement).value = lead.email;
      (form.elements.namedItem("vesselName") as HTMLInputElement).value = lead.vessel_type;
      (form.elements.namedItem("leadId") as HTMLInputElement).value = lead.id;
    });
  }

  const itemSubtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit) || 0), 0);

  return (
    <div className="admin-dashboard admin-page">
      <aside className="admin-sidebar">
        <a className="admin-wordmark" href="/admin"><span>CharterX</span><small>CYM Operations</small></a>
        <nav aria-label="Admin navigation">
          {(["overview", "leads", "invoices"] as const).map((item) => <button className={view === item ? "is-active" : ""} key={item} onClick={() => setView(item)}><i aria-hidden="true" />{pretty(item)}</button>)}
        </nav>
        <div className="admin-sidebar-foot"><span>{adminEmail}</span><button onClick={logout}>Sign out</button><a href="/" target="_blank" rel="noreferrer">View website <ArrowIcon /></a></div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar"><div><p>Private command centre</p><h1>{view === "overview" ? "Commercial overview" : view === "leads" ? "Lead pipeline" : "Invoices"}</h1></div><div><span className="admin-live"><i /> Live</span><button className="admin-primary" onClick={() => setShowInvoice(true)}>+ New invoice</button></div></header>

        {toast && <div className="admin-toast" role="status">{toast}<button aria-label="Dismiss notification" onClick={() => setToast("")}>×</button></div>}

        {view === "overview" && <>
          <section className="admin-metrics" aria-label="Business metrics">
            {[ ["New enquiries", data.metrics.newLeads, "Awaiting first response"], ["Active pipeline", data.metrics.activePipeline, "Contacted through proposal"], ["Follow-ups due", data.metrics.followUpsDue, "Due now or overdue"], ["Outstanding invoices", data.metrics.outstandingInvoices, `${data.metrics.paidThisMonth} paid this month`] ].map(([label, value, note], index) => <article key={String(label)}><span>0{index + 1}</span><p>{label}</p><strong>{value}</strong><small>{note}</small></article>)}
          </section>
          <div className="admin-overview-grid">
            <section className="admin-panel"><div className="admin-panel-head"><div><p>Enquiry desk</p><h2>Latest leads</h2></div><button onClick={() => setView("leads")}>View all</button></div><div className="admin-compact-list">{data.leads.slice(0, 6).map((lead) => <button key={lead.id} onClick={() => setSelectedLead(lead)}><span className={`admin-status status-${lead.status}`}>{pretty(lead.status)}</span><strong>{lead.name}</strong><small>{lead.vessel_type} · {lead.location}</small><time>{date(lead.created_at)}</time></button>)}{!data.leads.length && <p className="admin-empty">New website enquiries will appear here.</p>}</div></section>
            <section className="admin-panel"><div className="admin-panel-head"><div><p>Operating log</p><h2>Recent activity</h2></div></div><div className="admin-activity">{data.activity.slice(0, 8).map((event) => <div key={event.id}><i /><p><strong>{pretty(event.action)}</strong><span>{event.detail || event.entity_type}</span></p><time>{date(event.created_at)}</time></div>)}{!data.activity.length && <p className="admin-empty">Secure actions will be recorded here.</p>}</div></section>
          </div>
        </>}

        {view === "leads" && <section className="admin-panel admin-table-panel"><div className="admin-panel-head"><div><p>Website enquiries</p><h2>{filteredLeads.length} lead{filteredLeads.length === 1 ? "" : "s"}</h2></div><div className="admin-tools"><input aria-label="Search leads" placeholder="Search name, yacht, market…" value={search} onChange={(event) => setSearch(event.target.value)} /><a href="/api/admin/export?type=leads">Export CSV</a></div></div><div className="admin-table-scroll"><table><thead><tr><th>Received</th><th>Contact</th><th>Vessel / market</th><th>Challenge</th><th>Status</th><th>Follow-up</th><th /></tr></thead><tbody>{filteredLeads.map((lead) => <tr key={lead.id}><td>{date(lead.created_at)}</td><td><strong>{lead.name}</strong><span>{lead.email}</span></td><td><strong>{lead.vessel_type}</strong><span>{lead.location}</span></td><td>{lead.challenge}</td><td><span className={`admin-status status-${lead.status}`}>{pretty(lead.status)}</span></td><td>{date(lead.follow_up_at)}</td><td><button onClick={() => setSelectedLead(lead)}>Open</button></td></tr>)}</tbody></table></div>{!filteredLeads.length && <p className="admin-empty">No leads match this view.</p>}</section>}

        {view === "invoices" && <section className="admin-panel admin-table-panel"><div className="admin-panel-head"><div><p>CYM CharterX billing</p><h2>{data.invoices.length} invoice{data.invoices.length === 1 ? "" : "s"}</h2></div><div className="admin-tools"><a href="/api/admin/export?type=invoices">Export CSV</a><button className="admin-primary" onClick={() => setShowInvoice(true)}>+ New invoice</button></div></div><div className="admin-table-scroll"><table><thead><tr><th>Invoice</th><th>Client</th><th>Dates</th><th>Total</th><th>Status</th><th /></tr></thead><tbody>{data.invoices.map((invoice) => <tr key={invoice.id}><td><strong>{invoice.invoice_number}</strong><span>{invoice.vessel_name || "Commercial services"}</span></td><td><strong>{invoice.client_name}</strong><span>{invoice.client_email}</span></td><td><strong>{date(invoice.issue_date)}</strong><span>Due {date(invoice.due_date)}</span></td><td><strong>{money(invoice.total_cents, invoice.currency)}</strong><span>{invoice.currency}</span></td><td><select aria-label={`Status for ${invoice.invoice_number}`} value={invoice.status} onChange={(event) => changeInvoiceStatus(invoice, event.target.value)}>{invoiceStages.map((status) => <option key={status} value={status}>{pretty(status)}</option>)}</select></td><td><a href={`/admin/invoices/${invoice.id}`} target="_blank" rel="noreferrer">Open</a></td></tr>)}</tbody></table></div>{!data.invoices.length && <p className="admin-empty">Create the first CYM CharterX invoice.</p>}</section>}
      </main>

      {selectedLead && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedLead(null)}><section className="admin-modal admin-lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-title"><button className="admin-modal-close" onClick={() => setSelectedLead(null)} aria-label="Close lead">×</button><p className="admin-eyebrow">Lead record · {date(selectedLead.created_at)}</p><h2 id="lead-title">{selectedLead.name}</h2><div className="admin-contact-strip"><a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a>{selectedLead.phone && <a href={`tel:${selectedLead.phone}`}>{selectedLead.phone}</a>}</div><dl><div><dt>Vessel</dt><dd>{selectedLead.vessel_type}</dd></div><div><dt>Market</dt><dd>{selectedLead.location}</dd></div><div><dt>Challenge</dt><dd>{selectedLead.challenge}</dd></div><div><dt>Booking platforms</dt><dd>{selectedLead.platforms || "Not supplied"}</dd></div><div><dt>Website</dt><dd>{selectedLead.website || "Not supplied"}</dd></div><div><dt>Monthly goal</dt><dd>{selectedLead.monthly_goal || "Not supplied"}</dd></div></dl><div className="admin-lead-message"><span>Enquiry</span><p>{selectedLead.message}</p></div><form className="admin-edit-form" onSubmit={saveLead}><div><label><span>Stage</span><select name="status" defaultValue={selectedLead.status}>{leadStages.map((stage) => <option value={stage} key={stage}>{pretty(stage)}</option>)}</select></label><label><span>Priority</span><select name="priority" defaultValue={selectedLead.priority}><option value="normal">Normal</option><option value="high">High</option></select></label><label><span>Follow-up</span><input name="followUpAt" type="datetime-local" defaultValue={selectedLead.follow_up_at?.slice(0, 16) ?? ""} /></label></div><label><span>Internal notes</span><textarea name="internalNotes" rows={4} defaultValue={selectedLead.internal_notes} placeholder="Call notes, objections, next action…" /></label><div className="admin-form-actions"><button type="button" onClick={() => invoiceForLead(selectedLead)}>Create invoice</button><button className="admin-primary" disabled={busy} type="submit">{busy ? "Saving…" : "Save lead"}</button></div></form></section></div>}

      {showInvoice && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowInvoice(false)}><section className="admin-modal admin-invoice-modal" role="dialog" aria-modal="true" aria-labelledby="invoice-title"><button className="admin-modal-close" onClick={() => setShowInvoice(false)} aria-label="Close invoice form">×</button><p className="admin-eyebrow">CYM CharterX billing</p><h2 id="invoice-title">Create an invoice</h2><form id="invoice-form" className="admin-invoice-form" onSubmit={createInvoice}><input name="leadId" type="hidden" /><div className="admin-form-grid"><label><span>Client name</span><input name="clientName" required /></label><label><span>Client email</span><input name="clientEmail" type="email" required /></label><label><span>Client address</span><textarea name="clientAddress" rows={3} /></label><label><span>Yacht / project</span><input name="vesselName" /></label><label><span>Issue date</span><input name="issueDate" type="date" defaultValue={today()} required /></label><label><span>Due date</span><input name="dueDate" type="date" defaultValue={futureDate(14)} required /></label><label><span>Currency</span><select name="currency" defaultValue="GBP"><option>GBP</option><option>EUR</option><option>USD</option></select></label><label><span>Tax / VAT %</span><input name="taxRate" type="number" min="0" max="30" step="0.01" defaultValue="20" /></label></div><div className="admin-line-items"><div className="admin-line-head"><span>Line items</span><button type="button" onClick={() => setItems([...items, { description: "", quantity: "1", unit: "0.00" }])}>+ Add item</button></div>{items.map((item, index) => <div className="admin-line-item" key={index}><input aria-label={`Item ${index + 1} description`} placeholder="Service description" value={item.description} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, description: event.target.value } : entry))} required /><input aria-label={`Item ${index + 1} quantity`} type="number" min="0.01" step="0.01" value={item.quantity} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, quantity: event.target.value } : entry))} required /><input aria-label={`Item ${index + 1} unit price`} type="number" min="0" step="0.01" value={item.unit} onChange={(event) => setItems(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, unit: event.target.value } : entry))} required />{items.length > 1 && <button type="button" aria-label={`Remove item ${index + 1}`} onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}>×</button>}</div>)}</div><label><span>Notes / payment instructions</span><textarea name="notes" rows={3} placeholder="Bank details, scope note, or payment terms…" /></label><div className="admin-invoice-total"><span>Subtotal before tax</span><strong>£{itemSubtotal.toFixed(2)}</strong></div><div className="admin-form-actions"><button type="button" onClick={() => setShowInvoice(false)}>Cancel</button><button className="admin-primary" disabled={busy} type="submit">{busy ? "Creating…" : "Create draft invoice"}</button></div></form></section></div>}
    </div>
  );
}
