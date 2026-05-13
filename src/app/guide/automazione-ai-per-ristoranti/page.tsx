import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";

export const metadata: Metadata = {
  title: { absolute: "Automazione AI per Ristoranti: Guida Pratica | Luca Vizza" },
  description:
    "5 strumenti AI concreti già usati da ristoranti normali: agente vocale, gestione prenotazioni, risposta recensioni, CRM clienti, WhatsApp marketing. Cosa fanno e quanto tempo fanno risparmiare.",
  alternates: {
    canonical: "https://lucavizza.it/guide/automazione-ai-per-ristoranti",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automazione AI per ristoranti: cosa si può fare oggi",
  description:
    "5 strumenti AI concreti già usati da ristoranti normali: agente vocale, gestione prenotazioni, risposta recensioni, CRM clienti, WhatsApp marketing.",
  author: { "@type": "Person", name: "Luca Vizza" },
  publisher: { "@type": "Organization", name: "Luca Vizza", url: "https://lucavizza.it" },
  datePublished: "2026-05-13",
  url: "https://lucavizza.it/guide/automazione-ai-per-ristoranti",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Devo già avere un gestionale per usare questi strumenti?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Molti strumenti AI funzionano in modo autonomo o si integrano con strumenti semplici come Google Calendar, WhatsApp Business o un foglio Google. Non è necessario avere un sistema gestionale complesso.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo ci vuole per vedere i primi risultati?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'agente vocale inizia a rispondere alle chiamate dal primo giorno di attivazione. Il CRM clienti mostra i primi dati utili dopo 4-6 settimane di utilizzo. Il WhatsApp marketing dà risultati già dalla prima campagna, in genere con tassi di apertura del 60-80%.",
      },
    },
    {
      "@type": "Question",
      name: "Uno chef o un titolare di ristorante deve imparare a programmare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assolutamente no. Questi strumenti vengono configurati una volta sola da chi li implementa. Una volta attivi, l'interfaccia per il ristoratore è semplice quanto leggere le notifiche sul telefono.",
      },
    },
    {
      "@type": "Question",
      name: "L'AI può rispondere alle recensioni negative senza fare danni?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì, se configurata correttamente. L'AI genera una bozza di risposta empatica e professionale, che puoi approvare con un clic prima che venga pubblicata. Non risponde mai in automatico senza il tuo ok — a meno che tu non voglia così.",
      },
    },
  ],
};

const FAQS = [
  {
    q: "Devo già avere un gestionale per usare questi strumenti?",
    a: "No. Molti strumenti AI funzionano in modo autonomo o si integrano con strumenti semplici come Google Calendar, WhatsApp Business o un foglio Google. Non è necessario avere un sistema gestionale complesso.",
  },
  {
    q: "Quanto tempo ci vuole per vedere i primi risultati?",
    a: "L'agente vocale inizia a rispondere alle chiamate dal primo giorno di attivazione. Il CRM clienti mostra i primi dati utili dopo 4-6 settimane di utilizzo. Il WhatsApp marketing dà risultati già dalla prima campagna, in genere con tassi di apertura del 60-80%.",
  },
  {
    q: "Uno chef o un titolare di ristorante deve imparare a programmare?",
    a: "Assolutamente no. Questi strumenti vengono configurati una volta sola da chi li implementa. Una volta attivi, l'interfaccia per il ristoratore è semplice quanto leggere le notifiche sul telefono.",
  },
  {
    q: "L'AI può rispondere alle recensioni negative senza fare danni?",
    a: "Sì, se configurata correttamente. L'AI genera una bozza di risposta empatica e professionale, che puoi approvare con un clic prima che venga pubblicata. Non risponde mai in automatico senza il tuo ok — a meno che tu non voglia così.",
  },
];

