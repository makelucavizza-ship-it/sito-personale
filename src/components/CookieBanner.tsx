"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "lv_cookie_consent";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function saveConsent(consent: ConsentState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, timestamp: Date.now() }));
    setVisible(false);
  }

  function acceptAll() {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  }

  function saveCustom() {
    saveConsent({ necessary: true, analytics, marketing });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consenso cookie"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2
              className="text-xl font-bold text-primary"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Cookie e privacy
            </h2>
          </div>

          <p className="text-sm text-primary/70 leading-relaxed mb-5">
            Questo sito usa cookie tecnici necessari al funzionamento. Con il tuo consenso potremmo
            usare cookie analitici (per capire come usi il sito) e di marketing.{" "}
            <Link href="/privacy" className="text-coral underline underline-offset-2">
              Informativa completa
            </Link>
            .
          </p>

          {showDetails && (
            <div className="mb-5 space-y-3 rounded-xl border border-primary/10 p-4 bg-primary/[0.02]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Necessari</p>
                  <p className="text-xs text-primary/50">Richiesti per il funzionamento del sito. Non disattivabili.</p>
                </div>
                <div className="w-10 h-5 rounded-full bg-coral flex-shrink-0 relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Analitici</p>
                  <p className="text-xs text-primary/50">Ci aiutano a capire come viene usato il sito (dati aggregati e anonimi).</p>
                </div>
                <button
                  role="switch"
                  aria-checked={analytics}
                  onClick={() => setAnalytics(!analytics)}
                  className={`w-10 h-5 rounded-full flex-shrink-0 relative transition-colors duration-200 ${
                    analytics ? "bg-coral" : "bg-primary/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                      analytics ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Marketing</p>
                  <p className="text-xs text-primary/50">Usati per mostrare annunci pertinenti su altri siti.</p>
                </div>
                <button
                  role="switch"
                  aria-checked={marketing}
                  onClick={() => setMarketing(!marketing)}
                  className={`w-10 h-5 rounded-full flex-shrink-0 relative transition-colors duration-200 ${
                    marketing ? "bg-coral" : "bg-primary/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${
                      marketing ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptAll}
              className="flex-1 px-5 py-3 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold text-sm hover:from-[#d4602a] hover:to-[#b84d24] transition-colors"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Accetta tutti
            </button>
            {showDetails ? (
              <button
                onClick={saveCustom}
                className="flex-1 px-5 py-3 rounded-full border-2 border-primary/20 text-primary font-bold text-sm hover:border-primary/40 transition-colors"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Salva preferenze
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="flex-1 px-5 py-3 rounded-full border-2 border-primary/20 text-primary font-bold text-sm hover:border-primary/40 transition-colors"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Personalizza
              </button>
            )}
            <button
              onClick={rejectAll}
              className="flex-1 px-5 py-3 rounded-full border-2 border-primary/10 text-primary/50 font-bold text-sm hover:border-primary/20 transition-colors"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Rifiuta tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
