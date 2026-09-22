"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, WifiOff } from "lucide-react";
import { getStepAt, QUESTIONS, SLIDE_BLOCKS, FINAL_SLIDE } from "@/data/open-day";
import { useOpenDayState } from "./useOpenDayState";
import QrPanel from "./QrPanel";
import VoteBarChart from "./VoteBarChart";
import SlideCarousel from "./SlideCarousel";
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
    <div className="min-h-screen bg-primary text-bg flex flex-col relative overflow-hidden">
      <BrandCorner dark />

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

      <div className="flex-1 flex items-center justify-center px-6 py-24">
        {!state ? (
          <p className="opacity-50">Caricamento…</p>
        ) : current.kind === "question" ? (
          <div className="w-full max-w-3xl flex flex-col items-center gap-10 text-center">
            <p className="text-2xl md:text-4xl font-bold leading-snug" style={{ fontFamily: "Phenomena, sans-serif" }}>
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
        ) : current.kind === "slides" ? (
          <SlideCarousel block={SLIDE_BLOCKS[current.blockIndex]} key={current.blockIndex} />
        ) : (
          <div className="text-center">
            <p className="text-4xl md:text-7xl font-bold mb-6" style={{ fontFamily: "Phenomena, sans-serif" }}>
              {FINAL_SLIDE.title}
            </p>
            <p className="text-lg md:text-2xl opacity-60" style={{ fontFamily: "Sailors, Georgia, serif" }}>
              {FINAL_SLIDE.subtitle}
            </p>
          </div>
        )}
      </div>

      <div className="relative z-30 flex items-center justify-center gap-3 pb-10">
        <button
          onClick={() => send("prev")}
          disabled={pending || step === 0}
          className="flex items-center gap-1 px-5 py-3 rounded-full border border-bg/20 text-bg/80 hover:bg-bg/10 disabled:opacity-30 transition-colors"
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
          className="p-3 rounded-full border border-bg/10 text-bg/40 hover:text-bg/70 hover:bg-bg/10 disabled:opacity-30 transition-colors"
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
