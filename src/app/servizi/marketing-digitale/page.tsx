import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Freelance Marketing Digitale per PMI",
  description:
    "Marketing digitale per PMI italiane: Meta & Google Ads, social media, SEO, email marketing integrati con automazioni AI. Ogni euro speso deve tornare indietro moltiplicato.",
  alternates: {
    canonical: "https://lucavizza.it/servizi/marketing-digitale",
  },
};

const SERVICES = [
  {
    title: "Social Media Marketing",
    desc: "Strategia, piano editoriale e gestione dei canali social. Contenuti che parlano davvero al tuo pubblico.",
    color: "#3ad3ef",
    tags: ["Instagram", "Facebook", "LinkedIn", "TikTok"],
  },
  {
    title: "Meta & Google Ads",
    desc: "Campagne pubblicitarie data-driven con ottimizzazione continua. Ogni euro speso deve tornare indietro moltiplicato.",
    color: "#ee826d",
    tags: ["Meta Ads", "Google Ads", "Retargeting", "Lookalike"],
  },
  {
    title: "Email Marketing",
    desc: "Newsletter, automazioni e sequenze di nurturing. L'email ha ancora il ROI più alto di qualsiasi canale.",
    color: "#5bc783",
    tags: ["Newsletter", "Automation", "Segmentazione", "A/B test"],
  },
  {
    title: "Content Strategy",
    desc: "Piano contenuti allineato ai tuoi obiettivi di business. Non pubblico per pubblicare: ogni contenuto ha uno scopo.",
    color: "#ffbd59",
    tags: ["Blog", "Copywriting", "Video script", "UGC"],
  },
  {
    title: "SEO",
    desc: "Visibilità organica sui motori di ricerca. Traffico qualificato che non dipende dal budget pubblicitario.",
    color: "#544fb3",
    tags: ["On-page SEO", "Local SEO", "Keyword research", "Analytics"],
  },
  {
    title: "Funnel Marketing",
    desc: "Costruisco il percorso dal primo contatto all'acquisto, integrando tutti i canali e automatizzando dove possibile.",
    color: "#5ed5bf",
    tags: ["Lead generation", "Landing page", "CRO", "Follow-up"],
  },
];

export default function MarketingDigitalePage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="px-6 py-16 max-w-5xl mx-auto relative">
        <span
          className="inline-block text-sm font-bold text-coral uppercase tracking-widest mb-4"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Servizio
        </span>
        <h1
          className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-4"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Marketing digitale che converte,
          <br />
          <span className="text-coral">non che impressiona.</span>
        </h1>
        <p className="text-xl text-primary/70 max-w-2xl mb-10 leading-relaxed">
          Non vendo follower o impression. Costruisco strategie che portano
          clienti veri — con dati, creatività e metodo. Ogni azione è
          misurabile e orientata al risultato.
        </p>
        <Link
          href="/audit"
          className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold text-lg hover:from-[#d4602a] hover:to-[#b84d24] transition-all hover:scale-105 inline-block"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Analizza il tuo marketing →
        </Link>
      </section>

      {/* Services grid */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-primary mb-10"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Cosa include
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-7 border-2 hover:shadow-md transition-all duration-300"
              style={{ borderColor: s.color + "40", backgroundColor: s.color + "08" }}
            >
              <div
                className="w-8 h-1 rounded-full mb-4"
                style={{ backgroundColor: s.color }}
              />
              <h3
                className="text-xl font-bold text-primary mb-2"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-primary/60 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: s.color + "20", color: s.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrazione AI */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <div className="rounded-3xl border-2 border-accent-3/30 bg-accent-3/5 px-8 py-10">
          <h2
            className="text-2xl md:text-3xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Perché questo marketing funziona meglio
          </h2>
          <p className="text-primary/70 leading-relaxed max-w-2xl mb-4">
            Il marketing che faccio è progettato per lavorare insieme alle automazioni AI,
            non in parallelo. Portare traffico con le ads è inutile se le chiamate generate
            vanno perse perché il titolare è occupato — e questo accade ogni giorno nelle PMI.
          </p>
          <p className="text-primary/70 leading-relaxed max-w-2xl">
            Quando ads, agente vocale e CRM lavorano insieme, ogni euro speso in pubblicità
            si trasforma in un contatto raccolto, qualificato e seguito. È questa integrazione
            il vero vantaggio competitivo — non i follower o il numero di campagne attive.
          </p>
        </div>
      </section>

      {/* Metodo */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold text-primary mb-8"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Il mio metodo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Audit",
              desc: "Analisi dei canali attivi: Google Ads, Meta, sito web e scheda Google My Business. Emerge cosa si sta sprecando, quali opportunità non sono sfruttate e se i canali parlano la stessa lingua. L'output è un documento sintetico con le priorità di intervento — non un report da 40 pagine.",
            },
            { step: "02", title: "Strategia", desc: "Piano d'azione personalizzato con obiettivi chiari e KPI misurabili." },
            { step: "03", title: "Esecuzione", desc: "Implementazione con aggiornamenti frequenti e aggiustamenti in tempo reale." },
            { step: "04", title: "Report", desc: "Report mensili trasparenti. Sai sempre cosa succede e perché." },
          ].map((item) => (
            <div key={item.step} className="relative">
              <span
                className="text-5xl font-bold text-accent-1/20 block mb-2"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {item.step}
              </span>
              <h3
                className="text-xl font-bold text-primary mb-2"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-primary/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center max-w-3xl mx-auto">
        <h2
          className="text-4xl font-bold text-primary mb-4"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Iniziamo dall&apos;audit
        </h2>
        <p className="text-primary/60 mb-8">
          5 minuti per capire dove sei e dove puoi arrivare.
          Gratis, senza impegno.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/audit"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Calcolatore gratuito
          </Link>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full border-2 border-primary/20 text-primary font-bold hover:border-primary/40 transition-colors"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Parlami del tuo progetto →
          </Link>
        </div>
      </section>
    </div>
  );
}
