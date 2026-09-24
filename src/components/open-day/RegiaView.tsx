"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw, WifiOff } from "lucide-react";
import { getStepAt, QUESTIONS, SLIDE_BLOCKS, FINAL_SLIDE, BLOCK_ACCENTS, STEPS } from "@/data/open-day";
import { useOpenDayState } from "./useOpenDayState";
import QrPanel from "./QrPanel";
import VoteBarChart from "./VoteBarChart";
import SlideView from "./SlideView";
import BrandCorner from "./BrandCorner";
import SocialLinks from "./SocialLinks";
import ProgressBar from "./ProgressBar";

export default function RegiaView({ regiaKey }: { regiaKey: string }) {
  const { state, setState, connected } = useOpenDayState(1500);
  const [pending, setPending] = useState(false);

  const step = state?.step ?? 0;
  const current = getStepAt(step);
  const votes = state?.votes ?? {};

  async function send(action: "next" | "prev" | "reset") {
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/open-day/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, key: regiaKey }),
      });
      if (res.ok) setState(await res.json());
    } finally {
      setPending(false);
    }
  }

  // Frecce tastiera per avanzare/tornare indietro senza toccare il mouse.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        send("next");
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        send("prev");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="h-screen w-screen bg-bg text-primary flex flex-col relative overflow-hidden">
      <ProgressBar step={step} total={state?.totalSteps ?? STEPS.length} />
      <BrandCorner />

      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex flex-col items-end gap-2">
        {!connected && (
          <div className="flex items-center gap-2 text-xs bg-[#ee826d] text-white px-3 py-1.5 rounded-full">
            <WifiOff size={14} /> riconnessione…
          </div>
        )}
        {state && !state.configured && (
          <div className="text-xs bg-[#ffbd59] text-primary px-3 py-1.5 rounded-full max-w-[220px] text-right">
            Redis non configurato: lo stato non è condiviso tra istanze
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex items-center justify-center px-6 md:px-12 py-4">
        {!state ? (
          <p className="opacity-40">Caricamento…</p>
        ) : current.kind === "opening" ? (
          <div className="w-full flex flex-col items-center gap-8 text-center">
            <p className="text-4xl md:text-7xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
              Chi sei?
            </p>
            <QrPanel size={320} />
          </div>
        ) : current.kind === "question" ? (
          <div className="w-full max-w-4xl flex flex-col items-center gap-3 md:gap-4 text-center">
            {QUESTIONS[current.questionIndex].emoji && (
              <span className="text-4xl md:text-6xl leading-none">{QUESTIONS[current.questionIndex].emoji}</span>
            )}
            <p className="text-2xl md:text-4xl font-bold leading-snug" style={{ fontFamily: "Phenomena, sans-serif" }}>
              {QUESTIONS[current.questionIndex].text}
            </p>
            <div className="w-full mt-2">
              <VoteBarChart options={QUESTIONS[current.questionIndex].options} votes={votes} large />
            </div>
          </div>
        ) : current.kind === "slide" ? (
          <SlideView
            block={SLIDE_BLOCKS[current.blockIndex]}
            slide={SLIDE_BLOCKS[current.blockIndex].slides[current.slideIndex]}
            index={current.slideIndex}
            total={SLIDE_BLOCKS[current.blockIndex].slides.length}
            accent={BLOCK_ACCENTS[current.blockIndex % BLOCK_ACCENTS.length]}
          />
        ) : (
          <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
            <p className="text-3xl md:text-6xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
              {FINAL_SLIDE.title}
            </p>
            <div className="flex items-center gap-6 md:gap-10">
              <Image src="/logo-luca-vizza-wide.png" alt="Luca Vizza" width={928} height={296} className="h-14 md:h-24 w-auto" />
              <Image src="/logo-its-academy.png" alt="ITS Academy Turismo Emilia-Romagna" width={236} height={172} className="h-20 md:h-32 w-auto" />
            </div>
            <SocialLinks size={56} />
          </div>
        )}
      </div>

      <div className="relative z-30 shrink-0 flex flex-col items-center justify-center gap-2 pb-6 pt-2">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => send("prev")}
            disabled={pending || step === 0}
            className="flex items-center gap-1 px-5 py-3 rounded-full border border-primary/20 text-primary/70 hover:bg-primary/5 disabled:opacity-30 transition-colors"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            <ChevronLeft size={18} /> Indietro
          </button>
          <button
            onClick={() => {
              if (window.confirm("Azzerare tutti i voti e tornare all'inizio?")) send("reset");
            }}
            disabled={pending}
            title="Azzera voti e riparti dall'inizio"
            className="p-3 rounded-full border border-primary/10 text-primary/30 hover:text-primary/60 hover:bg-primary/5 disabled:opacity-30 transition-colors"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => send("next")}
            disabled={pending || !state || step >= state.totalSteps - 1}
            className="flex items-center gap-1 px-6 py-3 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold disabled:opacity-30 transition-colors"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Avanti <ChevronRight size={18} />
          </button>
        </div>
        <p className="text-[11px] opacity-30" style={{ fontFamily: "Sailors, Georgia, serif" }}>
          oppure usa le frecce ← →
        </p>
      </div>
    </div>
  );
}
