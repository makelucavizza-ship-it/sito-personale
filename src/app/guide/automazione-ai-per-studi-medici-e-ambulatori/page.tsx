import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";
import GuideLayout from "@/components/GuideLayout";
import { StudiMediciIllustration } from "@/components/guide-images";

export const metadata: Metadata = {
  title: { absolute: "Automazione AI per Studi Medici e Ambulatori | Luca Vizza" },
  description:
    "Come studi medici e ambulatori gestiscono appuntamenti, disdette e reminder con l'AI — rispettando il GDPR. Guida pratica senza tecnicismi per medici e professionisti sanitari.",
  alternates: {
    canonical: "https://lucavizza.it/guide/automazione-ai-per-studi-medici-e-ambulatori",
    languages: { it: "https://lucavizza.it/guide/automazione-ai-per-studi-medici-e-ambulatori" },
  },
};

const SECTIONS = [
  { id: "il-problema", title: "Il problema degli studi medici" },
  { id: "le-soluzioni", title: "Le soluzioni AI per studi medici" },
  { id: "gdpr", title: "Conformità GDPR: cosa devi sapere" },
  { id: "faq", title: "Domande frequenti" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automazione AI per studi medici e ambulatori: appuntamenti, reminder e GDPR",
  description:
    "Come studi medici e ambulatori gestiscono appuntamenti, disdette e reminder con l'AI nel rispetto del GDPR. Guida pratica per medici e professionisti sanitari.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-14",
  url: "https://lucavizza.it/guide/automazione-ai-per-studi-medici-e-ambulatori",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "L'agente vocale AI può accedere alle cartelle cliniche dei pazienti?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. L'agente vocale gestisce solo la parte logistica: nome, data dell'appuntamento, tipo di visita. Non ha accesso e non tratta dati clinici. Il trattamento dei dati sanitari rimane separato e sotto il controllo diretto dello studio.",
      },
    },
    {
      "@type": "Question",
      name: "È necessario il consenso del paziente per usare l'agente vocale AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. Come per qualsiasi trattamento automatizzato dei dati personali, è necessario che il paziente venga informato e abbia espresso consenso. L'informativa privacy dello studio va aggiornata per includere il trattamento tramite strumenti automatizzati.",
      },
    },
    {
      "@type": "Question",
      name: "I dati dei pazienti sono al sicuro con questi strumenti?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dagli strumenti scelti. Per la sanità è fondamentale usare fornitori europei con server in UE, con contratto DPA (Data Processing Agreement) firmato. Non tutti i fornitori di agenti vocali rispettano questi requisiti — è uno degli aspetti che valuto durante la fase di selezione degli strumenti.",
      },
    },
    {
      "@type": "Question",
      name: "Un paziente anziano riesce a interagire con un agente vocale AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dal profilo della tua utenza. L'agente vocale AI parla in italiano naturale — per molti pazienti anziani l'interazione è simile a parlare con una segretaria. Tuttavia, per studi con utenza prevalentemente anziana è consigliabile configurare sempre un'uscita di fallback che trasferisce a un operatore umano.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "L'agente vocale AI può accedere alle cartelle cliniche dei pazienti?",
    a: "No. L'agente vocale gestisce solo la parte logistica: nome, data dell'appuntamento, tipo di visita. Non ha accesso e non tratta dati clinici. Il trattamento dei dati sanitari rimane separato e sotto il controllo diretto dello studio.",
  },
  {
    q: "È necessario il consenso del paziente per usare l'agente vocale AI?",
    a: "Sì. Come per qualsiasi trattamento automatizzato dei dati personali, è necessario che il paziente venga informato e abbia espresso consenso. L'informativa privacy dello studio va aggiornata per includere il trattamento tramite strumenti automatizzati.",
  },
  {
    q: "I dati dei pazienti sono al sicuro con questi strumenti?",
    a: "Dipende dagli strumenti scelti. Per la sanità è fondamentale usare fornitori europei con server in UE, con contratto DPA (Data Processing Agreement) firmato. Non tutti i fornitori di agenti vocali rispettano questi requisiti — è uno degli aspetti che valuto durante la fase di selezione degli strumenti.",
  },
  {
    q: "Un paziente anziano riesce a interagire con un agente vocale AI?",
    a: "Dipende dal profilo della tua utenza. L'agente vocale AI parla in italiano naturale — per molti pazienti anziani l'interazione è simile a parlare con una segretaria. Tuttavia, per studi con utenza prevalentemente anziana è consigliabile configurare sempre un'uscita di fallback che trasferisce a un operatore umano.",
  },
];

