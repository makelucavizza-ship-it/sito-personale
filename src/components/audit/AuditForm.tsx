"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SETTORI, getQuestionsForSector, type Settore } from "./questions";

type Step = "settore" | "questions" | "email" | "report";

export default function AuditForm() {
  const [step, setStep] = useState<Step>("settore");
  const [settore, setSettore] = useState<Settore | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [azienda, setAzienda] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const questions = settore ? getQuestionsForSector(settore) : [];
  const currentQ = questions[qIndex];

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    if (qIndex < questions.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      setStep("email");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStep("report");
    setReport("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settore, answers, email, nome, azienda }),
      });

      if (!res.ok) throw new Error("Errore nella generazione del report");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Stream non disponibile");

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setReport((prev) => prev + text);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore imprevisto. Riprova."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <AnimatePresence mode="wait">
        {/* STEP: Selezione settore */}
        {step === "settore" && (
          <motion.div
            key="settore"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2
              className="text-2xl font-bold text-primary mb-6"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              In quale settore opera la tua azienda?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SETTORI.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSettore(s);
                    setStep("questions");
                    setQIndex(0);
                  }}
                  className="text-left px-5 py-4 rounded-xl border-2 border-primary/10 hover:border-coral hover:bg-coral/5 transition-all duration-200 font-medium text-primary/80 hover:text-coral"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP: Domande */}
        {step === "questions" && currentQ && (
          <motion.div
            key={`q-${qIndex}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-primary/40 mb-2">
                <span>{settore}</span>
                <span>
                  {qIndex + 1} / {questions.length}
                </span>
              </div>
              <div className="w-full h-1 bg-primary/10 rounded-full">
                <div
                  className="h-full bg-coral rounded-full transition-all duration-300"
                  style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2
              className="text-2xl font-bold text-primary mb-6"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              {currentQ.text}
            </h2>

            {currentQ.type === "select" && currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 border-primary/10 hover:border-coral hover:bg-coral/5 transition-all duration-200 text-primary/70 hover:text-primary"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === "text" && (
              <div>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-primary placeholder-primary/30 focus:outline-none focus:border-coral transition-colors resize-none mb-4"
                  placeholder="Descrivi brevemente..."
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                  }
                  value={answers[currentQ.id] ?? ""}
                />
                <button
                  onClick={() => handleAnswer(answers[currentQ.id] ?? "")}
                  className="px-6 py-3 rounded-full bg-coral text-white font-bold hover:bg-coral/90 transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  Continua →
                </button>
              </div>
            )}

            {qIndex > 0 && (
              <button
                onClick={() => setQIndex((i) => i - 1)}
                className="mt-6 text-sm text-primary/40 hover:text-primary transition-colors"
              >
                ← Torna indietro
              </button>
            )}
          </motion.div>
        )}

        {/* STEP: Email */}
        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2
              className="text-2xl font-bold text-primary mb-2"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Quasi fatto!
            </h2>
            <p className="text-primary/60 mb-8">
              Inserisci la tua email per ricevere il report personalizzato.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-primary/70 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Il tuo nome"
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-primary placeholder-primary/30 focus:outline-none focus:border-coral transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary/70 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tua@email.it"
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-primary placeholder-primary/30 focus:outline-none focus:border-coral transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary/70 mb-2">
                  Nome azienda (opzionale)
                </label>
                <input
                  type="text"
                  value={azienda}
                  onChange={(e) => setAzienda(e.target.value)}
                  placeholder="La tua azienda"
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-primary placeholder-primary/30 focus:outline-none focus:border-coral transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-full bg-coral text-white font-bold hover:bg-coral/90 transition-colors disabled:opacity-50 mt-4"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Genera il mio report gratuito →
              </button>
              <p className="text-xs text-primary/30 text-center">
                Niente spam. Riceverai solo questo report.
              </p>
            </form>
          </motion.div>
        )}

        {/* STEP: Report */}
        {step === "report" && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading && !report && (
              <div className="text-center py-12">
                <div className="w-10 h-10 rounded-full border-2 border-coral border-t-transparent animate-spin mx-auto mb-4" />
                <p className="text-primary/60">Sto analizzando la tua situazione...</p>
              </div>
            )}

            {error && (
              <div className="bg-coral/10 border border-coral/30 rounded-xl p-6 text-coral">
                {error}
              </div>
            )}

            {report && (
              <div>
                <div className="bg-accent-5/10 border border-accent-5/30 rounded-xl p-4 mb-8 flex items-center gap-3">
                  <span className="text-accent-5">✓</span>
                  <p className="text-sm text-primary/70">
                    Report inviato a <strong>{email}</strong>
                  </p>
                </div>

                <div
                  className="prose prose-neutral max-w-none text-primary/80 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: report
                      .replace(/\n\n/g, "</p><p>")
                      .replace(/\n/g, "<br>")
                      .replace(/^/, "<p>")
                      .replace(/$/, "</p>")
                      .replace(/## (.*?)(?=<)/g, '<h2 class="text-2xl font-bold text-primary mt-8 mb-3" style="font-family: Phenomena, sans-serif">$1</h2>')
                      .replace(/### (.*?)(?=<)/g, '<h3 class="text-xl font-bold text-primary mt-6 mb-2" style="font-family: Phenomena, sans-serif">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />

                {loading && (
                  <span className="inline-block w-2 h-5 bg-coral animate-blink ml-1" />
                )}

                {!loading && (
                  <div className="mt-10 pt-8 border-t border-primary/10 flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contatti"
                      className="px-6 py-3 rounded-full bg-coral text-white font-bold hover:bg-coral/90 transition-colors text-center"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      Parliamo del tuo progetto
                    </a>
                    <button
                      onClick={() => {
                        setStep("settore");
                        setSettore(null);
                        setAnswers({});
                        setQIndex(0);
                        setReport("");
                        setEmail("");
                        setNome("");
                        setAzienda("");
                      }}
                      className="px-6 py-3 rounded-full border-2 border-primary/20 text-primary font-bold hover:border-primary/40 transition-colors"
                      style={{ fontFamily: "Phenomena, sans-serif" }}
                    >
                      Nuovo audit
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
