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
        label="About"
        title="Commercial management for yachts"
        italic="built to be seen, trusted, and booked."
        description="We support yacht owners and operators with the business systems around the vessel: visibility, listings, enquiry handling, website performance, search, and revenue strategy."
        image="/images/hero-marina-poster.webp"
        imageAlt="Motor yachts moving through a contemporary marina"
        video="/videos/charterx-marina-hero-hq.mp4"
        videoMobile="/videos/charterx-marina-mobile.mp4"
        videoPosition="center center"
        videoMobilePosition="center center"
        primaryLabel="Meet Our Approach"
        primaryHref="#philosophy"
        secondaryLabel="Tell Us About Your Yacht"
        secondaryHref="/contact#enquiry-form"
      />
      <section className="about-origin section-shell">
        <div className="about-origin-copy reveal-item">
          <SectionLabel index="01">Why We Exist</SectionLabel>
          <h2>Great yachts deserve better <em>commercial support.</em></h2>
          <p>Owners already carry enough responsibility: vessel condition, crew, maintenance, safety, guest experience, and operations. The commercial side often becomes fragmented across platforms, inboxes, agencies, spreadsheets, and last-minute decisions.</p>
          <p>We bring that work into one clearer system.</p>
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
        <div className="section-heading-grid reveal-item"><SectionLabel index="02">Philosophy</SectionLabel><h2>Quietly professional. <em>Commercially sharp.</em></h2><p>We believe growth in this market is built through trust, presentation, response quality, and consistency. Not noise. Not inflated promises. Not generic marketing. A yacht business needs calm systems, good judgement, and regular attention to the details that influence bookings.</p></div>
        <div className="belief-grid">
          {[
            ["Clarity", "Owners should know what is happening, what is being improved, and why it matters."], 
            ["Taste", "Premium positioning should feel restrained, confident, and well-edited."], 
            ["Consistency", "Listings, calendars, prices, responses, and pages need regular care."], 
            ["Trust", "Guests need confidence before they commit. Owners need confidence before they delegate."], 
            ["Evidence", "We work from real signals, not vanity metrics."]
          ].map(([title, copy], index) => <article className="reveal-item" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
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
