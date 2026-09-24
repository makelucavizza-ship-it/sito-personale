"use client";

import { motion } from "framer-motion";
import type { QuestionOption } from "@/data/open-day";

const BAR_COLORS = ["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#5ed5bf", "#ee826d"];

export default function VoteBarChart({
  options,
  votes,
  large = false,
}: {
  options: QuestionOption[];
  votes: Record<string, number>;
  large?: boolean;
}) {
  const total = options.reduce((sum, o) => sum + (votes[o.key] ?? 0), 0);
  // Con più di 4 opzioni, righe e testo più compatti: altrimenti un grafico "large" da 5 voci non ci sta nello schermo.
  const dense = large && options.length > 4;

  return (
    <div className={`w-full flex flex-col ${dense ? "gap-2.5" : "gap-5"}`}>
      {options.map((o, i) => {
        const count = votes[o.key] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={o.key}>
            <div
              className={`flex justify-between items-baseline gap-4 mb-1 ${large ? (dense ? "text-base md:text-xl" : "text-xl md:text-3xl") : "text-base"}`}
              style={{ fontFamily: "Sailors, Georgia, serif" }}
            >
              <span>{o.label}</span>
              <span className="font-bold whitespace-nowrap" style={{ fontFamily: "Phenomena, sans-serif" }}>
                {pct}%{" "}
                <span className={`opacity-50 font-normal ${large ? "text-base md:text-lg" : "text-sm"}`}>
                  ({count})
                </span>
              </span>
            </div>
            <div className={`w-full rounded-full bg-current/10 overflow-hidden ${large ? (dense ? "h-3 md:h-4" : "h-5 md:h-7") : "h-3"}`}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: BAR_COLORS[i % BAR_COLORS.length] }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
      <p className="text-xs opacity-40 mt-1">
        {total} {total === 1 ? "voto" : "voti"}
      </p>
    </div>
  );
}
