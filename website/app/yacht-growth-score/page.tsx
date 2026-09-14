import type { Metadata } from "next";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { YachtGrowthScore } from "@/components/YachtGrowthScore";
import { otaFaqs } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Business Growth Audit",
  description: "Take a yacht business growth audit covering visibility, listings, pricing and enquiry flow. Complete the CharterX Yacht Growth Score.",
  alternates: { canonical: "/yacht-growth-score" },
  openGraph: {
    title: "Where Is Your Yacht Business Losing Momentum?",
    description: "Review the visibility, listings, pricing and enquiry systems around your yacht business.",
    url: "/yacht-growth-score",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where Is Your Yacht Business Losing Momentum?",
    description: "Review the visibility, listings, pricing and enquiry systems around your yacht business.",
    images: [twitterImage],
  },
};

export default function YachtGrowthScorePage() {
  return (
    <>
      <PageHero
        label="Yacht Growth Score"
        title="See where your yacht business"
        italic="may be losing bookings."
        description="A short diagnostic for owners and operators who want a clearer view of their visibility, enquiry flow, listing quality, and revenue setup."
        image="/images/hero-yacht.webp"
        imageAlt="Luxury motor yacht navigating open waters"
        primaryLabel="Start the Score"
        primaryHref="#yacht-growth-score"
        secondaryLabel="Explore Services"
        secondaryHref="/services"
      />

      <YachtGrowthScore />

      <section className="faq-section section-shell">
        <div className="faq-heading reveal-item">
          <SectionLabel index="02">Frequently Asked</SectionLabel>
          <h2>Yacht Growth Score, <em>clearly explained.</em></h2>
        </div>
        <FAQAccordion items={otaFaqs} />
      </section>

      <FinalCTA />
    </>
  );
}
