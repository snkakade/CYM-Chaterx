import type { Metadata } from "next";
import { AnimatedImageReveal } from "@/components/AnimatedImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { VideoFeature } from "@/components/VideoFeature";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Website Design, SEO & Digital Marketing",
  description: "Conversion-focused yacht website design, SEO, paid search, landing pages, analytics, and enquiry tracking for yacht charter and boat rental businesses.",
  alternates: { canonical: "/digital-marketing" },
  openGraph: { title: "Yacht Website Design, SEO & Digital Marketing", description: "Make your digital presence work like a sales asset.", url: "/digital-marketing", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht Digital Marketing", description: "Make your digital presence work like a sales asset.", images: [twitterImage] },
};

const capabilities = [
  ["Website strategy", "Define the role your site should play in discovery, trust, enquiry, and direct booking growth."],
  ["UX optimization", "Remove uncertainty and guide guests from inspiration to practical booking intent."],
  ["SEO", "Build durable visibility around the markets, experiences, and search intent most relevant to your vessel."],
  ["SEM", "Structure accountable search campaigns around high-intent demand and measurable enquiry actions."],
  ["Landing pages", "Create focused journeys for markets, seasons, vessel categories, and campaign intent."],
  ["Conversion copy", "Answer the questions guests need resolved before they feel confident enough to enquire."],
  ["Enquiry tracking", "Understand where leads begin, how they move, and which journeys create useful demand."],
  ["Remarketing readiness", "Create clean audience and measurement foundations for future follow-up campaigns."],
] as const;

export default function DigitalMarketingPage() {
  return (
    <>
      <PageHero
        label="Yacht Digital Marketing"
        title="Your digital presence should |work like a sales asset."
        description="A refined website is only valuable when the right guests can find it, understand the experience, trust the operator, and take the next step."
        image="/images/website-optimization.webp"
        imageAlt="Premium yacht booking website displayed on a laptop"
        video="/videos/charterx-ocean-texture.mp4"
        primaryLabel="Review My Website"
        secondaryLabel="Explore Digital Services"
        secondaryHref="#digital-capabilities"
      />
      <section className="digital-intro section-shell">
        <AnimatedImageReveal src="/images/search-visibility.webp" alt="Coastline map with a subtle search visibility overlay" />
        <div className="digital-intro-copy reveal-item">
          <SectionLabel index="01">From search to enquiry</SectionLabel>
          <h2>Beautiful is the standard. <em>Commercially useful is the goal.</em></h2>
          <p>Your website, organic visibility, paid search, landing pages, and tracking should make one coherent journey. We connect the visual experience to genuine guest intent.</p>
          <ButtonLink href="/contact">Request a Digital Review</ButtonLink>
        </div>
      </section>
      <VideoFeature
        src="/videos/charterx-sailing.mp4"
        label="Digital presence"
        title="The experience should feel considered before the guest steps aboard."
        direction="Quiet close-ups of yacht details, polished surfaces, water reflections, and a guest browsing a refined charter website."
        poster="/images/website-optimization.webp"
        posterAlt="Sailing yacht moving through clear blue water"
        position="35% center"
        mobilePosition="38% center"
      />
      <section className="capabilities section-shell" id="digital-capabilities">
        <div className="section-heading-grid reveal-item"><SectionLabel index="02">Digital capabilities</SectionLabel><h2>Every layer of a stronger <em>direct presence.</em></h2><p>Use the full programme or start with the commercial layer creating the most friction today.</p></div>
        <div className="capability-grid">
          {capabilities.map(([title, copy], index) => <article className="reveal-item" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="search-journey" id="search">
        <div className="section-shell search-journey-inner">
          <div className="search-copy reveal-item"><SectionLabel index="03" tone="light">Search visibility</SectionLabel><h2>Meet demand at the moment it becomes <em>intent.</em></h2><p>We map how guests search, where location and experience matter, and what each landing journey must do to earn an enquiry.</p></div>
          <ol className="search-path reveal-item">
            {["Search intent", "Relevant page", "Guest confidence", "Clear enquiry", "Measured lead"].map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>
      <section className="measurement-section section-shell">
        <div className="measurement-copy reveal-item"><SectionLabel index="04">Measure what matters</SectionLabel><h2>Traffic is a signal. <em>Enquiries are the outcome.</em></h2><p>We design analytics around meaningful actions: quality visits, enquiry starts, completed forms, calls, campaign source, and the downstream booking value your team records.</p></div>
        <div className="measurement-panel reveal-item" aria-label="Abstract enquiry measurement interface">
          <div><span>Visibility</span><i style={{ width: "78%" }} /></div><div><span>Engagement</span><i style={{ width: "62%" }} /></div><div><span>Enquiry intent</span><i style={{ width: "48%" }} /></div><div><span>Qualified flow</span><i style={{ width: "36%" }} /></div>
          <p>Designed for clarity, not vanity metrics.</p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