const USE_CASES = [
  {
    title: "Agente vocale AI per le prenotazioni",
    what: "Risponde al telefono al posto tuo, prende le prenotazioni, conferma via SMS o WhatsApp, aggiorna il calendario in tempo reale.",
    saving: "30-60 minuti al giorno di telefonate ripetitive",
    whoDoesIt: "Ristoranti in zona turistica, locali ad alto volume di coperti, pizzerie",
    color: "#5bc783",
  },
  {
    title: "Gestione prenotazioni automatica",
    what: "Integrazione tra il tuo numero, Google Calendar (o il tuo gestionale) e WhatsApp. Ogni prenotazione genera automaticamente un reminder al cliente 24 ore prima — riducendo le no-show.",
    saving: "Riduzione no-show fino al 40%",
    whoDoesIt: "Qualsiasi ristorante con prenotazioni, in particolare per la domenica e le festività",
    color: "#3ad3ef",
  },
  {
    title: "Risposta automatica alle recensioni Google e TripAdvisor",
    what: "L'AI legge la nuova recensione, genera una risposta personalizzata ed empatica (positiva o negativa) e la invia per approvazione. Tu la pubblichi con un clic o la modifichi.",
    saving: "2-4 ore a settimana di gestione reputazione online",
    whoDoesIt: "Ristoranti che ricevono 10+ recensioni al mese e non hanno tempo di risponderle tutte",
    color: "#ffbd59",
  },
  {
    title: "CRM clienti abituali",
    what: "Tiene traccia di chi viene spesso, quando, quanto spende. Ti avvisa quando un cliente abituale non torna da 30 giorni. Puoi inviargli un messaggio personalizzato con un'offerta.",
    saving: "Aumento della frequenza di ritorno dei clienti abituali del 15-25%",
    whoDoesIt: "Ristoranti con clientela locale fidelizzata, pizzerie e trattorie",
    color: "#544fb3",
  },
  {
    title: "WhatsApp Marketing automatico",
    what: "Messaggi personalizzati ai clienti che hanno dato il consenso: promozioni del lunedì, menu del giorno, eventi speciali. Tasso di apertura tipico: 70-80% (contro il 20-25% delle email).",
    saving: "Aumento del fatturato nei giorni di bassa copertura del 10-20%",
    whoDoesIt: "Ristoranti con clientela ricorrente e presenza su WhatsApp Business",
    color: "#ee826d",
  },
];

export default function GuideAIRistoranti() {
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
            <span>AI per ristoranti</span>
          </nav>

          {/* Header */}
          <header className="py-10">
            <span
              className="inline-block text-xs font-bold text-accent-3 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Ristorazione
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Automazione AI per ristoranti:
              cosa si può fare oggi
            </h1>
            <ColorBar className="w-24 mb-6" height={3} />
            <p className="text-lg text-primary/70 leading-relaxed">
              L&apos;AI non è fantascienza. Ristoranti normali la usano già per rispondere
              al telefono, gestire le prenotazioni e riattivare i clienti abituali.
              Ecco cosa è disponibile oggi, senza esagerare.
            </p>
          </header>

          <article className="space-y-12 pb-16">

            {/* Intro */}
            <section>
              <p className="text-primary/70 leading-relaxed mb-4">
                Quando si parla di &ldquo;AI per ristoranti&rdquo; si pensa subito a robot in cucina
                o sistemi costosissimi che richiedono mesi di implementazione. Non è così.
              </p>
              <p className="text-primary/70 leading-relaxed">
                Gli strumenti descritti in questa guida si attivano in pochi giorni e si integrano
                con quello che già usi: WhatsApp, Google Calendar, il tuo gestionale. Il costo
                è spesso inferiore a quello di un dipendente part-time.
              </p>
            </section>

            {/* Use cases */}
            <section>
              <h2
                className="text-2xl font-bold text-primary mb-8"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                5 strumenti AI concreti per il tuo ristorante
              </h2>
              <div className="space-y-6">
                {USE_CASES.map((uc, i) => (
                  <div
                    key={uc.title}
                    className="rounded-2xl border-2 p-6"
                    style={{ borderColor: uc.color + "40", backgroundColor: uc.color + "06" }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="text-3xl font-bold flex-shrink-0 leading-none mt-1"
                        style={{ fontFamily: "Phenomena, sans-serif", color: uc.color + "60" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          className="text-xl font-bold text-primary mb-3"
                          style={{ fontFamily: "Phenomena, sans-serif" }}
                        >
                          {uc.title}
                        </h3>
                        <p className="text-primary/70 text-sm leading-relaxed mb-4">{uc.what}</p>
                        <div className="flex flex-col sm:flex-row gap-3 text-xs">
                          <span
                            className="px-3 py-1.5 rounded-lg font-medium"
                            style={{ backgroundColor: uc.color + "20", color: uc.color }}
                          >
                            Risparmio: {uc.saving}
                          </span>
                          <span className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary/50">
                            Chi lo usa: {uc.whoDoesIt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Internal links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-coral/30 bg-coral/5">
                <p className="text-sm text-primary/60 mb-2">Focus sulle chiamate perse:</p>
                <Link
                  href="/guide/come-non-perdere-chiamate-ristorante"
                  className="font-bold text-primary hover:text-coral transition-colors text-sm"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Come non perdere chiamate al ristorante →
                </Link>
              </div>
              <div className="p-5 rounded-xl border border-accent-1/30 bg-accent-1/5">
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
                Da dove vuoi iniziare?
              </h2>
              <p className="text-bg/60 mb-6 text-sm">
                Il calcolatore gratuito identifica in 3 minuti quale strumento
                avrebbe il maggiore impatto sulla tua attività.
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
