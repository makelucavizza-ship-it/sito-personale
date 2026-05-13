import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";

export const metadata: Metadata = {
  title: { absolute: "Automazione AI per Saloni e Centri Estetici | Luca Vizza" },
  description:
    "Il telefono squilla mentre hai le mani occupate. Gli appuntamenti su carta o WhatsApp manuale. Zero follow-up. Ecco come l'AI risolve i problemi specifici di saloni e centri estetici.",
  alternates: {
    canonical: "https://lucavizza.it/guide/automazione-ai-per-saloni-centri-estetici",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automazione AI per saloni e centri estetici: meno telefonate perse, più appuntamenti",
  description:
    "Il telefono squilla mentre hai le mani occupate. Gli appuntamenti su carta o WhatsApp manuale. Zero follow-up. Ecco come l'AI risolve i problemi specifici di saloni e centri estetici.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-13",
  url: "https://lucavizza.it/guide/automazione-ai-per-saloni-centri-estetici",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "I miei clienti sono abituati a WhatsApp. L'agente vocale funziona anche lì?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. È possibile configurare un bot WhatsApp Business che gestisce prenotazioni e risponde a domande frequenti direttamente in chat. Molti saloni usano entrambi: l'agente vocale per le chiamate e il bot WhatsApp per i messaggi.",
      },
    },
    {
      "@type": "Question",
      name: "Quante no-show riesce a ridurre un sistema di reminder automatici?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I dati tipici mostrano una riduzione delle no-show tra il 30% e il 50% con reminder automatici via WhatsApp o SMS inviati 24 ore prima dell'appuntamento. Per un salone con 5-6 no-show al mese, si parla di 2-3 appuntamenti recuperati ogni mese.",
      },
    },
    {
      "@type": "Question",
      name: "Ho un'agenda cartacea. Devo passare a un sistema digitale per prima cosa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non necessariamente per iniziare. L'agente vocale può operare in modo semi-automatico: raccoglie la prenotazione e te la invia via WhatsApp o email. Puoi poi trascriverla dove preferisci. La migrazione completa verso un calendario digitale è un passo successivo, non un prerequisito.",
      },
    },
    {
      "@type": "Question",
      name: "L'AI può suggerire servizi aggiuntivi durante la prenotazione?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Se configurato, durante la prenotazione l'agente può chiedere se il cliente è interessato a un trattamento aggiuntivo o a una promozione attiva. È uno dei modi in cui molti saloni aumentano il valore medio dell'appuntamento senza che il titolare faccia nulla.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "I miei clienti sono abituati a WhatsApp. L'agente vocale funziona anche lì?",
    a: "Sì. È possibile configurare un bot WhatsApp Business che gestisce prenotazioni e risponde a domande frequenti direttamente in chat. Molti saloni usano entrambi: l'agente vocale per le chiamate e il bot WhatsApp per i messaggi.",
  },
  {
    q: "Quante no-show riesce a ridurre un sistema di reminder automatici?",
    a: "I dati tipici mostrano una riduzione delle no-show tra il 30% e il 50% con reminder automatici via WhatsApp o SMS inviati 24 ore prima dell'appuntamento. Per un salone con 5-6 no-show al mese, si parla di 2-3 appuntamenti recuperati ogni mese.",
  },
  {
    q: "Ho un'agenda cartacea. Devo passare a un sistema digitale per prima cosa?",
    a: "Non necessariamente per iniziare. L'agente vocale può operare in modo semi-automatico: raccoglie la prenotazione e te la invia via WhatsApp o email. Puoi poi trascriverla dove preferisci. La migrazione completa verso un calendario digitale è un passo successivo, non un prerequisito.",
  },
  {
    q: "L'AI può suggerire servizi aggiuntivi durante la prenotazione?",
    a: "Sì. Se configurato, durante la prenotazione l'agente può chiedere se il cliente è interessato a un trattamento aggiuntivo o a una promozione attiva. È uno dei modi in cui molti saloni aumentano il valore medio dell'appuntamento senza che il titolare faccia nulla.",
  },
];

