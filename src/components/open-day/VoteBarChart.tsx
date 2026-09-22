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

  return (
    <div className="w-full flex flex-col gap-5">
      {options.map((o, i) => {
        const count = votes[o.key] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={o.key}>
            <div
              className={`flex justify-between items-baseline gap-4 mb-2 ${large ? "text-xl md:text-3xl" : "text-base"}`}
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
            <div className={`w-full rounded-full bg-current/10 overflow-hidden ${large ? "h-5 md:h-7" : "h-3"}`}>
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
