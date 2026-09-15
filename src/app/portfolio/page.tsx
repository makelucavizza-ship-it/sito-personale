import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioItems } from "@/lib/markdown";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case study e progetti di marketing digitale e AI automation. Risultati concreti per PMI italiane.",
};

export default function PortfolioPage() {
  const items = getPortfolioItems();

  return (
    <div className="pt-24">
      <div className="max-w-6xl mx-auto px-6">
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

        {/* Portfolio grid + filtro */}
        <section className="py-8">
          {items.length > 0 ? (
            <PortfolioFilter items={items} />
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-primary/10 p-12 text-center">
              <p className="text-primary/40">Case study in arrivo.</p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-primary/10 text-center">
          <h2
            className="text-3xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Vuoi essere nel prossimo case study?
          </h2>
          <p className="text-primary/60 mb-8 max-w-xl mx-auto">
            Scrivimi per parlare del tuo progetto.
          </p>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Contattami
          </Link>
        </section>
      </div>
    </div>
  );
}
