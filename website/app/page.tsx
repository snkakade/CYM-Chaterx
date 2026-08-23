import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacht OTA Management & Commercial Growth for Yacht Owners",
  description: "Professional yacht OTA management, listing optimisation, enquiry support, website improvement, SEO, paid search, and revenue strategy for yacht owners and charter operators.",
};

export default function Home() {
  return (
    <div className="aqua-page">
      {/* Hero Section */}
      <section className="aqua-hero">
        <div className="aqua-hero-bg">
          <video 
            src="/videos/charterx-marina-hero-hq.mp4" 
            poster="/images/hero-marina-poster.webp" 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div className="aqua-hero-overlay" />
        </div>
        <div className="aqua-hero-content">
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--champagne-500)", marginBottom: "1rem" }}>
            Yacht OTA Management & Commercial Growth
          </p>
          <h1 style={{ marginBottom: "1.5rem" }}>TURN YOUR YACHT INTO A<br/>BETTER-BOOKED BUSINESS.</h1>
          <div className="aqua-location-bar" style={{ background: 'transparent', padding: 0 }}>
             <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
               We help yacht owners and charter operators improve visibility, manage booking platforms, respond to enquiries, strengthen their website, and build a clearer path to revenue.
             </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
            <a href="/contact#enquiry-form" className="button button--aqua-dark">TELL US ABOUT YOUR YACHT</a>
            <a href="#services" className="button button--aqua-cta" style={{ background: "transparent !important", border: "1px solid var(--champagne-500)", color: "var(--champagne-500) !important" }}>EXPLORE SERVICES</a>
          </div>
        </div>
      </section>

      {/* Trust Line */}
      <div style={{ background: "var(--navy-950)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "1.5rem", textAlign: "center" }}>
        <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>
          OTA management. &nbsp;&nbsp;&nbsp; Enquiry support. &nbsp;&nbsp;&nbsp; Revenue strategy. &nbsp;&nbsp;&nbsp; Digital presence.
        </p>
      </div>

      {/* Intro Section */}
      <section style={{ padding: "10rem 2rem", background: "linear-gradient(180deg, white 0%, var(--ivory-100) 100%)", color: "var(--navy-950)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--champagne-500) 100%)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "3.5rem", lineHeight: 1.1, marginBottom: "2rem", color: "var(--navy-950)", letterSpacing: "-0.02em" }}>
              A beautiful yacht still needs a <br/><em style={{ color: "var(--champagne-600)", fontStyle: "italic" }}>commercial system.</em>
            </h2>
            <div style={{ width: "60px", height: "2px", background: "var(--champagne-500)", marginTop: "2rem" }} />
          </div>
          <div>
            <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem", opacity: 0.8, lineHeight: 1.6 }}>Many yachts lose bookings before a guest ever steps onboard.</p>
            <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", opacity: 0.75, lineHeight: 1.7 }}>Listings go stale. Calendars fall out of sync. Enquiries sit unanswered. Pricing becomes guesswork. Websites look good but do not convert. Marketing runs without clear tracking.</p>
            <p style={{ fontSize: "1.1rem", marginBottom: "2.5rem", opacity: 0.75, lineHeight: 1.7 }}>We bring those moving parts together into one calmer, more professional operating rhythm.</p>
            <div style={{ paddingLeft: "1.5rem", borderLeft: "2px solid var(--champagne-500)" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--navy-950)", lineHeight: 1.5 }}>Your yacht stays the experience.<br/><span style={{ color: "var(--champagne-600)" }}>We build the system that helps more people find it, trust it, and book it.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section style={{ padding: "8rem 2rem", background: "linear-gradient(135deg, var(--ivory-100) 0%, white 100%)", color: "var(--navy-950)", borderTop: "1px solid rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <h2 style={{ fontSize: "3rem", color: "var(--navy-950)", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>Built for owners who want more than <em style={{ color: "var(--champagne-600)", fontStyle: "italic" }}>passive listings.</em></h2>
            <div style={{ width: "40px", height: "2px", background: "var(--champagne-500)", margin: "0 auto 2rem" }} />
            <p style={{ opacity: 0.8, maxWidth: "700px", margin: "0 auto", fontSize: "1.15rem", lineHeight: 1.7 }}>We work with yacht owners, boat rental businesses, charter operators, marine hospitality brands, and small fleet owners who want their vessels to perform more consistently across digital channels.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {[
              { title: "Private Yacht Owners", copy: "For owners who want to generate bookings without managing every enquiry, listing, and follow-up personally." },
              { title: "Charter Operators", copy: "For teams that need better structure across platforms, pricing, availability, guest communication, and reporting." },
              { title: "Small Fleets", copy: "For operators managing multiple vessels who need a clearer commercial system behind the scenes." },
              { title: "Marine Experience Brands", copy: "For businesses offering private cruises, day charters, sunset trips, events, and premium water-based experiences." }
            ].map((item, i) => (
              <div key={i} className="premium-hover-card" style={{ background: "white", padding: "3rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.04)", cursor: "default" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--navy-950)" }}>{item.title}</h3>
                <p style={{ opacity: 0.75, lineHeight: 1.6 }}>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="aqua-benefits-section" id="services">
        <h2>Everything around the booking, managed properly.</h2>
        <p style={{ textAlign: "center", opacity: 0.7, maxWidth: "700px", margin: "0 auto 4rem", fontSize: "1.1rem" }}>
          A yacht business does not grow from one channel alone. It grows when visibility, presentation, pricing, response, trust, and follow-up work together.
        </p>
        <div className="aqua-benefits-grid">
          {[
            { 
              title: "OTA Management", 
              copy: "We manage your presence across relevant yacht, boat rental, travel, and experience platforms — keeping listings polished, accurate, and commercially ready.",
              cta: "Improve My Listings",
              link: "/ota-management"
            },
            { 
              title: "Sales & Enquiry Support", 
              copy: "A serious enquiry deserves a fast, clear, and confident response. We help manage customer communication, follow-ups, quote requests, and booking handover.",
              cta: "Discuss Enquiry Support",
              link: "/sales-support"
            },
            { 
              title: "Website & Digital Presence", 
              copy: "Your website should do more than look premium. It should build trust, answer the right questions, and move visitors towards an enquiry.",
              cta: "Review My Website",
              link: "/digital-marketing"
            },
            { 
              title: "SEO & Paid Search", 
              copy: "We help your yacht business appear when guests are actively searching for charters, rentals, private cruises, and marine experiences in your market.",
              cta: "Build Search Visibility",
              link: "/digital-marketing"
            },
            { 
              title: "Revenue & Listing Optimisation", 
              copy: "Better revenue comes from better decisions. We review pricing, availability, demand patterns, listing quality, and channel mix so your yacht is positioned more intelligently.",
              cta: "Request Revenue Review",
              link: "/revenue-growth"
            },
            {
              title: "Transparent Reporting",
              copy: "Clear, straightforward insights into your commercial performance, booking sources, and revenue pipeline so you always know where your business stands.",
              cta: "Explore Our Approach",
              link: "/about"
            }
          ].map((item, i) => (
            <div className="aqua-benefit-card" key={i}>
              <div className="aqua-benefit-number">0{i + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href={item.link} style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--champagne-500)", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", borderBottom: "1px solid var(--champagne-500)", paddingBottom: "0.25rem" }}>
                {item.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why This Matters */}
      <section style={{ padding: "10rem 2rem", background: "radial-gradient(ellipse at top, white 0%, var(--ivory-100) 100%)", color: "var(--navy-950)", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "3.5rem", marginBottom: "2rem", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            Bookings are won in the details <em style={{ color: "var(--champagne-600)", fontStyle: "italic" }}>guests never see.</em>
          </h2>
          <p style={{ fontSize: "1.3rem", marginBottom: "2.5rem", opacity: 0.8, lineHeight: 1.7 }}>
            Before a guest books, they compare. They check photos. They read descriptions. They ask questions. They look for confidence. They notice slow replies. They abandon unclear pages.
          </p>
          <div style={{ width: "40px", height: "2px", background: "var(--champagne-500)", margin: "0 auto 2.5rem" }} />
          <p style={{ fontSize: "1.3rem", marginBottom: "4rem", fontWeight: 600, color: "var(--navy-950)" }}>
            Strong commercial management is not loud. It is quiet, consistent, and precise.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--navy-950)", fontSize: "0.9rem" }}>
            {["The right listing.", "The right price.", "The right response.", "The right page.", "The right follow-up."].map((label, idx) => (
              <span key={idx} style={{ padding: "0.8rem 1.5rem", background: "white", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "2rem", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--champagne-500)" }} />
                {label}
              </span>
            ))}
          </div>
          <p style={{ fontSize: "1.8rem", marginTop: "5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>That is where performance improves.</p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "8rem 2rem", background: "linear-gradient(180deg, var(--ivory-100) 0%, white 100%)", color: "var(--navy-950)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "3rem", color: "var(--navy-950)", marginBottom: "5rem", textAlign: "center", letterSpacing: "-0.02em" }}>Simple from the owner’s side.<br/><em style={{ color: "var(--champagne-600)", fontStyle: "italic" }}>Structured behind the scenes.</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { title: "Review", copy: "We look at your yacht, market, current listings, website, pricing, enquiry flow, and booking process." },
              { title: "Position", copy: "We clarify what makes the yacht appealing, who it is best suited for, and how it should be presented." },
              { title: "Improve", copy: "We update the commercial layers that matter most — listings, copy, pricing, calendars, website journeys, and enquiry handling." },
              { title: "Operate", copy: "We help manage the ongoing rhythm: enquiries, availability, platform updates, reporting, and follow-up." },
              { title: "Refine", copy: "We review what is working, what is being missed, and where the next improvement should be made." }
            ].map((step, i) => (
              <div key={i} style={{ borderTop: "2px solid var(--champagne-300)", paddingTop: "2rem", position: "relative" }}>
                <span style={{ color: "var(--champagne-600)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "0.1em" }}>0{i+1}</span>
                <h3 style={{ fontSize: "1.4rem", margin: "1rem 0", color: "var(--navy-950)" }}>{step.title}</h3>
                <p style={{ opacity: 0.8, fontSize: "1.05rem", lineHeight: 1.6 }}>{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: "8rem 2rem", background: "#0a0a0a", color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "3rem", color: "var(--champagne-500)", marginBottom: "2rem", letterSpacing: "-0.02em" }}>Ready to make the business around your yacht more professional?</h2>
          <p style={{ fontSize: "1.2rem", opacity: 0.8, marginBottom: "3rem", lineHeight: 1.6 }}>Tell us about your vessel, market, current platforms, and booking setup. We will help identify where visibility, enquiries, and revenue structure can improve.</p>
          <a href="/contact#enquiry-form" className="button button--aqua-dark">REQUEST A GROWTH REVIEW</a>
        </div>
      </section>

    </div>
  );
}
