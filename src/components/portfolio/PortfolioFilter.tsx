"use client";

import { useState } from "react";
import type { PortfolioItem, PortfolioType } from "@/lib/markdown";
import PortfolioCard from "./PortfolioCard";

const TYPE_LABEL: Record<PortfolioType, string> = {
  "sito-web": "Sito Web",
  social: "Social",
  "local-seo": "Local SEO",
  ads: "Ads",
  automazione: "Automazione",
};

const FILTERS: Array<{ value: PortfolioType | "tutti"; label: string }> = [
  { value: "tutti", label: "Tutti" },
  { value: "sito-web", label: TYPE_LABEL["sito-web"] },
  { value: "social", label: TYPE_LABEL.social },
  { value: "local-seo", label: TYPE_LABEL["local-seo"] },
  { value: "ads", label: TYPE_LABEL.ads },
  { value: "automazione", label: TYPE_LABEL.automazione },
];

export default function PortfolioFilter({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState<PortfolioType | "tutti">("tutti");

  const filtered =
    active === "tutti" ? items : items.filter((item) => item.type.includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`text-sm px-4 py-2 rounded-full border-2 transition-colors ${
              active === f.value
                ? "bg-primary border-primary text-bg"
                : "border-primary/15 text-primary/60 hover:border-primary/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-primary/10 p-12 text-center">
          <p className="text-primary/40">Nessun lavoro in questa categoria, per ora.</p>
        </div>
      )}
    </div>
  );
}
