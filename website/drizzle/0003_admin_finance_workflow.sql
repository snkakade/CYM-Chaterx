ALTER TABLE invoices ADD COLUMN deleted_at TEXT;
ALTER TABLE invoices ADD COLUMN deletion_remark TEXT NOT NULL DEFAULT '';
ALTER TABLE invoices ADD COLUMN deleted_by TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_invoices_deleted_at ON invoices(deleted_at);
UPDATE invoices SET status = 'received' WHERE status = 'paid';

ALTER TABLE audit_events ADD COLUMN ip_address TEXT NOT NULL DEFAULT '';
ALTER TABLE audit_events ADD COLUMN device TEXT NOT NULL DEFAULT '';
ALTER TABLE audit_events ADD COLUMN location TEXT NOT NULL DEFAULT '';
ALTER TABLE audit_events ADD COLUMN user_agent TEXT NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  expense_date TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  vendor_gstin TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  reference_number TEXT NOT NULL DEFAULT '',
  currency TEXT NOT NULL DEFAULT 'INR',
  subtotal_cents INTEGER NOT NULL,
  gst_rate_bps INTEGER NOT NULL DEFAULT 0,
  gst_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL,
  payment_method TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category, expense_date DESC);

PRAGMA optimize;
