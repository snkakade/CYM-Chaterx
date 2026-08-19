import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { YachtLoader } from "@/components/YachtLoader";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://charterx.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "CharterX | Yacht Growth & Management", template: "%s | CharterX" },
  description: "Commercial growth for yacht and boat owners through OTA management, sales support, website optimization, digital marketing, and revenue strategy.",
  keywords: ["yacht management", "yacht business growth", "yacht OTA management", "boat rental management", "yacht revenue management", "yacht digital marketing"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CharterX",
    title: "Turn Your Yacht Into a High-Performing Business",
    description: "You operate the yacht. We help grow the business.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CharterX — Turn Your Yacht Into a High-Performing Business" }],
  },
  twitter: { card: "summary_large_image", title: "CharterX", description: "Yacht Growth & Management", images: ["/og.png"] },
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
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        id="top"
      >
        <YachtLoader />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <MotionProvider />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "CharterX", legalName: "Collabrative Yatch Managemnet Limited", url: `${siteUrl}/`, slogan: "You operate the yacht. We help grow the business." },
                { "@type": "ProfessionalService", "@id": `${siteUrl}/#service`, name: "CharterX", legalName: "Collabrative Yatch Managemnet Limited", url: `${siteUrl}/`, serviceType: ["Yacht OTA management", "Yacht revenue management", "Yacht digital marketing"], areaServed: "Worldwide", provider: { "@id": `${siteUrl}/#organization` } },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
