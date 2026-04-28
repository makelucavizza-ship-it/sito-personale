"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FISH = [
  { src: "/pesce-mandarino-1-nobg.png", w: 180, h: 93 },
  { src: "/pesce-mandarino-2-nobg.png", w: 160, h: 83 },
  { src: "/pesce-mandarino-1-nobg.png", w: 120, h: 62 },
  { src: "/pesce-mandarino-2-nobg.png", w: 200, h: 104 },
  { src: "/pesce-mandarino-1-nobg.png", w: 140, h: 72 },
  { src: "/pesce-mandarino-2-nobg.png", w: 100, h: 52 },
  { src: "/pesce-mandarino-1-nobg.png", w: 220, h: 114 },
  { src: "/pesce-mandarino-2-nobg.png", w: 130, h: 67 },
  { src: "/pesce-mandarino-1-nobg.png", w: 90,  h: 47 },
  { src: "/pesce-mandarino-2-nobg.png", w: 170, h: 88 },
  { src: "/pesce-mandarino-1-nobg.png", w: 150, h: 78 },
  { src: "/pesce-mandarino-2-nobg.png", w: 110, h: 57 },
];

const positions = [
  { top: "3%",  left: "2%"   },
  { top: "6%",  right: "4%"  },
  { top: "15%", left: "18%"  },
  { top: "12%", right: "22%" },
  { top: "28%", left: "5%"   },
  { top: "22%", right: "8%"  },
  { top: "40%", left: "1%"   },
  { top: "38%", right: "1%"  },
  { top: "55%", left: "12%"  },
  { top: "52%", right: "14%" },
  { top: "70%", left: "3%"   },
  { top: "68%", right: "5%"  },
];

export default function PescePage() {
  return (
    <div className="min-h-screen bg-bg overflow-hidden relative flex items-center justify-center px-6 py-24">

      {/* Scattered fish */}
      {FISH.map((fish, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none select-none"
          style={{ ...positions[i], opacity: 0 }}
          animate={{
            opacity: [0, 0.18, 0.12, 0.2, 0.14],
            y: [0, -8, 4, -6, 0],
            rotate: [0, 2, -2, 1, 0],
          }}
          transition={{
            duration: 6 + i * 0.7,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={fish.src}
            alt=""
            width={fish.w}
            height={fish.h}
            className="drop-shadow-md"
          />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <Image
            src="/pesce-mandarino-1-nobg.png"
            alt="Synchiropus splendidus"
            width={200}
            height={104}
            className="mx-auto drop-shadow-lg"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xs font-bold text-primary/30 uppercase tracking-widest mb-6"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Synchiropus splendidus
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-xl md:text-2xl text-primary leading-relaxed mb-10"
          style={{ fontFamily: "Sailors, Georgia, serif" }}
        >
          Un compagno di corso mi ha paragonato al{" "}
          <em>Synchiropus splendidus</em>: non per l&apos;età (la media della
          classe è 20 anni), ma per la mia natura creativa e fuori
          dall&apos;ordinario. Quel paragone mi ha fatto riflettere su come mi
          vedono gli altri e sul perché scelgo percorsi non lineari. La
          risposta che mi sono dato:{" "}
          <strong>non voglio fare cose &quot;corrette&quot;, ma cose strane.</strong>{" "}
          La mia missione è spingere la creatività al massimo attraverso
          progetti concreti che incidano davvero nella vita delle persone,
          rendendola più interessante, più piacevole, più divertente.
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-sm text-primary/40 hover:text-primary/70 transition-colors underline underline-offset-4"
          >
            ← torna al mondo dei grandi
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
