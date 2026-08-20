import type { Metadata } from "next";
import { AnimatedImageReveal } from "@/components/AnimatedImageReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { CommercialEngine } from "@/components/CommercialEngine";
import { CinematicStories } from "@/components/CinematicStories";
import { FinalCTA } from "@/components/FinalCTA";
import { GrowthEngine } from "@/components/GrowthEngine";
import { HomeMediaStory } from "@/components/HomeMediaStory";
import { PageHero } from "@/components/PageHero";
import { LiveWebsitePreview } from "@/components/LiveWebsitePreview";
import { SectionLabel } from "@/components/SectionLabel";
import { ServiceCard } from "@/components/ServiceCard";
import { YachtGrowthScore } from "@/components/YachtGrowthScore";
import { TestimonialSection } from "@/components/TestimonialSection";
import { services } from "@/data/site";
import { socialImage, twitterImage } from "@/data/metadata";

export const metadata: Metadata = {
  title: "Yacht Growth & Management",
  description: "Professional yacht management, OTA distribution, sales support, website optimization, and digital marketing that increase visibility, bookings, and revenue.",
  alternates: { canonical: "/" },
  openGraph: { title: "Turn Your Yacht Into a High-Performing Business", description: "You operate the yacht. We help grow the business.", url: "/", images: [socialImage] },
  twitter: { card: "summary_large_image", title: "CharterX", description: "Turn your yacht into a high-performing business.", images: [twitterImage] },
};

export default function Home() {
  return (
    <div className="revamp-home">
      <PageHero
        label="Commercial Growth · Built Ashore"
        title="Turn Your Yacht Into a"
        italic="High-Performing Business"
        description="We help yacht and boat owners increase bookings, improve visibility and grow revenue through professional yacht management, OTA distribution, dedicated sales and customer support, website optimization and digital marketing."
        image="/images/hero-marina-poster.webp"
        imageAlt="Motor yachts moving through a contemporary marina"
        video="/videos/charterx-marina-hero-hq.mp4"
        videoMobile="/videos/charterx-marina-mobile.mp4"
        videoPosition="center center"
        videoMobilePosition="center center"
        secondaryLabel="Explore Services"
        revamp
      />
      <div className="hero-trust-strip hero-trust">
        <p>For yacht owners, charter operators, boat rental businesses, and marine hospitality brands.</p>
        <div><span>Distribution</span><span>Enquiries</span><span>Conversion</span><span>Revenue</span></div>
      </div>

      <section className="problem-section section-shell">
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="01">The commercial gap</SectionLabel>
          <h2>A beautiful yacht should not sit <em>invisible online.</em></h2>
          <p>Excellent vessels still underperform when the commercial system around them is fragmented. Visibility weakens, enquiries cool, and too much owner time disappears into administration.</p>
        </div>
        <div className="problem-grid">
          {["Low OTA visibility", "Missed inquiries", "Weak website conversion", "Unclear pricing strategy", "Poor listing content", "No follow-up system", "Too much owner admin"].map((problem, index) => (
            <article className="problem-card reveal-item" key={problem}>
              <span>0{index + 1}</span><h3>{problem}</h3><i aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <YachtGrowthScore />

      <HomeMediaStory />

      <section className="positioning-section section-shell">
        <div className="positioning-copy reveal-item">
          <SectionLabel index="02">Your complete growth partner</SectionLabel>
          <h2>One team. Your complete <em>yacht growth partner.</em></h2>
          <p>From getting your yacht listed on the right platforms to generating leads and converting them into bookings, we provide the people, systems and expertise needed to grow your business.</p>
          <p className="positioning-signoff">You operate the yacht. We help grow the business.</p>
          <ButtonLink href="/services" variant="text">See how we work</ButtonLink>
        </div>
        <div className="positioning-visual reveal-item">
          <div className="positioning-visual-head"><span>Commercial engine</span><p>One joined operating view</p></div>
          <CommercialEngine />
          <div className="positioning-visual-foot"><span>Built ashore</span><span>Working worldwide</span></div>
        </div>
      </section>

      <section className="services-preview section-shell">
        <div className="section-heading-grid reveal-item">
          <SectionLabel index="03">Connected growth services</SectionLabel>
          <h2>Everything you need to grow <em>your yacht business.</em></h2>
          <p>From discovery to confirmed booking, every service is designed to improve the quality and consistency of your commercial engine.</p>
        </div>
        <div className="services-grid">{services.map((service) => <ServiceCard service={service} key={service.number} />)}</div>
      </section>

      <GrowthEngine />

      <CinematicStories />

      <section className="split-feature section-shell">
        <AnimatedImageReveal src="/images/revenue-optimization.webp" alt="Luxury yacht in a marina with a restrained performance graph overlay" />
        <div className="split-feature-copy reveal-item">
          <SectionLabel index="05">Commercial clarity</SectionLabel>
          <h2>Your yacht is already an asset. Give it a <em>growth system.</em></h2>
          <p>Commercial performance rarely comes from one isolated change. We connect how your yacht is positioned, found, enquired about, booked, and improved over time.</p>
          <ul className="check-list"><li>A clearer channel strategy</li><li>More consistent enquiry ownership</li><li>Better decisions around pricing and demand</li><li>A direct-booking path you can strengthen</li></ul>
          <ButtonLink href="/contact">Tell Us About Your Yacht</ButtonLink>
        </div>
      </section>

      <TestimonialSection />
      <LiveWebsitePreview />
      <FinalCTA />
    </div>
  );
}
