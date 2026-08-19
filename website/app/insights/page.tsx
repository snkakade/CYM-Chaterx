import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { InsightCard } from "@/components/InsightCard";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { insights } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Growth Insights & Resources",
  description: "Practical resources on yacht OTA management, listing performance, enquiry conversion, websites, pricing, availability, and revenue growth.",
  alternates: { canonical: "/insights" },
  openGraph: { title: "Yacht Growth Insights & Resources", description: "A clearer view of yacht business growth.", url: "/insights", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht Growth Insights", description: "Practical thinking for yacht owners and operators.", images: [twitterImage] },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Insights & Resources"
        title="A clearer view of |yacht business growth."
        description="Practical thinking for owners and operators navigating booking platforms, enquiry conversion, direct demand, pricing, and digital performance."
        image="/images/hero-ocean-poster.webp"
        imageAlt="Calm open water viewed from above"
        video="/videos/charterx-ocean-texture-hero-2k.mp4"
        videoMobile="/videos/charterx-ocean-texture.mp4"
        primaryLabel="Explore Latest Insights"
        primaryHref="#insight-library"
        secondaryLabel="Request a Growth Review"
        secondaryHref="/contact"
        compact
      />
      <section className="insights-library section-shell" id="insight-library">
        <div className="section-heading-grid reveal-item"><SectionLabel index="01">The commercial library</SectionLabel><h2>Useful thinking, without <em>the theatre.</em></h2><p>Clear, considered guidance designed to make your next commercial decision easier.</p></div>
        <div className="insights-grid">{insights.map((insight, index) => <InsightCard insight={insight} index={index} key={insight.slug} />)}</div>
      </section>
      <section className="insight-note section-shell reveal-item"><span>Field note 001</span><p>Good growth advice should respect the vessel, the operation, and the guest—not just the dashboard.</p></section>
      <FinalCTA />
    </>
  );
}
