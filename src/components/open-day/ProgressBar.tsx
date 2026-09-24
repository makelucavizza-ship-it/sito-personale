"use client";

import { motion } from "framer-motion";

// Barra sottile in cima allo schermo: quanto manca alla fine della presentazione, senza distrarre.
export default function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = total > 1 ? ((step + 1) / total) * 100 : 100;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-primary/10 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-[#ee826d] to-[#c8582e]"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}
