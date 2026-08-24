export const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    vessel_type TEXT NOT NULL,
    location TEXT NOT NULL,
    platforms TEXT NOT NULL DEFAULT '',
    website TEXT NOT NULL DEFAULT '',
    challenge TEXT NOT NULL,
    monthly_goal TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'website',
    status TEXT NOT NULL DEFAULT 'new',
    priority TEXT NOT NULL DEFAULT 'normal',
    follow_up_at TEXT,
    internal_notes TEXT NOT NULL DEFAULT '',
    estimated_value_cents INTEGER NOT NULL DEFAULT 0,
    probability INTEGER NOT NULL DEFAULT 20,
    next_action TEXT NOT NULL DEFAULT '',
    lost_reason TEXT NOT NULL DEFAULT '',
    last_contact_at TEXT,
    ip_hash TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE INDEX IF NOT EXISTS idx_leads_status_created_at
    ON leads(status, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_follow_up_at
    ON leads(follow_up_at)
    WHERE follow_up_at IS NOT NULL`,
  `CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    invoice_number TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_address TEXT NOT NULL DEFAULT '',
    vessel_name TEXT NOT NULL DEFAULT '',
    currency TEXT NOT NULL DEFAULT 'GBP',
    subtotal_cents INTEGER NOT NULL,
    tax_rate_bps INTEGER NOT NULL DEFAULT 0,
    tax_cents INTEGER NOT NULL DEFAULT 0,
    total_cents INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    notes TEXT NOT NULL DEFAULT '',
    line_items_json TEXT NOT NULL,
    lead_id TEXT,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_invoices_status_created_at
    ON invoices(status, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_invoices_lead_id
    ON invoices(lead_id)
    WHERE lead_id IS NOT NULL`,
  `CREATE TABLE IF NOT EXISTS sequences (
    key TEXT PRIMARY KEY,
    value INTEGER NOT NULL
  )`,
  `INSERT INTO sequences(key, value) VALUES ('invoice', 1000)
    ON CONFLICT(key) DO NOTHING`,
  `CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL DEFAULT '',
    detail TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE INDEX IF NOT EXISTS idx_audit_events_created_at
    ON audit_events(created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS login_attempts (
    attempt_key TEXT PRIMARY KEY,
    failed_count INTEGER NOT NULL DEFAULT 0,
    window_started_at INTEGER NOT NULL,
    blocked_until INTEGER NOT NULL DEFAULT 0
  )`,
] as const;
