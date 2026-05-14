import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: { absolute: "Agente Vocale AI: cos'è e come funziona | Luca Vizza" },
  description:
    "Cos'è un agente vocale AI, come funziona e per quali attività ha senso. Spiegazione pratica senza tecnicismi — con esempi reali per ristoranti, saloni e studi medici.",
  alternates: {
    canonical: "https://lucavizza.it/guide/agente-vocale-ai-cos-e-come-funziona",
    languages: { it: "https://lucavizza.it/guide/agente-vocale-ai-cos-e-come-funziona" },
  },
};

const SECTIONS = [
  { id: "definizione", title: "Cos'è un agente vocale AI, in parole semplici" },
  { id: "come-funziona", title: "Come funziona tecnicamente" },
  { id: "casi-uso", title: "Casi d'uso concreti" },
  { id: "quando-ha-senso", title: "Quando ha senso e quando no" },
  { id: "faq", title: "Domande frequenti" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Agente vocale AI: cos'è, come funziona e per chi ha senso",
  description:
    "Cos'è un agente vocale AI, come risponde al telefono al posto tuo, come si integra con il numero esistente e in quali settori ha davvero senso usarlo.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-13",
  url: "https://lucavizza.it/guide/agente-vocale-ai-cos-e-come-funziona",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Un agente vocale AI capisce l'italiano con accenti regionali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. I modelli di sintesi e riconoscimento vocale moderni sono addestrati su varietà ampie dell'italiano, inclusi accenti regionali comuni. Non è perfetto al 100%, ma nella pratica gestisce bene la maggior parte delle conversazioni quotidiane.",
      },
    },
    {
      "@type": "Question",
      name: "Devo cambiare numero di telefono per usarlo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. L'agente vocale si configura per ricevere le chiamate in entrata sul tuo numero esistente — tramite deviazione di chiamata o integrazione SIP. Il cliente chiama il numero che già conosce.",
      },
    },
    {
      "@type": "Question",
      name: "Cosa succede se l'agente non sa rispondere a una domanda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dipende da come è configurato. Può trasferire la chiamata a te o a un collaboratore, oppure prendere nota e avvisarti. Nessun cliente rimane senza risposta.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto costa un agente vocale AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il costo dipende dal volume di chiamate e dalla complessità del setup. Il calcolatore gratuito su lucavizza.it ti dà una stima personalizzata in 3 minuti.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "Un agente vocale AI capisce l'italiano con accenti regionali?",
    a: "Sì. I modelli di sintesi e riconoscimento vocale moderni sono addestrati su varietà ampie dell'italiano, inclusi accenti regionali comuni. Non è perfetto al 100%, ma nella pratica gestisce bene la maggior parte delle conversazioni quotidiane.",
  },
  {
    q: "Devo cambiare numero di telefono per usarlo?",
    a: "No. L'agente vocale si configura per ricevere le chiamate in entrata sul tuo numero esistente — tramite deviazione di chiamata o integrazione SIP. Il cliente chiama il numero che già conosce.",
  },
  {
    q: "Cosa succede se l'agente non sa rispondere a una domanda?",
    a: "Dipende da come è configurato. Può trasferire la chiamata a te o a un collaboratore, oppure prendere nota e avvisarti. Nessun cliente rimane senza risposta.",
  },
  {
    q: "Quanto costa un agente vocale AI?",
    a: "Il costo dipende dal volume di chiamate e dalla complessità del setup. Il calcolatore gratuito su lucavizza.it ti dà una stima personalizzata in 3 minuti.",
  },
];

