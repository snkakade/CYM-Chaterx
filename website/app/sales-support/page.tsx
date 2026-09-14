import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { socialImage, twitterImage } from "@/data/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cymcharterx.com";

export const metadata: Metadata = {
  title: "Yacht Enquiry Handling & Sales Support",
  description: "Improve yacht enquiry handling, follow-up and quote coordination with professional sales support. Discuss your current enquiry process.",
  alternates: { canonical: "/sales-support" },
  openGraph: { title: "Every Serious Yacht Enquiry Deserves a Response", description: "Structured guest communication, follow-up and booking support for owners and operators.", url: "/sales-support", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Every Serious Yacht Enquiry Deserves a Response", description: "Structured guest communication, follow-up and booking support for owners and operators.", images: [twitterImage] },
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
  const serviceJson = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${siteUrl}/sales-support#webpage`, url: `${siteUrl}/sales-support`, name: "Yacht Enquiry Handling & Sales Support | CharterX", isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${siteUrl}/sales-support#service` }, inLanguage: "en-GB" },
      { "@type": "Service", "@id": `${siteUrl}/sales-support#service`, name: "Yacht Enquiry Support", serviceType: "Yacht sales and customer enquiry handling", url: `${siteUrl}/sales-support`, description: "Professional enquiry handling, guest response, follow-up, quote coordination and CRM-style support for yacht owners and charter operators.", provider: { "@id": `${siteUrl}/#organization` }, areaServed: "Worldwide", audience: [{ "@type": "BusinessAudience", name: "Yacht owners" }, { "@type": "BusinessAudience", name: "Charter operators" }] },
      { "@type": "BreadcrumbList", "@id": `${siteUrl}/sales-support#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` }, { "@type": "ListItem", position: 3, name: "Sales Support", item: `${siteUrl}/sales-support` }] },
    ],
  };
  return (
    <>
      <PageHero
        label="Enquiry Support"
        title="Turn more serious enquiries into"
        italic="real conversations."
        description="We help manage guest communication, response quality, follow-up, and booking handover so owners do not lose warm leads to slow or unclear replies."
        image="/images/sales-support.webp"
        imageAlt="Yacht charter enquiry management and guest follow-up"
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJson) }} />
      <FinalCTA />
    </>
  );
}
