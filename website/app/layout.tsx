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
  title: { default: "CharterX | More Bookings. Less Drift.", template: "%s | CharterX" },
  description: "One focused commercial growth system for yacht listings, pricing, enquiries and digital visibility.",
  keywords: ["yacht management", "yacht business growth", "yacht OTA management", "boat rental management", "yacht revenue management", "yacht digital marketing"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CharterX",
    title: "More Bookings. Less Drift.",
    description: "One commercial growth system for yacht businesses.",
    images: [{ url: "/og-v2.png", width: 1200, height: 630, alt: "CharterX | More bookings. Less drift." }],
  },
  twitter: { card: "summary_large_image", title: "CharterX | More Bookings. Less Drift.", description: "One commercial growth system for yacht businesses.", images: ["/og-v2.png"] },
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
                { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "CharterX", legalName: "Collaborative Yacht Management Limited", url: `${siteUrl}/`, slogan: "You operate the yacht. We help grow the business." },
                { "@type": "ProfessionalService", "@id": `${siteUrl}/#service`, name: "CharterX", legalName: "Collaborative Yacht Management Limited", url: `${siteUrl}/`, serviceType: ["Yacht OTA management", "Yacht revenue management", "Yacht digital marketing"], areaServed: "Worldwide", provider: { "@id": `${siteUrl}/#organization` } },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
