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

type CharterXEnv = {
  DB?: D1Database;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD_HASH?: string;
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
    const columnResult = await database.prepare("PRAGMA table_info(leads)").all<{ name: string }>();
    const existingColumns = new Set(columnResult.results.map((column) => column.name));
    const additions = leadIntelligenceColumns
      .filter(([name]) => !existingColumns.has(name))
      .map(([name, definition]) => database.prepare(`ALTER TABLE leads ADD COLUMN ${name} ${definition}`));
    if (additions.length) await database.batch(additions);
    await database.prepare(
      "CREATE INDEX IF NOT EXISTS idx_leads_attention ON leads(priority, status, follow_up_at)",
    ).run();
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
) {
  const database = await getDatabase();
  await database.prepare(
    `INSERT INTO audit_events(id, created_at, actor_email, action, entity_type, entity_id, detail)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).bind(crypto.randomUUID(), new Date().toISOString(), actorEmail, action, entityType, entityId, detail.slice(0, 500)).run();
}
