import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { glossaryTerms } from "@/data/glossary";
import { socialImage, twitterImage } from "@/data/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cymcharterx.com";

export const metadata: Metadata = {
  title: "Yacht Charter Commercial Glossary",
  description: "A commercial glossary for yacht owners and operators, defining OTA management, channel mix, yield, enquiry conversion, and revenue strategy.",
  alternates: { canonical: "/glossary" },
  openGraph: { title: "Yacht Charter Commercial Glossary", description: "Definitions for OTA management, channel mix, yield, and revenue strategy.", url: "/glossary", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht Charter Commercial Glossary", description: "Definitions for OTA management, channel mix, yield, and revenue strategy.", images: [twitterImage] },
};

export default function GlossaryPage() {
  const glossaryJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: glossaryTerms.map((item) => ({
      "@type": "Question",
      name: `What is ${item.term.toLowerCase()} in yacht charter?`,
      acceptedAnswer: { "@type": "Answer", text: item.definition }
    }))
  };

  return (
    <>
      <PageHero
        label="Commercial Glossary"
        title="Clear definitions for"
        italic="yacht growth."
        description="A practical reference guide for owners and operators navigating the commercial side of the yacht charter industry."
        image="/images/hero-sailing-poster.webp"
        imageAlt="Sailing yacht cutting through deep blue Mediterranean water"
        primaryLabel="Explore Services"
        primaryHref="/services"
      />
      
      <section className="glossary-section section-shell" style={{ padding: "6rem 0" }}>
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="01">Terminology</SectionLabel>
          <h2>Commercial language, <em>defined.</em></h2>
        </div>
        <div className="glossary-grid" style={{ maxWidth: "800px", margin: "4rem auto 0", display: "grid", gap: "3rem" }}>
          {glossaryTerms.map((item) => (
            <article className="reveal-item" key={item.term} id={item.term.toLowerCase().replace(/\s+/g, '-')}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.term}</h3>
              <p style={{ lineHeight: 1.6, opacity: 0.9 }}>{item.definition}</p>
            </article>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJson) }} />
      <FinalCTA />
    </>
  );
}
