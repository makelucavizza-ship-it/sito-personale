"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, WifiOff } from "lucide-react";
import { getStepAt, QUESTIONS, SLIDE_BLOCKS, FINAL_SLIDE, BLOCK_ACCENTS } from "@/data/open-day";
import { useOpenDayState } from "./useOpenDayState";
import QrPanel from "./QrPanel";
import VoteBarChart from "./VoteBarChart";
import SlideView from "./SlideView";
import BrandCorner from "./BrandCorner";

function totalVotes(votes: Record<string, number>): number {
  return Object.values(votes).reduce((a, b) => a + b, 0);
}

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

  return (
    <div className="min-h-screen bg-bg text-primary flex flex-col relative overflow-hidden">
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

      <div className="flex-1 flex items-center justify-center px-8 md:px-16 py-20">
        {!state ? (
          <p className="opacity-40">Caricamento…</p>
        ) : current.kind === "question" ? (
          <div className="w-full max-w-4xl flex flex-col items-center gap-10 text-center">
            <p className="text-3xl md:text-5xl font-bold leading-snug" style={{ fontFamily: "Phenomena, sans-serif" }}>
              {QUESTIONS[current.questionIndex].text}
            </p>
            {current.questionIndex === 0 && totalVotes(votes) === 0 ? (
              <QrPanel />
            ) : (
              <div className="w-full">
                <VoteBarChart options={QUESTIONS[current.questionIndex].options} votes={votes} large />
              </div>
            )}
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
          <div className="text-center">
            <p className="text-5xl md:text-8xl font-bold mb-6" style={{ fontFamily: "Phenomena, sans-serif" }}>
              {FINAL_SLIDE.title}
            </p>
            <p className="text-xl md:text-3xl opacity-60" style={{ fontFamily: "Sailors, Georgia, serif" }}>
              {FINAL_SLIDE.subtitle}
            </p>
          </div>
        )}
      </div>

      <div className="relative z-30 flex items-center justify-center gap-3 pb-10">
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
    </div>
  );
}
