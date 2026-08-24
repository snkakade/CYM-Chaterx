import Image from "next/image";
import { ButtonLink } from "./ButtonLink";

export function FinalCTA() {
  return (
    <section className="final-cta">
      <Image src="/images/yacht-wake.webp" alt="A yacht wake leading toward a calm dawn horizon" fill sizes="100vw" />
      <div className="final-cta-overlay" />
      <div className="final-cta-content reveal-item">
        <p className="kicker">Your next passage</p>
        <h2>Ready to grow your <em>yacht business?</em></h2>
        <p>Tell us about your yacht, your market and your current setup. We’ll show you where we can help increase your visibility, bookings and revenue.</p>
        <div>
          <ButtonLink href="/contact#enquiry-form">Get Started</ButtonLink>
          <a className="button button--light" href="/contact#enquiry-form" data-open-concierge data-concierge-mode="whatsapp">WhatsApp Us</a>
        </div>
      </div>
    </section>
  );
}
