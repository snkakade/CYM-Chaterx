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
  assert.match(html, /Turn Your Yacht Into a/);
  assert.match(html, /High-Performing Business/);
  assert.match(html, /Yacht Growth Score/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Collabrative Yatch Managemnet Limited/);
  assert.match(html, /Designed by Shreyash K/);
  assert.match(html, /https:\/\/shreyashkakade\.com\/websites/);
  assert.match(html, /og:image/);
  assert.match(html, /twitter:card/);
  assert.match(html, /rel="canonical"/);
  assert.equal((html.match(/data-google-tag="G-G01ETXS1PF"/g) ?? []).length, 1);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-G01ETXS1PF/);
  assert.match(html, /G-G01ETXS1PF/);
  assert.match(html, /gtag\('consent', 'default'/);
  assert.match(html, /analytics_storage: charterxConsent === 'accepted' \? 'granted' : 'denied'/);
  assert.match(html, /charterx-yacht-aerial\.mp4/);
  assert.match(html, /charterx-yacht-wake\.mp4/);
  assert.match(html, /charterx-marina-hero-hq\.mp4/);
  assert.match(html, /charterx-sunset-yacht\.webp/);
  assert.match(html, /charterx-classic-yacht-detail\.webp/);
  assert.match(html, /charterx-ocean-texture\.mp4/);
  assert.match(html, /media="\(max-width: 899px\)"/);
  assert.match(html, /Live preview of the CharterX OTA Management page/);
  assert.match(html, /Replace with verified client attribution/);
  assert.match(html, /Loading CharterX/);
  assert.match(html, /hero-media-caption/);
  assert.match(html, /Built ashore · Working worldwide/);
  assert.doesNotMatch(html, /ambient-video-toggle|film-status|Pause film|Play film/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
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
    assert.match(html, /hero-(?:2k|hq)\.mp4/, route);
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
  assert.match(html, /charterx-city-yacht-hero-2k\.mp4/);
});

test("About page uses the dedicated marina hero film", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/about");
  const html = await response.text();
  assert.match(html, /charterx-marina-hero-hq\.mp4/);
  assert.match(html, /charterx-marina-mobile\.mp4/);
  assert.match(html, /charterx-yacht-deck\.webp/);
});

test("Revenue Growth page uses the sailing hero film", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/revenue-growth");
  const html = await response.text();
  assert.match(html, /charterx-sailing-hero-2k\.mp4/);
  assert.match(html, /charterx-sailing\.mp4/);
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
  assert.match(header, /href="\/contact"/);
});
