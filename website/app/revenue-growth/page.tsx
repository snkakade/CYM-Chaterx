import type { Metadata } from "next";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ButtonLink } from "@/components/ButtonLink";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { RevenueDashboardVisual } from "@/components/RevenueDashboardVisual";
import { SectionLabel } from "@/components/SectionLabel";
import { VideoFeature } from "@/components/VideoFeature";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Revenue Management & Growth Strategy",
  description: "Build a smarter revenue system around your yacht with pricing reviews, availability strategy, channel mix, listing optimization, and direct booking growth.",
  alternates: { canonical: "/revenue-growth" },
  openGraph: { title: "Yacht Revenue Management & Growth Strategy", description: "Build a smarter revenue system around your yacht.", url: "/revenue-growth", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht Revenue Management", description: "Build a smarter revenue system around your yacht.", images: [twitterImage] },
};

const levers = [
  ["Pricing", "Pricing should reflect demand, seasonality, lead time, experience value, and owner priorities — not just what someone nearby listed last week."],
  ["Availability", "A clear calendar builds confidence and protects high-value dates from poor planning."],
  ["Presentation", "The way your yacht is described, photographed, and packaged shapes how guests judge value."],
  ["Response", "Fast is useful. Clear is better. Guests book when they feel understood and confident."],
  ["Channel Mix", "Not every platform deserves the same attention. We help decide where your yacht should show up and why."],
  ["Direct Demand", "A stronger website and enquiry journey gives the business more control beyond third-party platforms."],
] as const;

export default function RevenueGrowthPage() {
  return (
    <>
      <PageHero
        label="Revenue Strategy"
        title="Build a more deliberate"
        italic="revenue rhythm."
        description="We help yacht businesses move away from reactive pricing and scattered channel decisions towards a clearer, more controlled commercial process."
        image="/images/hero-sailing-poster.webp"
        imageAlt="Sailing yacht cutting through deep blue Mediterranean water"
        video="/videos/charterx-sailing-hero-uhd.mp4"
        videoMobile="/videos/charterx-sailing-hero-uhd.mp4"
        videoPosition="35% center"
        videoMobilePosition="38% center"
        primaryLabel="Request a Revenue Review"
        secondaryLabel="Explore the Levers"
        secondaryHref="#revenue-levers"
      />
      <section className="revenue-intro section-shell">
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="01">Commercial control</SectionLabel>
          <h2>Revenue is rarely <em>one decision.</em></h2>
          <p>It is the result of many connected decisions: where the yacht appears, how it is priced, when availability is released, how enquiries are handled, how the offer is framed, and how direct demand is built. We help connect those decisions into a more useful operating rhythm.</p>
        </div>
        <RevenueDashboardVisual />
      </section>
      <VideoFeature
        src="/videos/charterx-yacht-wake.mp4"
        label="Revenue in motion"
        title="A stronger operating rhythm leaves a clearer wake."
        direction="Elevated aft view of a yacht underway at first light, with a long symmetrical wake and restrained camera movement."
        poster="/images/yacht-wake.webp"
        posterAlt="Top-down aerial film of a yacht drawing a curved wake"
      />
      <section className="revenue-levers section-shell" id="revenue-levers">
        <div className="revenue-lever-heading reveal-item"><SectionLabel index="02">Revenue Levers</SectionLabel><h2>Where performance is <em>won quietly.</em></h2></div>
        <div className="lever-list">
          {levers.map(([title, copy], index) => (
            <article className="lever-item reveal-item" key={title}>
              <span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowIcon />
            </article>
          ))}
        </div>
      </section>
      <section className="optimization-loop">
        <div className="section-shell optimization-loop-inner">
          <div className="optimization-copy reveal-item">
            <SectionLabel index="03" tone="light">Monthly optimization loop</SectionLabel>
            <h2>Review. Decide. Act. <em>Measure.</em></h2>
            <p>We turn scattered performance signals into a consistent monthly view of what deserves attention next.</p>
            <ButtonLink href="/contact#enquiry-form">Request a Revenue Review</ButtonLink>
          </div>
          <div className="loop-visual reveal-item" aria-label="Monthly optimization loop diagram">
            {[["01", "Review"], ["02", "Decide"], ["03", "Act"], ["04", "Measure"]].map(([number, label]) => <div key={label}><span>{number}</span><strong>{label}</strong></div>)}
            <i className="loop-ring" aria-hidden="true" /><p>Improve<br />the rhythm</p>
          </div>
        </div>
      </section>
      <section className="owner-outcomes section-shell">
        <div className="section-heading-grid reveal-item"><SectionLabel index="04">Owner Outcomes</SectionLabel><h2>More clarity. Less reactive <em>owner admin.</em></h2><p>No inflated forecasts. No vague dashboards. No theatre. Just a clearer view of what is happening commercially, where bookings may be leaking, and what should be improved next.</p></div>
        <div className="outcome-grid">
          {["Better view of demand", "Cleaner pricing decisions", "More consistent enquiry handling", "Stronger listing quality", "Clearer channel performance", "Improved direct booking path", "Less manual owner follow-up", "More professional guest journey"].map((item, index) => <article className="reveal-item" key={item}><span>0{index + 1}</span><p>{item}</p></article>)}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
