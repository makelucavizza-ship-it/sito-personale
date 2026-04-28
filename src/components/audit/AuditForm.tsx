"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Utensils,
  Building2,
  Heart,
  ShoppingBag,
  Hammer,
  Briefcase,
  HelpCircle,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Zap,
  ChevronRight,
  Check,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { SECTOR_QUESTIONS, type Settore } from "./questions";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = React.ComponentType<any>;

const SETTORI_CONFIG: Array<{ id: Settore; icon: IconComponent; color: string }> = [
  { id: "Ristorazione", icon: Utensils, color: "#ee826d" },
  { id: "Turismo e ospitalità", icon: Building2, color: "#5ed5bf" },
  { id: "Benessere e salute", icon: Heart, color: "#5bc783" },
  { id: "Commercio", icon: ShoppingBag, color: "#ffbd59" },
  { id: "Artigianato", icon: Hammer, color: "#3ad3ef" },
  { id: "Servizi professionali", icon: Briefcase, color: "#544fb3" },
  { id: "Altro", icon: HelpCircle, color: "#5bc783" },
];

const LOADING_MESSAGES = [
  "Sto analizzando le tue risposte...",
  "Identifico le opportunità di automazione...",
  "Calcolo il tempo recuperabile...",
];

const AUTOMATION_COLORS = ["#3ad3ef", "#5bc783", "#ffbd59"];
const AUTOMATION_ICONS: IconComponent[] = [Zap, TrendingUp, Sparkles];

interface AuditResult {
  titolo: string;
  problema_principale: string;
  automazioni: Array<{ nome: string; descrizione: string; risparmio: string }>;
  insight_finale: string;
  prossimo_passo: string;
}

type Step = "calculator" | "yesno" | "sector" | "question" | "email" | "loading" | "result";

function SliderItem({
  icon: Icon,
  label,
  sublabel,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  color,
}: {
  icon: IconComponent;
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  unit: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: color + "20" }}
          >
            <Icon size={16} style={{ color }} />
          </div>
          <div>
            <p
              className="text-bg/90 font-bold text-sm"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              {label}
            </p>
            <p className="text-bg/40 text-xs mt-0.5">{sublabel}</p>
          </div>
        </div>
        <motion.span
          key={value}
          className="text-2xl font-bold flex-shrink-0"
          style={{ color, fontFamily: "Phenomena, sans-serif" }}
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {unit === "€/h" ? `€${value}` : `${value}${unit}`}
        </motion.span>
      </div>
      <input
        type="range"
        className="audit-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex justify-between text-bg/25 text-xs mt-1">
        <span>{unit === "€/h" ? `€${min}` : `${min}${unit}`}</span>
        <span>{unit === "€/h" ? `€${max}` : `${max}${unit}`}</span>
      </div>
    </div>
  );
}