export default function GuideAIStudiMedici() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="pt-8 pb-4 text-sm text-primary/40 flex items-center gap-2">
            <Link href="/guide" className="hover:text-primary transition-colors">Guide</Link>
            <span>›</span>
            <span>AI per studi medici</span>
          </nav>

          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-accent-3 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Sanità e benessere
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Automazione AI per studi
              medici e ambulatori
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              La segreteria è in visita con te, il telefono squilla, il paziente
              aspetta. L&apos;AI può gestire la parte logistica — appuntamenti,
              reminder, disdette — nel rispetto del GDPR. Ecco come.
            </p>
          </header>

          <figure className="mb-8 rounded-2xl border-2 flex items-center justify-center py-6" style={{ borderColor: "#5bc78330", backgroundColor: "#5bc78308" }} aria-label="Illustrazione automazione AI per studi medici">
            <StudiMediciIllustration size="hero" />
          </figure>

          <GuideLayout sections={SECTIONS} wordCount={850}>
            <article className="space-y-12 pb-16">

              <section id="il-problema">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Il problema degli studi medici
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Studi medici e ambulatori ricevono un alto volume di chiamate ripetitive:
                  prenotazioni, disdette, richieste di informazioni su orari e servizi.
                  La maggior parte di queste non richiede la presenza del medico —
                  ma richiede la presenza di qualcuno che risponda.
                </p>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Quando la segreteria è in visita o occupata, le chiamate cadono.
                  Il paziente, specie se anziano, riprova una o due volte — poi cerca
                  un altro studio o si rivolge al pronto soccorso per questioni non urgenti.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      problem: "20-30 chiamate al giorno",
                      detail: "La maggior parte per prenotazioni e informazioni standard",
                      color: "#5bc783",
                    },
                    {
                      problem: "Il 15-25% non riceve risposta",
                      detail: "Durante le visite, il pranzo, i momenti di picco",
                      color: "#ffbd59",
                    },
                    {
                      problem: "No-show al 10-15%",
                      detail: "Pazienti che non si presentano senza avvisare",
                      color: "#ee826d",
                    },
                    {
                      problem: "2-3 ore/giorno di lavoro amministrativo",
                      detail: "Gestibili in parte con automazione",
                      color: "#3ad3ef",
                    },
                  ].map((p) => (
                    <div
                      key={p.problem}
                      className="p-4 rounded-xl border-2"
                      style={{ borderColor: p.color + "40", backgroundColor: p.color + "08" }}
                    >
                      <p
                        className="font-bold text-primary text-sm mb-1"
                        style={{ fontFamily: "Phenomena, sans-serif" }}
                      >
                        {p.problem}
                      </p>
                      <p className="text-xs text-primary/50">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="le-soluzioni">
                <h2
                  className="text-2xl font-bold text-primary mb-6"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Le soluzioni AI per studi medici
                </h2>
                <div className="space-y-5">
                  {[
                    {
                      title: "Agente vocale per prenotazioni e disdette",
                      desc: "Gestisce le chiamate in entrata quando la segreteria non è disponibile. Il paziente può prenotare, spostare o disdire un appuntamento parlando normalmente. L'agente controlla la disponibilità in tempo reale e aggiorna il calendario senza intervento umano.",
                      saving: "1-2 ore al giorno di gestione telefonica",
                      color: "#5bc783",
                    },
                    {
                      title: "Reminder automatici per ridurre le no-show",
                      desc: "Il sistema invia un reminder via SMS o WhatsApp 24-48 ore prima dell'appuntamento. Il paziente può confermare con un messaggio. Le no-show si riducono del 30-50% — ogni posto liberato può essere riassegnato a chi è in lista d'attesa.",
                      saving: "Riduzione no-show 30-50%",
                      color: "#3ad3ef",
                    },
                    {
                      title: "Gestione lista d'attesa",
                      desc: "Quando un paziente disdice, il sistema scorre automaticamente la lista d'attesa e invia una notifica ai primi candidati disponibili. Chi accetta, prenota direttamente. Nessuno spreco di slot liberi.",
                      saving: "Tasso di riempimento agenda +15-20%",
                      color: "#ffbd59",
                    },
                    {
                      title: "Risposte automatiche a domande frequenti",
                      desc: "Orari, indirizzo, parcheggio, documenti da portare, modalità di pagamento — queste domande arrivano ogni giorno via telefono e WhatsApp. Un bot configurato con le informazioni del tuo studio risponde in autonomia, 24 ore su 24.",
                      saving: "30-45 minuti al giorno di risposte ripetitive",
                      color: "#544fb3",
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

              <section id="gdpr">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Conformità GDPR: cosa devi sapere
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Il settore sanitario è soggetto a requisiti GDPR più stringenti rispetto
                  ad altri settori, perché i dati dei pazienti rientrano nella categoria
                  dei dati sensibili. Prima di implementare qualsiasi strumento di automazione,
                  è fondamentale verificare questi punti:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Data Processing Agreement (DPA)",
                      desc: "Ogni fornitore di strumenti che tratta dati personali per tuo conto deve firmare un contratto DPA. Senza questo accordo, sei esposto a sanzioni. Verifica sempre che il fornitore sia disponibile a firmarlo prima di attivare il servizio.",
                      color: "#5bc783",
                      status: "Obbligatorio",
                    },
                    {
                      title: "Server in Europa (UE)",
                      desc: "I dati dei pazienti europei devono essere trattati su server situati nell'Unione Europea, salvo garanzie equivalenti. Verifica esplicitamente dove vengono archiviati i dati audio delle chiamate e i dati personali raccolti dall'agente.",
                      color: "#3ad3ef",
                      status: "Obbligatorio",
                    },
                    {
                      title: "Minimizzazione dei dati",
                      desc: "L'agente vocale deve raccogliere solo i dati strettamente necessari per la gestione dell'appuntamento: nome, data, tipo di visita, contatto. Nessun dato clinico, diagnosi o farmaco deve essere trattato dall'automazione.",
                      color: "#ffbd59",
                      status: "Principio GDPR",
                    },
                    {
                      title: "Aggiornamento dell'informativa privacy",
                      desc: "I pazienti devono essere informati dell'utilizzo di strumenti automatizzati per il trattamento dei loro dati. L'informativa privacy dello studio va aggiornata e resa disponibile prima dell'attivazione.",
                      color: "#544fb3",
                      status: "Obbligatorio",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-5 rounded-xl border-2"
                      style={{ borderColor: item.color + "40", backgroundColor: item.color + "06" }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          className="font-bold text-primary"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full flex-shrink-0 font-bold"
                          style={{ backgroundColor: item.color + "20", color: item.color }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <figure className="hidden md:flex my-2 rounded-xl border justify-center py-4" style={{ borderColor: "#5bc78320", backgroundColor: "#5bc78305" }} aria-label="Illustrazione delle soluzioni AI per studi medici con conformità GDPR">
                <StudiMediciIllustration size="inline" />
              </figure>

              {/* Internal link */}
              <div className="p-6 rounded-2xl border-2 border-accent-1/30 bg-accent-1/5">
                <p className="text-sm text-primary/60 mb-2">Come funziona tecnicamente l&apos;agente vocale?</p>
                <Link
                  href="/guide/agente-vocale-ai-cos-e-come-funziona"
                  className="font-bold text-primary hover:text-coral transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Agente vocale AI: cos&apos;è, come funziona e per chi ha senso →
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

              <section className="bg-primary rounded-3xl px-8 py-10 text-center">
                <h2
                  className="text-2xl font-bold text-bg mb-3"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Vuoi capire cosa si può automatizzare nel tuo studio?
                </h2>
                <p className="text-bg/60 mb-6 text-sm">
                  Il calcolatore gratuito analizza la tua situazione e identifica
                  i processi automatizzabili nel rispetto della normativa.
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
