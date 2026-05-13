import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Zap, Sparkles, BarChart3, Mail, Plug } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Agente Vocale AI e Automazioni per PMI",
  description:
    "Agente vocale AI H24, CRM personalizzato, WhatsApp marketing e workflow automatizzati per PMI italiane. Smetti di perdere chiamate e libera il tuo team dal lavoro ripetitivo.",
  alternates: {
    canonical: "https://lucavizza.it/servizi/automazione-ai",
  },
};

const USECASES: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
  {
    icon: Bot,
    title: "Chatbot intelligenti",
    desc: "Assistenti AI sul tuo sito o WhatsApp che rispondono ai clienti H24, qualificano i lead e gestiscono le FAQ.",
    color: "#3ad3ef",
  },
  {
    icon: Zap,
    title: "Workflow automatizzati",
    desc: "Connetti i tuoi strumenti (CRM, email, social, gestionale) e elimina il copia-incolla manuale tra sistemi.",
    color: "#5bc783",
  },
  {
    icon: Sparkles,
    title: "Generazione contenuti AI",
    desc: "Pipeline per creare bozze di post, newsletter, schede prodotto — con il tuo tono di voce, non quello generico.",
    color: "#ffbd59",
  },
  {
    icon: BarChart3,
    title: "Report e analytics automatici",
    desc: "Dashboard e report settimanali/mensili inviati automaticamente. Smetti di raccogliere dati a mano.",
    color: "#544fb3",
  },
  {
    icon: Mail,
    title: "Email automation avanzata",
    desc: "Sequenze di nurturing, follow-up automatici, riattivazione clienti dormienti — senza intervento manuale.",
    color: "#ee826d",
  },
  {
    icon: Plug,
    title: "Integrazioni personalizzate",
    desc: "Con n8n, Make o Zapier costruisco flussi su misura che collegano tutti i tuoi strumenti.",
    color: "#5ed5bf",
  },
];

export default function AutomazioneAIPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="px-6 py-16 max-w-5xl mx-auto relative">
        <span
          className="inline-block text-sm font-bold text-accent-1 uppercase tracking-widest mb-4"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Servizio
        </span>
        <h1
          className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          AI
          <br />
          <span className="text-accent-3">Automation</span>
        </h1>
        <p className="text-xl text-primary/70 max-w-2xl leading-relaxed">
          L&apos;AI non è fantascienza — è uno strumento concreto per fare di più
          con meno. Automatizzo i processi ripetitivi della tua azienda così il
          tuo team può concentrarsi su quello che conta davvero.
        </p>
      </section>

      {/* Agente vocale AI */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="bg-primary rounded-3xl px-8 py-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-3/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span
                className="inline-block text-xs font-bold text-accent-3 uppercase tracking-widest mb-4"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Il servizio più richiesto
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-bg leading-tight mb-4"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Agente vocale AI:
                <br />
                il telefono risponde
                <br />
                anche quando sei occupato.
              </h2>
              <p className="text-bg/60 text-base leading-relaxed mb-6">
                Un agente vocale AI risponde alle chiamate in entrata al posto tuo: raccoglie
                prenotazioni, risponde alle domande frequenti e trasferisce solo le chiamate
                che richiedono davvero la tua attenzione. Voce naturale, attivo H24, si integra
                con il tuo numero di telefono esistente senza cambiare nulla.
              </p>
              <Link
                href="/contatti"
                className="inline-block px-7 py-3.5 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-all hover:scale-105"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Parliamo del tuo caso →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Per chi ha senso",
                  desc: "Ristoranti, saloni di bellezza, studi medici, officine, bed & breakfast — qualsiasi attività che riceve molte chiamate con staff limitato.",
                  color: "#5bc783",
                },
                {
                  label: "Come funziona",
                  desc: "Voce AI naturale, risponde in italiano, gestisce più chiamate in contemporanea. Il trascritto di ogni chiamata ti arriva via email o WhatsApp.",
                  color: "#3ad3ef",
                },
                {
                  label: "Tempi di setup",
                  desc: "5–7 giorni lavorativi dalla raccolta delle informazioni alla prima chiamata gestita dall'agente.",
                  color: "#ffbd59",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 border"
                  style={{ borderColor: item.color + "40", backgroundColor: item.color + "10" }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest block mb-1"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                  <p className="text-bg/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-primary mb-10"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Cosa posso automatizzare
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USECASES.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.title}
                className="rounded-2xl p-6 border-2 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                style={{ borderColor: uc.color + "40", backgroundColor: uc.color + "08" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: uc.color + "20" }}
                >
                  <Icon size={22} style={{ color: uc.color }} />
                </div>
                <h3
                  className="text-xl font-bold text-primary mb-2"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {uc.title}
                </h3>
                <p className="text-primary/60 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Strumenti */}
      <section className="px-6 py-16 bg-primary/5 rounded-3xl max-w-5xl mx-auto mb-16">
        <h2
          className="text-3xl font-bold text-primary mb-6"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Strumenti che uso
        </h2>
        <div className="flex flex-wrap gap-3">
          {["n8n", "Make (Integromat)", "Claude AI", "ChatGPT", "Zapier", "Notion AI", "ActiveCampaign", "Brevo", "Airtable", "WhatsApp Business API"].map(
            (tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full border border-primary/20 text-sm text-primary/70"
              >
                {tool}
              </span>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center max-w-3xl mx-auto">
        <h2
          className="text-4xl font-bold text-primary mb-4"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Pronto a liberare del tempo?
        </h2>
        <p className="text-primary/60 mb-8">
          Fai l&apos;audit gratuito e scopri quali processi puoi automatizzare
          subito nella tua azienda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/audit"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-all hover:scale-105 inline-block text-center"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Scopri quanto tempo e soldi stai perdendo senza AI →
          </Link>
        </div>
      </section>
    </div>
  );
}
