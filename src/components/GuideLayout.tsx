"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Section {
  id: string;
  title: string;
}

interface GuideLayoutProps {
  children: React.ReactNode;
  sections: Section[];
  wordCount: number;
}

export default function GuideLayout({ children, sections, wordCount }: GuideLayoutProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const readingTime = Math.ceil(wordCount / 250);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.6) {
        setShowSticky(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Reading time */}
      <div className="flex items-center gap-2 text-primary/40 text-xs mb-8">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Lettura: {readingTime} minut{readingTime === 1 ? "o" : "i"}
      </div>

      {/* Table of contents */}
      {sections.length > 1 && (
        <nav className="mb-10 rounded-xl border border-primary/10 overflow-hidden" style={{ backgroundColor: "rgba(71,71,71,0.03)" }}>
          {/* Mobile toggle */}
          <button
            className="md:hidden w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setTocOpen(!tocOpen)}
            aria-expanded={tocOpen}
          >
            <span
              className="text-sm font-bold text-primary"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Indice dell&apos;articolo
            </span>
            <span
              className="text-primary/40 text-xs transition-transform duration-200"
              style={{ transform: tocOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
            >
              ▾
            </span>
          </button>

          {/* Content — hidden on mobile unless open, always visible on desktop */}
          <div className={`${tocOpen ? "block" : "hidden"} md:block px-5 pb-5 pt-0 md:pt-5`}>
            <span
              className="hidden md:block text-xs font-bold text-primary/40 uppercase tracking-widest mb-3"
            >
              In questa guida
            </span>
            <ol className="space-y-2">
              {sections.map((s, i) => (
                <li key={s.id} className="flex items-start gap-2">
                  <span className="text-xs text-primary/30 mt-0.5 flex-shrink-0 tabular-nums">
                    {i + 1}.
                  </span>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setTocOpen(false)}
                    className="text-sm text-primary/60 hover:text-coral transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {/* Article content */}
      {children}

      {/* Sticky CTA — mobile only, after 60% scroll, dismissible */}
      {showSticky && !dismissed && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-primary border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/audit"
            className="text-sm font-bold text-white hover:text-coral transition-colors flex-1"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Vuoi applicarlo alla tua attività? →
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/40 hover:text-white transition-colors flex-shrink-0 text-base leading-none px-1"
            aria-label="Chiudi"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
