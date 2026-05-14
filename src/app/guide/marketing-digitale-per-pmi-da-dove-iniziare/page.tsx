import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: { absolute: "Marketing Digitale per PMI: Da Dove Iniziare | Luca Vizza" },
  description:
    "Gli errori più comuni delle PMI italiane con il marketing digitale e la sequenza giusta: prima automatizza i processi, poi porta traffico. Framework pratico con checklist 3 mesi.",
  alternates: {
    canonical: "https://lucavizza.it/guide/marketing-digitale-per-pmi-da-dove-iniziare",
    languages: { it: "https://lucavizza.it/guide/marketing-digitale-per-pmi-da-dove-iniziare" },
  },
};

const SECTIONS = [
  { id: "errori-comuni", title: "Gli errori più comuni che vedo fare" },
  { id: "la-sequenza-giusta", title: "La sequenza giusta: prima automatizza, poi porta traffico" },
  { id: "da-dove-iniziare", title: "Da dove iniziare: un framework pratico" },
  { id: "checklist", title: "Checklist 3 mesi" },
  { id: "faq", title: "Domande frequenti" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Marketing digitale per PMI: da dove iniziare (e cosa non fare)",
  description:
    "Gli errori più comuni delle PMI italiane con il marketing digitale e la sequenza corretta: automatizzare i processi prima di portare traffico. Framework pratico con checklist 3 mesi.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-14",
  url: "https://lucavizza.it/guide/marketing-digitale-per-pmi-da-dove-iniziare",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Dobbiamo essere su tutti i social o bastano uno o due?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Meglio uno o due gestiti bene che cinque abbandonati. La regola è semplice: scegli i canali dove si trova il tuo cliente tipo e dove riesci a pubblicare con continuità. Per la maggior parte delle PMI italiane, Instagram e Google My Business sono già una base solida.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto budget serve per iniziare con gli ads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Per testare, bastano 300-500€/mese su Meta o Google Ads. Con meno, i dati non sono statisticamente significativi e non riesci a capire cosa funziona. Ma prima di investire in ads, assicurati che il processo di acquisizione sia ottimizzato: se porti traffico su una pagina che non converte, stai bruciando budget.",
      },
    },
    {
      "@type": "Question",
      name: "La SEO funziona ancora per le PMI locali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, e spesso è il canale con il miglior ROI a lungo termine. Per le PMI locali, Google My Business ottimizzato + SEO locale (pagine per città o quartiere) può portare traffico qualificato senza costo per click. Richiede più tempo degli ads, ma i risultati persistono nel tempo.",
      },
    },
    {
      "@type": "Question",
      name: "Da dove si inizia se non si ha mai fatto marketing digitale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Da Google My Business. È gratuito, è dove i tuoi clienti ti cercano, e ottimizzarlo richiede 30 minuti. Poi: un sito web funzionante con numero di telefono visibile. Solo dopo aver sistemato queste basi ha senso investire in contenuti o ads.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "Dobbiamo essere su tutti i social o bastano uno o due?",
    a: "Meglio uno o due gestiti bene che cinque abbandonati. La regola è semplice: scegli i canali dove si trova il tuo cliente tipo e dove riesci a pubblicare con continuità. Per la maggior parte delle PMI italiane, Instagram e Google My Business sono già una base solida.",
  },
  {
    q: "Quanto budget serve per iniziare con gli ads?",
    a: "Per testare, bastano 300-500€/mese su Meta o Google Ads. Con meno, i dati non sono statisticamente significativi e non riesci a capire cosa funziona. Ma prima di investire in ads, assicurati che il processo di acquisizione sia ottimizzato: se porti traffico su una pagina che non converte, stai bruciando budget.",
  },
  {
    q: "La SEO funziona ancora per le PMI locali?",
    a: "Sì, e spesso è il canale con il miglior ROI a lungo termine. Per le PMI locali, Google My Business ottimizzato + SEO locale (pagine per città o quartiere) può portare traffico qualificato senza costo per click. Richiede più tempo degli ads, ma i risultati persistono nel tempo.",
  },
  {
    q: "Da dove si inizia se non si ha mai fatto marketing digitale?",
    a: "Da Google My Business. È gratuito, è dove i tuoi clienti ti cercano, e ottimizzarlo richiede 30 minuti. Poi: un sito web funzionante con numero di telefono visibile. Solo dopo aver sistemato queste basi ha senso investire in contenuti o ads.",
  },
];

