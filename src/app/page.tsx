import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PilotBanner from "@/components/home/PilotBanner";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import FAQ from "@/components/home/FAQ";
import { HOME_FAQS } from "@/data/home-faqs";

export const metadata: Metadata = {
  title: { absolute: "Automazione AI e Marketing Digitale per PMI | Luca Vizza" },
  description:
    "Automatizza i processi della tua PMI e porta nuovi clienti con marketing digitale mirato. Agente vocale AI, CRM, Meta & Google Ads, SEO. Basato in Romagna, lavoro in tutta Italia.",
  keywords: [
    "agente vocale AI",
    "automazione AI PMI",
    "marketing digitale freelance",
    "AI automation PMI",
    "social media marketing Romagna",
    "consulente marketing digitale Italia",
    "freelance marketing Rimini",
    "Meta Ads Google Ads freelance",
  ],
  alternates: {
    canonical: "https://lucavizza.it",
    languages: { it: "https://lucavizza.it" },
  },
  openGraph: {
    title: "Automazione AI e Marketing Digitale per PMI | Luca Vizza",
    description:
      "Automatizza i processi della tua PMI e porta nuovi clienti con marketing digitale mirato. Agente vocale AI, CRM, Meta & Google Ads, SEO.",
  },
  twitter: {
    title: "Automazione AI e Marketing Digitale per PMI | Luca Vizza",
    description:
      "Automatizza i processi della tua PMI e porta nuovi clienti con marketing digitale mirato. Agente vocale AI, CRM, Meta & Google Ads, SEO.",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Luca Vizza",
  url: "https://lucavizza.it",
  description: "Automazione AI e marketing digitale per PMI italiane",
  areaServed: ["Rimini", "Romagna", "Italia"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rimini",
    addressCountry: "IT",
  },
  serviceType: ["Marketing Digitale", "AI Automation", "Agente Vocale AI"],
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q.replace("✦ ", ""),
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <Hero />
      <PilotBanner />
      <ServicesCarousel />
      <FAQ />
    </>
  );
}
