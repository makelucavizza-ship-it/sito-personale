"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ColorBar from "@/components/ColorBar";

const COMPETENZE = [
  "Agenti vocali AI",
  "WhatsApp Marketing",
  "Social Media",
  "Email Marketing",
  "Meta & Google Ads",
  "CRM personalizzati",
  "SEO & Contenuti",
  "Automazioni per PMI",
];

const COLORS = [
  "#3ad3ef",
  "#5ed5bf",
  "#5bc783",
  "#ffbd59",
  "#544fb3",
  "#ee826d",
  "#3ad3ef",
  "#5bc783",
];

function useTypewriter(words: string[], speed = 60, pause = 1800) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((i) => i + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((i) => i - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  const displayed = words[wordIndex].slice(0, charIndex);
  return { displayed, wordIndex };
}

export default function Hero() {
  const { displayed, wordIndex } = useTypewriter(COMPETENZE);
  const color = COLORS[wordIndex % COLORS.length];

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Avatar mobile-only */}
            <div className="md:hidden mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-accent-1/20 to-accent-5/15 border-2 border-accent-1/20">
                <Image
                  src="/luca-vizza-nobg.png"
                  alt="Luca Vizza"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Typewriter label */}
            <div className="mb-6 h-8 flex items-center">
              <motion.span
                className="text-lg font-bold"
                animate={{ color }}
                transition={{ duration: 0.4 }}
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {displayed}
                <span className="animate-blink ml-0.5">|</span>
              </motion.span>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-none mb-6"
              style={{ fontFamily: "Phenomena, sans-serif", letterSpacing: "-0.03em" }}
            >
              Cresciamo
              <br />
              <span className="text-coral">insieme</span>
              <br />
              con l&apos;AI.
            </h1>

            {/* Color bar */}
            <ColorBar className="w-48 mb-8" height={5} />

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-primary/70 max-w-md mb-10 leading-relaxed">
              Scopri quanto tempo e soldi stai perdendo senza AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/audit"
                className="px-8 py-4 rounded-full bg-coral text-white font-bold text-lg hover:bg-coral/90 transition-all hover:scale-105 inline-block text-center"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Scopri quanto tempo e soldi stai perdendo senza AI →
              </Link>
              <Link
                href="/chi-sono"
                className="px-8 py-4 rounded-full border-2 border-primary/20 text-primary font-bold text-lg hover:border-primary/50 transition-all inline-block text-center"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Chi sono
              </Link>
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative hidden md:block"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-1/15 via-accent-5/10 to-accent-3/10 aspect-[3/4]">
              <Image
                src="/luca-vizza-nobg.png"
                alt="Luca Vizza"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -left-3 w-24 h-24 rounded-2xl bg-coral/10 border border-coral/20 -z-10" />
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-xl bg-accent-1/15 border border-accent-1/20 -z-10" />
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex items-center gap-2 text-primary/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.span
            className="block w-px h-12 bg-primary/20"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <span className="text-xs tracking-widest uppercase">scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
