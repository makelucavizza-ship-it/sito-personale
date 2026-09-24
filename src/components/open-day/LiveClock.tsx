"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// Solo per la regia: aiuta Luca a capire quanto tempo ci sta mettendo mentre presenta.
export default function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }));
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="fixed bottom-16 right-4 md:bottom-20 md:right-6 z-40 flex items-center gap-1.5 text-primary/40">
      <Clock size={14} strokeWidth={1.75} />
      <span className="text-sm md:text-base font-bold tabular-nums" style={{ fontFamily: "Phenomena, sans-serif" }}>
        {time}
      </span>
    </div>
  );
}
