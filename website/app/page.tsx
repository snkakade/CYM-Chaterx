import type { Metadata } from "next";
import Image from "next/image";

const pillars = [
  {
    number: "01",
    eyebrow: "Get discovered",
    title: "Be seen",
    copy: "Sharper listings, smarter channel choices and search visibility that puts your yacht in front of active guests.",
    link: "/ota-management",
    linkLabel: "Explore distribution",
  },
  {
    number: "02",
    eyebrow: "Earn confidence",
    title: "Build trust",
    copy: "A premium digital presence that answers the right questions and gives guests a clear reason to enquire.",
    link: "/digital-marketing",
    linkLabel: "Strengthen your presence",
  },
  {
    number: "03",
    eyebrow: "Turn interest into revenue",
    title: "Win bookings",
    copy: "Responsive enquiry support, thoughtful pricing and consistent follow-up—managed as one commercial rhythm.",
    link: "/revenue-growth",
    linkLabel: "Grow booking value",
  },
] as const;

const process = [
  ["01", "Audit", "Find the friction."],
  ["02", "Position", "Make the offer clear."],
  ["03", "Operate", "Own every enquiry."],
  ["04", "Refine", "Improve what performs."],
] as const;

export const metadata: Metadata = {
  title: "More Yacht Bookings. Less Commercial Drift.",
  description: "CharterX connects yacht listings, pricing, enquiries and digital visibility into one focused commercial growth system.",
};

export default function Home() {
  return (
    <div className="cx-home">
      <section className="cx-hero" aria-labelledby="home-title">
        <div className="cx-hero-media" aria-hidden="true">
          <video
            src="/videos/charterx-sailing-hero-uhd.mp4"
            poster="/images/charterx-sailing-hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
        <div className="cx-hero-shade" aria-hidden="true" />
        <div className="cx-shell cx-hero-inner">
          <p className="cx-kicker">Commercial growth for yacht businesses</p>
          <h1 id="home-title">
            More bookings.<br />
            <em>Less drift.</em>
          </h1>
          <p className="cx-hero-copy">
            We connect listings, pricing, enquiries and digital visibility into one focused growth system.
          </p>
          <div className="cx-actions">
            <a className="cx-button cx-button--gold" href="/contact#enquiry-form">
              Get your growth plan <span aria-hidden="true">↗</span>
            </a>
            <a className="cx-text-link cx-text-link--light" href="#growth-system">
              See the system <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="cx-hero-foot">
          <span>OTA management</span>
          <span>Revenue strategy</span>
          <span>Enquiry support</span>
          <span>Digital growth</span>
        </div>
      </section>

      <section className="cx-reality cx-section cx-shell" id="growth-system">
        <div className="cx-section-index" aria-hidden="true">01 / The opportunity</div>
        <div className="cx-reality-title reveal-item">
          <p className="cx-kicker cx-kicker--dark">Great yacht. Weak system?</p>
          <h2>A remarkable yacht can still be <em>hard to book.</em></h2>
        </div>
        <div className="cx-reality-copy reveal-item">
          <p className="cx-lead">Guests do not see disconnected tools. They feel delay, doubt and friction.</p>
          <p>CharterX turns the commercial work around your yacht into one clear operating system—so every channel feels current, every enquiry has an owner and every improvement has a purpose.</p>
          <a className="cx-text-link" href="/yacht-growth-score">Check your growth score <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="cx-pillars cx-section">
        <div className="cx-shell">
          <div className="cx-heading-row reveal-item">
            <div>
              <p className="cx-kicker">One commercial engine</p>
              <h2>From attention<br />to <em>action.</em></h2>
            </div>
            <p>Three connected levers. One outcome: a yacht business that is easier to discover, trust and book.</p>
          </div>
          <div className="cx-pillar-grid">
            {pillars.map((pillar) => (
              <article className="cx-pillar reveal-item" key={pillar.number}>
                <div className="cx-pillar-top">
                  <span>{pillar.number}</span>
                  <span>{pillar.eyebrow}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
                <a href={pillar.link}>{pillar.linkLabel} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cx-proof cx-section cx-shell">
        <div className="cx-proof-image image-reveal">
          <Image src="/images/charterx-yacht-deck.webp" alt="Refined yacht deck overlooking open water" fill sizes="(max-width: 800px) 100vw, 52vw" />
          <p><span>Precision ashore</span><span>Freedom on the water</span></p>
        </div>
        <div className="cx-proof-copy reveal-item">
          <p className="cx-kicker cx-kicker--dark">Calm on the owner’s side</p>
          <h2>You run the yacht.<br /><em>We run the rhythm.</em></h2>
          <p className="cx-lead">Less channel chasing. Faster decisions. A clearer view of what moves demand.</p>
          <ul>
            <li><span>01</span>Listings that stay sharp</li>
            <li><span>02</span>Enquiries that never drift</li>
            <li><span>03</span>Pricing with a point of view</li>
            <li><span>04</span>Reporting you can act on</li>
          </ul>
        </div>
      </section>

      <section className="cx-process cx-section">
        <div className="cx-shell">
          <div className="cx-heading-row reveal-item">
            <div>
              <p className="cx-kicker">How we work</p>
              <h2>Clear moves.<br /><em>Compounding value.</em></h2>
            </div>
            <p>No inflated strategy theatre. We identify the gaps, prioritise the work and build a commercial rhythm your team can sustain.</p>
          </div>
          <ol className="cx-process-grid">
            {process.map(([number, title, copy]) => (
              <li className="reveal-item" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cx-final">
        <div className="cx-final-media" aria-hidden="true">
          <Image src="/images/charterx-sunset-yacht.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="cx-final-shade" aria-hidden="true" />
        <div className="cx-shell cx-final-inner reveal-item">
          <p className="cx-kicker">Your next move</p>
          <h2>Ready for a yacht business<br />that <em>moves with purpose?</em></h2>
          <p>Start with a focused review of your yacht, market and current booking setup.</p>
          <a className="cx-button cx-button--gold" href="/contact#enquiry-form">
            Start your review <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
