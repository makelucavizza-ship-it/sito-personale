"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HOME_FAQS } from "@/data/home-faqs";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Domande su di me
          </h2>
          <p className="text-primary/60 text-lg">
            Quello che ti staresti chiedendo. Se manca qualcosa,{" "}
            <a href="/contatti" className="text-coral underline underline-offset-2">
              scrivimi
            </a>
            .
          </p>
        </motion.div>

        <div className="space-y-2">
          {HOME_FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <button
                data-cursor="faq"
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-200 flex items-start justify-between gap-4 group ${
                  faq.highlight
                    ? "border-coral/40 bg-coral/5 hover:bg-coral/10 hover:border-coral/60"
                    : "border-primary/10 bg-white/50 hover:border-primary/20 hover:bg-white/80"
                }`}
              >
                <span
                  className={`text-base font-bold transition-colors ${
                    faq.highlight
                      ? "text-coral group-hover:text-coral/80"
                      : "text-primary group-hover:text-coral"
                  }`}
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {faq.q}
                </span>
                <motion.span
                  className={`text-xl leading-none mt-0.5 flex-shrink-0 ${faq.highlight ? "text-coral/60" : "text-primary/40"}`}
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`px-6 pb-5 pt-3 text-sm leading-relaxed border border-t-0 rounded-b-xl ${
                        faq.highlight
                          ? "text-primary/70 border-coral/30 bg-coral/5"
                          : "text-primary/70 border-primary/10 bg-white/30"
                      }`}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
