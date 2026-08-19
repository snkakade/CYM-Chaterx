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
  ["Pricing is not guessing", "A pricing rhythm should reflect seasonality, demand, lead time, vessel position, and the value of the experience—not just what a competitor charged yesterday."],
  ["Availability affects revenue", "An accurate, deliberate calendar increases guest confidence and creates space to protect premium dates, fill need periods, and reduce avoidable friction."],
  ["Content affects conversion", "The way your vessel is framed, ordered, described, and explained influences whether discovery becomes intent—or another closed tab."],
  ["Response speed affects booking rate", "Fast matters, but trusted response matters more. Clear ownership, useful answers, and consistent follow-up create booking confidence."],
  ["Channel mix affects profit", "The goal is not to be everywhere. It is to understand which platforms, partners, and direct routes deserve time, availability, and margin."],
  ["Direct bookings matter", "A stronger direct path creates guest ownership, better insight, and more control over the long-term value of every marketing effort."],
] as const;

export default function RevenueGrowthPage() {
  return (
    <>
      <PageHero
        label="Yacht Revenue Strategy"
        title="Build a smarter revenue |system around your yacht."
        description="Revenue improves when pricing, availability, content, response, channel mix, and direct bookings work as one commercial operating system."
        image="/images/hero-yacht-wake-poster.webp"
        imageAlt="Top-down aerial view of a yacht drawing a curved wake"
        video="/videos/charterx-yacht-wake-hero-2k.mp4"
        videoMobile="/videos/charterx-yacht-wake.mp4"
        primaryLabel="Build My Revenue System"
        secondaryLabel="Explore the Levers"
        secondaryHref="#revenue-levers"
      />
      <section className="revenue-intro section-shell">
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="01">Commercial control</SectionLabel>
          <h2>Revenue is the result of <em>connected decisions.</em></h2>
          <p>A single price change cannot repair a weak listing, a missed enquiry, or an unavailable calendar. We connect each commercial input and create a rhythm for improving it.</p>
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
        <div className="revenue-lever-heading reveal-item"><SectionLabel index="02">Six revenue levers</SectionLabel><h2>Where performance is <em>won quietly.</em></h2></div>
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
            <ButtonLink href="/contact">Request a Revenue Review</ButtonLink>
          </div>
          <div className="loop-visual reveal-item" aria-label="Monthly optimization loop diagram">
            {[["01", "Review"], ["02", "Decide"], ["03", "Act"], ["04", "Measure"]].map(([number, label]) => <div key={label}><span>{number}</span><strong>{label}</strong></div>)}
            <i className="loop-ring" aria-hidden="true" /><p>Improve<br />the rhythm</p>
          </div>
        </div>
      </section>
      <section className="owner-outcomes section-shell">
        <div className="section-heading-grid reveal-item"><SectionLabel index="04">Owner-first outcomes</SectionLabel><h2>More clarity. Less reactive <em>owner admin.</em></h2><p>No inflated forecasts. No vague dashboards. Just a clearer commercial picture and a disciplined next move.</p></div>
        <div className="outcome-grid">
          {["A clearer view of demand and channel performance", "More deliberate seasonal pricing and availability", "A stronger connection between leads and booking value", "A healthier balance between platform and direct demand"].map((item, index) => <article className="reveal-item" key={item}><span>0{index + 1}</span><p>{item}</p></article>)}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
