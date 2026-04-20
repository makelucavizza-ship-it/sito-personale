import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Per le Agenzie",
  description:
    "Freelance affidabile per agenzie di marketing che cercano risorse esterne. Subappalto, overflow di lavoro, competenze specifiche in AI e digital.",
};

export default function AgenziePage() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16">
          <span
            className="inline-block text-sm font-bold text-accent-4 uppercase tracking-widest mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Per le agenzie
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Hai troppo
            <br />
            lavoro?
            <br />
            <span className="text-accent-4">Parliamo.</span>
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mb-10 leading-relaxed">
            Collaboro con agenzie di marketing come risorsa esterna affidabile:
            subappalto su progetti specifici, overflow di lavoro, o competenze
            specialistiche che non hai in-house.
          </p>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full bg-accent-4 text-white font-bold text-lg hover:bg-accent-4/90 transition-all hover:scale-105 inline-block"
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
                title: "Affidabilità prima di tutto",
                desc: "Rispetto le scadenze, comunico in modo proattivo e segnalo subito qualsiasi problema. Niente sorprese.",
                color: "#544fb3",
              },
              {
                title: "Competenze AI che pochi hanno",
                desc: "Integro strumenti AI nei progetti: automazioni, chatbot, generazione contenuti. Un valore aggiunto differenziante per i tuoi clienti.",
                color: "#5ed5bf",
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Briefing",
                desc: "Mi mandi un brief del progetto o cliente. Rispondo entro 24h con disponibilità e stima.",
              },
              {
                step: "02",
                title: "Accordo",
                desc: "Definiamo scope, tempi e modalità di collaborazione. Tutto chiaro per iscritto.",
              },
              {
                step: "03",
                title: "Esecuzione",
                desc: "Lavoro in autonomia o integrato nel tuo team, con aggiornamenti regolari sulla mia pipeline.",
              },
            ].map((item) => (
              <div key={item.step}>
                <span
                  className="text-5xl font-bold text-accent-4/20 block mb-2"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-xl font-bold text-primary mb-2"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-primary/60 text-sm">{item.desc}</p>
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
            className="px-8 py-4 rounded-full bg-accent-4 text-white font-bold hover:bg-accent-4/90 transition-colors inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Scrivimi
          </Link>
        </section>
      </div>
    </div>
  );
}
