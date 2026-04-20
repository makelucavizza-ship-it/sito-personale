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
      className="px-6 py-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-accent-5/20 border border-accent-5/40 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span
              className="inline-block text-xs font-bold text-accent-5 uppercase tracking-widest mb-2"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Progetto pilota — posti limitati
            </span>
            <p className="text-primary text-base md:text-lg font-medium max-w-xl">
              Fino a settembre 2026 seleziono{" "}
              <strong>3-5 aziende</strong> con cui lavorare{" "}
              <strong>a costo zero</strong> in cambio di feedback
              e case study.
            </p>
          </div>
          <Link
            href="/contatti"
            className="flex-shrink-0 px-6 py-3 rounded-full bg-primary text-bg font-bold hover:bg-primary/80 transition-colors text-sm whitespace-nowrap"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Candidati ora
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
