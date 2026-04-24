import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ColorBar from "@/components/ColorBar";

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "Mi chiamo Luca Vizza. A 36 anni apro la partita IVA. Ho scelto un rischio consapevole invece di una timorosa sicurezza. Aiuto le PMI italiane a usare il digitale e l'AI per lavorare meglio.",
};

export default function ChiSonoPage() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Hero */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative">
          <div>
            <span
              className="inline-block text-sm font-bold text-accent-3 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Chi sono
            </span>
            <h1
              className="text-5xl md:text-6xl font-bold text-primary leading-none mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Luca
              <br />
              Vizza
            </h1>
            <ColorBar className="w-32 mb-8" height={4} />

            <p className="text-lg text-primary/80 leading-relaxed mb-5">
              A settembre 2026 apro la partita IVA. Sì, a 36 anni.
              No, non sono in ritardo — ho solo scelto un rischio consapevole
              invece di una timorosa sicurezza.
            </p>
            <p className="text-lg text-primary/70 leading-relaxed mb-5">
              Ho lavorato nella scuola, nel turismo, negli eventi e nella
              comunicazione. Ho fatto davvero di tutto, e per un lungo periodo
              ho faticato a rispondere alla domanda{" "}
              <em>&ldquo;ma tu cosa fai esattamente?&rdquo;</em>
            </p>
            <p className="text-lg text-primary/70 leading-relaxed mb-5">
              Oggi quella risposta ce l&apos;ho chiara: aiuto le PMI italiane
              a usare il digitale e l&apos;AI per lavorare meglio e perdere
              meno tempo.
            </p>
            <p className="text-base text-primary/50 leading-relaxed italic border-l-2 border-accent-1 pl-4">
              &ldquo;Cresciamo insieme con l&apos;AI&rdquo;
            </p>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl overflow-hidden border-2 border-accent-1/20 bg-gradient-to-br from-accent-1/10 to-accent-5/10">
              <Image
                src="/luca-vizza-nobg.png"
                alt="Luca Vizza"
                width={600}
                height={600}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-coral rounded-2xl px-5 py-3">
              <span
                className="text-white font-bold text-sm block"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Romagna → tutta Italia
              </span>
              <span className="text-white/70 text-xs">da remoto</span>
            </div>
          </div>
        </section>

        {/* Il punto di svolta */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-6"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Il punto di svolta
          </h2>
          <div className="max-w-2xl space-y-5">
            <p className="text-primary/70 leading-relaxed">
              È stato l&apos;ITS Academy Turismo Emilia-Romagna — mi diploma a
              giugno 2026. Non è stata solo formazione tecnica. Mi ha fatto
              capire dall&apos;interno come ragionano le piccole imprese: cosa
              le fa funzionare, cosa le spaventa, cosa invece le dà la carica.
            </p>
            <p className="text-primary/70 leading-relaxed">
              Nel mezzo è arrivata l&apos;AI. Ho iniziato a costruire agenti
              vocali per le prenotazioni, CRM personalizzati, preventivatori
              automatici, strategie di marketing digitale. Strumenti concreti
              che cambiano la giornata lavorativa di chi li usa.
            </p>
          </div>
        </section>

        {/* Cosa faccio */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-8"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Cosa faccio concretamente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                color: "#3ad3ef",
                title: "Marketing digitale",
                desc: "Social media, campagne Meta e Google Ads, email marketing, SEO, contenuti. Strategie che portano clienti reali, non solo numeri sul dashboard.",
              },
              {
                color: "#5bc783",
                title: "AI e automazioni",
                desc: "Agenti vocali, CRM personalizzati, WhatsApp marketing, preventivatori automatici. Strumenti su misura che liberano tempo.",
              },
              {
                color: "#ee826d",
                title: "Strategia digitale",
                desc: "Analisi della situazione, piano d'azione concreto, esecuzione. Senza fronzoli e senza strategie che restano nel cassetto.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border-2"
                style={{ borderColor: item.color + "40", backgroundColor: item.color + "08" }}
              >
                <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: item.color }} />
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

        {/* A chi mi rivolgo */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-6"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            A chi mi rivolgo
          </h2>
          <div className="max-w-2xl">
            <p className="text-primary/70 leading-relaxed mb-6">
              PMI che hanno a che fare col pubblico e le prenotazioni:
              ristoranti, hotel, parrucchieri, studi dentistici, avvocati,
              officine, estetiste. Piccole dimensioni, alta qualità del
              prodotto o servizio, focus sul cliente.
            </p>
            <p className="text-primary/70 leading-relaxed mb-8">
              Poca dimestichezza col digitale, ma fiducia in quello che può
              fare. Con me si parla chiaro, si ottengono strumenti facili e
              pratici. Senza fronzoli.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Ristorazione", "Turismo", "Benessere", "Studi professionali", "Commercio", "Artigianato"].map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 rounded-full border border-accent-1/40 text-sm text-primary/70 bg-accent-1/5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Come lavoro */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-8"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Come lavoro
          </h2>
          <div className="space-y-6 max-w-2xl">
            {[
              {
                title: "Parlo io, non un assistente",
                desc: "Scrivi e rispondo io. Almeno per il momento. L'AI la uso per lavorare meglio, non per sparire.",
              },
              {
                title: "Strumenti pratici, non strategie astratte",
                desc: "Quello che costruiamo insieme deve funzionare il giorno dopo, non restare in un documento PowerPoint.",
              },
              {
                title: "Trasparenza totale",
                desc: "Sai sempre cosa sto facendo e perché. Report chiari, aggiornamenti frequenti, zero sorprese.",
              },
              {
                title: "Rischio consapevole",
                desc: "Ho scelto di fare questo a 36 anni perché ci credo davvero. Non lavoro per fare numero — lavoro per costruire qualcosa che funziona.",
              },
            ].map((v, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 bg-accent-1 rounded-full flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className="text-lg font-bold text-primary mb-1"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-primary/60 text-sm leading-relaxed">{v.desc}</p>
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
            Lavoriamo insieme?
          </h2>
          <p className="text-primary/60 mb-2 max-w-xl mx-auto">
            Sono di base in Romagna, lavoro da remoto in tutta Italia.
          </p>
          <p className="text-primary/60 mb-8 max-w-xl mx-auto">
            Se ti interessa capire come posso aiutarti, scrivimi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/audit"
              className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Audit gratuito
            </Link>
            <Link
              href="/contatti"
              className="px-8 py-4 rounded-full border-2 border-primary/20 text-primary font-bold hover:border-primary/40 transition-colors"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Scrivimi
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
