"use client";

import { useState, type FormEvent } from "react";

export default function NameGate({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6 text-center">
      <p className="text-2xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
        Come ti chiami?
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Il tuo nome"
        maxLength={40}
        autoFocus
        className="w-full px-5 py-4 rounded-2xl border-2 border-primary/15 text-center text-lg focus:outline-none focus:border-coral"
        style={{ fontFamily: "Sailors, Georgia, serif" }}
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="px-6 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold disabled:opacity-40 transition-colors"
        style={{ fontFamily: "Phenomena, sans-serif" }}
      >
        Continua
      </button>
    </form>
  );
}
