import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";

export const metadata: Metadata = {
  title: { absolute: "Guide AI e Automazione per PMI | Luca Vizza" },
  description:
    "Guide pratiche e gratuite su come l'AI può cambiare un'attività concreta: agente vocale, automazioni, ristoranti, saloni. Nessuna vendita, solo informazioni utili.",
  alternates: {
    canonical: "https://lucavizza.it/guide",
  },
};

const GUIDE = [
  {
    href: "/guide/agente-vocale-ai-cos-e-come-funziona",
    title: "Agente vocale AI: cos'è e come funziona",
    desc: "Una spiegazione senza tecnicismi di cosa fa un agente vocale AI, come si integra con il tuo numero di telefono e in quali settori ha più senso usarlo.",
    tag: "Fondamentale",
    color: "#3ad3ef",
  },
  {
    href: "/guide/come-non-perdere-chiamate-ristorante",
    title: "Come non perdere chiamate al ristorante",
    desc: "Quante prenotazioni perde un ristorante durante il servizio? Quali soluzioni esistono, a che costo, e quando un agente vocale AI è la risposta giusta.",
    tag: "Ristorazione",
    color: "#ee826d",
  },
  {
    href: "/guide/automazione-ai-per-ristoranti",
    title: "Automazione AI per ristoranti: cosa si può fare oggi",
    desc: "Dai 5-6 strumenti AI concreti già usati da ristoranti normali: risposta chiamate, gestione prenotazioni, CRM clienti abituali, WhatsApp marketing e altro.",
    tag: "Ristorazione",
    color: "#5bc783",
  },
  {
    href: "/guide/automazione-ai-per-saloni-centri-estetici",
    title: "Automazione AI per saloni e centri estetici",
    desc: "Il telefono squilla mentre hai le mani occupate. Gli appuntamenti sono su carta o WhatsApp. Zero follow-up. Ecco come risolvere tutto e quante ore si risparmia.",
    tag: "Benessere",
    color: "#544fb3",
  },
];

export default function GuidePage() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16">
          <span
            className="inline-block text-sm font-bold text-accent-3 uppercase tracking-widest mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Risorse gratuite
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-primary leading-tight mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Guide pratiche su AI
            <br />e automazione per PMI
          </h1>
          <ColorBar className="w-32 mb-8" height={4} />
          <p className="text-lg text-primary/70 max-w-2xl leading-relaxed">
            Queste guide sono risorse gratuite per capire come l&apos;AI può cambiare
            un&apos;attività concreta — senza vendere nulla. Se dopo averle lette hai
            domande, sai dove trovarmi.
          </p>
        </section>

        {/* Guide cards */}
        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUIDE.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group block rounded-2xl border-2 p-7 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: g.color + "40", backgroundColor: g.color + "06" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-1 rounded-full" style={{ backgroundColor: g.color }} />
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: g.color }}
                  >
                    {g.tag}
                  </span>
                </div>
                <h2
                  className="text-xl font-bold text-primary mb-3 group-hover:text-coral transition-colors leading-snug"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {g.title}
                </h2>
                <p className="text-primary/60 text-sm leading-relaxed mb-4">{g.desc}</p>
                <span
                  className="text-sm font-bold"
                  style={{ color: g.color }}
                >
                  Leggi la guida →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
