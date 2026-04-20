import type { Metadata } from "next";
import Link from "next/link";
import ColorBar from "@/components/ColorBar";

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "Luca Vizza, freelance di marketing digitale e AI automation. Lavoro con PMI italiane per costruire strategie di crescita concrete e misurabili.",
};

export default function ChiSonoPage() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
            <ColorBar className="w-32 mb-6" height={4} />
            <p className="text-lg text-primary/70 leading-relaxed mb-6">
              Sono un freelance di marketing digitale e AI automation.
              Aiuto le PMI italiane a costruire una presenza online efficace
              e ad automatizzare i processi con gli strumenti di AI più
              avanzati.
            </p>
            <p className="text-lg text-primary/70 leading-relaxed mb-6">
              Il mio approccio è pratico: niente strategie astratte, solo
              azioni concrete con risultati misurabili. Lavoro a stretto
              contatto con i miei clienti — non delego al buio.
            </p>
            <p className="text-base text-primary/50 leading-relaxed italic">
              &ldquo;Cresciamo insieme con l&apos;AI&rdquo;
            </p>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-accent-1/20 to-accent-5/20 border-2 border-accent-1/20 flex items-center justify-center">
              <span
                className="text-8xl font-bold text-primary/10"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                LV
              </span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-coral rounded-2xl px-5 py-3">
              <span
                className="text-white font-bold text-sm block"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Marketing Digitale
              </span>
              <span className="text-white/70 text-xs">& AI Automation</span>
            </div>
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
                title: "Strategia digitale",
                desc: "Costruisco piani di marketing su misura, partendo dall'analisi della situazione attuale e degli obiettivi reali.",
              },
              {
                color: "#5bc783",
                title: "Automazione AI",
                desc: "Implemento strumenti di AI e workflow automatizzati che fanno risparmiare tempo e riducono gli errori.",
              },
              {
                color: "#ee826d",
                title: "Esecuzione pratica",
                desc: "Non mi fermo alla strategia: gestisco campagne, contenuti, tool e do report mensili trasparenti.",
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

        {/* Valori */}
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
                title: "Trasparenza totale",
                desc: "Sai sempre cosa faccio e perché. Report mensili, aggiornamenti frequenti, zero sorprese.",
              },
              {
                title: "Risultati, non attività",
                desc: "Non mi pago a post pubblicati o email inviate. Il successo si misura sugli obiettivi di business.",
              },
              {
                title: "Collaborazione vera",
                desc: "Lavoro con te, non per te. Le migliori soluzioni nascono dalla combinazione di competenze tecniche e conoscenza del settore.",
              },
              {
                title: "Apprendimento continuo",
                desc: "L'AI e il marketing digitale cambiano ogni settimana. Mi aggiorno costantemente per portarti sempre le soluzioni più efficaci.",
              },
            ].map((v, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 bg-accent-1 rounded-full flex-shrink-0" />
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
          <p className="text-primary/60 mb-8 max-w-xl mx-auto">
            Inizia dall&apos;audit gratuito per capire come posso aiutarti
            concretamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/audit"
              className="px-8 py-4 rounded-full bg-coral text-white font-bold hover:bg-coral/90 transition-colors"
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
