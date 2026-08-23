import type { Metadata } from "next";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Request a Yacht Growth Review",
  description: "Tell us about your yacht, current booking setup, platforms, website, and growth goals. Request a review of your yacht business commercial setup.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Request a Yacht Growth Review", description: "Tell us about your yacht, current booking setup, platforms, website, and growth goals. Request a review of your yacht business commercial setup.", url: "/contact", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Request a Yacht Growth Review", description: "Tell us about your yacht, current booking setup, platforms, website, and growth goals. Request a review of your yacht business commercial setup.", images: [twitterImage] },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Enquiry"
        title="Tell us about your yacht."
        description="Share your vessel, market, current platforms, and commercial goals. We will review where we can help improve visibility, enquiries, and booking performance."
        image="/images/hero-yacht-wake-poster.webp"
        imageAlt="Top-down aerial view of a yacht drawing a curved wake"
        video="/videos/charterx-yacht-wake.mp4"
        videoMobile="/videos/charterx-yacht-wake.mp4"
        primaryLabel="Start Your Enquiry"
        primaryHref="#enquiry-form"
        secondaryLabel="Book a Strategy Call"
        secondaryHref="#strategy-call"
        compact
      />
      <section className="contact-section section-shell" id="enquiry-form">
        <div className="contact-aside reveal-item">
          <SectionLabel index="01">Form Intro</SectionLabel>
          <h2>Start with the <em>current setup.</em></h2>
          <p>You do not need everything organised before speaking to us. Tell us what you have now — listings, website, platforms, enquiries, pricing, and the areas that feel messy. We will help identify what should be improved first.</p>
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
