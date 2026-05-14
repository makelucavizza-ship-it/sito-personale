import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: { absolute: "Quanto Costa Non Rispondere al Telefono | Luca Vizza" },
  description:
    "Il costo reale di una chiamata persa: calcolo per settore, stima delle perdite annue e confronto tra il costo dell'inazione e quello delle soluzioni disponibili.",
  alternates: {
    canonical: "https://lucavizza.it/guide/quanto-costa-non-rispondere-al-telefono",
    languages: { it: "https://lucavizza.it/guide/quanto-costa-non-rispondere-al-telefono" },
  },
};

const SECTIONS = [
  { id: "il-costo-reale", title: "Il costo reale di una chiamata persa" },
  { id: "per-settore", title: "Stima per settore" },
  { id: "calcolo", title: "Come calcolare la tua perdita specifica" },
  { id: "confronto-soluzioni", title: "Quanto costa risolverlo" },
  { id: "faq", title: "Domande frequenti" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Quanto costa non rispondere al telefono: il calcolo che la maggior parte delle attività non fa",
  description:
    "Il costo reale di una chiamata persa per settore: ristoranti, saloni, studi medici, B&B, officine. Formula per calcolare le perdite annue e confronto con il costo delle soluzioni.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-14",
  url: "https://lucavizza.it/guide/quanto-costa-non-rispondere-al-telefono",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Un cliente che non riesce a contattarci richiama davvero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Raramente. Le ricerche mostrano che circa il 60% di chi non riesce a contattare un'attività al primo tentativo non riprova — cerca direttamente un'alternativa. Per le prenotazioni in particolare, il cliente non aspetta: prenota altrove.",
      },
    },
    {
      "@type": "Question",
      name: "Il costo di una chiamata persa vale anche per le chiamate fuori orario?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, spesso di più. Fuori orario il cliente è in modalità 'prenoto adesso' — ha tempo, è motivato, non è distratto dal lavoro. Se non trova risposta, il tasso di abbandono è ancora più alto.",
      },
    },
    {
      "@type": "Question",
      name: "Come faccio a sapere quante chiamate perdo realmente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il modo più semplice è attivare la segreteria telefonica per una settimana e contare quanti messaggi non ricevono risposta. Oppure confrontare il numero di chiamate in entrata con quelle risposte nel tuo gestore telefonico — la differenza è una stima delle chiamate perse.",
      },
    },
    {
      "@type": "Question",
      name: "Questo calcolo vale anche per le piccole attività con poche chiamate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vale soprattutto per le piccole attività. Con un volume basso, ogni singola chiamata ha un peso percentuale maggiore. Se ricevi 5 chiamate al giorno e ne perdi 2, stai perdendo il 40% del potenziale giornaliero.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "Un cliente che non riesce a contattarci richiama davvero?",
    a: "Raramente. Le ricerche mostrano che circa il 60% di chi non riesce a contattare un'attività al primo tentativo non riprova — cerca direttamente un'alternativa. Per le prenotazioni in particolare, il cliente non aspetta: prenota altrove.",
  },
  {
    q: "Il costo di una chiamata persa vale anche per le chiamate fuori orario?",
    a: "Sì, spesso di più. Fuori orario il cliente è in modalità 'prenoto adesso' — ha tempo, è motivato, non è distratto dal lavoro. Se non trova risposta, il tasso di abbandono è ancora più alto.",
  },
  {
    q: "Come faccio a sapere quante chiamate perdo realmente?",
    a: "Il modo più semplice è attivare la segreteria telefonica per una settimana e contare quanti messaggi non ricevono risposta. Oppure confrontare il numero di chiamate in entrata con quelle risposte nel tuo gestore telefonico — la differenza è una stima delle chiamate perse.",
  },
  {
    q: "Questo calcolo vale anche per le piccole attività con poche chiamate?",
    a: "Vale soprattutto per le piccole attività. Con un volume basso, ogni singola chiamata ha un peso percentuale maggiore. Se ricevi 5 chiamate al giorno e ne perdi 2, stai perdendo il 40% del potenziale giornaliero.",
  },
];

const SECTOR_DATA = [
  {
    sector: "Ristorante",
    callsPerDay: "15-20",
    lossRate: "20-35%",
    avgTicket: "60-80€",
    annualLoss: "25.000–65.000€",
    color: "#ee826d",
  },
  {
    sector: "Salone / estetica",
    callsPerDay: "10-15",
    lossRate: "25-40%",
    avgTicket: "40-80€",
    annualLoss: "15.000–45.000€",
    color: "#544fb3",
  },
  {
    sector: "Studio medico",
    callsPerDay: "20-30",
    lossRate: "15-25%",
    avgTicket: "60-120€",
    annualLoss: "20.000–80.000€",
    color: "#5bc783",
  },
  {
    sector: "B&B / affittacamere",
    callsPerDay: "5-10",
    lossRate: "30-45%",
    avgTicket: "100-200€",
    annualLoss: "15.000–60.000€",
    color: "#3ad3ef",
  },
  {
    sector: "Officina / autocarrozzeria",
    callsPerDay: "8-15",
    lossRate: "20-30%",
    avgTicket: "80-300€",
    annualLoss: "15.000–80.000€",
    color: "#ffbd59",
  },
];

