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
  assert.match(html, /og:image/);
  assert.match(html, /twitter:card/);
  assert.match(html, /rel="canonical"/);
  assert.equal((html.match(/data-google-tag="G-G01ETXS1PF"/g) ?? []).length, 1);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-G01ETXS1PF/);
  assert.match(html, /G-G01ETXS1PF/);
  assert.match(html, /gtag\('consent', 'default'/);
  assert.match(html, /analytics_storage: charterxConsent === 'accepted' \? 'granted' : 'denied'/);
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
