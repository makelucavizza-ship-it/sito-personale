import type { Metadata } from "next";
import AuditForm from "@/components/audit/AuditForm";
import ColorBar from "@/components/ColorBar";

export const metadata: Metadata = {
  title: "Audit Digitale Gratuito",
  description:
    "Scopri il livello di maturità digitale della tua azienda. Report personalizzato in 5 minuti, gratis.",
};

export default function AuditPage() {
  return (
    <div className="pt-24">
      <div className="max-w-3xl mx-auto px-6">
        <section className="py-16">
          <span
            className="inline-block text-sm font-bold text-coral uppercase tracking-widest mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Gratuito
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-primary leading-none mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Audit Digitale
          </h1>
          <ColorBar className="w-32 mb-6" height={4} />
          <p className="text-lg text-primary/70 mb-4 leading-relaxed">
            5 domande sul tuo settore e ricevi un report personalizzato
            via email con:
          </p>
          <ul className="space-y-2 mb-10">
            {[
              "Livello di maturità digitale attuale",
              "Servizi di marketing e AI consigliati",
              "Bandi e finanziamenti applicabili",
              "3 azioni immediate che puoi fare subito",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-primary/70">
                <span className="w-5 h-5 rounded-full bg-coral/10 border border-coral/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-coral text-xs font-bold">{i + 1}</span>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <AuditForm />
      </div>
    </div>
  );
}
