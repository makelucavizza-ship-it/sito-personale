import type { Metadata } from "next";
import { Syne, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
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
      </body>
    </html>
  );
}