export default function GuideMarketingPMI() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="pt-8 pb-4 text-sm text-primary/40 flex items-center gap-2">
            <Link href="/guide" className="hover:text-primary transition-colors">Guide</Link>
            <span>›</span>
            <span>Marketing digitale per PMI</span>
          </nav>

          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-accent-2 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Marketing
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Marketing digitale per PMI:
              da dove iniziare
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              La maggior parte delle piccole imprese inizia dal marketing quando
              dovrebbe iniziare dall&apos;operatività. Questa guida spiega la sequenza
              giusta — e perché l&apos;ordine conta più del budget.
            </p>
          </header>

          <GuideLayout sections={SECTIONS} wordCount={900}>
            <article className="space-y-12 pb-16">

              <section id="errori-comuni">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Gli errori più comuni che vedo fare
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Quando lavoro con una PMI che ha già provato il marketing digitale
                  senza risultati, il problema quasi sempre non è il canale scelto
                  o il budget investito. È la sequenza.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      error: "Comprare ads prima di avere un processo funzionante",
                      consequence: "Il traffico arriva, ma non si converte. Si paga per portare persone a un imbuto che non funziona.",
                      color: "#ee826d",
                    },
                    {
                      error: "Non rispondere alle chiamate o ai messaggi in tempi ragionevoli",
                      consequence: "Il marketing genera interesse, ma chi chiama non riceve risposta. Il cliente va dalla concorrenza.",
                      color: "#ffbd59",
                    },
                    {
                      error: "Pubblicare sui social senza strategia né continuità",
                      consequence: "Tre post a gennaio, silenzio fino ad aprile. I profili abbandonati danneggiano la credibilità.",
                      color: "#544fb3",
                    },
                    {
                      error: "Non avere Google My Business ottimizzato",
                      consequence: "Il cliente cerca su Google Maps e trova un profilo senza foto, senza orari, senza recensioni. Va altrove.",
                      color: "#3ad3ef",
                    },
                    {
                      error: "Trattare il marketing come un costo invece che come un investimento misurabile",
                      consequence: "Senza tracking, non si sa cosa funziona. Si continua a spendere senza dati per migliorare.",
                      color: "#5bc783",
                    },
                  ].map((item) => (
                    <div
                      key={item.error}
                      className="p-5 rounded-xl border-2"
                      style={{ borderColor: item.color + "40", backgroundColor: item.color + "06" }}
                    >
                      <div className="flex gap-3 items-start">
                        <span className="text-lg flex-shrink-0" style={{ color: item.color }}>✗</span>
                        <div>
                          <p
                            className="font-bold text-primary text-sm mb-1"
                            style={{ fontFamily: "Phenomena, sans-serif" }}
                          >
                            {item.error}
                          </p>
                          <p className="text-xs text-primary/50 leading-relaxed">{item.consequence}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="la-sequenza-giusta">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  La sequenza giusta: prima automatizza, poi porta traffico
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Il marketing amplifica quello che già c&apos;è. Se quello che c&apos;è è
                  un processo caotico, il marketing amplifica il caos. Se quello che c&apos;è
                  è un sistema che funziona, il marketing amplifica la crescita.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      phase: "Operatività: sistema chi risponde e come",
                      desc: "Chi risponde alle chiamate? Chi risponde ai messaggi WhatsApp? In quanto tempo? Se non c'è una risposta chiara, nessuna campagna marketing darà risultati stabili.",
                      color: "#5bc783",
                    },
                    {
                      step: "2",
                      phase: "Presenza base: Google My Business e sito funzionante",
                      desc: "Prima che il cliente arrivi sul tuo sito o trovi la tua pagina, deve trovarti. Google My Business ottimizzato è il punto di partenza per qualsiasi PMI locale.",
                      color: "#3ad3ef",
                    },
                    {
                      step: "3",
                      phase: "Reputazione: recensioni e risposta alle recensioni",
                      desc: "Le recensioni sono il tuo biglietto da visita online. Prima di investire in ads, costruisci una base di recensioni positive e rispondi a tutte — positive e negative.",
                      color: "#ffbd59",
                    },
                    {
                      step: "4",
                      phase: "Contenuti: comunicazione sui canali giusti",
                      desc: "Solo a questo punto ha senso pensare ai social, alla SEO, alle newsletter. Con un processo solido alle spalle, ogni contenuto lavora per un sistema che può gestire i risultati.",
                      color: "#544fb3",
                    },
                    {
                      step: "5",
                      phase: "Advertising: scala quello che funziona",
                      desc: "Quando sai che il tuo processo converte, puoi investire in ads per portare più traffico. Non prima.",
                      color: "#ee826d",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 p-5 rounded-xl border"
                      style={{ borderColor: item.color + "30", backgroundColor: item.color + "06" }}
                    >
                      <span
                        className="text-3xl font-bold flex-shrink-0 leading-none"
                        style={{ fontFamily: "Phenomena, sans-serif", color: item.color + "80" }}
                      >
                        {item.step}
                      </span>
                      <div>
                        <h3
                          className="font-bold text-primary mb-1"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {item.phase}
                        </h3>
                        <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="da-dove-iniziare">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Da dove iniziare: un framework pratico
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Dipende da dove sei adesso. Usa queste domande per capire il tuo punto di partenza:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      question: "Stai perdendo chiamate o messaggi senza risposta?",
                      action: "Inizia dall'operatività: agente vocale AI o bot WhatsApp",
                      priority: "Alta",
                      color: "#ee826d",
                    },
                    {
                      question: "Il tuo Google My Business è incompleto o senza recensioni?",
                      action: "Completa il profilo, carica foto recenti, inizia a raccogliere recensioni",
                      priority: "Alta",
                      color: "#ffbd59",
                    },
                    {
                      question: "Non pubblichi contenuti sui social da più di 30 giorni?",
                      action: "Scegli un solo canale e stabilisci una frequenza sostenibile (1-2 post/settimana)",
                      priority: "Media",
                      color: "#5bc783",
                    },
                    {
                      question: "Non hai un sistema per tenere traccia dei clienti?",
                      action: "Implementa un CRM base, anche solo Notion o Airtable",
                      priority: "Media",
                      color: "#3ad3ef",
                    },
                    {
                      question: "Hai già tutto quanto sopra funzionante?",
                      action: "Ora ha senso investire in ads o in una strategia di contenuti più strutturata",
                      priority: "Successivo",
                      color: "#544fb3",
                    },
                  ].map((item) => (
                    <div
                      key={item.question}
                      className="p-5 rounded-xl border-2"
                      style={{ borderColor: item.color + "40", backgroundColor: item.color + "06" }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p
                          className="font-bold text-primary text-sm"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {item.question}
                        </p>
                        <span
                          className="text-xs px-2 py-1 rounded-full flex-shrink-0 font-bold"
                          style={{ backgroundColor: item.color + "20", color: item.color }}
                        >
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-primary/50 leading-relaxed">
                        <strong>Azione:</strong> {item.action}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="checklist">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Checklist 3 mesi
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Un piano concreto per chi parte da zero o quasi:
                </p>
                <div className="space-y-6">
                  {[
                    {
                      month: "Mese 1",
                      title: "Fondamenta operative",
                      tasks: [
                        "Google My Business completato con foto, orari, descrizione",
                        "Sito web funzionante con numero di telefono visibile",
                        "Processo di risposta alle chiamate e messaggi definito",
                        "Prima raccolta di 5-10 recensioni Google",
                      ],
                      color: "#5bc783",
                    },
                    {
                      month: "Mese 2",
                      title: "Comunicazione e automazione base",
                      tasks: [
                        "Un profilo social attivo con piano editoriale minimo (2/settimana)",
                        "Agente vocale AI o bot WhatsApp attivo (se ha senso per il settore)",
                        "Reminder automatici per appuntamenti configurati",
                        "Prima newsletter o campagna WhatsApp ai clienti esistenti",
                      ],
                      color: "#3ad3ef",
                    },
                    {
                      month: "Mese 3",
                      title: "Ottimizzazione e crescita",
                      tasks: [
                        "Analisi dei risultati del mese 2 (aperture, conversioni, feedback)",
                        "CRM base attivo per tenere traccia dei clienti",
                        "Primo test advertising (300-500€ per validare il canale)",
                        "Sistema di raccolta recensioni automatizzato",
                      ],
                      color: "#ffbd59",
                    },
                  ].map((month) => (
                    <div
                      key={month.month}
                      className="p-6 rounded-xl border-2"
                      style={{ borderColor: month.color + "40", backgroundColor: month.color + "06" }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ backgroundColor: month.color + "30", color: month.color }}
                        >
                          {month.month}
                        </span>
                        <h3
                          className="font-bold text-primary"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {month.title}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {month.tasks.map((task) => (
                          <li key={task} className="flex gap-2 text-sm text-primary/60">
                            <span className="flex-shrink-0 mt-0.5" style={{ color: month.color }}>☐</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Internal links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-accent-3/30 bg-accent-3/5">
                  <p className="text-sm text-primary/60 mb-2">Prima automatizza le operazioni:</p>
                  <Link
                    href="/guide/come-automatizzare-gli-appuntamenti-senza-centralino"
                    className="font-bold text-primary hover:text-coral transition-colors text-sm"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    Automatizzare gli appuntamenti senza centralino →
                  </Link>
                </div>
                <div className="p-5 rounded-xl border border-accent-2/30 bg-accent-2/5">
                  <p className="text-sm text-primary/60 mb-2">Il servizio di marketing completo:</p>
                  <Link
                    href="/servizi/marketing-digitale"
                    className="font-bold text-primary hover:text-coral transition-colors text-sm"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    Scopri Marketing Digitale →
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
                  Vuoi sapere da dove iniziare nel tuo caso specifico?
                </h2>
                <p className="text-bg/60 mb-6 text-sm">
                  Il calcolatore gratuito analizza la tua attività in 3 minuti
                  e ti dice cosa automatizzare prima di investire in marketing.
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
          </GuideLayout>
        </div>
      </div>
    </>
  );
}
