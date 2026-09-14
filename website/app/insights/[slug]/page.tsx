import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { FinalCTA } from "@/components/FinalCTA";
import { SectionLabel } from "@/components/SectionLabel";
import { insights } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cymcharterx.com";

/* SEO-optimised metadata per article slug */
const seoOverrides: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  "why-yacht-listings-underperform": {
    title: "Yacht Listing Optimisation: Why Listings Underperform",
    description: "Learn why yacht listings underperform and how yacht listing optimisation can improve visibility, trust and enquiry quality. Read the CharterX guide.",
    ogTitle: "Why Yacht Listings Underperform",
    ogDescription: "The listing gaps that quietly reduce visibility, confidence and enquiry conversion.",
  },
  "turn-inquiries-into-bookings": {
    title: "Yacht Enquiry Conversion: Turn Enquiries Into Bookings",
    description: "Improve yacht enquiry conversion with stronger response quality, follow-up and booking handover. Read the CharterX guide to converting more leads.",
    ogTitle: "Turning Yacht Enquiries Into Bookings",
    ogDescription: "A more considered approach to response quality, follow-up and conversion.",
  },
  "yacht-website-sales-asset": {
    title: "Yacht Website Conversion: From Brochure to Sales Asset",
    description: "Improve yacht website conversion by turning a digital brochure into a clearer sales asset. See what helps visitors become qualified enquiries.",
    ogTitle: "When a Yacht Website Becomes a Sales Asset",
    ogDescription: "What separates a polished digital brochure from a commercially effective yacht website.",
  },
  "pricing-availability-seasonality": {
    title: "Yacht Charter Pricing Strategy: Availability & Seasonality",
    description: "Build a stronger yacht charter pricing strategy around demand, availability and seasonality. Read the CharterX revenue-growth guide.",
    ogTitle: "Pricing, Availability and Yacht Revenue",
    ogDescription: "How seasonality, demand and availability should inform yacht charter pricing decisions.",
  },
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = insights.find((entry) => entry.slug === slug);
  if (!insight) return {};
  const seo = seoOverrides[slug];
  const title = seo?.title ?? insight.title;
  const description = seo?.description ?? insight.excerpt;
  const ogTitle = seo?.ogTitle ?? insight.title;
  const ogDescription = seo?.ogDescription ?? insight.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { type: "article", title: ogTitle, description: ogDescription, url: `/insights/${slug}`, images: [socialImage] },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [twitterImage] },
  };
}

export default async function InsightArticle({ params }: Props) {
  const { slug } = await params;
  const insight = insights.find((entry) => entry.slug === slug);
  if (!insight) notFound();

  const articleJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/insights/${slug}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/insights/${slug}` },
    headline: insight.title,
    description: insight.excerpt,
    url: `${siteUrl}/insights/${slug}`,
    publisher: { "@id": `${siteUrl}/#organization` },
    author: { "@id": `${siteUrl}/#organization` },
    about: insight.category === "OTA Distribution" ? ["Yacht listing optimisation", "Yacht OTA management"] : insight.category === "Conversion" ? ["Yacht enquiry conversion", "Yacht booking growth"] : insight.category === "Digital Presence" ? ["Yacht website conversion", "Yacht charter marketing"] : ["Yacht charter pricing strategy", "Yacht revenue management"],
    inLanguage: "en-GB",
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights` },
      { "@type": "ListItem", position: 3, name: insight.title, item: `${siteUrl}/insights/${slug}` },
    ],
  };

  return (
    <>
      <article className="article-page">
        <header className="article-header section-shell">
          <SectionLabel>{insight.category}</SectionLabel>
          <h1>{insight.title}</h1>
          <p>{insight.excerpt}</p>
          <div><span>{insight.readTime}</span><span>Commercial field note</span></div>
        </header>
        <div className="article-body section-shell">
          <aside><span>In this note</span><a href="#why">Why it matters</a><a href="#signals">Signals to watch</a><a href="#next">A practical next step</a></aside>
          <div>
            <p className="article-lead">A yacht can be exceptional on the water and still be difficult to discover, understand, or book. The commercial experience around the vessel deserves the same attention as the operating experience on board.</p>
            <h2 id="why">Why it matters</h2>
            <p>Prospective guests make a series of small confidence decisions. They assess the imagery, relevance, <a href="/revenue-growth">availability</a>, value, <a href="/sales-support">response</a>, and clarity of the next step. When these signals disagree, intent fades quietly.</p>
            <blockquote>Commercial performance improves when every part of the journey gives the guest a consistent reason to continue.</blockquote>
            <h2 id="signals">Signals to watch</h2>
            <p>Look beyond raw traffic or platform impressions. Useful signals include the quality of enquiries, response time, follow-up consistency, calendar accuracy, conversion by source, and the reasons promising conversations do not progress.</p>
            <ul><li>Is the vessel positioned for a clear guest and occasion?</li><li>Do your <a href="/ota-management">listings</a> and <a href="/digital-marketing">website</a> answer the practical questions that delay an <a href="/sales-support">enquiry</a>?</li><li>Can your team trace a lead from source through to <a href="/revenue-growth">booking value</a>?</li><li>Does each lost enquiry lead to a useful operating insight?</li></ul>
            <h2 id="next">A practical next step</h2>
            <p>Choose one part of the journey and review it as a guest would. Record the friction without solving it immediately. The pattern will usually reveal a tighter, more commercially useful priority than a broad redesign or another disconnected campaign.</p>
            <ButtonLink href="/contact#enquiry-form">Request a Growth Review</ButtonLink>
          </div>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />
      <FinalCTA />
    </>
  );
}
