"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ nome: "", email: "", messaggio: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-bold text-primary/70 mb-2"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          placeholder="Il tuo nome"
          className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-primary placeholder-primary/30 focus:outline-none focus:border-coral transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-bold text-primary/70 mb-2"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="tua@email.it"
          className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-primary placeholder-primary/30 focus:outline-none focus:border-coral transition-colors"
        />
      </div>
      <div>
        <label
          htmlFor="messaggio"
          className="block text-sm font-bold text-primary/70 mb-2"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Messaggio
        </label>
        <textarea
          id="messaggio"
          required
          rows={5}
          value={form.messaggio}
          onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
          placeholder="Raccontami del tuo progetto o fai una domanda..."
          className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/60 text-primary placeholder-primary/30 focus:outline-none focus:border-coral transition-colors resize-none"
        />
      </div>

      {status === "sent" && (
        <div className="bg-accent-3/10 border border-accent-3/30 rounded-xl p-4 text-accent-3 text-sm">
          Messaggio inviato! Ti rispondo entro 24 ore.
        </div>
      )}
      {status === "error" && (
        <div className="bg-coral/10 border border-coral/30 rounded-xl p-4 text-coral text-sm">
          Errore nell&apos;invio. Riprova o scrivimi direttamente a info@lucavizza.it
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-6 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "Phenomena, sans-serif" }}
      >
        {status === "sending" ? "Invio in corso..." : "Invia messaggio"}
      </button>
    </form>
  );
}
