import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Zap, Sparkles, BarChart3, Mail, Plug } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Automation",
  description:
    "Automazioni AI per PMI italiane: chatbot, workflow automatizzati, integrazione strumenti. Libera il tuo team dal lavoro ripetitivo.",
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
