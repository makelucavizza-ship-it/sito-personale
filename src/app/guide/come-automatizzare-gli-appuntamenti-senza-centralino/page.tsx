import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";
import GuideLayout from "@/components/GuideLayout";
import { AppuntamentiIllustration } from "@/components/guide-images";

export const metadata: Metadata = {
  title: { absolute: "Come Automatizzare gli Appuntamenti Senza Centralino | Luca Vizza" },
  description:
    "Guida pratica per eliminare il centralino telefonico: quali fasi del processo appuntamenti si automatizzano, quali strumenti usare e quando hai ancora bisogno di un operatore umano.",
  alternates: {
    canonical: "https://lucavizza.it/guide/come-automatizzare-gli-appuntamenti-senza-centralino",
    languages: { it: "https://lucavizza.it/guide/come-automatizzare-gli-appuntamenti-senza-centralino" },
  },
};

const SECTIONS = [
  { id: "il-processo-manuale", title: "Il processo manuale e quanto costa" },
  { id: "cosa-si-automatizza", title: "Cosa si può automatizzare" },
  { id: "gli-strumenti", title: "Gli strumenti disponibili" },
  { id: "quando-serve-il-centralino", title: "Quando hai ancora bisogno di un operatore umano" },
  { id: "faq", title: "Domande frequenti" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Come automatizzare gli appuntamenti senza centralino: guida pratica",
  description:
    "Guida pratica per eliminare il centralino telefonico: processi automatizzabili, strumenti per ogni fase e quando è ancora necessario un operatore umano.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-14",
  url: "https://lucavizza.it/guide/come-automatizzare-gli-appuntamenti-senza-centralino",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Devo avere un gestionale per automatizzare gli appuntamenti?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Si può partire da Google Calendar, che è gratuito e si integra facilmente con agenti vocali e bot WhatsApp. Un gestionale dedicato è utile se hai un volume alto di appuntamenti o hai bisogno di funzioni avanzate (statistiche, pagamenti, ecc.), ma non è un prerequisito.",
      },
    },
    {
      "@type": "Question",
      name: "I clienti si adatteranno a prenotare con un sistema automatico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende dalla fascia d'età e dall'abitudine della tua clientela. In generale, chi prenota via telefono si adatta facilmente all'agente vocale perché l'interazione è identica — si parla normalmente. Chi preferisce WhatsApp o il web può usare canali alternativi. L'automazione non esclude nessuno: aggiunge opzioni.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo ci vuole per configurare un sistema automatizzato?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Per un setup base (agente vocale + Google Calendar) bastano 5-7 giorni lavorativi. Include la raccolta delle informazioni sulla tua attività, la configurazione dell'agente, i test e l'attivazione. Per setup più complessi con CRM e WhatsApp, 2-3 settimane.",
      },
    },
    {
      "@type": "Question",
      name: "Cosa succede se il cliente fa una richiesta che il sistema non capisce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'agente vocale è configurato per riconoscere quando una richiesta è fuori dal suo perimetro. In quel caso, trasferisce la chiamata a te o a un collaboratore, oppure prende nota per un ricontatto. Nessun cliente rimane senza risposta.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "Devo avere un gestionale per automatizzare gli appuntamenti?",
    a: "No. Si può partire da Google Calendar, che è gratuito e si integra facilmente con agenti vocali e bot WhatsApp. Un gestionale dedicato è utile se hai un volume alto di appuntamenti o hai bisogno di funzioni avanzate (statistiche, pagamenti, ecc.), ma non è un prerequisito.",
  },
  {
    q: "I clienti si adatteranno a prenotare con un sistema automatico?",
    a: "Dipende dalla fascia d'età e dall'abitudine della tua clientela. In generale, chi prenota via telefono si adatta facilmente all'agente vocale perché l'interazione è identica — si parla normalmente. Chi preferisce WhatsApp o il web può usare canali alternativi. L'automazione non esclude nessuno: aggiunge opzioni.",
  },
  {
    q: "Quanto tempo ci vuole per configurare un sistema automatizzato?",
    a: "Per un setup base (agente vocale + Google Calendar) bastano 5-7 giorni lavorativi. Include la raccolta delle informazioni sulla tua attività, la configurazione dell'agente, i test e l'attivazione. Per setup più complessi con CRM e WhatsApp, 2-3 settimane.",
  },
  {
    q: "Cosa succede se il cliente fa una richiesta che il sistema non capisce?",
    a: "L'agente vocale è configurato per riconoscere quando una richiesta è fuori dal suo perimetro. In quel caso, trasferisce la chiamata a te o a un collaboratore, oppure prende nota per un ricontatto. Nessun cliente rimane senza risposta.",
  },
];

