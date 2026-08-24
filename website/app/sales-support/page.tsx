import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Sales & Customer Enquiry Support",
  description: "Professional enquiry handling, guest response, follow-up, quote coordination, and CRM-style support for yacht owners and charter operators.",
  alternates: { canonical: "/sales-support" },
  openGraph: { title: "Yacht Sales & Customer Enquiry Support", description: "Turn more serious enquiries into real conversations.", url: "/sales-support", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht Sales & Enquiry Support", description: "Turn more serious enquiries into real conversations.", images: [twitterImage] },
};

const supportIncludes = [
  "Lead response",
  "Guest questions",
  "Quote coordination",
  "Availability checks",
  "Follow-up sequences",
  "CRM updates",
  "Booking handover",
  "Lost lead notes",
  "Repeat enquiry tracking",
  "Owner visibility"
];

export default function SalesSupportPage() {
  return (
    <>
      <PageHero
        label="Enquiry Support"
        title="Turn more serious enquiries into"
        italic="real conversations."
        description="We help manage guest communication, response quality, follow-up, and booking handover so owners do not lose warm leads to slow or unclear replies."
        image="/images/sales-support.webp"
        imageAlt="Team member providing premium yacht sales support ashore"
        video="/videos/charterx-ocean-texture-uhd.mp4"
        videoMobile="/videos/charterx-ocean-texture-uhd.mp4"
        videoPosition="center center"
        videoMobilePosition="center center"
        primaryLabel="Discuss Support"
        secondaryLabel="See What's Included"
        secondaryHref="#support-includes"
      />
      
      <section className="digital-intro section-shell" style={{ paddingBottom: "4rem" }}>
        <div className="digital-intro-copy reveal-item" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <SectionLabel index="01">Why It Matters</SectionLabel>
          <h2>The first response <em>sets the tone.</em></h2>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.6, marginTop: "2rem" }}>
            Guests often enquire with more than one operator. The business that replies clearly, professionally, and quickly is already ahead. We help make sure every serious lead receives the attention it deserves.
          </p>
        </div>
      </section>

      <section className="managed-section section-shell" id="support-includes" style={{ paddingTop: "2rem", background: "var(--navy-950)", color: "white" }}>
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="02" tone="light">Support Includes</SectionLabel>
          <h2>A complete extension of your <em>sales team.</em></h2>
          <p style={{ opacity: 0.8 }}>We ensure nothing slips through the cracks, from the first contact to the final handover.</p>
        </div>
        <div className="managed-grid">
          {supportIncludes.map((item, index) => (
            <article className="reveal-item" key={item} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", padding: "2rem" }}>
              <span style={{ color: "var(--champagne-500)" }}>0{index + 1}</span>
              <h3 style={{ color: "white", marginTop: "1rem" }}>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
