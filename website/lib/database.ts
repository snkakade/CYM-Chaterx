import { env } from "cloudflare:workers";
import { schemaStatements } from "@/db/schema";

let schemaReady = false;

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
