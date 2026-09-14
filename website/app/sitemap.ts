import type { MetadataRoute } from "next";
import { insights } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cymcharterx.com";
  const routes = ["", "/services", "/ota-management", "/revenue-growth", "/digital-marketing", "/sales-support", "/about", "/insights", "/contact", "/yacht-growth-score", "/privacy"];
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/services" ? 0.9 : 0.8 })),
    ...insights.map((insight) => ({ url: `${base}/insights/${insight.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
