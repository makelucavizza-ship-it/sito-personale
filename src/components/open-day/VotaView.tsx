"use client";

import { useEffect, useState } from "react";
import { WifiOff, Monitor } from "lucide-react";
import { getStepAt, QUESTIONS, FINAL_SLIDE } from "@/data/open-day";
import { useOpenDayState } from "./useOpenDayState";
import VoteBarChart from "./VoteBarChart";
import BrandCorner from "./BrandCorner";

const OPTION_COLORS = ["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#5ed5bf", "#ee826d"];

function voteStorageKey(questionId: string) {
  return `open_day_vote_${questionId}`;
}

export default function VotaView() {
  const { state, setState, connected } = useOpenDayState(1500);
  const [submitting, setSubmitting] = useState(false);
  const [votedOption, setVotedOption] = useState<string | null>(null);

  const step = state?.step ?? 0;
  const current = getStepAt(step);
  const question = current.kind === "question" ? QUESTIONS[current.questionIndex] : null;

  useEffect(() => {
    if (!question) {
      setVotedOption(null);
      return;
    }
    try {
      setVotedOption(localStorage.getItem(voteStorageKey(question.id)));
    } catch {
      setVotedOption(null);
    }
  }, [question]);

  async function vote(optionKey: string) {
    if (!question || submitting || votedOption) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/open-day/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, optionKey }),
      });
      if (res.ok) {
        const data = await res.json();
        try {
          localStorage.setItem(voteStorageKey(question.id), optionKey);
        } catch {
          /* localStorage non disponibile — il voto resta comunque registrato lato server */
        }
        setVotedOption(optionKey);
        setState((prev) => (prev ? { ...prev, votes: data.votes } : prev));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-primary flex flex-col items-center justify-center px-6 py-20 relative">
      <BrandCorner />
      {!connected && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 text-xs bg-[#ee826d] text-white px-3 py-1.5 rounded-full">
          <WifiOff size={14} /> riconnessione…
        </div>
      )}

      {!state ? (
        <p className="opacity-50">Caricamento…</p>
      ) : current.kind === "slide" || current.kind === "opening" ? (
        <div className="text-center flex flex-col items-center gap-4">
          <Monitor size={48} className="opacity-40" strokeWidth={1.5} />
          <p className="text-2xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
            Guarda lo schermo
          </p>
        </div>
      ) : current.kind === "final" ? (
        <div className="text-center">
          <p className="text-3xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
            {FINAL_SLIDE.title}
          </p>
        </div>
      ) : question ? (
        <div className="w-full max-w-md flex flex-col gap-8">
          <p className="text-xl font-bold text-center leading-snug" style={{ fontFamily: "Phenomena, sans-serif" }}>
            {question.text}
          </p>
          {votedOption ? (
            <VoteBarChart options={question.options} votes={state.votes ?? {}} />
          ) : (
            <div className="flex flex-col gap-3">
              {question.options.map((o, i) => (
                <button
                  key={o.key}
                  onClick={() => vote(o.key)}
                  disabled={submitting}
                  className="text-left px-5 py-4 rounded-2xl border-2 font-medium transition-transform active:scale-[0.98] disabled:opacity-50"
                  style={{ borderColor: OPTION_COLORS[i % OPTION_COLORS.length], fontFamily: "Sailors, Georgia, serif" }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
