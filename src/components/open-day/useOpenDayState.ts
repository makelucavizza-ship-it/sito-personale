"use client";

import { useEffect, useRef, useState } from "react";

export interface OpenDayStateResponse {
  step: number;
  totalSteps: number;
  votes: Record<string, number> | null;
  configured: boolean;
}

// Polling resiliente a wifi ballerino: attende ogni risposta prima di
// pianificare la prossima richiesta (niente richieste accodate), e segnala
// la disconnessione senza mai bloccare il ciclo di retry.
export function useOpenDayState(pollMs = 1500) {
  const [state, setState] = useState<OpenDayStateResponse | null>(null);
  const [connected, setConnected] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    stoppedRef.current = false;

    async function poll() {
      try {
        const res = await fetch("/api/open-day/state", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data: OpenDayStateResponse = await res.json();
        if (!stoppedRef.current) {
          setState(data);
          setConnected(true);
        }
      } catch {
        if (!stoppedRef.current) setConnected(false);
      } finally {
        if (!stoppedRef.current) {
          timerRef.current = setTimeout(poll, pollMs);
        }
      }
    }

    poll();

    return () => {
      stoppedRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pollMs]);

  return { state, setState, connected };
}
