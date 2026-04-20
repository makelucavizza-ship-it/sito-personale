import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    <html lang="it">
      <body>
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