export default function GuideAgenteVocale() {
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
            <span>Agente vocale AI</span>
          </nav>

          {/* Header */}
          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-accent-1 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Guida introduttiva
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Agente vocale AI: cos&apos;è, come funziona
              e per chi ha senso
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              Hai sentito parlare di agenti vocali AI ma non sei sicuro di capire cosa siano
              davvero. Questa guida lo spiega dall&apos;inizio, senza assumere conoscenze tecniche.
            </p>
          </header>

          <GuideLayout sections={SECTIONS} wordCount={800}>
            <article className="prose-custom space-y-12 pb-16">

              <section id="definizione">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Cos&apos;è un agente vocale AI, in parole semplici
                </h2>
                <p className="text-primary/70 leading-relaxed mb-4">
                  Un agente vocale AI è un sistema che risponde al telefono, capisce quello che
                  dice il chiamante e risponde in modo coerente — tutto in automatico, senza che
                  tu debba fare nulla. Non è un risponditore automatico che legge un testo registrato:
                  è un sistema che ascolta, elabora e risponde in modo contestuale.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Se qualcuno chiama per prenotare un tavolo, l&apos;agente chiede quante persone,
                  a che ora, prende il nome e conferma la prenotazione. Se qualcuno chiama per
                  sapere gli orari, risponde con gli orari. Se la domanda è troppo complessa,
                  trasferisce la chiamata o prende nota per richiamare.
                </p>
              </section>

              <section id="come-funziona">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Come funziona tecnicamente (versione comprensibile)
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      step: "1.",
                      title: "Riconoscimento vocale",
                      desc: "Quando il cliente parla, il sistema converte la voce in testo. Questa tecnologia — chiamata Speech-to-Text — è la stessa che usi quando detti un messaggio WhatsApp. Funziona in italiano e gestisce accenti e dialetti comuni.",
                      color: "#3ad3ef",
                    },
                    {
                      step: "2.",
                      title: "Comprensione e risposta",
                      desc: "Il testo viene elaborato da un modello linguistico (come quelli alla base di ChatGPT) che capisce il contesto della richiesta e genera una risposta appropriata. L'agente viene configurato con le informazioni della tua attività: orari, prezzi, procedure di prenotazione.",
                      color: "#5bc783",
                    },
                    {
                      step: "3.",
                      title: "Sintesi vocale",
                      desc: "La risposta viene convertita in voce. Oggi la sintesi vocale suona come una persona reale, non come il robotico degli anni '90. Puoi scegliere il tono e il nome dell'agente.",
                      color: "#ffbd59",
                    },
                    {
                      step: "4.",
                      title: "Integrazione telefonica",
                      desc: "Tutto questo avviene in tempo reale durante la chiamata, tramite deviazione del tuo numero esistente. Non cambi numero, non devi comprare apparecchi nuovi.",
                      color: "#544fb3",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 p-5 rounded-xl border"
                      style={{ borderColor: item.color + "30", backgroundColor: item.color + "08" }}
                    >
                      <span
                        className="text-2xl font-bold flex-shrink-0"
                        style={{ fontFamily: "Phenomena, sans-serif", color: item.color }}
                      >
                        {item.step}
                      </span>
                      <div>
                        <h3
                          className="font-bold text-primary mb-1"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="casi-uso">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Casi d&apos;uso concreti
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      sector: "Ristoranti",
                      uses: ["Prenotazioni H24", "Conferme e reminder", "Risposta a orari e menu"],
                      color: "#ee826d",
                    },
                    {
                      sector: "Saloni e estetisti",
                      uses: ["Appuntamenti automatici", "Lista d'attesa", "Reminder pre-appuntamento"],
                      color: "#544fb3",
                    },
                    {
                      sector: "Studi medici",
                      uses: ["Prima disponibilità", "Disdette e spostamenti", "Info generali sullo studio"],
                      color: "#5bc783",
                    },
                  ].map((s) => (
                    <div
                      key={s.sector}
                      className="p-5 rounded-xl border-2"
                      style={{ borderColor: s.color + "40", backgroundColor: s.color + "08" }}
                    >
                      <h3
                        className="font-bold text-primary mb-3"
                        style={{ fontFamily: "Phenomena, sans-serif", color: s.color }}
                      >
                        {s.sector}
                      </h3>
                      <ul className="space-y-1">
                        {s.uses.map((u) => (
                          <li key={u} className="text-sm text-primary/60 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section id="quando-ha-senso">
                <h2
                  className="text-2xl font-bold text-primary mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Quando ha senso e quando no
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border-2 border-accent-3/30 bg-accent-3/5">
                    <h3
                      className="font-bold text-accent-3 mb-3"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      Ha senso se…
                    </h3>
                    <ul className="space-y-2 text-sm text-primary/70">
                      {[
                        "Ricevi molte chiamate ripetitive (prenotazioni, orari, prezzi)",
                        "Hai uno staff limitato e spesso non puoi rispondere",
                        "Perdi clienti fuori orario o durante i momenti di picco",
                        "Le chiamate si concentrano in fasce orarie specifiche",
                      ].map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent-3 flex-shrink-0">✓</span>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl border-2 border-coral/30 bg-coral/5">
                    <h3
                      className="font-bold text-coral mb-3"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      Non ha senso se…
                    </h3>
                    <ul className="space-y-2 text-sm text-primary/70">
                      {[
                        "Le tue chiamate richiedono sempre una trattativa complessa",
                        "Ricevi pochissime chiamate (meno di 5 al giorno)",
                        "Il tuo settore richiede empatia situazionale molto alta (lutto, emergenze)",
                        "I tuoi clienti sono prevalentemente anziani con difficoltà tecnologiche",
                      ].map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-coral flex-shrink-0">✗</span>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Internal link */}
              <div className="p-6 rounded-2xl border-2 border-accent-1/30 bg-accent-1/5">
                <p className="text-sm text-primary/60 mb-2">Vuoi vedere come funziona nella pratica?</p>
                <Link
                  href="/servizi/automazione-ai"
                  className="font-bold text-primary hover:text-coral transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Scopri il servizio agente vocale AI →
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
                  Vuoi capire se fa al caso tuo?
                </h2>
                <p className="text-bg/60 mb-6 text-sm">
                  Il calcolatore gratuito analizza la tua attività e ti dice in 3 minuti
                  quali processi puoi automatizzare e quanto potresti risparmiare.
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
