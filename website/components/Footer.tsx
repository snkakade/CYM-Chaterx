import { Logo } from "./Logo";

const serviceLinks = [
  ["OTA management", "/ota-management"],
  ["Revenue growth", "/revenue-growth"],
  ["Digital growth", "/digital-marketing"],
  ["Sales support", "/sales-support"],
] as const;

const companyLinks = [
  ["About", "/about"],
  ["Insights", "/insights"],
  ["Growth score", "/yacht-growth-score"],
  ["Privacy", "/privacy"],
] as const;

export function Footer() {
  return (
    <footer className="cx-footer">
      <div className="cx-footer-main">
        <div className="cx-footer-brand">
          <Logo />
          <p>One commercial system for a yacht business that moves with purpose.</p>
          <a href="mailto:info@charterx.com">info@charterx.com</a>
        </div>
        <nav aria-label="Footer services">
          <p>Services</p>
          {serviceLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <nav aria-label="Footer company">
          <p>Company</p>
          {companyLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="cx-footer-cta">
          <p>Ready to grow?</p>
          <h2>Make your yacht easier to book.</h2>
          <div className="cx-footer-actions">
            <a href="/contact#enquiry-form">Start your review <span aria-hidden="true">↗</span></a>
            <a href="/contact#enquiry-form" data-open-concierge data-concierge-mode="whatsapp">WhatsApp or request a call</a>
          </div>
        </div>
      </div>
      <div className="cx-footer-bottom">
        <p>© {new Date().getFullYear()} CharterX</p>
        <p>Trading as Collabrative Yacht Management Limited.</p>
        <a href="/admin/login">Admin login</a>
        <a href="/privacy">Privacy</a>
      </div>
    </footer>
  );
}
