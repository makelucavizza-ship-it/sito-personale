"use client";

import { motion } from "framer-motion";
import type { QuestionOption } from "@/data/open-day";

const BAR_COLORS = ["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#5ed5bf", "#ee826d"];

export default function VoteBarChart({
  options,
  votes,
  large = false,
  compact = false,
}: {
  options: QuestionOption[];
  votes: Record<string, number>;
  large?: boolean;
  // Forza almeno il livello "dense" anche con poche opzioni, per le domande con un titolo lungo
  // (senza emoji, su due righe) che altrimenti finirebbero comunque sotto ai loghi fissi.
  compact?: boolean;
}) {
  const total = options.reduce((sum, o) => sum + (votes[o.key] ?? 0), 0);
  // Più opzioni ci sono, più righe e testo si stringono: altrimenti un grafico "large" da tante voci
  // (le domande con 7-9 opzioni) non ci sta in altezza e finisce sotto ai loghi fissi.
  const dense = large && (options.length > 4 || compact);
  const ultraDense = large && options.length > 6;

  const rowGap = ultraDense ? "gap-1.5" : dense ? "gap-2.5" : "gap-5";
  const labelSize = !large ? "text-base" : ultraDense ? "text-sm md:text-base" : dense ? "text-base md:text-xl" : "text-xl md:text-3xl";
  const countSize = !large ? "text-sm" : ultraDense ? "text-xs md:text-sm" : "text-base md:text-lg";
  const barHeight = !large ? "h-3" : ultraDense ? "h-1.5 md:h-2" : dense ? "h-3 md:h-4" : "h-5 md:h-7";
  const rowMargin = ultraDense ? "mb-0.5" : "mb-1";

  return (
    <div className={`w-full flex flex-col ${rowGap}`}>
      {options.map((o, i) => {
        const count = votes[o.key] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={o.key}>
            <div
              className={`flex justify-between items-baseline gap-4 ${rowMargin} ${labelSize}`}
              style={{ fontFamily: "Sailors, Georgia, serif" }}
            >
              <span>{o.label}</span>
              <span className="font-bold whitespace-nowrap" style={{ fontFamily: "Phenomena, sans-serif" }}>
                {pct}% <span className={`opacity-50 font-normal ${countSize}`}>({count})</span>
              </span>
            </div>
            <div className={`w-full rounded-full bg-current/10 overflow-hidden ${barHeight}`}>
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
      <p className={`opacity-40 ${ultraDense ? "text-[11px] mt-0.5" : "text-xs mt-1"}`}>
        {total} {total === 1 ? "voto" : "voti"}
      </p>
    </div>
  );
}
