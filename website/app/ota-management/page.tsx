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
  title: "Yacht OTA Management Services | Listing Optimisation & Enquiry Support",
  description: "Improve yacht listing quality, platform visibility, pricing, availability, enquiry handling, and ongoing OTA performance with professional yacht OTA management.",
  alternates: { canonical: "/ota-management" },
  openGraph: { title: "Yacht OTA Management Services | Listing Optimisation & Enquiry Support", description: "Improve yacht listing quality, platform visibility, pricing, availability, enquiry handling, and ongoing OTA performance with professional yacht OTA management.", url: "/ota-management", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht OTA Management Services", description: "Improve yacht listing quality, platform visibility, pricing, availability, enquiry handling, and ongoing OTA performance with professional yacht OTA management.", images: [twitterImage] },
};

const managed = ["Platform setup", "Listing structure", "Description writing", "Photo order guidance", "Pricing updates", "Calendar accuracy", "Availability coordination", "Guest enquiry monitoring", "Promotion support", "Review and ranking signals", "Performance review", "Ongoing improvements"];

export default function OTAManagementPage() {
  const faqJson = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: otaFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return (
    <>
      <PageHero
        compact
        label="OTA Management"
        title="Make your yacht easier to find"
        italic="and easier to book."
        description="We manage and improve your yacht listings across relevant booking platforms, so your vessel is presented clearly, priced thoughtfully, and supported by a better enquiry process."
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
        <SectionLabel index="01">What OTA Management Means</SectionLabel>
        <div className="editorial-intro-copy reveal-item">
          <h2>Your listings are not <em>static profiles.</em></h2>
          <p>A listing is a sales channel. It needs the right photos, the right order, the right description, the right pricing, accurate availability, quick responses, and regular attention. We manage those details so your yacht does not disappear into a crowded marketplace.</p>
        </div>
      </section>

      <section className="underperform-section section-shell">
        <AnimatedImageReveal src="/images/hero-yacht.webp" alt="Luxury motor yacht at blue hour" />
        <div className="underperform-copy reveal-item">
          <SectionLabel index="02">Why Listings Underperform</SectionLabel>
          <h2>Most listing problems are small — <em>until they cost bookings.</em></h2>
          <p>A guest may never tell you why they moved on. It might be a weak first photo, unclear inclusions, slow response, outdated calendar, confusing pricing, or a description that does not match the quality of the yacht. We find and fix those points of friction.</p>
          <div className="friction-list">
            {["Weak first impression", "Poor photo sequence", "Unclear inclusions", "Slow enquiry response", "Inconsistent pricing", "Stale availability", "No review strategy", "No optimisation rhythm"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
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
          <h2>The details that make a yacht <em>commercially ready.</em></h2>
          <p>We bring structure to the guest-facing and performance-facing parts of your platform presence.</p>
        </div>
        <div className="managed-grid">{managed.map((item, index) => <article className="reveal-item" key={item}><span>0{index + 1}</span><h3>{item}</h3><i /></article>)}</div>
      </section>

      <section className="process-section section-shell">
        <div className="process-intro reveal-item">
          <SectionLabel index="04">OTA Process</SectionLabel>
          <h2>From listing audit to <em>ongoing management.</em></h2>
          <ButtonLink href="/contact#enquiry-form">Improve My Listings</ButtonLink>
        </div>
        <ol className="process-list">
          {[
            ["Audit", "We review your current platform presence, content, pricing, availability, and enquiry flow."], 
            ["Position", "We define how the yacht should be presented based on vessel type, market, guest profile, and value."], 
            ["Improve", "We update the priority elements that influence trust and enquiry quality."], 
            ["Manage", "We support the ongoing listing rhythm so information stays accurate and enquiries are handled properly."], 
            ["Optimise", "We use performance signals to guide practical improvements over time."]
          ].map(([title, copy], index) => <li className="reveal-item" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}
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