export default function GuideCostoChiamate() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="pt-8 pb-4 text-sm text-primary/40 flex items-center gap-2">
            <Link href="/guide" className="hover:text-primary transition-colors">Guide</Link>
            <span>›</span>
            <span>Costo delle chiamate perse</span>
          </nav>

          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-coral uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Analisi
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Quanto costa non rispondere
              al telefono
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              La maggior parte delle attività sottostima il costo delle chiamate perse.
              Non è solo un cliente in meno — è fatturato che non entra, ogni giorno,
              in silenzio. Ecco come calcolarlo.
            </p>
          </header>

          <GuideLayout sections={SECTIONS} wordCount={900}>
            <article className="space-y-12 pb-16">

              <section id="il-costo-reale">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Il costo reale di una chiamata persa
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Quando una chiamata cade senza risposta, l&apos;intuizione dice: &ldquo;il cliente richiamerà&rdquo;.
                  I dati dicono il contrario. Circa il <strong>60% di chi non riesce a contattare
                  un&apos;attività al primo tentativo non riprova</strong> — cerca direttamente
                  un&apos;alternativa, spesso su Google Maps o su una piattaforma di prenotazione.
                </p>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Questo significa che ogni chiamata persa non è solo un fastidio temporaneo.
                  È il valore medio di quella transazione moltiplicato per il numero di volte
                  in cui si sarebbe ripetuta nel tempo — considerando la fidelizzazione.
                </p>
                <div className="p-5 rounded-xl border-2 border-coral/30 bg-coral/5">
                  <p className="text-sm font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
                    La matematica semplice
                  </p>
                  <div className="space-y-2 text-sm text-primary/70">
                    <div className="flex gap-2">
                      <span className="text-coral font-bold flex-shrink-0">→</span>
                      <span>Chiamate perse al giorno × tasso di non-ritorno (60%) = clienti persi per sempre</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-coral font-bold flex-shrink-0">→</span>
                      <span>Clienti persi × scontrino medio = fatturato perso per transazione</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-coral font-bold flex-shrink-0">→</span>
                      <span>Moltiplica per 200 giorni lavorativi = perdita annua stimata</span>
                    </div>
                  </div>
                </div>
              </section>

              <section id="per-settore">
                <h2
                  className="text-2xl font-bold text-primary mb-6"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Stima per settore
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Questi numeri sono stime basate su dati medi di settore. Il tuo caso
                  specifico dipende dal volume di chiamate, dallo scontrino medio e
                  dalla stagionalità. Usali come ordine di grandezza.
                </p>
                <div className="space-y-3">
                  {SECTOR_DATA.map((s) => (
                    <div
                      key={s.sector}
                      className="p-5 rounded-xl border-2"
                      style={{ borderColor: s.color + "40", backgroundColor: s.color + "06" }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1">
                          <h3
                            className="font-bold text-primary mb-1"
                            style={{ fontFamily: "Phenomena, sans-serif" }}
                          >
                            {s.sector}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-xs text-primary/50">
                            <span>{s.callsPerDay} chiamate/giorno</span>
                            <span>{s.lossRate} perse</span>
                            <span>scontrino {s.avgTicket}</span>
                          </div>
                        </div>
                        <div
                          className="text-right flex-shrink-0"
                        >
                          <span className="text-xs text-primary/40 block">Perdita annua stimata</span>
                          <span
                            className="text-lg font-bold"
                            style={{ fontFamily: "Phenomena, sans-serif", color: s.color }}
                          >
                            {s.annualLoss}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="calcolo">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Come calcolare la tua perdita specifica
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Usa questi quattro dati per ottenere una stima personalizzata:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      label: "A — Chiamate in entrata al giorno",
                      hint: "Controllabile nel registro chiamate del tuo gestore telefonico",
                      color: "#3ad3ef",
                    },
                    {
                      label: "B — Percentuale di chiamate senza risposta",
                      hint: "Stima conservativa: 20%. Se hai picchi di servizio, usa 30-35%",
                      color: "#5bc783",
                    },
                    {
                      label: "C — Scontrino medio per cliente",
                      hint: "Fatturato medio per visita o prenotazione nel tuo settore",
                      color: "#ffbd59",
                    },
                    {
                      label: "D — Giorni lavorativi all'anno",
                      hint: "In media 200 per attività con chiusura settimanale",
                      color: "#544fb3",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex gap-4 p-4 rounded-xl border"
                      style={{ borderColor: item.color + "30", backgroundColor: item.color + "08" }}
                    >
                      <div
                        className="w-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p
                          className="font-bold text-primary text-sm mb-1"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {item.label}
                        </p>
                        <p className="text-xs text-primary/50">{item.hint}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-5 rounded-xl bg-primary text-bg">
                  <p className="text-sm font-bold mb-2" style={{ fontFamily: "Phenomena, sans-serif" }}>
                    Formula:
                  </p>
                  <p className="font-mono text-sm text-bg/80">
                    A × B × 0.6 × C × D = perdita annua stimata
                  </p>
                  <p className="text-xs text-bg/50 mt-2">
                    Il fattore 0.6 rappresenta la percentuale di clienti persi che non richiamanno.
                  </p>
                </div>
              </section>

              <section id="confronto-soluzioni">
                <h2
                  className="text-2xl font-bold text-primary mb-6"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Quanto costa risolverlo
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Una volta calcolata la perdita, confrontarla con il costo delle soluzioni
                  disponibili rende la decisione molto più semplice.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      solution: "Risponditore automatico",
                      cost: "Gratis – 20€/mese",
                      effectiveness: "Bassa",
                      note: "Non gestisce le chiamate in orario — il problema rimane",
                      color: "#ffbd59",
                    },
                    {
                      solution: "Call center esterno",
                      cost: "150–400€/mese",
                      effectiveness: "Media",
                      note: "Risposta umana, ma non personalizzata. Non conosce la tua attività",
                      color: "#3ad3ef",
                    },
                    {
                      solution: "Agente vocale AI",
                      cost: "80–200€/mese",
                      effectiveness: "Alta",
                      note: "H24, personalizzato, gestisce prenotazioni in autonomia",
                      color: "#5bc783",
                    },
                  ].map((s) => (
                    <div
                      key={s.solution}
                      className="p-5 rounded-xl border-2 flex flex-col"
                      style={{ borderColor: s.color + "40", backgroundColor: s.color + "08" }}
                    >
                      <h3
                        className="font-bold text-primary mb-2"
                        style={{ fontFamily: "Phenomena, sans-serif" }}
                      >
                        {s.solution}
                      </h3>
                      <div className="mb-3">
                        <span
                          className="text-sm font-bold"
                          style={{ color: s.color }}
                        >
                          {s.cost}
                        </span>
                      </div>
                      <p className="text-xs text-primary/50 leading-relaxed flex-1">{s.note}</p>
                      <div className="mt-3 pt-3 border-t border-primary/10">
                        <span className="text-xs text-primary/40">Efficacia: </span>
                        <span className="text-xs font-bold text-primary">{s.effectiveness}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-5 rounded-xl border border-accent-3/30 bg-accent-3/5">
                  <p className="text-sm text-primary/70 leading-relaxed">
                    <strong className="text-primary">Confronto diretto:</strong> se la tua perdita stimata
                    è 30.000€/anno e l&apos;agente vocale costa 150€/mese (1.800€/anno), il ritorno
                    sull&apos;investimento potenziale è di oltre 16x. Anche recuperando solo il 30%
                    delle chiamate perse, il ROI è positivo dal primo mese.
                  </p>
                </div>
              </section>

              {/* Internal links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-coral/30 bg-coral/5">
                  <p className="text-sm text-primary/60 mb-2">Per i ristoranti:</p>
                  <Link
                    href="/guide/come-non-perdere-chiamate-ristorante"
                    className="font-bold text-primary hover:text-coral transition-colors text-sm"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    Come non perdere chiamate al ristorante →
                  </Link>
                </div>
                <div className="p-5 rounded-xl border border-accent-1/30 bg-accent-1/5">
                  <p className="text-sm text-primary/60 mb-2">La soluzione tecnica:</p>
                  <Link
                    href="/guide/agente-vocale-ai-cos-e-come-funziona"
                    className="font-bold text-primary hover:text-coral transition-colors text-sm"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    Agente vocale AI: cos&apos;è e come funziona →
                  </Link>
                </div>
              </div>

              <section id="faq">
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

              <section className="bg-primary rounded-3xl px-8 py-10 text-center">
                <h2
                  className="text-2xl font-bold text-bg mb-3"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Calcola la tua perdita in 3 minuti
                </h2>
                <p className="text-bg/60 mb-6 text-sm">
                  Il calcolatore gratuito analizza la tua attività specifica e ti
                  restituisce una stima personalizzata con i processi da automatizzare.
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
                    href="/servizi/automazione-ai"
                    className="px-7 py-3.5 rounded-full border-2 border-bg/20 text-bg font-bold hover:border-bg/50 transition-all inline-block"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    Vedi il servizio
                  </Link>
                </div>
              </section>
            </article>
          </GuideLayout>
        </div>
      </div>
    </>
  );
}
