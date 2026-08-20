import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CharterX collects, uses, stores, and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | CharterX",
    description: "How CharterX handles website and enquiry information.",
    url: "/privacy",
  },
  twitter: { card: "summary", title: "Privacy Policy | CharterX", description: "How CharterX handles website and enquiry information." },
};

export default function PrivacyPage() {
  return (
    <article className="privacy-page section-shell">
      <header className="privacy-header">
        <SectionLabel>Privacy &amp; data</SectionLabel>
        <h1>Privacy Policy</h1>
        <p>Effective 20 August 2026</p>
      </header>
      <div className="privacy-layout">
        <aside>
          <p>Data controller</p>
          <strong>Collabrative Yatch Managemnet Limited</strong>
          <span>Trading as CharterX</span>
        </aside>
        <div className="privacy-content">
          <section><h2>Information we collect</h2><p>When you submit an enquiry, we collect the details you choose to provide, such as your name, contact information, vessel details, market, booking setup, website address, commercial goals, and message. We also receive limited technical information needed to deliver and secure the website.</p></section>
          <section><h2>How we use information</h2><p>We use your information to respond to enquiries, assess where CharterX may be able to help, manage follow-ups, prepare requested commercial documents, maintain service records, protect the website, and meet legal obligations. We do not sell personal information.</p></section>
          <section><h2>Analytics and cookies</h2><p>Google Analytics remains disabled until you accept analytics cookies. If accepted, analytics helps us understand aggregated website usage and improve performance. Advertising storage and advertising personalisation remain disabled. You can reopen Cookie Preferences from the footer at any time.</p></section>
          <section><h2>Storage, sharing, and retention</h2><p>Enquiry and operational data may be stored using service providers that support our website and business systems, including Cloudflare infrastructure. We share information only where needed to operate the service, respond to you, comply with law, or protect legitimate interests. We retain information only for as long as it remains reasonably necessary for those purposes.</p></section>
          <section><h2>Your choices and rights</h2><p>Depending on where you live, you may have rights to access, correct, delete, restrict, or object to the use of your personal information. You may also withdraw analytics consent through Cookie Preferences. To make a privacy request, use the CharterX contact form and state that your message concerns privacy.</p></section>
          <section><h2>Security and updates</h2><p>We use proportionate technical and organisational safeguards, but no internet service can guarantee absolute security. We may update this policy as the website, services, or legal requirements change. The effective date above identifies the current version.</p></section>
          <a className="privacy-contact" href="/contact#enquiry-form">Contact CharterX about privacy</a>
        </div>
      </div>
    </article>
  );
}
