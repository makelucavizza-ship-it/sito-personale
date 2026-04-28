import type { Metadata } from "next";
import { Syne, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-phenomena",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sailors",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luca Vizza — Marketing Digitale & AI Automation",
    template: "%s | Luca Vizza",
  },
  description:
    "Freelance di marketing digitale e AI automation per PMI italiane. Cresciamo insieme con l'AI.",
  keywords: ["marketing digitale", "AI automation", "freelance", "PMI", "Romagna", "Italia"],
  authors: [{ name: "Luca Vizza" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://lucavizza.it",
    siteName: "Luca Vizza",
    title: "Luca Vizza — Marketing Digitale & AI Automation",
    description:
      "Freelance di marketing digitale e AI automation per PMI italiane. Cresciamo insieme con l'AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Vizza — Marketing Digitale & AI Automation",
    description:
      "Freelance di marketing digitale e AI automation per PMI italiane.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${syne.variable} ${dmSerif.variable}`}>
      <body>
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
        {/* Consent Mode v2 — imposta default PRIMA che GA4 carichi */}
        <Script id="ga4-consent" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          try {
            var c = JSON.parse(localStorage.getItem('lv_cookie_consent') || 'null');
            gtag('consent', 'default', {
              analytics_storage: c && c.analytics ? 'granted' : 'denied',
              ad_storage: c && c.marketing ? 'granted' : 'denied',
              ad_user_data: c && c.marketing ? 'granted' : 'denied',
              ad_personalization: c && c.marketing ? 'granted' : 'denied',
              wait_for_update: 500,
            });
          } catch(e) {
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });
          }
        `}</Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7PTK1QG0CG" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7PTK1QG0CG');
        `}</Script>
      </body>
    </html>
  );
}
