import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished CharterX homepage", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /More bookings/);
  assert.match(html, /Less drift/);
  assert.match(html, /Check your growth score/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Collaborative Yacht Management Limited/);
  assert.match(html, /Designed by Shreyash K/);
  assert.match(html, /href="https:\/\/shreyashkakade\.com\/websites"/);
  assert.match(html, /og:image/);
  assert.match(html, /twitter:card/);
  assert.match(html, /rel="canonical"/);
  assert.equal((html.match(/data-google-tag="G-G01ETXS1PF"/g) ?? []).length, 1);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-G01ETXS1PF/);
  assert.match(html, /G-G01ETXS1PF/);
  assert.match(html, /gtag\('consent', 'default'/);
  assert.match(html, /analytics_storage: charterxConsent === 'accepted' \? 'granted' : 'denied'/);
  assert.match(html, /charterx-sailing-hero-uhd\.mp4/);
  assert.match(html, /charterx-sunset-yacht\.webp/);
  assert.match(html, /charterx-yacht-deck\.webp/);
  assert.match(html, /Loading CharterX/);
  assert.match(html, /WhatsApp or request a callback/);
  assert.match(html, /data-open-concierge/);
  assert.match(html, /href="\/admin\/login"[^>]*>Admin login/);
  assert.doesNotMatch(html, /ambient-video-toggle|film-status|Pause film|Play film/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("admin login and commercial CRM intelligence are production-wired", async () => {
  const login = await readFile(new URL("../components/AdminLogin.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/admin/layout.tsx", import.meta.url), "utf8");
  const dashboard = await readFile(new URL("../components/AdminDashboard.tsx", import.meta.url), "utf8");
  const wordmark = await readFile(new URL("../components/CharterXWordmark.tsx", import.meta.url), "utf8");
  const invoice = await readFile(new URL("../app/admin/invoices/[id]/page.tsx", import.meta.url), "utf8");
  const adminData = await readFile(new URL("../lib/admin-data.ts", import.meta.url), "utf8");
  const migration = await readFile(new URL("../drizzle/0002_admin_crm_intelligence.sql", import.meta.url), "utf8");
  assert.match(login, /Private operations portal/);
  assert.match(login, /Sign in securely/);
  assert.match(layout, /index: false/);
  assert.match(dashboard, /What needs a move now/);
  assert.match(dashboard, /Weighted pipeline/);
  assert.match(dashboard, /Next best action/);
  assert.match(dashboard, /Message me on WhatsApp|wa\.me/);
  assert.match(dashboard, /useState\("USD"\)/);
  assert.match(dashboard, /Estimated value \(USD\)/);
  assert.match(dashboard, /<option>USD<\/option><option>EUR<\/option><option>GBP<\/option>/);
  assert.match(login, /CharterXWordmark/);
  assert.match(dashboard, /CharterXWordmark/);
  assert.match(wordmark, /charterx-wordmark__line/);
  assert.match(invoice, /CharterXWordmark/);
  assert.match(invoice, /connect@cymcharterx\.com/);
  assert.match(invoice, /Collaborative Yacht Management Limited/);
  assert.match(adminData, /weightedPipeline/);
  assert.match(adminData, /estimated_value_cents/);
  assert.match(migration, /idx_leads_attention/);
});

test("contact concierge is restrained, accessible, and connected to the lead pipeline", async () => {
  const widget = await readFile(new URL("../components/ConnectConcierge.tsx", import.meta.url), "utf8");
  const leads = await readFile(new URL("../app/api/leads/route.ts", import.meta.url), "utf8");
  const consent = await readFile(new URL("../components/CookieConsent.tsx", import.meta.url), "utf8");

  assert.match(widget, /window\.scrollY > 480/);
  assert.match(widget, /window\.sessionStorage\.setItem\(SHOWN_KEY, "yes"\)/);
  assert.match(widget, /document\.querySelector\("\.cookie-consent"\)/);
  assert.match(widget, /aria-expanded=\{open\}/);
  assert.match(widget, /input:not\(\[tabindex=/);
  assert.match(widget, /`concierge-\$\{view\}`/);
  assert.match(widget, /10 minutes during staffed hours/);
  assert.match(widget, /NEXT_PUBLIC_WHATSAPP_NUMBER|whatsappNumber/);
  assert.match(leads, /concierge-whatsapp/);
  assert.match(consent, /charterx:consent-set/);
});

test("all primary pages return branded HTML with one page heading", async () => {
  const worker = await createWorker();
  const routes = ["/services", "/ota-management", "/revenue-growth", "/digital-marketing", "/about", "/insights", "/contact"];

  for (const route of routes) {
    const response = await render(worker, route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /CharterX/, route);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, route);
    assert.match(html, /name="description"/, route);
    assert.match(html, /property="og:title"/, route);
    assert.match(html, /name="twitter:card"/, route);
    assert.match(html, /hero-media-caption/, route);
    assert.match(html, /ambient-video/, route);
    assert.match(html, /\/videos\/charterx-[^"]+\.mp4/, route);
    assert.doesNotMatch(html, /ambient-video-toggle|Pause[^<]*film|Play[^<]*film/, route);
    assert.match(html, /Built ashore · Working worldwide/, route);
  }
});

test("OTA page includes accessible FAQ controls and FAQ schema", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/ota-management");
  const html = await response.text();
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /aria-hidden="true"/);
  assert.match(html, /FAQPage/);
  assert.match(html, /What is yacht OTA management\?/);
  assert.match(html, /charterx-city-yacht-uhd\.mp4/);
});

test("About page uses the dedicated marina hero film", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/about");
  const html = await response.text();
  assert.match(html, /charterx-marina-uhd\.mp4/);
  assert.match(html, /charterx-yacht-deck\.webp/);
});

test("Revenue Growth page uses the sailing hero film", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/revenue-growth");
  const html = await response.text();
  assert.match(html, /charterx-sailing-hero-uhd\.mp4/);
});

test("Privacy policy is published and linked from the footer", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/privacy");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Privacy Policy/);
  assert.match(html, /Information we collect/);
  assert.match(html, /Cookie Preferences/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});

test("navigation uses resilient document links", async () => {
  const files = ["Header.tsx", "Footer.tsx", "Logo.tsx", "ButtonLink.tsx", "ServiceCard.tsx", "InsightCard.tsx"];

  for (const file of files) {
    const source = await readFile(new URL(`../components/${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /from ["']next\/link["']/, file);
  }

  const header = await readFile(new URL("../components/Header.tsx", import.meta.url), "utf8");
  assert.match(header, /href=\{link\.href\}/);
  assert.match(header, /href="\/contact#enquiry-form"/);
});

test("anchor CTAs align padded sections below the fixed header", async () => {
  const motion = await readFile(new URL("../components/MotionProvider.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(motion, /target\.matches\("section"\)/);
  assert.match(motion, /targetStyles\.paddingTop/);
  assert.match(motion, /new URL\(anchor\.href, window\.location\.href\)/);
  assert.match(motion, /document\.fonts\?\.ready/);
  assert.match(styles, /scroll-padding-top: 7rem/);
});

test("growth score carries diagnostic answers into the enquiry form", async () => {
  const score = await readFile(new URL("../components/YachtGrowthScore.tsx", import.meta.url), "utf8");
  const form = await readFile(new URL("../components/ContactForm.tsx", import.meta.url), "utf8");
  const footer = await readFile(new URL("../components/Footer.tsx", import.meta.url), "utf8");

  assert.match(score, /sessionStorage\.setItem\(GROWTH_SCORE_STORAGE_KEY/);
  assert.match(score, /\/contact\?source=growth-score#enquiry-form/);
  assert.match(form, /sessionStorage\.getItem\(GROWTH_SCORE_STORAGE_KEY/);
  assert.match(form, /formatGrowthScoreNotes\(payload\)/);
  assert.match(footer, /One commercial system for a yacht business that moves with purpose\./);
});
