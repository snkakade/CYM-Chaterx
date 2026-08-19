import type { Metadata } from "next";
import { AnimatedImageReveal } from "@/components/AnimatedImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { VideoFeature } from "@/components/VideoFeature";
import { otaFaqs } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht OTA Management Services | Improve Visibility & Bookings",
  description: "Professional OTA management for yacht and boat owners. Improve listings, pricing, availability, inquiries, visibility, and bookings across boat-rental and travel platforms.",
  alternates: { canonical: "/ota-management" },
  openGraph: { title: "Yacht OTA Management Services", description: "Improve listing quality, visibility, enquiries, and bookings across the right platforms.", url: "/ota-management", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht OTA Management Services", description: "Improve yacht listing visibility, enquiries, and bookings.", images: [twitterImage] },
};

const managed = ["Platform and profile setup", "Listing copy and content structure", "Photo order and content guidance", "Pricing and seasonal logic", "Availability coordination", "Enquiry monitoring and handoff", "Promotions and visibility tools", "Review and ranking signals", "Performance tracking and refinement"];

export default function OTAManagementPage() {
  const faqJson = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: otaFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return (
    <>
      <PageHero
        compact
        label="Yacht OTA Management"
        title="Be easier to find. |Stronger to choose."
        italic="Ready to book."
        description="Professional yacht and boat rental listing management across the platforms that shape discovery, enquiries, and booking intent."
        image="/images/hero-city-yacht-poster.webp"
        imageAlt="Motor yacht passing a waterfront skyline in open blue water"
        video="/videos/charterx-city-yacht-hero-2k.mp4"
        videoMobile="/videos/charterx-city-yacht-mobile.mp4"
        videoPosition="center center"
        videoMobilePosition="center center"
        primaryLabel="Improve My Listings"
        secondaryLabel="See What We Manage"
        secondaryHref="#what-we-manage"
      />
      <section className="editorial-intro section-shell">
        <SectionLabel index="01">What is yacht OTA management?</SectionLabel>
        <div className="editorial-intro-copy reveal-item">
          <h2>Your listings are not static profiles. They are <em>active sales channels.</em></h2>
          <p>Yacht OTA management is the ongoing discipline of presenting, pricing, updating, and supporting your vessel across relevant booking platforms. It connects content quality, availability, response speed, and guest confidence.</p>
        </div>
      </section>

      <section className="underperform-section section-shell">
        <AnimatedImageReveal src="/images/hero-yacht.webp" alt="Luxury motor yacht at blue hour" />
        <div className="underperform-copy reveal-item">
          <SectionLabel index="02">Why listings underperform</SectionLabel>
          <h2>Visibility can fade long before the yacht changes.</h2>
          <p>Incomplete content, unclear pricing, stale calendars, slow replies, weak photo order, and inconsistent platform details create friction for both the guest and the marketplace.</p>
          <div className="friction-list">
            {["Inconsistent availability", "Unclear value positioning", "Slow enquiry handling", "Weak listing completeness", "No optimization rhythm"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
          </div>
        </div>
      </section>

      <VideoFeature
        src="/videos/charterx-yacht-aerial.mp4"
        label="OTA distribution"
        title="From discovery to a confident enquiry."
        direction="Slow aerial passage beside a premium motor yacht, with generous open water and no visible branding."
        poster="/images/hero-yacht.webp"
        posterAlt="Aerial film of a luxury yacht at sunset"
        position="35% center"
      />

      <section className="managed-section section-shell" id="what-we-manage">
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="03">What we manage</SectionLabel>
          <h2>The details that improve <em>commercial readiness.</em></h2>
          <p>We establish a consistent operational standard across the guest-facing and performance-facing elements of your listings.</p>
        </div>
        <div className="managed-grid">{managed.map((item, index) => <article className="reveal-item" key={item}><span>0{index + 1}</span><h3>{item}</h3><i /></article>)}</div>
      </section>

      <section className="process-section section-shell">
        <div className="process-intro reveal-item">
          <SectionLabel index="04">Our OTA process</SectionLabel>
          <h2>From listing audit to <em>ongoing improvement.</em></h2>
          <p>Optimization begins with clarity, then becomes a repeatable commercial rhythm.</p>
          <ButtonLink href="/contact">Request an OTA Review</ButtonLink>
        </div>
        <ol className="process-list">
          {[["Audit", "Review content, pricing, availability, enquiry flow, and platform consistency."], ["Position", "Clarify your vessel’s audience, value, and competitive frame."], ["Improve", "Implement the priority listing, photo, calendar, and response changes."], ["Operate", "Maintain availability, enquiries, promotions, and review signals."], ["Refine", "Use performance signals to guide the next practical improvements."]].map(([title, copy], index) => <li className="reveal-item" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
        </ol>
      </section>

      <section className="faq-section section-shell">
        <div className="faq-heading reveal-item"><SectionLabel index="05">Frequently asked</SectionLabel><h2>Yacht OTA management, <em>clearly explained.</em></h2></div>
        <FAQAccordion items={otaFaqs} />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <FinalCTA />
    </>
  );
}
