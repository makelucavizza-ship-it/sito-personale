import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Collaborazioni con Agenzie | Luca Vizza — AI Automation" },
  description:
    "Freelance per agenzie che cercano competenze AI specialistiche: agenti vocali, automazioni, workflow n8n/Make. White label disponibile. Risposta entro 24 ore.",
  alternates: {
    canonical: "https://lucavizza.it/agenzie",
    languages: { it: "https://lucavizza.it/agenzie" },
  },
};

export default function AgenziePage() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 relative">
          <span
            className="inline-block text-sm font-bold text-accent-4 uppercase tracking-widest mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Per le agenzie
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-6"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Il tuo cliente vuole l&apos;AI.
            <br />
            <span className="text-accent-4">Tu sai già a chi affidarti?</span>
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mb-10 leading-relaxed">
            Quando un cliente chiede automazioni AI, agenti vocali o workflow
            intelligenti, molte agenzie non sanno da dove iniziare. Io mi
            occupo esattamente di questo — in white label, integrato nei tuoi
            processi, senza che il cliente finale sappia che ci sono io.
          </p>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#544fb3] to-[#3a368a] text-white font-bold text-lg hover:from-[#3a368a] hover:to-[#2d2b70] transition-all hover:scale-105 inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Parliamo →
          </Link>
        </section>

        {/* Perché lavorare con me */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-10"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Perché lavorare con me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Competenze AI che pochi hanno",
                desc: "Integro strumenti AI nei progetti: agenti vocali, automazioni, chatbot, workflow n8n/Make. Un valore aggiunto differenziante che puoi vendere ai tuoi clienti.",
                color: "#5ed5bf",
              },
              {
                title: "Affidabilità prima di tutto",
                desc: "Rispetto le scadenze, comunico in modo proattivo e segnalo subito qualsiasi problema. Niente sorprese.",
                color: "#544fb3",
              },
              {
                title: "White label disponibile",
                desc: "Lavoro sotto il tuo brand senza problemi. I tuoi clienti non sanno che ci sono io — a meno che tu non voglia.",
                color: "#3ad3ef",
              },
              {
                title: "Flessibilità",
                desc: "Disponibile per progetti one-shot, collaborazioni continuative o picchi di lavoro stagionali. Mi adatto alle tue esigenze.",
                color: "#5bc783",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border-2"
                style={{ borderColor: item.color + "40", backgroundColor: item.color + "08" }}
              >
                <div
                  className="w-8 h-1 rounded-full mb-4"
                  style={{ backgroundColor: item.color }}
                />
                <h3
                  className="text-xl font-bold text-primary mb-2"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-primary/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cosa posso fare per te */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-8"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            In cosa posso aiutarti
          </h2>
          <ul className="space-y-4 max-w-2xl">
            {[
              "Gestione campagne Meta Ads e Google Ads",
              "Strategia e gestione social media",
              "Email marketing e marketing automation",
              "Implementazione chatbot e strumenti AI",
              "Audit digitale per clienti di agenzie",
              "Costruzione workflow n8n / Make / Zapier",
              "Content strategy e piano editoriale",
              "Copywriting per landing page e ADV",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-primary/70">
                <span className="w-2 h-2 rounded-full bg-accent-4 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Come funziona */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-8"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Come funziona
          </h2>
          <div className="space-y-6 max-w-3xl">
            {[
              {
                step: "01",
                title: "Rapporto con il cliente finale",
                desc: "Di default non entro mai in contatto diretto con il cliente finale — tutto passa attraverso di te. Se per un progetto specifico preferisci che io partecipi in modo visibile, lo definiamo esplicitamente nell'accordo. Il tuo brand rimane al centro.",
                color: "#5ed5bf",
              },
              {
                step: "02",
                title: "Se qualcosa va storto",
                desc: "Hai un canale diretto con me (Slack, WhatsApp o email dedicata — decidiamo insieme). Le revisioni hanno un SLA indicativo di 48 ore lavorative. Se un progetto si blocca per ragioni esterne, ti avviso subito e propongo un piano alternativo — non sparisco.",
                color: "#544fb3",
              },
              {
                step: "03",
                title: "Tempi di consegna tipici",
                desc: "Setup agente vocale AI: 5–7 giorni lavorativi. Audit marketing con documento priorità: 3–4 giorni. Setup campagne Ads (Meta o Google): 5–10 giorni. Workflow automation (n8n/Make): 3–7 giorni a seconda della complessità. Tempi calcolati dalla raccolta delle informazioni complete.",
                color: "#3ad3ef",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-6 p-6 rounded-2xl border"
                style={{ borderColor: item.color + "30", backgroundColor: item.color + "06" }}
              >
                <span
                  className="text-4xl font-bold flex-shrink-0 leading-none mt-1"
                  style={{ fontFamily: "Phenomena, sans-serif", color: item.color + "50" }}
                >
                  {item.step}
                </span>
                <div>
                  <h3
                    className="text-xl font-bold text-primary mb-2"
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

        {/* CTA */}
        <section className="py-16 border-t border-primary/10 text-center">
          <h2
            className="text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Hai un progetto in mente?
          </h2>
          <p className="text-primary/60 mb-8">
            Scrivimi con il brief e ti rispondo entro 24 ore.
          </p>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#544fb3] to-[#3a368a] text-white font-bold hover:from-[#3a368a] hover:to-[#2d2b70] transition-colors inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Scrivimi
          </Link>
        </section>
      </div>
    </div>
  );
}
