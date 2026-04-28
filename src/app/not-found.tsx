import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p
          className="text-8xl font-bold text-primary/10 mb-2 leading-none"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          404
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold text-primary mb-4"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Pagina non trovata
        </h1>
        <p className="text-primary/60 mb-10 leading-relaxed">
          Questa pagina non esiste o è stata spostata.
          Torna alla home o usa i link qui sotto.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-all hover:scale-105 inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Torna alla home →
          </Link>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full border-2 border-primary/20 text-primary font-bold hover:border-primary/50 transition-all inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Contattami
          </Link>
        </div>
      </div>
    </div>
  );
}
