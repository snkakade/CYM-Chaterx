import type { Metadata } from "next";
import { AnimatedImageReveal } from "@/components/AnimatedImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { SectionLabel } from "@/components/SectionLabel";
import { VideoFeature } from "@/components/VideoFeature";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Website Design, SEO & Digital Marketing",
  description: "Conversion-focused yacht website design, SEO, paid search, landing pages, analytics, and enquiry tracking for yacht charter and boat rental businesses.",
  alternates: { canonical: "/digital-marketing" },
  openGraph: { title: "Yacht Website Design, SEO & Digital Marketing", description: "Make your digital presence work like a sales asset.", url: "/digital-marketing", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "Yacht Digital Marketing", description: "Make your digital presence work like a sales asset.", images: [twitterImage] },
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
  return (
    <>
      <PageHero
        label="Digital Presence"
        title="Make your website work like a sales asset."
        description="We improve yacht websites, landing pages, SEO, paid search, enquiry tracking, and campaign foundations so your digital presence supports real commercial outcomes."
        image="/images/hero-yacht-wake-poster.webp"
        imageAlt="Top-down aerial view of a yacht moving through dark blue water"
        video="/videos/charterx-yacht-wake-uhd.mp4"
        videoMobile="/videos/charterx-yacht-wake-uhd.mp4"
        videoPosition="35% center"
        videoMobilePosition="35% center"
        primaryLabel="Review My Website"
        secondaryLabel="Explore Digital Services"
        secondaryHref="#digital-capabilities"
      />
      <section className="digital-intro section-shell">
        <AnimatedImageReveal src="/images/search-visibility.webp" alt="Coastline map with a subtle search visibility overlay" />
        <div className="digital-intro-copy reveal-item">
          <SectionLabel index="01">Website Strategy</SectionLabel>
          <h2>Premium design is <em>only the beginning.</em></h2>
          <p>A yacht website should create confidence quickly. Guests need to understand the vessel, the experience, the location, the process, what is included, and how to enquire. If the site is beautiful but unclear, it is not doing its job.</p>
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
      <FinalCTA />
    </>
  );
}
