import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ColorBar from "@/components/ColorBar";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Luca Vizza per una consulenza di marketing digitale o AI automation. Risposta entro 24 ore.",
};

export default function ContattiPage() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6">
        <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-start relative">
          {/* Left */}
          <div>
            <span
              className="inline-block text-sm font-bold text-accent-5 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Contatti
            </span>
            <h1
              className="text-5xl md:text-6xl font-bold text-primary leading-none mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Parliamo
            </h1>
            <ColorBar className="w-32 mb-8" height={4} />
            <div className="space-y-6">
              <p className="text-lg text-primary/70 leading-relaxed">
                Hai un progetto in mente, vuoi capire se possiamo lavorare
                insieme, o hai semplicemente una domanda?
              </p>
              <p className="text-primary/70">
                Scrivi — rispondo entro 24 ore.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:make.luca.vizza@gmail.com"
                className="flex items-center gap-3 text-primary/70 hover:text-coral transition-colors group"
              >
                <span className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-coral transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span>make.luca.vizza@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/luca-vizza"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="linkedin"
                className="flex items-center gap-3 text-primary/70 hover:text-[#0077B5] transition-colors group"
              >
                <span className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-[#0077B5] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/makevizza/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="instagram"
                className="flex items-center gap-3 text-primary/70 hover:text-[#E1306C] transition-colors group"
              >
                <span className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-[#E1306C] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
