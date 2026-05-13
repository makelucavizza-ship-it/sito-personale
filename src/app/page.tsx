import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PilotBanner from "@/components/home/PilotBanner";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import FAQ from "@/components/home/FAQ";

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

const STATIC_FAQS = [
  {
    q: "Quanto costa lavorare con te?",
    a: "Non ho listini fissi perché ogni situazione è diversa. Parto sempre dal calcolatore gratuito per capire cosa ti serve davvero, poi faccio una proposta su misura. Niente pacchetti gonfiati, niente costi nascosti.",
  },
  {
    q: "Non sono molto pratico di digitale. È un problema?",
    a: "No, è esattamente il tipo di cliente con cui lavoro meglio. Parto da zero, spiego tutto senza gergo tecnico e costruisco strumenti che sai usare da solo. Il mio obiettivo non è renderti dipendente da me — è darti strumenti che puoi gestire.",
  },
  {
    q: "Da dove si parte?",
    a: "Prova il calcolatore gratuito — 5 minuti, nessun obbligo. Ricevi un report personalizzato e poi decidiamo insieme se e come andare avanti. Non ti chiamo dieci volte per venderti qualcosa.",
  },
  {
    q: "Cos'è un agente vocale AI e mi serve davvero?",
    a: "È un assistente che risponde al telefono al posto tuo: raccoglie prenotazioni, risponde alle domande frequenti, smista le chiamate. Se perdi clienti perché non riesci a rispondere sempre al telefono — sì, probabilmente ti serve.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: STATIC_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
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
      <section className="max-w-3xl mx-auto px-6 py-10 border-t border-primary/10">
        <h2
          className="text-2xl font-bold text-primary mb-6"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Risposte veloci
        </h2>
        <dl className="space-y-6">
          {STATIC_FAQS.map((faq) => (
            <div key={faq.q}>
              <dt
                className="text-base font-bold text-primary mb-1"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {faq.q}
              </dt>
              <dd className="text-sm text-primary/60 leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
