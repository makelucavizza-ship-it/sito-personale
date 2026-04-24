import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bandi Digitalizzazione Romagna",
  description:
    "Guida ai bandi e finanziamenti per la digitalizzazione delle PMI in Romagna. Aggiornata e curata da Luca Vizza.",
};

const BANDI = [
  {
    title: "Voucher Digitalizzazione PMI",
    ente: "MISE / MiSE",
    desc: "Contributi a fondo perduto per l'acquisto di software, hardware e servizi digitali. Verificare disponibilità fondi.",
    importo: "Fino a €10.000",
    stato: "Verificare",
    color: "#3ad3ef",
  },
  {
    title: "Piano Nazionale di Ripresa e Resilienza (PNRR)",
    ente: "Governo Italiano",
    desc: "Misure per la transizione digitale delle imprese. Bandi specifici per PMI manifatturiere e servizi.",
    importo: "Variabile",
    stato: "Attivo",
    color: "#5bc783",
  },
  {
    title: "Credito d'imposta R&S e Innovazione",
    ente: "Agenzia delle Entrate",
    desc: "Agevolazione fiscale per attività di ricerca, sviluppo e innovazione tecnologica, inclusa l'innovazione digitale.",
    importo: "20-45% dei costi",
    stato: "Attivo",
    color: "#ffbd59",
  },
  {
    title: "Bando Regione Emilia-Romagna — Digital4PMI",
    ente: "Regione Emilia-Romagna",
    desc: "Finanziamenti per progetti di digitalizzazione rivolti alle PMI dell'Emilia-Romagna. Priorità per turismo, food e manifatturiero.",
    importo: "Fino a €30.000",
    stato: "Periodico",
    color: "#544fb3",
  },
  {
    title: "Sabatini Digital",
    ente: "Cassa Depositi e Prestiti",
    desc: "Finanziamenti agevolati per acquisto di beni strumentali 4.0, inclusi sistemi di automazione e software gestionali.",
    importo: "Variabile",
    stato: "Attivo",
    color: "#ee826d",
  },
];

export default function BandiPage() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 relative">
          <span
            className="inline-block text-sm font-bold text-accent-2 uppercase tracking-widest mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Risorse
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-primary leading-none mb-6"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Bandi per la
            <br />
            <span className="text-accent-2">digitalizzazione</span>
            <br />
            in Romagna
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mb-6 leading-relaxed">
            Una guida pratica ai principali finanziamenti e agevolazioni
            disponibili per le PMI che vogliono investire nel digitale.
            Curata e aggiornata periodicamente.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary/40 mb-10">
            <span>Ultimo aggiornamento: aprile 2026</span>
            <span>·</span>
            <span>Verifica sempre la disponibilità fondi prima di applicare</span>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-accent-2/10 border border-accent-2/30 rounded-2xl p-6 mb-12">
          <p className="text-sm text-primary/70 leading-relaxed">
            <strong>Nota:</strong> Questa pagina ha scopo informativo.
            Le condizioni dei bandi cambiano frequentemente. Prima di applicare,
            verifica sempre con il soggetto erogante o un consulente abilitato.
            Posso aiutarti a capire quali bandi sono applicabili alla tua
            situazione nell&apos;ambito di una consulenza.
          </p>
        </div>

        {/* Bandi list */}
        <section className="py-4">
          <div className="space-y-6">
            {BANDI.map((bando) => (
              <div
                key={bando.title}
                className="rounded-2xl p-7 border-2 hover:shadow-md transition-all duration-300"
                style={{ borderColor: bando.color + "40", backgroundColor: bando.color + "08" }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: bando.color }}
                      >
                        {bando.stato}
                      </span>
                      <span className="text-xs text-primary/40">{bando.ente}</span>
                    </div>
                    <h3
                      className="text-xl font-bold text-primary mb-2"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      {bando.title}
                    </h3>
                    <p className="text-primary/60 text-sm leading-relaxed">{bando.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className="text-lg font-bold block"
                      style={{ color: bando.color, fontFamily: "Phenomena, sans-serif" }}
                    >
                      {bando.importo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Come usare */}
        <section className="py-16 border-t border-primary/10">
          <h2
            className="text-3xl font-bold text-primary mb-6"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Come ti aiuto con i bandi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Identificazione",
                desc: "Ti dico quali bandi sono applicabili alla tua azienda in base a settore, dimensione e progetto.",
                color: "#3ad3ef",
              },
              {
                title: "Progettazione",
                desc: "Costruiamo insieme il progetto di digitalizzazione che rende la tua azienda eleggibile al finanziamento.",
                color: "#5bc783",
              },
              {
                title: "Esecuzione",
                desc: "Implemento le soluzioni digitali richieste dal bando, documentando tutto per la rendicontazione.",
                color: "#ee826d",
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

        {/* CTA */}
        <section className="py-16 border-t border-primary/10 text-center">
          <h2
            className="text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Vuoi capire quali bandi
            <br />
            si applicano a te?
          </h2>
          <p className="text-primary/60 mb-8">
            Fai l&apos;audit e nel report indico i bandi più rilevanti per la
            tua situazione.
          </p>
          <Link
            href="/audit"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Fai l&apos;audit gratuito
          </Link>
        </section>
      </div>
    </div>
  );
}
