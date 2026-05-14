import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: { absolute: "Come Non Perdere Chiamate al Ristorante | Luca Vizza" },
  description:
    "Quante chiamate perde un ristorante durante il servizio e quanto fatturato vale. Soluzioni concrete dal risponditore base all'agente vocale AI — con confronto costi.",
  alternates: {
    canonical: "https://lucavizza.it/guide/come-non-perdere-chiamate-ristorante",
    languages: { it: "https://lucavizza.it/guide/come-non-perdere-chiamate-ristorante" },
  },
};

const SECTIONS = [
  { id: "il-problema", title: "Il problema: durante il servizio il telefono squilla nel vuoto" },
  { id: "perche-succede", title: "Perché succede (e non è colpa tua)" },
  { id: "le-soluzioni", title: "Le soluzioni disponibili, in ordine di complessità" },
  { id: "costo-inazione", title: "Il costo dell'inazione" },
  { id: "faq", title: "Domande frequenti" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Come non perdere chiamate quando sei in servizio (guida per ristoratori)",
  description:
    "Quante prenotazioni perde un ristorante durante il servizio? Soluzioni concrete, confronto costi e quando un agente vocale AI è la risposta giusta.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-13",
  url: "https://lucavizza.it/guide/come-non-perdere-chiamate-ristorante",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quante chiamate perde in media un ristorante durante il servizio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dal volume e dagli orari, ma la stima comune nel settore è tra il 20% e il 35% delle chiamate in entrata durante i picchi di servizio. Su un ristorante da 40 coperti con 15 chiamate al giorno, parliamo di 3-5 chiamate perse ogni giorno.",
      },
    },
    {
      "@type": "Question",
      name: "Un cliente che non riesce a prenotare per telefono richiama?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Raramente. Le ricerche sul comportamento dei consumatori mostrano che circa il 60% di chi non riesce a contattare un'attività al primo tentativo non riprova — cerca direttamente un'alternativa.",
      },
    },
    {
      "@type": "Question",
      name: "L'agente vocale AI può gestire prenotazioni per eventi e gruppi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, con configurazione adeguata. Per richieste complesse (gruppi numerosi, menu personalizzati, eventi privati) può raccogliere le informazioni iniziali e avvisarti per una conferma manuale — così non perdi il contatto ma risparmi il tempo della prima conversazione.",
      },
    },
    {
      "@type": "Question",
      name: "Cosa succede alle chiamate fuori orario di apertura?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'agente vocale è attivo H24. Fuori orario può comunicare gli orari del ristorante, prendere una prenotazione per i giorni successivi o registrare un messaggio. Nessuna chiamata va persa.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "Quante chiamate perde in media un ristorante durante il servizio?",
    a: "Dipende dal volume e dagli orari, ma la stima comune nel settore è tra il 20% e il 35% delle chiamate in entrata durante i picchi di servizio. Su un ristorante da 40 coperti con 15 chiamate al giorno, parliamo di 3-5 chiamate perse ogni giorno.",
  },
  {
    q: "Un cliente che non riesce a prenotare per telefono richiama?",
    a: "Raramente. Le ricerche sul comportamento dei consumatori mostrano che circa il 60% di chi non riesce a contattare un'attività al primo tentativo non riprova — cerca direttamente un'alternativa.",
  },
  {
    q: "L'agente vocale AI può gestire prenotazioni per eventi e gruppi?",
    a: "Sì, con configurazione adeguata. Per richieste complesse (gruppi numerosi, menu personalizzati, eventi privati) può raccogliere le informazioni iniziali e avvisarti per una conferma manuale — così non perdi il contatto ma risparmi il tempo della prima conversazione.",
  },
  {
    q: "Cosa succede alle chiamate fuori orario di apertura?",
    a: "L'agente vocale è attivo H24. Fuori orario può comunicare gli orari del ristorante, prendere una prenotazione per i giorni successivi o registrare un messaggio. Nessuna chiamata va persa.",
  },
];

