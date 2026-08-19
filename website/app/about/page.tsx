import type { Metadata } from "next";
import { AnimatedImageReveal } from "@/components/AnimatedImageReveal";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { VideoFeature } from "@/components/VideoFeature";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "About Our Yacht Growth Consultancy",
  description: "CharterX is a premium commercial growth consultancy for yacht owners, charter operators, boat rentals, and marine hospitality brands.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About CharterX", description: "Commercial structure for assets built to move.", url: "/about", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "About CharterX", description: "A yacht growth consultancy built ashore.", images: [twitterImage] },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Built Ashore"
        title="Commercial structure for |assets built to move."
        description="CharterX exists for yacht owners who want more than maintenance. They want visibility, better enquiries, commercial structure, and a clearer route to revenue."
        image="/images/hero-marina-poster.webp"
        imageAlt="Motor yachts moving through a contemporary marina"
        video="/videos/charterx-marina-hero-hq.mp4"
        videoMobile="/videos/charterx-marina-mobile.mp4"
        videoPosition="center center"
        videoMobilePosition="center center"
        primaryLabel="Meet Our Approach"
        primaryHref="#philosophy"
        secondaryLabel="Tell Us About Your Yacht"
        secondaryHref="/contact"
      />
      <section className="about-origin section-shell">
        <div className="about-origin-copy reveal-item">
          <SectionLabel index="01">Why we exist</SectionLabel>
          <h2>Exceptional operations deserve an equally considered <em>commercial engine.</em></h2>
          <p>Owners and operators carry the responsibility of safety, service, crew, maintenance, and the guest experience. The growth work around the vessel is often left fragmented across platforms, agencies, inboxes, and reactive decisions.</p>
          <p>We bring those commercial disciplines together ashore—so the yacht team can stay focused on operating an exceptional asset.</p>
        </div>
        <AnimatedImageReveal src="/images/charterx-yacht-deck.webp" alt="Elevated view across the guest decks of a luxury motor yacht in calm water" />
      </section>
      <VideoFeature
        src="/videos/charterx-ocean-texture.mp4"
        label="Built ashore"
        title="Commercial care, delivered with the same calm as the operation onboard."
        direction="Tactile yacht details and discreet ashore operations: teak, polished fittings, navigation displays, and considered human service."
        poster="/images/sales-support.webp"
        posterAlt="Calm ocean surface moving in soft natural light"
      />
      <section className="beliefs-section section-shell" id="philosophy">
        <div className="section-heading-grid reveal-item"><SectionLabel index="02">What we believe</SectionLabel><h2>Calm growth is built on <em>clear principles.</em></h2><p>Our work is commercially sharp, but never detached from the realities of operating a vessel and protecting a premium guest experience.</p></div>
        <div className="belief-grid">
          {[["Owner time is valuable", "A commercial system should reduce reactive admin, clarify ownership, and make the next decision easier."], ["Trust converts", "Premium guests need prompt, informed answers and a journey that feels considered at every touchpoint."], ["Visibility must be qualified", "More reach is only useful when it brings the right demand for the yacht, market, and operating model."], ["Optimization is a rhythm", "Pricing, listings, channels, content, and response quality improve through consistent review—not one-off activity."], ["Evidence beats theatre", "We avoid inflated promises, vanity metrics, and invented certainty. Useful signals lead to useful action."], ["The owner view comes first", "Every recommendation should respect margin, operations, brand, guest quality, and the realities on board."]].map(([title, copy], index) => <article className="reveal-item" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="how-we-work">
        <div className="section-shell how-we-work-inner">
          <div className="how-we-work-copy reveal-item"><SectionLabel index="03" tone="light">How we work</SectionLabel><h2>Close enough to understand. Structured enough <em>to deliver.</em></h2><p>We begin with the vessel, market, operating model, and current commercial setup. Then we establish the most useful scope—focused support or a connected growth partnership.</p></div>
          <div className="working-principles">
            {[["01", "Listen", "Understand the vessel, owner priorities, guest profile, and operating limits."], ["02", "Prioritise", "Find the commercial gaps most likely to be costing visibility, time, or conversion."], ["03", "Build", "Create the content, systems, campaigns, and response rhythm the business needs."], ["04", "Improve", "Review real signals and make measured changes over time."]].map(([number, title, copy]) => <article className="reveal-item" key={title}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>
      <section className="built-for section-shell"><SectionLabel index="04">Built for</SectionLabel><h2 className="reveal-item">Yachts. Boats. Charters. <em>Marine experiences.</em></h2><p className="reveal-item">From a single owner-operated vessel to a growing multi-yacht business, the principles remain the same: be visible, respond well, create confidence, and improve the commercial rhythm.</p></section>
      <FinalCTA />
    </>
  );
}
