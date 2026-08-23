import { Logo } from "./Logo";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaArrowRight } from "react-icons/fa6";
import { SiTripadvisor } from "react-icons/si";
import { CardStripe, CardAmex, CardVisa, CardMastercard, CardApplePay } from "./PaymentCards";

export function Footer() {
  return (
    <footer className="aqua-footer">

      <div className="footer-cta-banner">
        <h2>Sharper thinking for yacht owners.</h2>
        <p>Occasional notes on listing quality, enquiry flow, OTA performance, direct bookings, and revenue strategy.</p>
        <div className="footer-newsletter">
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button type="button" aria-label="Subscribe"><FaArrowRight /></button>
        </div>
      </div>
      
      <div className="aqua-footer-inner">
        <div className="aqua-footer-col">
          <div className="footer-logo-wrapper">
             <Logo />
             <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", maxWidth: "200px", lineHeight: 1.5 }}>
               You operate the yacht. We manage the business around it.
             </p>
          </div>
          <div className="footer-contact-links">
            <a href="mailto:info@charterx.com">EMAIL US</a>
            <a href="tel:+1234567890">CALL US</a>
            <a href="https://wa.me/1234567890">WHATSAPP</a>
          </div>
          <div className="footer-social-links">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="TripAdvisor"><SiTripadvisor /></a>
          </div>
        </div>
        
        <div className="aqua-footer-col">
          <div className="links-grid">
            <div>
              <p className="footer-list-title">Services</p>
              <a href="/ota-management">OTA MANAGEMENT</a>
              <a href="/revenue-growth">REVENUE STRATEGY</a>
              <a href="/digital-marketing">WEBSITE & DIGITAL MARKETING</a>
              <a href="/sales-support">ENQUIRY SUPPORT</a>
              <a href="/yacht-growth-score">YACHT GROWTH SCORE</a>
            </div>
            <div>
              <p className="footer-list-title">Company</p>
              <a href="/about">ABOUT</a>
              <a href="/insights">INSIGHTS</a>
              <a href="/contact#enquiry-form">CONTACT</a>
              <a href="/privacy">PRIVACY POLICY</a>
            </div>
          </div>
        </div>
        
        <div className="aqua-footer-col aqua-footer-col--right">
          <a href="/contact#enquiry-form" className="button button--aqua-cta footer-cta">REQUEST A GROWTH REVIEW</a>
          <div className="footer-rating">
            <strong>4.9</strong>
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          <div className="footer-payment-icons" style={{ justifyContent: "flex-end", marginBottom: "1.5rem" }}>
            <CardStripe />
            <CardApplePay />
            <CardAmex />
            <CardVisa />
            <CardMastercard />
          </div>
          <div className="footer-legal">
             <p>© {new Date().getFullYear()} CharterX.</p>
             <p>Trading as Collabrative Yacht Management Limited.</p>
             <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      <div className="footer-watermark notranslate">
        <span>CHARTERX</span>
      </div>
    </footer>
  );
}