export default function AuditForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("calculator");
  const [sliders, setSliders] = useState({
    prenotazioni: 5,
    preventivi: 3,
    followup: 2,
    tariffa: 50,
  });
  const [settore, setSettore] = useState<Settore | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [sectorAnswers, setSectorAnswers] = useState<Record<string, string>>({});
  const [textAnswer, setTextAnswer] = useState("");
  const [nome, setNome] = useState("");
  const [nomeAttivita, setNomeAttivita] = useState("");
  const [citta, setCitta] = useState("");
  const [email, setEmail] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  const totalOre = sliders.prenotazioni + sliders.preventivi + sliders.followup;
  const annualValue = totalOre * sliders.tariffa * 52;

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  useEffect(() => {
    if (step !== "loading") return;
    const interval = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [step]);

  const submitAudit = async () => {
    setStep("loading");
    setError("");
    setLoadingMsgIndex(0);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settore, sliders, sectorAnswers, nome, nomeAttivita, citta, email }),
      });

      if (!res.ok) throw new Error("Errore nella generazione");

      const data: AuditResult = await res.json();
      setResult(data);
      setStep("result");
    } catch {
      setError("Qualcosa è andato storto. Riprova.");
      setStep("email");
    }
  };

  const currentQuestions = settore ? SECTOR_QUESTIONS[settore] : [];
  const currentQ = currentQuestions[qIndex];

  const handleAnswer = (answer: string) => {
    if (!currentQ) return;
    const newAnswers = { ...sectorAnswers, [currentQ.id]: answer };
    setSectorAnswers(newAnswers);
    setTextAnswer("");
    if (qIndex < currentQuestions.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      setStep("email");
    }
  };

  const goBack = () => {
    if (step === "yesno") setStep("calculator");
    else if (step === "sector") setStep("yesno");
    else if (step === "question") {
      if (qIndex > 0) setQIndex((i) => i - 1);
      else setStep("sector");
    } else if (step === "email") {
      if (settore && currentQuestions.length > 0) {
        setQIndex(currentQuestions.length - 1);
        setStep("question");
      } else {
        setStep("sector");
      }
    }
  };

  const isDark = step !== "result";

  return (
    <>
      <style>{`
        .audit-slider {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
        }
        .audit-slider::-webkit-slider-runnable-track {
          background: rgba(255,255,255,0.12);
          border-radius: 100px;
          height: 6px;
        }
        .audit-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ee826d;
          margin-top: -8px;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .audit-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .audit-slider::-moz-range-track {
          background: rgba(255,255,255,0.12);
          border-radius: 100px;
          height: 6px;
        }
        .audit-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ee826d;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <div
        ref={containerRef}
        className="min-h-screen transition-colors duration-500"
        style={{ backgroundColor: isDark ? "#474747" : "#f5f0eb" }}
      >
        <AnimatePresence mode="wait">

          {/* ─── STEP 1: CALCULATOR ─── */}
          {step === "calculator" && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-6 py-16"
            >
              <div className="mb-12">
                <span
                  className="inline-block text-xs font-bold text-coral uppercase tracking-widest mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Calcolatore gratuito
                </span>
                <h1
                  className="text-4xl md:text-5xl font-bold text-bg leading-tight mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Quanto vale
                  <br />
                  il tuo tempo?
                </h1>
                <p className="text-bg/60 text-lg">
                  Spostare questi slider ti dirà quanto stai perdendo ogni anno.
                </p>
              </div>

              <div className="space-y-8">
                <SliderItem
                  icon={Calendar}
                  label="Ore/settimana sulle prenotazioni"
                  sublabel="Gestisci prenotazioni, confermi appuntamenti, rispondi a richieste"
                  value={sliders.prenotazioni}
                  min={0}
                  max={20}
                  onChange={(v) => setSliders((s) => ({ ...s, prenotazioni: v }))}
                  unit="h"
                  color="#3ad3ef"
                />
                <SliderItem
                  icon={Clock}
                  label="Ore/settimana sui preventivi"
                  sublabel="Prepari offerte, rispondi a richieste, calcoli prezzi"
                  value={sliders.preventivi}
                  min={0}
                  max={15}
                  onChange={(v) => setSliders((s) => ({ ...s, preventivi: v }))}
                  unit="h"
                  color="#5bc783"
                />
                <SliderItem
                  icon={MessageSquare}
                  label="Ore/settimana sui follow-up"
                  sublabel="Mandi promemoria, scrivi ai clienti, fai check post-vendita"
                  value={sliders.followup}
                  min={0}
                  max={10}
                  onChange={(v) => setSliders((s) => ({ ...s, followup: v }))}
                  unit="h"
                  color="#5ed5bf"
                />
                <div className="border-t border-bg/10 pt-8">
                  <SliderItem
                    icon={TrendingUp}
                    label="Valore di un'ora del tuo tempo"
                    sublabel="Quanto fatturi in media per ogni ora di lavoro?"
                    value={sliders.tariffa}
                    min={10}
                    max={150}
                    step={5}
                    onChange={(v) => setSliders((s) => ({ ...s, tariffa: v }))}
                    unit="€/h"
                    color="#ffbd59"
                  />
                </div>
              </div>

              <motion.div
                className="mt-10 rounded-2xl p-6 border border-bg/10 bg-bg/5"
                animate={{ opacity: totalOre > 0 ? 1 : 0.5 }}
              >
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-bg/50 text-sm mb-1">Tempo perso ogni anno</p>
                    <p
                      className="text-4xl font-bold text-bg"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      {totalOre * 52}
                      <span className="text-xl text-bg/60 ml-1">ore</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-bg/50 text-sm mb-1">Valore economico</p>
                    <motion.p
                      key={annualValue}
                      className="text-4xl font-bold text-coral"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                      initial={{ opacity: 0.6, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      €{annualValue.toLocaleString("it-IT")}
                      <span className="text-xl text-coral/60 ml-1">/anno</span>
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={() => setStep("yesno")}
                className="mt-8 w-full px-8 py-5 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold text-lg hover:from-[#d4602a] hover:to-[#b84d24] transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: "Phenomena, sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Scopri come automatizzare <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {/* ─── STEP 2: YES/NO ─── */}
          {step === "yesno" && (
            <motion.div
              key="yesno"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-6 py-16"
            >
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-bg/40 hover:text-bg/70 transition-colors mb-10 text-sm"
              >
                <ArrowLeft size={16} /> Indietro
              </button>

              <div className="rounded-2xl border border-coral/30 bg-coral/10 p-5 mb-10 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-coral flex-shrink-0" />
                  <span className="text-bg/70 text-sm">
                    <strong className="text-bg">{totalOre}h/settimana</strong> su attività ripetibili
                  </span>
                </div>
                <span
                  className="text-coral font-bold text-lg"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  €{annualValue.toLocaleString("it-IT")}/anno
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold text-bg mb-4 leading-snug"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Il 70% di questo tempo
                <br />
                può essere automatizzato.
              </h2>
              <p className="text-bg/60 text-lg mb-10">
                Vuoi scoprire quali strumenti possono farlo per la tua azienda specifica?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  onClick={() => setStep("sector")}
                  className="px-8 py-6 rounded-2xl bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold text-lg hover:from-[#d4602a] hover:to-[#b84d24] transition-all text-center"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sì, dimmi come
                </motion.button>
                <motion.button
                  onClick={() => setStep("sector")}
                  className="px-8 py-6 rounded-2xl border border-bg/20 text-bg/60 font-bold text-lg hover:border-bg/40 hover:text-bg/80 transition-all text-center"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  No, preferisco
                  <br />
                  continuare così
                </motion.button>
              </div>

              <p className="text-bg/30 text-xs text-center mt-6">
                (Entrambe le opzioni portano al report gratuito)
              </p>
            </motion.div>
          )}

          {/* ─── STEP 3: SECTOR ─── */}
          {step === "sector" && (
            <motion.div
              key="sector"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-6 py-16"
            >
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-bg/40 hover:text-bg/70 transition-colors mb-10 text-sm"
              >
                <ArrowLeft size={16} /> Indietro
              </button>

              <h2
                className="text-3xl md:text-4xl font-bold text-bg mb-3"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                In quale settore opera
                <br />
                la tua azienda?
              </h2>
              <p className="text-bg/50 mb-10">
                Tre domande rapide, poi il tuo report personalizzato.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SETTORI_CONFIG.map(({ id, icon: Icon, color }) => (
                  <motion.button
                    key={id}
                    onClick={() => {
                      setSettore(id);
                      setQIndex(0);
                      setSectorAnswers({});
                      setStep("question");
                    }}
                    className="flex flex-col items-center gap-3 px-4 py-5 rounded-2xl border border-bg/10 hover:border-bg/30 bg-bg/5 hover:bg-bg/10 transition-all text-center group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: color + "20" }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                    <span
                      className="text-bg/70 text-sm font-bold leading-tight group-hover:text-bg transition-colors"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      {id}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 4: QUESTIONS ─── */}
          {step === "question" && currentQ && (
            <motion.div
              key={`q-${qIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-6 py-16"
            >
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-bg/40 hover:text-bg/70 transition-colors mb-10 text-sm"
              >
                <ArrowLeft size={16} /> Indietro
              </button>

              <div className="flex gap-2 mb-10">
                {currentQuestions.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        i <= qIndex ? "#ee826d" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              <p
                className="text-bg/40 text-xs font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {settore} · {qIndex + 1}/{currentQuestions.length}
              </p>

              <h2
                className="text-2xl md:text-3xl font-bold text-bg mb-8 leading-snug"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                {currentQ.text}
              </h2>

              {currentQ.type === "select" && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((opt, i) => (
                    <motion.button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      className="w-full text-left px-5 py-4 rounded-xl border border-bg/15 bg-bg/5 hover:border-coral/50 hover:bg-coral/10 transition-all flex items-center justify-between gap-3 group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-bg/70 group-hover:text-bg transition-colors">
                        {opt}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-bg/20 group-hover:text-coral transition-colors flex-shrink-0"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQ.type === "text" && (
                <div>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-bg/20 bg-bg/10 text-bg placeholder-bg/30 focus:outline-none focus:border-coral transition-colors resize-none mb-4 text-sm"
                    placeholder="Scrivi qui..."
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                  />
                  <motion.button
                    onClick={() => handleAnswer(textAnswer || "(non specificato)")}
                    className="px-6 py-3 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors flex items-center gap-2"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Continua <ChevronRight size={16} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── STEP 5: EMAIL ─── */}
          {step === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto px-6 py-16"
            >
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-bg/40 hover:text-bg/70 transition-colors mb-10 text-sm"
              >
                <ArrowLeft size={16} /> Indietro
              </button>

              <div className="mb-8">
                <Check size={40} className="text-accent-3 mb-4" />
                <h2
                  className="text-3xl font-bold text-bg mb-3"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Ottimo, ci siamo quasi.
                </h2>
                <p className="text-bg/60">
                  Dicci chi sei — il report apparirà qui sotto in tempo reale.
                </p>
              </div>

              {error && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-coral/10 border border-coral/30 text-coral text-sm">
                  {error}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitAudit();
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-bg/50 text-sm font-bold mb-2"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      Il tuo nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Mario"
                      className="w-full px-4 py-3 rounded-xl border border-bg/20 bg-bg/10 text-bg placeholder-bg/30 focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-bg/50 text-sm font-bold mb-2"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      Città *
                    </label>
                    <input
                      type="text"
                      required
                      value={citta}
                      onChange={(e) => setCitta(e.target.value)}
                      placeholder="Bologna"
                      className="w-full px-4 py-3 rounded-xl border border-bg/20 bg-bg/10 text-bg placeholder-bg/30 focus:outline-none focus:border-coral transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-bg/50 text-sm font-bold mb-2"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    Nome della tua attività *
                  </label>
                  <input
                    type="text"
                    required
                    value={nomeAttivita}
                    onChange={(e) => setNomeAttivita(e.target.value)}
                    placeholder="Ristorante da Mario"
                    className="w-full px-4 py-3 rounded-xl border border-bg/20 bg-bg/10 text-bg placeholder-bg/30 focus:outline-none focus:border-coral transition-colors"
                  />
                </div>
                <div>
                  <label
                    className="block text-bg/50 text-sm font-bold mb-2"
                    style={{ fontFamily: "Phenomena, sans-serif" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tua@email.it"
                    className="w-full px-4 py-3 rounded-xl border border-bg/20 bg-bg/10 text-bg placeholder-bg/30 focus:outline-none focus:border-coral transition-colors"
                  />
                </div>
                {/* Privacy checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      required
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        privacyAccepted
                          ? "bg-coral border-coral"
                          : "border-bg/30 bg-bg/10 group-hover:border-bg/50"
                      }`}
                    >
                      {privacyAccepted && <Check size={11} className="text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <span className="text-bg/50 text-xs leading-relaxed">
                    Ho letto e accetto l&apos;
                    <Link href="/privacy" target="_blank" className="text-coral underline underline-offset-2 hover:text-coral/80">
                      informativa sulla privacy
                    </Link>
                    . I miei dati saranno usati per generare il report e per contattarmi se vorrò parlarne.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={!privacyAccepted}
                  className="w-full px-8 py-5 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold text-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:from-[#d4602a] hover:enabled:to-[#b84d24]"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                  whileTap={{ scale: privacyAccepted ? 0.97 : 1 }}
                >
                  <Sparkles size={20} />
                  Genera il mio report →
                </motion.button>
                <p className="text-bg/30 text-xs text-center">
                  Il report è generato qui in tempo reale — nessuna attesa, nessuna email.
                </p>
              </form>
            </motion.div>
          )}

          {/* ─── STEP 6: LOADING ─── */}
          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto px-6 flex flex-col items-center justify-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full border-2 border-coral border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={18} className="text-coral" />
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMsgIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-bg/60 text-lg text-center"
                >
                  {LOADING_MESSAGES[loadingMsgIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {/* ─── STEP 7: RESULT ─── */}
          {step === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto px-6 py-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-10"
                style={{
                  backgroundColor: "#5bc78315",
                  border: "1px solid #5bc78330",
                }}
              >
                <Check size={16} style={{ color: "#5bc783" }} />
                <p className="text-sm text-primary/70">
                  Report inviato a <strong>{email}</strong>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <p
                  className="text-coral text-sm font-bold uppercase tracking-widest mb-3"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Il tuo report
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-primary leading-tight"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {result.titolo}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-primary/5 rounded-2xl p-6 border border-primary/10 mb-8"
              >
                <p
                  className="text-primary/50 text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Situazione attuale
                </p>
                <p className="text-primary/80 leading-relaxed">
                  {result.problema_principale}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <p
                  className="text-primary/50 text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Le 3 automazioni per te
                </p>
                <div className="space-y-4">
                  {result.automazioni.map((a, i) => {
                    const Icon = AUTOMATION_ICONS[i] ?? Zap;
                    const color = AUTOMATION_COLORS[i] ?? "#3ad3ef";
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="flex gap-4 p-5 rounded-2xl border"
                        style={{
                          borderColor: color + "30",
                          backgroundColor: color + "08",
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: color + "20" }}
                        >
                          <Icon size={20} style={{ color }} />
                        </div>
                        <div className="flex-1">
                          <h3
                            className="font-bold text-primary mb-1"
                            style={{ fontFamily: "Phenomena, sans-serif" }}
                          >
                            {a.nome}
                          </h3>
                          <p className="text-primary/65 text-sm leading-relaxed mb-2">
                            {a.descrizione}
                          </p>
                          <span
                            className="text-xs font-bold px-3 py-1 rounded-full"
                            style={{
                              color,
                              backgroundColor: color + "15",
                            }}
                          >
                            {a.risparmio}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="rounded-2xl p-6 mb-8"
                style={{
                  backgroundColor: "#ee826d15",
                  border: "1px solid #ee826d30",
                }}
              >
                <p className="text-coral leading-relaxed font-medium">
                  {result.insight_finale}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-primary/5 rounded-2xl p-6 border border-primary/10 mb-10"
              >
                <p
                  className="text-primary/50 text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Prossimo passo
                </p>
                <p className="text-primary/80 leading-relaxed">
                  {result.prossimo_passo}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contatti"
                  className="flex-1 px-8 py-5 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold text-lg hover:from-[#d4602a] hover:to-[#b84d24] transition-all hover:scale-[1.02] text-center flex items-center justify-center gap-2"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Parliamo →
                </Link>
                <button
                  onClick={() => {
                    setStep("calculator");
                    setSettore(null);
                    setSectorAnswers({});
                    setQIndex(0);
                    setResult(null);
                    setEmail("");
                    setNome("");
                    setNomeAttivita("");
                    setCitta("");
                    setError("");
                  }}
                  className="px-8 py-5 rounded-full border-2 border-primary/20 text-primary font-bold hover:border-primary/40 transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Ricomincia
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
