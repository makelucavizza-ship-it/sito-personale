import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioItems } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case study e progetti di marketing digitale e AI automation. Risultati concreti per PMI italiane.",
};

export default function PortfolioPage() {
  const items = getPortfolioItems();

  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 relative">
          <span
            className="inline-block text-sm font-bold text-accent-2 uppercase tracking-widest mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Portfolio
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold text-primary leading-none mb-6"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Risultati
            <br />
            <span className="text-accent-2">concreti</span>
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mb-4 leading-relaxed">
            Progetti reali, numeri veri. I clienti sono anonimizzati su loro
            richiesta — i risultati no.
          </p>
          <p className="text-sm text-primary/40">
            In fase di costruzione — nuovi case study in arrivo.
          </p>
        </section>

        {/* Portfolio grid */}
        {items.length > 0 ? (
          <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/portfolio/${item.slug}`}
                  className="group rounded-2xl p-7 border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  style={{
                    borderColor: item.color + "40",
                    backgroundColor: item.color + "08",
                  }}
                >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="text-xs px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.sector}
                    </span>
                    {item.services.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{ borderColor: item.color + "40", color: item.color }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <h2
                    className="text-2xl font-bold text-primary mb-2 group-hover:text-coral transition-colors"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    {item.title}
                  </h2>
                  <p className="text-primary/50 text-xs mb-4">{item.client}</p>
                  <p className="text-primary/60 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.results.length > 0 && (
                    <ul className="space-y-2">
                      {item.results.slice(0, 2).map((r, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-primary/70 font-medium">{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="py-8">
            <div className="rounded-2xl border-2 border-dashed border-primary/10 p-12 text-center">
              <p className="text-primary/40 mb-4">Case study in arrivo.</p>
              <p className="text-sm text-primary/30">
                Stai lavorando con me su un progetto pilota? Il tuo caso studio
                sarà tra i primi a essere pubblicato.
              </p>
            </div>
          </section>
        )}

        {/* Pilot CTA */}
        <section className="py-16 border-t border-primary/10 text-center">
          <h2
            className="text-3xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Vuoi essere nel prossimo case study?
          </h2>
          <p className="text-primary/60 mb-8 max-w-xl mx-auto">
            Sono il progetto pilota: fino a settembre 2026 lavoro a costo zero
            con 3-5 aziende selezionate.
          </p>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Candidati al progetto pilota
          </Link>
        </section>
      </div>
    </div>
  );
}
