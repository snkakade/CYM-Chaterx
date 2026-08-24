ALTER TABLE leads ADD COLUMN estimated_value_cents INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN probability INTEGER NOT NULL DEFAULT 20;
ALTER TABLE leads ADD COLUMN next_action TEXT NOT NULL DEFAULT '';
ALTER TABLE leads ADD COLUMN lost_reason TEXT NOT NULL DEFAULT '';
ALTER TABLE leads ADD COLUMN last_contact_at TEXT;

CREATE INDEX IF NOT EXISTS idx_leads_attention
ON leads(priority, status, follow_up_at);

PRAGMA optimize;
