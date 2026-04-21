"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    icon: "🤖",
    title: "Agente vocale AI",
    description: "Risponde al telefono al posto tuo, raccoglie prenotazioni e info. H24, senza dimenticare nulla.",
    color: "#5bc783",
    href: "/servizi/automazione-ai",
  },
  {
    icon: "💬",
    title: "WhatsApp Marketing",
    description: "Messaggi automatici ai tuoi clienti: conferme, promozioni, follow-up. Dove già ti leggono.",
    color: "#5ed5bf",
    href: "/servizi/automazione-ai",
  },
  {
    icon: "🗂️",
    title: "CRM personalizzato",
    description: "Tieni traccia di clienti, appuntamenti e trattative senza Excel e Post-it.",
    color: "#544fb3",
    href: "/servizi/automazione-ai",
  },
  {
    icon: "⚙️",
    title: "Automazioni leggere",
    description: "Collego i tuoi strumenti così smetti di fare copia-incolla tra app diverse.",
    color: "#3ad3ef",
    href: "/servizi/automazione-ai",
  },
  {
    icon: "📱",
    title: "Social Media",
    description: "Contenuti che parlano al tuo pubblico. Piano editoriale, grafica, testi — gestito io.",
    color: "#ffbd59",
    href: "/servizi/marketing-digitale",
  },
  {
    icon: "📧",
    title: "Email Marketing",
    description: "Newsletter e sequenze automatiche che mantengono i clienti caldi e tornano a comprare.",
    color: "#ee826d",
    href: "/servizi/marketing-digitale",
  },
  {
    icon: "🎯",
    title: "Meta & Google Ads",
    description: "Campagne pubblicitarie che portano clienti veri, non solo click.",
    color: "#ffbd59",
    href: "/servizi/marketing-digitale",
  },
  {
    icon: "🔍",
    title: "SEO & Contenuti",
    description: "Ti trovano su Google senza pagare ogni click. Traffico che cresce nel tempo.",
    color: "#3ad3ef",
    href: "/servizi/marketing-digitale",
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
            Prima l&apos;AI e l&apos;automazione, poi il marketing. In quest&apos;ordine.
          </p>
        </motion.div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-[calc((100vw-1280px)/2+24px)] snap-x snap-mandatory"
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
              className="block w-64 h-56 rounded-2xl p-6 border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              style={{ borderColor: service.color + "40", backgroundColor: service.color + "08" }}
            >
              <span className="text-3xl mb-3 block">{service.icon}</span>
              <h3
                className="text-xl font-bold text-primary mb-2 leading-tight"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="text-primary/60 text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-4">
        <p className="text-primary/30 text-xs flex items-center gap-2">
          <span>scorri</span>
          <span>→</span>
        </p>
      </div>
    </section>
  );
}