export default function GuideChiamateRistorante() {
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
            <span>Chiamate al ristorante</span>
          </nav>

          {/* Header */}
          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-coral uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Ristorazione
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Come non perdere chiamate
              quando sei in servizio
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              Una guida pratica per ristoratori. Quanto costa davvero una chiamata persa,
              quali soluzioni esistono e come scegliere quella giusta per il tuo locale.
            </p>
          </header>

          <GuideLayout sections={SECTIONS} wordCount={900}>
            <article className="space-y-12 pb-16">

              <section id="il-problema">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Il problema: durante il servizio il telefono squilla nel vuoto
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  È venerdì sera, il locale è pieno, sei in cucina o stai portando i piatti.
                  Il telefono squilla. Nessuno può rispondere. La chiamata cade.
                </p>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Questo succede ogni giorno in quasi tutti i ristoranti italiani.
                  La stima media nel settore è che tra il <strong>20% e il 35%</strong> delle
                  chiamate in entrata vada perso durante i picchi di pranzo e cena.
                  Su un locale che riceve 15-20 chiamate al giorno, parliamo di
                  <strong> 3-7 chiamate perse ogni giorno</strong>.
                </p>
                <div className="p-5 rounded-xl bg-coral/8 border border-coral/20">
                  <p className="text-primary/80 text-sm leading-relaxed">
                    <strong>Stima concreta:</strong> se una prenotazione media vale 35€ a persona
                    e ogni chiamata è in media per 2 persone, ogni chiamata persa vale circa 70€.
                    Con 4 chiamate perse al giorno per 200 giorni lavorativi, si parla di
                    <strong> 56.000€ di fatturato potenziale non realizzato ogni anno</strong>.
                    Non è un numero esatto — dipende dal tuo locale — ma l&apos;ordine di grandezza è realistico.
                  </p>
                </div>
              </section>

              <section id="perche-succede">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Perché succede (e non è colpa tua)
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Il problema strutturale è semplice: i momenti in cui arrivano più prenotazioni
                  sono esattamente i momenti in cui sei più occupato. Le chiamate si concentrano
                  tra le 10 e le 12 (prenotazioni per pranzo) e tra le 17 e le 19 (prenotazioni
                  per cena). Sono le stesse fasce in cui il tuo team sta preparando o servendo.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Aggiungere personale solo per rispondere al telefono non ha senso economico.
                  Assumere una receptionist a tempo pieno costa 20-25.000€ l&apos;anno.
                  Serve un&apos;alternativa.
                </p>
              </section>

              <section id="le-soluzioni">
                <h2
                  className="text-2xl font-bold text-primary mb-6"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Le soluzioni disponibili, in ordine di complessità
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Segreteria tradizionale",
                      desc: "Il classico: il cliente lascia un messaggio e tu richiami. Costo: zero. Problema: l'80% dei clienti non lascia messaggi. E quelli che lo fanno spesso hanno già trovato un'alternativa quando li richiami.",
                      pro: "Gratuita",
                      contro: "Quasi nessuno lascia messaggi",
                      color: "#3ad3ef",
                    },
                    {
                      num: "02",
                      title: "Risponditore automatico con messaggio",
                      desc: 'Registri un messaggio ("siamo chiusi, richiamate tra le X e le Y") che parte quando non rispondi. Costa poco, ma non risolve il problema durante gli orari di apertura: il cliente sa che sei aperto e si aspetta di parlare con qualcuno.',
                      pro: "Economica e semplice",
                      contro: "Non gestisce chiamate durante il servizio",
                      color: "#ffbd59",
                    },
                    {
                      num: "03",
                      title: "Servizio di risposta esterno (call center)",
                      desc: "Esiste un servizio in cui operatori umani rispondono al telefono al posto tuo, prendono il nome e il numero, poi ti inviano un resoconto. Funziona meglio di una segreteria, ma costa tra 150 e 400€/mese e non è personalizzato — l'operatore non conosce il tuo menu né i tuoi posti disponibili.",
                      pro: "Risposta umana garantita",
                      contro: "Costoso, non personalizzato",
                      color: "#5bc783",
                    },
                    {
                      num: "04",
                      title: "Agente vocale AI",
                      desc: "Risponde al telefono in modo automatico ma conversazionale. Sa quanti posti hai disponibili, conosce il tuo menu, gestisce prenotazioni in tempo reale e ti avvisa per le richieste complesse. Attivo H24, anche quando sei chiuso. Costo tipico: 80-200€/mese a seconda del volume.",
                      pro: "Gestisce tutto, H24, personalizzato",
                      contro: "Setup iniziale richiede 5-7 giorni",
                      color: "#544fb3",
                    },
                  ].map((s) => (
                    <div
                      key={s.num}
                      className="p-6 rounded-xl border-2"
                      style={{ borderColor: s.color + "40", backgroundColor: s.color + "06" }}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="text-3xl font-bold flex-shrink-0 leading-none"
                          style={{ fontFamily: "Phenomena, sans-serif", color: s.color + "60" }}
                        >
                          {s.num}
                        </span>
                        <div className="flex-1">
                          <h3
                            className="text-lg font-bold text-primary mb-2"
                            style={{ fontFamily: "Phenomena, sans-serif" }}
                          >
                            {s.title}
                          </h3>
                          <p className="text-primary/60 text-sm leading-relaxed mb-3">{s.desc}</p>
                          <div className="flex flex-wrap gap-3">
                            <span className="text-xs px-3 py-1 rounded-full bg-accent-3/15 text-accent-3 font-medium">
                              ✓ {s.pro}
                            </span>
                            <span className="text-xs px-3 py-1 rounded-full bg-coral/10 text-coral font-medium">
                              ✗ {s.contro}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="costo-inazione">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Il costo dell&apos;inazione
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Un cliente che non riesce a prenotare non aspetta. Cerca un&apos;alternativa su Google,
                  chiama il ristorante vicino o prenota direttamente su TheFork. E non è detto che
                  torni a provare da te — specialmente se era la prima volta che ti chiamava.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Non fare niente ha un costo reale. La domanda non è &ldquo;quanto spendo per risolvere il problema?&rdquo;
                  ma &ldquo;quanto sto perdendo ogni mese lasciando le cose come stanno?&rdquo;
                </p>
              </section>

              {/* Internal link */}
              <div className="p-6 rounded-2xl border-2 border-accent-3/30 bg-accent-3/5">
                <p className="text-sm text-primary/60 mb-2">
                  Vuoi vedere tutti gli strumenti AI disponibili per il tuo ristorante?
                </p>
                <Link
                  href="/guide/automazione-ai-per-ristoranti"
                  className="font-bold text-primary hover:text-coral transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Guida completa: automazione AI per ristoranti →
                </Link>
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

              {/* CTA */}
              <section className="bg-primary rounded-3xl px-8 py-10 text-center">
                <h2
                  className="text-2xl font-bold text-bg mb-3"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Scopri quanto stai perdendo ogni mese
                </h2>
                <p className="text-bg/60 mb-6 text-sm">
                  Il calcolatore gratuito analizza la tua situazione specifica e ti dà
                  una stima personalizzata in 3 minuti.
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
