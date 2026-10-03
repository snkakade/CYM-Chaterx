import type { Metadata } from "next";
import { AnimatedImageReveal } from "@/components/AnimatedImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { VideoFeature } from "@/components/VideoFeature";
import { digitalFaqs } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cymcharterx.com";

export const metadata: Metadata = {
  title: "Yacht Charter Marketing & Website SEO",
  description: "Improve yacht charter marketing with conversion-focused websites, SEO, paid search and enquiry tracking. Request a digital growth review.",
  alternates: { canonical: "/digital-marketing" },
  openGraph: { title: "Turn Your Yacht Website Into a Sales Asset", description: "Website, SEO, paid search and measurement designed around qualified charter enquiries.", url: "/digital-marketing", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Turn Your Yacht Website Into a Sales Asset", description: "Website, SEO, paid search and measurement designed around qualified charter enquiries.", images: [twitterImage] },
};

const capabilities = [
  ["Website Review", "We identify where visitors lose confidence, get confused, or fail to enquire."],
  ["Conversion Copy", "We write service pages that answer real guest questions and support enquiry quality."],
  ["Landing Pages", "We create focused pages for key markets, services, seasons, and campaigns."],
  ["SEO", "We build search visibility around the terms guests use when they are ready to compare or enquire."],
  ["Paid Search", "We structure Google Ads campaigns around intent, not vanity traffic."],
  ["Analytics", "We track meaningful actions: calls, forms, WhatsApp clicks, enquiry starts, and confirmed lead sources."],
  ["Remarketing Readiness", "We prepare the site for future Meta and Google campaigns with clean tracking foundations."],
] as const;

export default function DigitalMarketingPage() {
  const serviceJson = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${siteUrl}/digital-marketing#webpage`, url: `${siteUrl}/digital-marketing`, name: "Yacht Charter Marketing & Website SEO | CharterX", isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${siteUrl}/digital-marketing#service` }, inLanguage: "en-GB" },
      { "@type": "Service", "@id": `${siteUrl}/digital-marketing#service`, name: "Yacht Charter Marketing", serviceType: "Yacht website design, SEO and digital marketing", url: `${siteUrl}/digital-marketing`, description: "Conversion-focused yacht website design, SEO, paid search, landing pages, analytics and enquiry tracking.", provider: { "@id": `${siteUrl}/#organization` }, areaServed: "Worldwide", audience: [{ "@type": "BusinessAudience", name: "Yacht owners" }, { "@type": "BusinessAudience", name: "Charter operators" }, { "@type": "BusinessAudience", name: "Boat rental businesses" }] },
      { "@type": "BreadcrumbList", "@id": `${siteUrl}/digital-marketing#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` }, { "@type": "ListItem", position: 3, name: "Digital Marketing", item: `${siteUrl}/digital-marketing` }] },
    ],
  };
  const faqJson = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: digitalFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return (
    <>
      <PageHero
        label="Digital Presence"
        title="Make your website work like a sales asset."
        description="We improve yacht websites, landing pages, SEO, paid search, enquiry tracking, and campaign foundations so your digital presence supports real commercial outcomes."
        image="/images/hero-yacht-wake-poster.webp"
        imageAlt="Top-down aerial view of a yacht moving through dark blue water"
        video="/videos/charterx-yacht-wake-uhd.mp4"
        videoMobile="/videos/charterx-yacht-wake.mp4"
        videoPosition="35% center"
        videoMobilePosition="35% center"
        primaryLabel="Review My Website"
        secondaryLabel="Explore Digital Services"
        secondaryHref="#digital-capabilities"
      />
      <section className="digital-intro section-shell">
        <AnimatedImageReveal src="/images/search-visibility.webp" alt="Coastline map illustrating yacht charter search visibility" />
        <div className="digital-intro-copy reveal-item">
          <SectionLabel index="01">Website Strategy</SectionLabel>
          <h2>Premium design is <em>only the beginning.</em></h2>
          <p>A <a href="/insights/yacht-website-sales-asset">yacht website</a> should create confidence quickly. Guests need to understand the vessel, the experience, the location, the process, what is included, and <a href="/sales-support">how to enquire</a>. If the site is beautiful but unclear, it is not doing its job.</p>
          <ButtonLink href="/contact#enquiry-form">Review My Website</ButtonLink>
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
        <div className="section-heading-grid reveal-item"><SectionLabel index="02">Digital Capabilities</SectionLabel><h2>Every layer of a stronger direct presence.</h2><p>Use the full programme or start with the commercial layer creating the most friction today.</p></div>
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
      
      <section className="faq-section section-shell">
        <div className="faq-heading reveal-item">
          <SectionLabel index="05">Frequently Asked</SectionLabel>
          <h2>Digital marketing, <em>clearly explained.</em></h2>
        </div>
        <FAQAccordion items={digitalFaqs} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <FinalCTA />
    </>
  );
}
