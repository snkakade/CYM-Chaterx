import type { Metadata } from "next";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Tell Us About Your Yacht",
  description: "Share your yacht, market, booking setup, and growth goals. Request a commercial review covering visibility, enquiries, digital presence, and revenue.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Tell Us About Your Yacht | CharterX", description: "Share your vessel, market, booking setup, and growth goals.", url: "/contact", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Tell Us About Your Yacht", description: "Request a considered commercial growth review.", images: [twitterImage] },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Start a Conversation"
        title="Tell us about |your yacht."
        description="Share your vessel, market, current booking setup, and growth goals. We’ll review where we can help improve visibility, inquiries, and revenue."
        image="/images/yacht-wake.webp"
        imageAlt="A calm yacht wake disappearing into the dawn horizon"
        primaryLabel="Start Your Enquiry"
        primaryHref="#enquiry-form"
        secondaryLabel="Book a Strategy Call"
        secondaryHref="#strategy-call"
        compact
      />
      <section className="contact-section section-shell" id="enquiry-form">
        <div className="contact-aside reveal-item">
          <SectionLabel index="01">Growth enquiry</SectionLabel>
          <h2>Give us the useful <em>commercial picture.</em></h2>
          <p>You do not need a polished brief. A practical outline of the vessel, market, current channels, and biggest friction point is enough to begin.</p>
          <div className="contact-expect">
            <div><span>01</span><p>We review your context and current commercial setup.</p></div>
            <div><span>02</span><p>We identify the most relevant first area to investigate.</p></div>
            <div><span>03</span><p>We suggest a focused next conversation or review scope.</p></div>
          </div>
          <p className="contact-note">No pressure. No inflated forecast. Just a practical first look at where the commercial engine may be losing momentum.</p>
        </div>
        <ContactForm />
      </section>
      <section className="strategy-call" id="strategy-call">
        <div className="section-shell strategy-call-inner">
          <div><SectionLabel tone="light">Prefer a direct conversation?</SectionLabel><h2>Book a <em>strategy call.</em></h2><p>Use your preferred scheduling link when it is connected. For now, the enquiry form is the fastest route to a considered response.</p></div>
          <a className="button button--primary" href="#enquiry-form"><span>Start with the Form</span><ArrowIcon /></a>
        </div>
      </section>
    </>
  );
}
