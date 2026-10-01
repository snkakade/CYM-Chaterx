import { env } from "cloudflare:workers";
import { schemaStatements } from "@/db/schema";

let schemaReady = false;

const leadIntelligenceColumns = [
  ["estimated_value_cents", "INTEGER NOT NULL DEFAULT 0"],
  ["probability", "INTEGER NOT NULL DEFAULT 20"],
  ["next_action", "TEXT NOT NULL DEFAULT ''"],
  ["lost_reason", "TEXT NOT NULL DEFAULT ''"],
  ["last_contact_at", "TEXT"],
] as const;

const invoiceLifecycleColumns = [
  ["deleted_at", "TEXT"],
  ["deletion_remark", "TEXT NOT NULL DEFAULT ''"],
  ["deleted_by", "TEXT NOT NULL DEFAULT ''"],
] as const;

const auditContextColumns = [
  ["ip_address", "TEXT NOT NULL DEFAULT ''"],
  ["device", "TEXT NOT NULL DEFAULT ''"],
  ["location", "TEXT NOT NULL DEFAULT ''"],
  ["user_agent", "TEXT NOT NULL DEFAULT ''"],
] as const;

type CharterXEnv = {
  DB?: D1Database;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD_HASH?: string;
  SUPERADMIN_EMAIL?: string;
  SUPERADMIN_PASSWORD_HASH?: string;
  SESSION_SECRET?: string;
};

export function getRuntimeEnv(): CharterXEnv {
  return env as unknown as CharterXEnv;
}

export async function getDatabase(): Promise<D1Database> {
  const database = getRuntimeEnv().DB;
  if (!database) throw new Error("The CharterX database binding is not configured.");

  if (!schemaReady) {
    await database.batch(schemaStatements.map((statement) => database.prepare(statement)));
    const [leadColumns, invoiceColumns, auditColumns] = await Promise.all([
      database.prepare("PRAGMA table_info(leads)").all<{ name: string }>(),
      database.prepare("PRAGMA table_info(invoices)").all<{ name: string }>(),
      database.prepare("PRAGMA table_info(audit_events)").all<{ name: string }>(),
    ]);
    const additions = [
      ...leadIntelligenceColumns.filter(([name]) => !new Set(leadColumns.results.map((column: { name: string }) => column.name)).has(name)).map(([name, definition]) => database.prepare(`ALTER TABLE leads ADD COLUMN ${name} ${definition}`)),
      ...invoiceLifecycleColumns.filter(([name]) => !new Set(invoiceColumns.results.map((column: { name: string }) => column.name)).has(name)).map(([name, definition]) => database.prepare(`ALTER TABLE invoices ADD COLUMN ${name} ${definition}`)),
      ...auditContextColumns.filter(([name]) => !new Set(auditColumns.results.map((column: { name: string }) => column.name)).has(name)).map(([name, definition]) => database.prepare(`ALTER TABLE audit_events ADD COLUMN ${name} ${definition}`)),
    ];
    if (additions.length) await database.batch(additions);
    await database.prepare(
      "CREATE INDEX IF NOT EXISTS idx_leads_attention ON leads(priority, status, follow_up_at)",
    ).run();
    await database.prepare("CREATE INDEX IF NOT EXISTS idx_invoices_deleted_at ON invoices(deleted_at)").run();
    await database.prepare("UPDATE invoices SET status = 'received' WHERE status = 'paid'").run();
    await database.prepare("PRAGMA optimize").run();
    schemaReady = true;
  }

  return database;
}

export async function recordAudit(
  actorEmail: string,
  action: string,
  entityType: string,
  entityId = "",
  detail = "",
  context: { ipAddress?: string; device?: string; location?: string; userAgent?: string } = {},
) {
  const database = await getDatabase();
  await database.prepare(
    `INSERT INTO audit_events(id, created_at, actor_email, action, entity_type, entity_id, detail, ip_address, device, location, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(crypto.randomUUID(), new Date().toISOString(), actorEmail, action, entityType, entityId, detail.slice(0, 500), context.ipAddress?.slice(0, 80) ?? "", context.device?.slice(0, 160) ?? "", context.location?.slice(0, 200) ?? "", context.userAgent?.slice(0, 500) ?? "").run();
}