export default function GuideAutomatizzareAppuntamenti() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-6">
          <nav className="pt-8 pb-4 text-sm text-primary/40 flex items-center gap-2">
            <Link href="/guide" className="hover:text-primary transition-colors">Guide</Link>
            <span>›</span>
            <span>Automatizzare gli appuntamenti</span>
          </nav>

          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-accent-1 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Operatività
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Come automatizzare gli
              appuntamenti senza centralino
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              Un centralino a tempo pieno costa 20-25.000€ l&apos;anno. Ma quasi nessuna PMI
              italiana ha davvero bisogno di un centralino — ha bisogno che gli appuntamenti
              vengano gestiti. Sono due cose diverse.
            </p>
          </header>

          <figure className="mb-8 rounded-2xl border-2 flex items-center justify-center py-6" style={{ borderColor: "#3ad3ef30", backgroundColor: "#3ad3ef08" }} aria-label="Illustrazione automazione appuntamenti senza centralino">
            <AppuntamentiIllustration size="hero" />
          </figure>

          <GuideLayout sections={SECTIONS} wordCount={850}>
            <article className="space-y-12 pb-16">

              <section id="il-processo-manuale">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Il processo manuale e quanto costa
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Mappare il processo attuale è il primo passo. Nella maggior parte delle attività
                  il ciclo di un appuntamento si divide in queste fasi:
                </p>
                <div className="space-y-3">
                  {[
                    { phase: "1. Ricezione della richiesta", method: "Telefonata, WhatsApp, Instagram DM, email", time: "2-5 min", color: "#3ad3ef" },
                    { phase: "2. Verifica disponibilità", method: "Controllo agenda cartacea, foglio Excel, app", time: "1-3 min", color: "#5bc783" },
                    { phase: "3. Conferma e comunicazione al cliente", method: "Richiamata, messaggio WhatsApp, SMS", time: "1-3 min", color: "#ffbd59" },
                    { phase: "4. Reminder pre-appuntamento", method: "Messaggio manuale o dimenticato", time: "1-2 min (spesso omesso)", color: "#544fb3" },
                    { phase: "5. Gestione disdette e spostamenti", method: "Telefonata, modifica agenda manuale", time: "3-8 min", color: "#ee826d" },
                  ].map((p) => (
                    <div
                      key={p.phase}
                      className="flex gap-4 p-4 rounded-xl border"
                      style={{ borderColor: p.color + "30", backgroundColor: p.color + "06" }}
                    >
                      <div
                        className="w-2 rounded-full flex-shrink-0 mt-1"
                        style={{ backgroundColor: p.color }}
                      />
                      <div className="flex-1">
                        <p
                          className="font-bold text-primary text-sm mb-1"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {p.phase}
                        </p>
                        <p className="text-xs text-primary/50 mb-1">{p.method}</p>
                      </div>
                      <span
                        className="text-xs font-bold flex-shrink-0 self-start mt-1"
                        style={{ color: p.color }}
                      >
                        {p.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm text-primary/70">
                    <strong>Costo totale stimato per appuntamento:</strong> 8-21 minuti di lavoro amministrativo.
                    Su 30 appuntamenti a settimana, parliamo di 4-10 ore settimanali di puro lavoro
                    non fatturabile — che spesso cade sul titolare.
                  </p>
                </div>
              </section>

              <section id="cosa-si-automatizza">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Cosa si può automatizzare
                </h2>
                <p className="text-primary/70 leading-relaxed mb-6">
                  Di quelle cinque fasi, quattro sono completamente automatizzabili.
                  Una richiede ancora giudizio umano — ma solo in certi casi.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      phase: "Ricezione richiesta",
                      automatable: true,
                      how: "Agente vocale + bot WhatsApp + form online",
                    },
                    {
                      phase: "Verifica disponibilità",
                      automatable: true,
                      how: "Integrazione con Google Calendar o gestionale",
                    },
                    {
                      phase: "Conferma al cliente",
                      automatable: true,
                      how: "SMS o WhatsApp automatico dopo la prenotazione",
                    },
                    {
                      phase: "Reminder pre-appuntamento",
                      automatable: true,
                      how: "Messaggio automatico 24h prima",
                    },
                    {
                      phase: "Disdette semplici",
                      automatable: true,
                      how: "Il cliente risponde al reminder con 'annulla' o 'sposta'",
                    },
                    {
                      phase: "Richieste complesse",
                      automatable: false,
                      how: "Trattative, casi speciali, richieste personalizzate",
                    },
                  ].map((item) => (
                    <div
                      key={item.phase}
                      className="p-4 rounded-xl border-2 flex items-start gap-3"
                      style={{
                        borderColor: item.automatable ? "#5bc78340" : "#ee826d40",
                        backgroundColor: item.automatable ? "#5bc78306" : "#ee826d06",
                      }}
                    >
                      <span
                        className="text-lg flex-shrink-0"
                        style={{ color: item.automatable ? "#5bc783" : "#ee826d" }}
                      >
                        {item.automatable ? "✓" : "✗"}
                      </span>
                      <div>
                        <p
                          className="font-bold text-primary text-sm mb-1"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {item.phase}
                        </p>
                        <p className="text-xs text-primary/50">{item.how}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="gli-strumenti">
                <h2
                  className="text-2xl font-bold text-primary mb-6"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Gli strumenti disponibili
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      tool: "Agente vocale AI",
                      phase: "Ricezione + gestione telefonata",
                      desc: "Risponde al telefono, raccoglie i dati necessari per la prenotazione, verifica disponibilità e conferma. Si integra con il tuo numero esistente tramite deviazione di chiamata.",
                      bestFor: "Attività con alto volume di chiamate vocali",
                      color: "#5bc783",
                    },
                    {
                      tool: "Bot WhatsApp Business",
                      phase: "Ricezione messaggi + conferme",
                      desc: "Gestisce le prenotazioni in entrata via WhatsApp: risponde alle domande frequenti, mostra disponibilità, prende la prenotazione. Ideale per clienti che preferiscono la chat alla telefonata.",
                      bestFor: "Attività con clientela giovane o abituata a WhatsApp",
                      color: "#3ad3ef",
                    },
                    {
                      tool: "Google Calendar + automazioni",
                      phase: "Agenda + reminder",
                      desc: "Con n8n o Make, Google Calendar diventa il centro di tutto: ogni nuova prenotazione genera automaticamente un reminder, una conferma al cliente e un aggiornamento dell'agenda. Gratis o quasi.",
                      bestFor: "Punto di partenza per chi non ha ancora un gestionale",
                      color: "#ffbd59",
                    },
                    {
                      tool: "CRM con storico clienti",
                      phase: "Fidelizzazione + follow-up",
                      desc: "Registra ogni appuntamento e tiene traccia delle visite. Ti avvisa quando un cliente abituale non prenota da tempo. Puoi inviargli un messaggio di riattivazione personalizzato.",
                      bestFor: "Attività con clientela ricorrente da fidelizzare",
                      color: "#544fb3",
                    },
                  ].map((s) => (
                    <div
                      key={s.tool}
                      className="p-6 rounded-xl border-2"
                      style={{ borderColor: s.color + "40", backgroundColor: s.color + "06" }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          className="font-bold text-primary"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {s.tool}
                        </h3>
                        <span
                          className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: s.color + "20", color: s.color }}
                        >
                          {s.phase}
                        </span>
                      </div>
                      <p className="text-primary/60 text-sm leading-relaxed mb-3">{s.desc}</p>
                      <p className="text-xs text-primary/40">
                        <strong>Ideale per:</strong> {s.bestFor}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="quando-serve-il-centralino">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Quando hai ancora bisogno di un operatore umano
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  L&apos;automazione non è una risposta a tutto. Ci sono situazioni in cui
                  la presenza umana non è sostituibile — ed è importante riconoscerle
                  invece di sovraautomatizzare.
                </p>
                <div className="space-y-3">
                  {[
                    "Richieste che richiedono giudizio discrezionale (deroghe, casi particolari, negoziazioni)",
                    "Clienti che esprimono disagio, frustrazione o urgenza emotiva",
                    "Situazioni di emergenza o urgenza medica",
                    "Primo contatto con un cliente VIP o un account strategico",
                    "Reclami e gestione di situazioni problematiche",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 p-4 rounded-lg bg-primary/3 border border-primary/8">
                      <span className="text-primary/30 flex-shrink-0 mt-0.5">→</span>
                      <p className="text-sm text-primary/60">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-primary/70 leading-relaxed mt-4">
                  Il modello più efficace non è &ldquo;tutto automatico&rdquo; ma &ldquo;automatico
                  dove possibile, umano dove necessario&rdquo;. L&apos;agente vocale è configurato
                  per riconoscere questi casi e trasferire la chiamata.
                </p>
              </section>

              <figure className="hidden md:flex my-2 rounded-xl border justify-center py-4" style={{ borderColor: "#3ad3ef20", backgroundColor: "#3ad3ef05" }} aria-label="Schema del ciclo automatizzato degli appuntamenti">
                <AppuntamentiIllustration size="inline" />
              </figure>

              {/* Internal link */}
              <div className="p-6 rounded-2xl border-2 border-accent-3/30 bg-accent-3/5">
                <p className="text-sm text-primary/60 mb-2">Vuoi vedere il costo reale delle chiamate perse?</p>
                <Link
                  href="/guide/quanto-costa-non-rispondere-al-telefono"
                  className="font-bold text-primary hover:text-coral transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Quanto costa non rispondere al telefono →
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
                  Vuoi sapere da dove iniziare?
                </h2>
                <p className="text-bg/60 mb-6 text-sm">
                  Il calcolatore gratuito analizza la tua attività e ti dice in 3 minuti
                  quali processi automatizzare per primo.
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