export default function GuideAISaloni() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="pt-8 pb-4 text-sm text-primary/40 flex items-center gap-2">
            <Link href="/guide" className="hover:text-primary transition-colors">Guide</Link>
            <span>›</span>
            <span>AI per saloni e centri estetici</span>
          </nav>

          {/* Header */}
          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-accent-4 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Benessere
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Automazione AI per saloni e
              centri estetici: meno telefonate
              perse, più appuntamenti
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              Il telefono squilla mentre hai le mani nel colore o stai facendo un trattamento.
              Gli appuntamenti sono su carta o su un gruppo WhatsApp. I clienti che non vengono
              non ricevono nessun reminder. Ecco come cambia la situazione con l&apos;AI.
            </p>
          </header>

          <article className="space-y-12 pb-16">

            {/* Il problema del settore */}
            <section>
              <h2
                className="text-2xl font-bold text-primary mb-4"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Il problema specifico del settore
              </h2>
              <p className="text-primary/70 leading-relaxed mb-4">
                Saloni e centri estetici hanno una caratteristica che li accomuna:
                il titolare e i collaboratori lavorano con le mani — e quando lavori con le mani,
                non puoi rispondere al telefono. Non è pigrizia o disorganizzazione.
                È la natura del lavoro.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { problem: "Chiamate perse durante i trattamenti", impact: "Nuovi clienti che vanno dalla concorrenza", color: "#ee826d" },
                  { problem: "Appuntamenti su carta o WhatsApp manuale", impact: "Errori, sovrapposizioni, tempo sprecato", color: "#ffbd59" },
                  { problem: "Zero follow-up ai clienti che non tornano", impact: "Perdita silenziosa di clienti abituali", color: "#544fb3" },
                ].map((p) => (
                  <div
                    key={p.problem}
                    className="p-4 rounded-xl border-2"
                    style={{ borderColor: p.color + "40", backgroundColor: p.color + "08" }}
                  >
                    <p className="text-sm font-bold text-primary mb-1" style={{ fontFamily: "Phenomena, sans-serif" }}>
                      {p.problem}
                    </p>
                    <p className="text-xs text-primary/50 leading-relaxed">{p.impact}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Soluzioni */}
            <section>
              <h2
                className="text-2xl font-bold text-primary mb-6"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Le soluzioni AI per saloni e centri estetici
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Agente vocale per le prenotazioni",
                    desc: "Risponde al telefono mentre sei occupata, prende il nome, il servizio richiesto e l'orario preferito. Controlla la disponibilità in tempo reale e conferma l'appuntamento — tutto in automatico. Il cliente riceve una conferma via SMS o WhatsApp.",
                    saving: "1-2 ore al giorno di telefonate interrotte",
                    color: "#544fb3",
                  },
                  {
                    title: "Reminder automatici per ridurre le no-show",
                    desc: "24 ore prima dell'appuntamento, il sistema invia un reminder via WhatsApp. Il cliente può confermare con un messaggio o chiedere di spostare. Le no-show si riducono del 30-50% — ogni appuntamento recuperato è fatturato diretto.",
                    saving: "2-3 appuntamenti recuperati al mese",
                    color: "#5bc783",
                  },
                  {
                    title: "Risposta automatica alle recensioni Google",
                    desc: "Ricevi una notifica per ogni nuova recensione con una bozza di risposta professionale già pronta. La approvi, la modifichi o la pubblichi direttamente. Nessuna recensione rimane senza risposta — segnale importante per Google.",
                    saving: "1-2 ore a settimana di gestione reputazione",
                    color: "#ffbd59",
                  },
                  {
                    title: "CRM clienti con storico trattamenti",
                    desc: "Tiene traccia di ogni cliente: ultima visita, trattamenti preferiti, prodotti acquistati. Ti avvisa quando un cliente abituale non torna da 45 giorni — puoi inviargli un messaggio personalizzato con un'offerta o semplicemente per far sentire la tua presenza.",
                    saving: "Aumento fidelizzazione clienti del 15-20%",
                    color: "#3ad3ef",
                  },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="flex gap-4 p-5 rounded-xl border-2"
                    style={{ borderColor: s.color + "40", backgroundColor: s.color + "06" }}
                  >
                    <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: s.color }} />
                    <div>
                      <h3
                        className="font-bold text-primary mb-2"
                        style={{ fontFamily: "Phenomena, sans-serif" }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-primary/60 text-sm leading-relaxed mb-3">{s.desc}</p>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ backgroundColor: s.color + "20", color: s.color }}
                      >
                        Risparmio: {s.saving}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Risparmio ore */}
            <section>
              <h2
                className="text-2xl font-bold text-primary mb-4"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Quante ore si risparmia davvero?
              </h2>
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-primary/70 leading-relaxed mb-4">
                  Stima per un salone con 30-40 appuntamenti a settimana:
                </p>
                <div className="space-y-3">
                  {[
                    { item: "Chiamate per prenotazioni gestite dall'agente vocale", hours: "5-8 ore/settimana" },
                    { item: "Reminder inviati manualmente via WhatsApp", hours: "2-3 ore/settimana" },
                    { item: "Risposta a messaggi Instagram/Google (info, prezzi, disponibilità)", hours: "2-4 ore/settimana" },
                    { item: "Gestione revisioni agenda e disdette dell'ultimo minuto", hours: "1-2 ore/settimana" },
                  ].map((r) => (
                    <div key={r.item} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-primary/60">{r.item}</span>
                      <span className="text-sm font-bold text-accent-4 flex-shrink-0">{r.hours}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-primary/10 flex items-center justify-between">
                    <span className="font-bold text-primary">Totale stimato</span>
                    <span className="font-bold text-accent-3">10-17 ore/settimana</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Internal links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-accent-1/30 bg-accent-1/5">
                <p className="text-sm text-primary/60 mb-2">Capire meglio l&apos;agente vocale:</p>
                <Link
                  href="/guide/agente-vocale-ai-cos-e-come-funziona"
                  className="font-bold text-primary hover:text-coral transition-colors text-sm"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Agente vocale AI: cos&apos;è e come funziona →
                </Link>
              </div>
              <div className="p-5 rounded-xl border border-accent-3/30 bg-accent-3/5">
                <p className="text-sm text-primary/60 mb-2">Il servizio completo:</p>
                <Link
                  href="/servizi/automazione-ai"
                  className="font-bold text-primary hover:text-coral transition-colors text-sm"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Scopri AI Automation →
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <section>
              <h2
                className="text-2xl font-bold text-primary mb-6"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Domande frequenti
              </h2>
              <dl className="space-y-6">
                {FAQS.map((faq) => (
                  <div key={faq.q} className="border-t border-primary/10 pt-6">
                    <dt
                      className="font-bold text-primary mb-2"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      {faq.q}
                    </dt>
                    <dd className="text-primary/60 text-sm leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* CTA */}
            <section className="bg-primary rounded-3xl px-8 py-10 text-center">
              <h2
                className="text-2xl font-bold text-bg mb-3"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Quanto tempo stai perdendo ogni settimana?
              </h2>
              <p className="text-bg/60 mb-6 text-sm">
                Fai il calcolatore gratuito: in 3 minuti ricevi una stima personalizzata
                dei processi automatizzabili nella tua attività.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/audit"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-all hover:scale-105 inline-block"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Calcolatore gratuito →
                </Link>
                <Link
                  href="/contatti"
                  className="px-7 py-3.5 rounded-full border-2 border-bg/20 text-bg font-bold hover:border-bg/50 transition-all inline-block"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Parliamo
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
