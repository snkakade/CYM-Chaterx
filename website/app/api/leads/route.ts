import { getDatabase, getRuntimeEnv } from "@/lib/database";
import { loginThrottleKey } from "@/lib/auth";

export const dynamic = "force-dynamic";

const text = (value: unknown, maximum: number) => typeof value === "string" ? value.trim().slice(0, maximum) : "";

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 24_000) return Response.json({ error: "Enquiry is too large." }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  }

  if (text(body.companyWebsite, 200)) return Response.json({ ok: true }, { status: 202 });

  const lead = {
    name: text(body.name, 120),
    email: text(body.email, 180).toLowerCase(),
    phone: text(body.phone, 80),
    vesselType: text(body.vesselType, 140),
    location: text(body.location, 140),
    platforms: text(body.platforms, 300),
    website: text(body.website, 300),
    challenge: text(body.challenge, 160),
    monthlyGoal: text(body.goal, 140),
    message: text(body.message, 5000),
    source: text(body.source, 80) || "website-contact",
  };

  const isConcierge = new Set(["concierge-message", "concierge-whatsapp", "concierge-callback"]).has(lead.source);
  const validEmail = !lead.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  const validConcierge = isConcierge && lead.name && lead.challenge && lead.message && validEmail && (lead.email || lead.phone);
  const validFullEnquiry = !isConcierge && lead.name && lead.vesselType && lead.location && lead.challenge && lead.message && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);

  if (!validConcierge && !validFullEnquiry) {
    return Response.json({ error: "Please complete the required contact details." }, { status: 422 });
  }

  if (!getRuntimeEnv().SESSION_SECRET) return Response.json({ error: "Enquiry service is not configured." }, { status: 503 });
  const database = await getDatabase();
  const ipHash = await loginThrottleKey(request, "public-lead");
  const recent = await database.prepare("SELECT created_at FROM leads WHERE ip_hash = ? ORDER BY created_at DESC LIMIT 1").bind(ipHash).first<{ created_at: string }>();
  if (recent && Date.now() - new Date(recent.created_at).getTime() < 30_000) {
    return Response.json({ error: "Please wait a moment before sending another enquiry." }, { status: 429 });
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await database.prepare(
    `INSERT INTO leads(id, created_at, updated_at, name, email, phone, vessel_type, location, platforms, website, challenge, monthly_goal, message, source, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(id, now, now, lead.name, lead.email, lead.phone, lead.vesselType, lead.location, lead.platforms, lead.website, lead.challenge, lead.monthlyGoal, lead.message, lead.source, ipHash).run();

  return Response.json({ ok: true, reference: `CX-${id.slice(0, 8).toUpperCase()}` }, { status: 201, headers: { "cache-control": "no-store" } });
}
