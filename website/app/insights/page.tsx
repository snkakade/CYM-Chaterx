import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { InsightCard } from "@/components/InsightCard";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { insights } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Business Growth Insights",
  description: "Read practical yacht business growth insights on OTA performance, pricing, enquiries, websites and direct bookings. Explore the CharterX library.",
  alternates: { canonical: "/insights" },
  openGraph: { title: "CharterX Yacht Growth Insights", description: "Practical commercial thinking for yacht owners and charter operators.", url: "/insights", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "CharterX Yacht Growth Insights", description: "Practical commercial thinking for yacht owners and charter operators.", images: [twitterImage] },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Insights & Resources"
        title="Insights & growth."
        description={<>Practical advice for owners and operators navigating <a href="/ota-management">booking platforms</a> and <a href="/digital-marketing">digital performance</a>.</>}
        image="/images/hero-ocean-poster.webp"
        imageAlt="Calm open water viewed from above"
        video="/videos/charterx-ocean-texture-uhd.mp4"
        videoMobile="/videos/charterx-ocean-texture.mp4"
        primaryLabel="Explore Latest Insights"
        primaryHref="#insight-library"
        secondaryLabel="Request a Growth Review"
        secondaryHref="/contact#enquiry-form"
        compact
      />
      <section className="insights-library section-shell" id="insight-library">
        <div className="section-heading-grid reveal-item"><SectionLabel index="01">The commercial library</SectionLabel><h2>Useful thinking, without <em>the theatre.</em></h2><p>Clear, considered guidance designed to make your next commercial decision easier.</p></div>
        <div className="insights-grid">{insights.map((insight, index) => <InsightCard insight={insight} index={index} key={insight.slug} />)}</div>
      </section>
      <section className="insight-note section-shell reveal-item"><span>Field note 001</span><p>Good growth advice should respect the vessel, the operation and the guest, not just the dashboard.</p></section>
      <FinalCTA />
    </>
  );
}
