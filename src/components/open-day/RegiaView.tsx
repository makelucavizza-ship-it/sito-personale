"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw, WifiOff, Smartphone } from "lucide-react";
import { getStepAt, QUESTIONS, SLIDE_BLOCKS, FINAL_SLIDE, BLOCK_ACCENTS, STEPS, isAiMoment } from "@/data/open-day";
import { useOpenDayState } from "./useOpenDayState";
import QrPanel from "./QrPanel";
import VoteBarChart from "./VoteBarChart";
import SlideView from "./SlideView";
import BrandCorner from "./BrandCorner";
import SocialLinks from "./SocialLinks";
import ProgressBar from "./ProgressBar";
import LiveClock from "./LiveClock";

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
      <LiveClock />

      {current.kind === "slide" && isAiMoment(current) && (
        <div
          className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 md:gap-3 animate-blink"
          style={{ color: BLOCK_ACCENTS[1] }}
        >
          <Smartphone size={18} strokeWidth={1.5} className="md:w-6 md:h-6" />
          <p className="text-sm md:text-lg font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
            Guarda il tuo smartphone!
          </p>
        </div>
      )}

      <div className="fixed top-20 right-4 md:top-28 md:right-6 z-50 flex flex-col items-end gap-2">
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
          (() => {
            const q = QUESTIONS[current.questionIndex];
            // Con tante opzioni (7+) il grafico è già alto, e le domande senza emoji con un testo
            // lungo occupano due righe intere: in entrambi i casi emoji e titolo si stringono di
            // più per lasciare spazio, così non finiscono sotto ai loghi fissi in alto.
            const compact = q.options.length > 6 || q.text.length > 45;
            return (
              <div className={`w-full max-w-4xl flex flex-col items-center text-center ${compact ? "gap-1.5 md:gap-2" : "gap-3 md:gap-4"}`}>
                {q.emoji && (
                  <span className={`leading-none ${compact ? "text-2xl md:text-4xl" : "text-4xl md:text-6xl"}`}>{q.emoji}</span>
                )}
                <p
                  className={`font-bold leading-snug ${compact ? "text-lg md:text-2xl" : "text-2xl md:text-4xl"}`}
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {q.text}
                </p>
                <div className="w-full mt-2">
                  <VoteBarChart options={q.options} votes={votes} large compact={compact} />
                </div>
              </div>
            );
          })()
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

      <div className="relative z-30 shrink-0 flex flex-col items-center justify-center gap-1.5 pb-5 pt-2">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => send("prev")}
            disabled={pending || step === 0}
            aria-label="Indietro"
            title="Indietro"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-primary/15 text-primary/50 hover:bg-primary/5 hover:text-primary/80 disabled:opacity-25 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => {
              if (window.confirm("Azzerare tutti i voti e tornare all'inizio?")) send("reset");
            }}
            disabled={pending}
            title="Azzera voti e riparti dall'inizio"
            className="w-7 h-7 flex items-center justify-center rounded-full border border-primary/10 text-primary/25 hover:text-primary/60 hover:bg-primary/5 disabled:opacity-25 transition-colors"
          >
            <RotateCcw size={13} />
          </button>
          <button
            onClick={() => send("next")}
            disabled={pending || !state || step >= state.totalSteps - 1}
            aria-label="Avanti"
            title="Avanti"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-primary/15 text-primary/50 hover:bg-primary/5 hover:text-primary/80 disabled:opacity-25 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <p className="text-[10px] opacity-25" style={{ fontFamily: "Sailors, Georgia, serif" }}>
          oppure usa le frecce ← →
        </p>
      </div>
    </div>
  );
}
