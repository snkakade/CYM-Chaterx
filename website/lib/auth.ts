import { cookies } from "next/headers";
import { pbkdf2Sync } from "node:crypto";
import { getDatabase, getRuntimeEnv, recordAudit } from "./database";

export const SESSION_COOKIE = "charterx_admin";
const SESSION_SECONDS = 60 * 60 * 8;
const encoder = new TextEncoder();

type AdminSession = {
  email: string;
  issuedAt: number;
  expiresAt: number;
};

function base64UrlEncode(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

async function hmac(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) difference |= (left[index % left.length] ?? 0) ^ (right[index % right.length] ?? 0);
  return difference === 0;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationText, saltText, expectedText] = storedHash.split("$");
  if (algorithm !== "pbkdf2_sha256") return false;
  const iterations = Number(iterationText);
  if (!Number.isInteger(iterations) || iterations < 210_000) return false;
  const salt = base64UrlDecode(saltText);
  const expected = base64UrlDecode(expectedText);
  const actual = new Uint8Array(
    pbkdf2Sync(password, salt, iterations, expected.length, "sha256"),
  );
  return constantTimeEqual(actual, expected);
}

export async function createSession(email: string) {
  const secret = getRuntimeEnv().SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters.");
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: AdminSession = { email, issuedAt, expiresAt: issuedAt + SESSION_SECONDS };
  const encoded = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const signature = base64UrlEncode(await hmac(encoded, secret));
  return `${encoded}.${signature}`;
}

export async function verifySession(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null;
  const secret = getRuntimeEnv().SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  const [encoded, signatureText] = token.split(".");
  if (!encoded || !signatureText) return null;

  try {
    const expected = await hmac(encoded, secret);
    const supplied = base64UrlDecode(signatureText);
    if (!constantTimeEqual(expected, supplied)) return null;
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encoded))) as AdminSession;
    if (!payload.email || payload.expiresAt <= Math.floor(Date.now() / 1000)) return null;
    if (payload.email.toLowerCase() !== getRuntimeEnv().ADMIN_EMAIL?.toLowerCase()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

export async function getRequestSession(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  return verifySession(token ? decodeURIComponent(token) : undefined);
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === new URL(request.url).origin);
}

export function sessionCookie(token: string, request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}${secure}`;
}

export function expiredSessionCookie(request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export async function loginThrottleKey(request: Request, email: string) {
  const secret = getRuntimeEnv().SESSION_SECRET ?? "missing-secret";
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  return base64UrlEncode(await hmac(`${ip.trim()}|${email.toLowerCase()}`, secret));
}

export async function isLoginBlocked(key: string) {
  const database = await getDatabase();
  const row = await database.prepare("SELECT blocked_until FROM login_attempts WHERE attempt_key = ?").bind(key).first<{ blocked_until: number }>();
  return Boolean(row && row.blocked_until > Date.now());
}

export async function registerLoginFailure(key: string) {
  const database = await getDatabase();
  const now = Date.now();
  const windowStart = now - 15 * 60 * 1000;
  const existing = await database.prepare("SELECT failed_count, window_started_at FROM login_attempts WHERE attempt_key = ?").bind(key).first<{ failed_count: number; window_started_at: number }>();
  const count = existing && existing.window_started_at >= windowStart ? existing.failed_count + 1 : 1;
  const blockedUntil = count >= 5 ? now + 15 * 60 * 1000 : 0;
  await database.prepare(
    `INSERT INTO login_attempts(attempt_key, failed_count, window_started_at, blocked_until)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(attempt_key) DO UPDATE SET failed_count=excluded.failed_count, window_started_at=excluded.window_started_at, blocked_until=excluded.blocked_until`,
  ).bind(key, count, existing && existing.window_started_at >= windowStart ? existing.window_started_at : now, blockedUntil).run();
}

export async function clearLoginFailures(key: string, email: string) {
  const database = await getDatabase();
  await database.prepare("DELETE FROM login_attempts WHERE attempt_key = ?").bind(key).run();
  await recordAudit(email, "signed_in", "session");
}
