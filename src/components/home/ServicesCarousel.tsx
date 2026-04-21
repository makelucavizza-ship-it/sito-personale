"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="7" stroke={color} strokeWidth="2"/>
        <path d="M16 19v4M12 23h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 17c-3 1.5-5 4-5 7h22c0-3-2-5.5-5-7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="8" r="3" fill={color} opacity="0.3"/>
        <path d="M22.5 8h3M24 6.5v3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Agente vocale AI",
    description: "Risponde al telefono al posto tuo, raccoglie prenotazioni e info. H24, senza dimenticare nulla.",
    color: "#5bc783",
    href: "/servizi/automazione-ai",
  },
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="18" rx="4" stroke={color} strokeWidth="2"/>
        <path d="M4 12h24" stroke={color} strokeWidth="2"/>
        <circle cx="10" cy="20" r="2" fill={color}/>
        <path d="M14 20h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "WhatsApp Marketing",
    description: "Messaggi automatici ai tuoi clienti: conferme, promozioni, follow-up. Dove già ti leggono.",
    color: "#5ed5bf",
    href: "/servizi/automazione-ai",
  },
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="8" width="26" height="18" rx="3" stroke={color} strokeWidth="2"/>
        <path d="M3 14h26" stroke={color} strokeWidth="2"/>
        <circle cx="9" cy="6" r="2" stroke={color} strokeWidth="2"/>
        <circle cx="16" cy="6" r="2" stroke={color} strokeWidth="2"/>
        <circle cx="23" cy="6" r="2" stroke={color} strokeWidth="2"/>
        <path d="M8 20h6M8 23h10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "CRM personalizzato",
    description: "Tieni traccia di clienti, appuntamenti e trattative senza Excel e Post-it.",
    color: "#544fb3",
    href: "/servizi/automazione-ai",
  },
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="10" height="10" rx="2" stroke={color} strokeWidth="2"/>
        <rect x="18" y="4" width="10" height="10" rx="2" stroke={color} strokeWidth="2"/>
        <rect x="4" y="18" width="10" height="10" rx="2" stroke={color} strokeWidth="2"/>
        <rect x="18" y="18" width="10" height="10" rx="2" stroke={color} strokeWidth="2"/>
        <path d="M14 9h4M9 14v4M23 14v4M14 23h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Automazioni leggere",
    description: "Collego i tuoi strumenti così smetti di fare copia-incolla tra app diverse.",
    color: "#3ad3ef",
    href: "/servizi/automazione-ai",
  },
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke={color} strokeWidth="2"/>
        <circle cx="16" cy="14" r="4" stroke={color} strokeWidth="2"/>
        <path d="M8 26c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 8l2 2-2 2M10 8L8 10l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Social Media",
    description: "Contenuti che parlano al tuo pubblico. Piano editoriale, grafica, testi — gestito io.",
    color: "#ffbd59",
    href: "/servizi/marketing-digitale",
  },
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="7" width="26" height="18" rx="3" stroke={color} strokeWidth="2"/>
        <path d="M3 13l13 7 13-7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Email Marketing",
    description: "Newsletter e sequenze automatiche che mantengono i clienti caldi e li fanno tornare.",
    color: "#ee826d",
    href: "/servizi/marketing-digitale",
  },
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2"/>
        <path d="M16 4c0 0-6 5-6 12s6 12 6 12M16 4c0 0 6 5 6 12s-6 12-6 12M4 16h24" stroke={color} strokeWidth="2"/>
        <path d="M5 10h22M5 22h22" stroke={color} strokeWidth="2"/>
      </svg>
    ),
    title: "Meta & Google Ads",
    description: "Campagne pubblicitarie che portano clienti veri, non solo click.",
    color: "#ffbd59",
    href: "/servizi/marketing-digitale",
  },
  {
    icon: (color: string) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="9" stroke={color} strokeWidth="2"/>
        <path d="M21 21l7 7" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M10 14h8M14 10v8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
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
              className="flex flex-col items-center text-center w-56 h-56 rounded-2xl p-6 border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              style={{ borderColor: service.color + "40", backgroundColor: service.color + "08" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: service.color + "20" }}
              >
                {service.icon(service.color)}
              </div>
              <h3
                className="text-lg font-bold text-primary mb-2 leading-tight"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="text-primary/55 text-xs leading-relaxed">
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
