"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    title: "Strategia Social",
    description: "Contenuti che convertono,\nnon solo like.",
    color: "#3ad3ef",
    href: "/servizi/marketing-digitale",
  },
  {
    title: "AI Automation",
    description: "Automatizza i processi\nripetitivi con l'AI.",
    color: "#5bc783",
    href: "/servizi/automazione-ai",
  },
  {
    title: "Meta & Google Ads",
    description: "Campagne data-driven\nche portano clienti.",
    color: "#ffbd59",
    href: "/servizi/marketing-digitale",
  },
  {
    title: "Email Marketing",
    description: "Newsletter e automazioni\nche vendono mentre dormi.",
    color: "#544fb3",
    href: "/servizi/marketing-digitale",
  },
  {
    title: "Content Strategy",
    description: "Piano editoriale costruito\nsui tuoi obiettivi.",
    color: "#ee826d",
    href: "/servizi/marketing-digitale",
  },
  {
    title: "Chatbot & AI Tools",
    description: "Assistenti AI personalizzati\nper la tua azienda.",
    color: "#5ed5bf",
    href: "/servizi/automazione-ai",
  },
  {
    title: "SEO & Analytics",
    description: "Visibilità organica\ne dati che guidano.",
    color: "#3ad3ef",
    href: "/servizi/marketing-digitale",
  },
  {
    title: "Audit Digitale",
    description: "Fotografia del tuo\npresente digitale.",
    color: "#ee826d",
    href: "/audit",
  },
];

export default function ServicesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Cosa faccio
          </h2>
          <p className="text-primary/60 text-lg">
            Servizi costruiti attorno ai tuoi obiettivi, non a pacchetti standard.
          </p>
        </motion.div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-[calc((100vw-1280px)/2+24px)] snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="snap-start flex-shrink-0"
          >
            <Link
              href={service.href}
              data-cursor="carousel"
              className="block w-64 h-52 rounded-2xl p-6 border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              style={{ borderColor: service.color + "40", backgroundColor: service.color + "08" }}
            >
              <div
                className="w-8 h-1 rounded-full mb-4 transition-all duration-300 group-hover:w-16"
                style={{ backgroundColor: service.color }}
              />
              <h3
                className="text-xl font-bold text-primary mb-3 leading-tight"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="text-primary/60 text-sm leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="max-w-5xl mx-auto px-6 mt-4">
        <p className="text-primary/30 text-xs flex items-center gap-2">
          <span>scorri</span>
          <span>→</span>
        </p>
      </div>
    </section>
  );
}
