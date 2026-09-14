import type { Metadata } from "next";
import { AnimatedImageReveal } from "@/components/AnimatedImageReveal";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ButtonLink } from "@/components/ButtonLink";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { services } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cymcharterx.com";

export const metadata: Metadata = {
  title: "Yacht Charter Growth Services",
  description: "Explore yacht charter growth services spanning OTA management, revenue strategy, digital marketing and enquiry support. Review the full service model.",
  alternates: { canonical: "/services" },
  openGraph: { title: "One Commercial System for Yacht Growth", description: "OTA management, revenue strategy, digital growth and enquiry support under one commercial model.", url: "/services", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "One Commercial System for Yacht Growth", description: "OTA management, revenue strategy, digital growth and enquiry support under one commercial model.", images: [twitterImage] },
};

const detailSections = [
  {
    id: "ota",
    label: "OTA Distribution",
    title: "A better presence across the platforms guests already use.",
    copy: "Get your yacht in front of more customers across leading boat-rental and travel platforms. We manage listings, pricing, availability, inquiries and ongoing optimization.",
    image: "/images/ota-dashboard.webp",
    alt: "Yacht booking platform dashboard showing listings and availability",
    items: ["OTA profile setup", "Listing content improvement", "Photo order and description guidance", "Pricing and availability updates", "Inquiry monitoring", "Promotion setup", "Visibility tools", "Review and ranking improvement", "Platform performance tracking"],
    cta: ["Improve My Listings", "/ota-management"],
  },
  {
    id: "sales-support",
    label: "Owner Support",
    title: "Every serious enquiry deserves a trusted response.",
    copy: "Give your business a dedicated team that handles customer inquiries, follows up with leads and helps convert more inquiries into confirmed bookings.",
    image: "/images/sales-support.webp",
    alt: "Charter enquiry specialist supporting a yacht booking enquiry",
    items: ["Inquiry handling", "Lead follow-up", "Guest questions", "Quote coordination", "Booking assistance", "Pipeline tracking", "Response templates", "CRM-style enquiry management"],
    cta: ["Discuss Sales Support", "/contact#enquiry-form"],
  },
  {
    id: "digital-presence",
    label: "Digital Presence",
    title: "Move beyond a digital brochure.",
    copy: "Your website should work as a booking and lead-generation tool. We help improve your website, content, user experience and online presence to turn visitors into customers.",
    image: "/images/website-optimization.webp",
    alt: "Yacht charter website designed to generate enquiries",
    items: ["Website audit", "User experience improvement", "Landing pages", "Enquiry forms", "Booking journey optimization", "Copywriting", "Photo and content direction", "Conversion-focused design"],
    cta: ["Review My Website", "/digital-marketing"],
  },
  {
    id: "search",
    label: "Search Visibility",
    title: "Be visible when customers are ready to look.",
    copy: "Get discovered when customers are searching for yacht rentals. Our SEO and SEM strategies help increase organic visibility, generate qualified traffic and drive direct bookings.",
    image: "/images/search-visibility.webp",
    alt: "Yacht charter search visibility and digital marketing concept",
    items: ["Local SEO", "Search keyword strategy", "Landing page SEO", "Google Ads structure", "Campaign tracking", "Conversion tracking", "Content planning", "Search intent mapping"],
    cta: ["Explore Digital Marketing", "/digital-marketing"],
  },
  {
    id: "revenue",
    label: "Revenue Strategy",
    title: "Better positioning. Better data. Better decisions.",
    copy: "We analyze your pricing, availability, listing quality and market positioning to help you compete effectively and maximize your earning potential.",
    image: "/images/revenue-optimization.webp",
    alt: "Yacht charter revenue performance dashboard beside a marina",
    items: ["Pricing review", "Competitor positioning", "Calendar availability logic", "Seasonality planning", "Listing performance analysis", "Package and offer strategy", "Channel mix review", "Direct booking strategy"],
    cta: ["Build My Revenue System", "/revenue-growth"],
  },
] as const;

export default function ServicesPage() {
  const collectionJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/services#webpage`,
    url: `${siteUrl}/services`,
    name: "Yacht Charter Growth Services | CharterX",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      name: "CharterX Yacht Growth Services",
      itemListElement: [
        { "@type": "ListItem", position: 1, url: `${siteUrl}/ota-management`, name: "Yacht OTA Management" },
        { "@type": "ListItem", position: 2, url: `${siteUrl}/revenue-growth`, name: "Yacht Revenue Management" },
        { "@type": "ListItem", position: 3, url: `${siteUrl}/digital-marketing`, name: "Yacht Charter Marketing" },
        { "@type": "ListItem", position: 4, url: `${siteUrl}/sales-support`, name: "Yacht Enquiry Support" },
      ],
    },
    inLanguage: "en-GB",
  };
  return (
    <>
      <PageHero
        compact
        label="Yacht Growth Partnership"
        title="One Team."
        italic="Complete Growth."
        description="We provide the expertise, systems, and people to maximize your yacht's booking revenue."
        image="/images/hero-aerial-poster.webp"
        imageAlt="Luxury motor yacht resting in calm water at sunset"
        video="/videos/charterx-yacht-aerial-uhd.mp4"
        videoMobile="/videos/charterx-yacht-aerial-uhd.mp4"
        videoPosition="35% center"
        videoMobilePosition="35% center"
        secondaryLabel="View Our Approach"
        secondaryHref="#service-overview"
      />
      <section className="service-index section-shell" id="service-overview">
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="01">Service overview</SectionLabel>
          <h2>Built around the full <em>booking journey.</em></h2>
          <p>Choose a focused engagement or connect the services into one complete commercial operating system.</p>
        </div>
        <div className="service-index-grid">
          {services.map((service) => <a href={service.slug} key={service.number}><span>{service.number}</span><strong>{service.title}</strong><ArrowIcon /></a>)}
        </div>
      </section>
      <div className="service-details">
        {detailSections.map((section, index) => (
          <section className={`service-detail section-shell ${index % 2 ? "service-detail--reverse" : ""}`} id={section.id} key={section.id}>
            <AnimatedImageReveal src={section.image} alt={section.alt} />
            <div className="service-detail-copy reveal-item">
              <SectionLabel index={`0${index + 2}`}>{section.label}</SectionLabel>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
              <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <ButtonLink href={section.cta[1]}>{section.cta[0]}</ButtonLink>
            </div>
          </section>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJson) }} />
      <FinalCTA />
    </>
  );
}
