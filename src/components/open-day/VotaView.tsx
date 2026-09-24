"use client";

import { useEffect, useRef, useState } from "react";
import { WifiOff, Monitor, Bot } from "lucide-react";
import {
  getStepAt,
  QUESTIONS,
  FINAL_SLIDE,
  AI_MOMENT_BLOCK_INDEX,
  AI_MESSAGE_INTRO,
  AI_MESSAGE_FALLBACK,
  isAiMoment,
  BLOCK_ACCENTS,
} from "@/data/open-day";
import { useOpenDayState } from "./useOpenDayState";
import VoteBarChart from "./VoteBarChart";
import BrandCorner from "./BrandCorner";
import SocialLinks from "./SocialLinks";
import NameGate from "./NameGate";

const OPTION_COLORS = ["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#5ed5bf", "#ee826d"];

interface Session {
  name: string;
  sessionId: string;
}

function voteStorageKey(questionId: string) {
  return `open_day_vote_${questionId}`;
}

function aiMessageStorageKey(sessionId: string) {
  return `open_day_ai_message_${sessionId}`;
}

export default function VotaView() {
  const { state, setState, connected } = useOpenDayState(1500);
  const [submitting, setSubmitting] = useState(false);
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const aiFetchStarted = useRef(false);

  const step = state?.step ?? 0;
  const current = getStepAt(step);
  const question = current.kind === "question" ? QUESTIONS[current.questionIndex] : null;

  // Il nome resta solo sul telefono dello studente per la durata della serata, non va da nessuna parte finché non vota.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("open_day_session");
      if (raw) setSession(JSON.parse(raw));
    } catch {
      /* localStorage non disponibile — si riparte dalla schermata del nome */
    }
    setSessionLoaded(true);
  }, []);

  function handleNameSubmit(name: string) {
    const trimmed = name.trim().slice(0, 40);
    if (!trimmed) return;
    const next: Session = { name: trimmed, sessionId: crypto.randomUUID() };
    try {
      localStorage.setItem("open_day_session", JSON.stringify(next));
    } catch {
      /* localStorage non disponibile — la sessione resta comunque valida per questa visita */
    }
    setSession(next);
  }

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

  // Appena iniziano le slide del blocco mestieri (ben prima della sotto-sezione AI), genera il
  // messaggio in background: quando la LIM arriva alla slide giusta è già pronto, niente spinner.
  useEffect(() => {
    if (!session) return;
    if (current.kind !== "slide" || current.blockIndex !== AI_MOMENT_BLOCK_INDEX) return;
    if (aiFetchStarted.current) return;
    aiFetchStarted.current = true;

    try {
      const cached = localStorage.getItem(aiMessageStorageKey(session.sessionId));
      if (cached) {
        setAiMessage(cached);
        return;
      }
    } catch {
      /* localStorage non disponibile — si passa comunque dalla cache lato server */
    }

    fetch("/api/open-day/ai-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session.sessionId, name: session.name }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { message: string }) => {
        setAiMessage(data.message);
        try {
          localStorage.setItem(aiMessageStorageKey(session.sessionId), data.message);
        } catch {
          /* localStorage non disponibile — resta comunque in memoria per questa visita */
        }
      })
      .catch(() => setAiMessage(AI_MESSAGE_FALLBACK));
  }, [current, session]);

  async function vote(optionKey: string) {
    if (!question || submitting || votedOption) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/open-day/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, optionKey, sessionId: session?.sessionId }),
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

      {!sessionLoaded ? (
        <p className="opacity-50">Caricamento…</p>
      ) : !session ? (
        <NameGate onSubmit={handleNameSubmit} />
      ) : !state ? (
        <p className="opacity-50">Caricamento…</p>
      ) : isAiMoment(current) ? (
        <div className="w-full max-w-md flex flex-col items-center gap-4 text-center">
          <Bot size={40} style={{ color: BLOCK_ACCENTS[1] }} strokeWidth={1.5} />
          <p className="text-xl font-bold" style={{ fontFamily: "Phenomena, sans-serif", color: BLOCK_ACCENTS[1] }}>
            {AI_MESSAGE_INTRO}
          </p>
          <p className="text-base leading-relaxed opacity-80" style={{ fontFamily: "Sailors, Georgia, serif" }}>
            {aiMessage ?? AI_MESSAGE_FALLBACK}
          </p>
        </div>
      ) : current.kind === "slide" || current.kind === "opening" ? (
        <div className="text-center flex flex-col items-center gap-4">
          <Monitor size={48} className="opacity-40" strokeWidth={1.5} />
          <p className="text-2xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
            Guarda lo schermo
          </p>
          <SocialLinks />
        </div>
      ) : current.kind === "final" ? (
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-3xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
            {FINAL_SLIDE.title}
          </p>
          <SocialLinks />
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
