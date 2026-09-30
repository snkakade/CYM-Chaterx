import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { YachtLoader } from "@/components/YachtLoader";
import { GoogleTranslate } from "@/components/GoogleTranslate";
import { ConnectConcierge } from "@/components/ConnectConcierge";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://charterx.example.com";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const interBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Yacht Business Growth & Booking Strategy | CharterX", template: "%s | CharterX" },
  description: "Grow yacht bookings with a sharper commercial system for listings, pricing, enquiries and digital visibility. Request a CharterX growth review.",
  keywords: ["yacht business growth", "yacht OTA management", "yacht listing optimisation", "yacht revenue management", "yacht charter marketing", "yacht enquiry handling", "boat rental management", "yacht booking growth"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CharterX",
    title: "A More Deliberate Yacht Growth System",
    description: "Listings, pricing, enquiries and digital visibility managed as one commercial system.",
    images: [{ url: "/og-v2.png", width: 1200, height: 630, alt: "CharterX yacht business growth system overview" }],
  },
  twitter: { card: "summary_large_image", title: "A More Deliberate Yacht Growth System", description: "Listings, pricing, enquiries and digital visibility managed as one commercial system.", images: ["/og-v2.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body
        id="top"
        className={`${montserrat.variable} ${interBody.variable}`}
        suppressHydrationWarning
      >
        <YachtLoader />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <MotionProvider />
        <CookieConsent />
        <ConnectConcierge whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER} />
        <GoogleTranslate />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "CharterX", legalName: "Collaborative Yacht Management LLP", url: `${siteUrl}/`, email: "connect@cymcharterx.com", slogan: "More bookings. Less drift.", knowsAbout: ["Yacht OTA management", "Yacht listing optimisation", "Yacht revenue management", "Yacht charter marketing", "Yacht enquiry handling", "Yacht website conversion"] },
                { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, name: "CharterX", publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en-GB" },
                { "@type": "WebPage", "@id": `${siteUrl}/#webpage`, url: `${siteUrl}/`, name: "Yacht Business Growth & Booking Strategy | CharterX", isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#organization` }, inLanguage: "en-GB" },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
