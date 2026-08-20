import { Logo } from "./Logo";

const serviceLinks = [
  ["OTA Management", "/ota-management"],
  ["Revenue Growth", "/revenue-growth"],
  ["Digital Marketing", "/digital-marketing"],
  ["All Services", "/services"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-promise">
          <Logo />
          <h2>You operate the yacht.<br /><em>We help grow the business.</em></h2>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Explore</p>
            {serviceLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </div>
          <div>
            <p className="footer-label">Company</p>
            <a href="/about">About</a>
            <a href="/insights">Insights</a>
            <a href="/contact">Contact</a>
            <a href="/contact#strategy-call">Book a Strategy Call</a>
          </div>
        </div>
      </div>
      <div className="footer-utility">
        <p>Privacy &amp; access</p>
        <nav aria-label="Privacy and access links">
          <a href="/privacy">Privacy Policy</a>
          <button type="button" data-cookie-preferences>Cookie Preferences</button>
          <a href="/admin/login">Admin Login</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CharterX. All rights reserved.</p>
        <p>CharterX is a trading name of Collabrative Yatch Managemnet Limited.</p>
        <a className="footer-credit" href="https://shreyashkakade.com/websites" target="_blank" rel="noreferrer">Designed by Shreyash K</a>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
