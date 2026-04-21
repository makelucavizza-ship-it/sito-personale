"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PilotBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-6 py-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden bg-primary rounded-3xl px-8 py-10 md:py-12">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-accent-1/10 rounded-full translate-y-1/2 pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent-3 animate-pulse" />
                <span
                  className="text-xs font-bold text-accent-3 uppercase tracking-widest"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Progetto pilota — posti limitati
                </span>
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold text-bg leading-snug mb-3"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Lavoro gratis con 3-5 aziende
                <br />
                fino a settembre 2026.
              </h3>
              <p className="text-bg/60 text-sm md:text-base max-w-lg leading-relaxed">
                Sto costruendo il mio portfolio. In cambio del tuo tempo e
                feedback onesto, ricevi marketing digitale e AI automation
                a costo zero. Nessun trucco.
              </p>
            </div>
            <Link
              href="/contatti"
              className="flex-shrink-0 px-7 py-4 rounded-full bg-coral text-white font-bold hover:bg-coral/90 transition-all hover:scale-105 text-base whitespace-nowrap"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Candidati ora →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
