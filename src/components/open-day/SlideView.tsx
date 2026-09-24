"use client";

import {
  Search, Megaphone, BellRing, Bot, Umbrella, Mountain, Target, Users, Compass,
  BarChart3, Clapperboard, FileText, type LucideIcon,
} from "lucide-react";
import type { OpenDaySlide, SlideBlock } from "@/data/open-day";

const ICONS: Record<string, LucideIcon> = {
  Search, Megaphone, BellRing, Bot, Umbrella, Mountain, Target, Users, Compass,
  BarChart3, Clapperboard, FileText,
};

function IconChip({
  name,
  accent,
  size = 40,
  compact = false,
}: {
  name: string;
  accent: string;
  size?: number;
  compact?: boolean;
}) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return (
    <div
      className={
        compact
          ? "w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0"
          : "w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0"
      }
      style={{ backgroundColor: `${accent}18` }}
    >
      <Icon size={size} style={{ color: accent }} strokeWidth={1.5} />
    </div>
  );
}

function SlideContent({ slide, accent }: { slide: OpenDaySlide; accent: string }) {
  switch (slide.layout) {
    case "keyword": {
      const Icon = slide.icon ? ICONS[slide.icon] : null;
      return (
        <div className="flex flex-col items-center gap-4 md:gap-6 text-center px-4 max-w-5xl">
          {Icon && <IconChip name={slide.icon!} accent={accent} />}
          <p className="text-5xl md:text-7xl lg:text-8xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
            {slide.keyword}
          </p>
          {slide.lines?.map((line, i) => (
            <p key={i} className="text-lg md:text-3xl opacity-60" style={{ fontFamily: "Sailors, Georgia, serif" }}>
              {line}
            </p>
          ))}
        </div>
      );
    }

    case "quote":
      return (
        <p
          className="text-3xl md:text-6xl lg:text-7xl text-center leading-tight px-4 max-w-6xl"
          style={{ fontFamily: "Sailors, Georgia, serif", color: accent }}
        >
          &ldquo;{slide.text}&rdquo;
        </p>
      );

    case "split":
      return (
        <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-4xl">
          {slide.heading && (
            <p className="text-xl md:text-3xl font-bold text-center" style={{ fontFamily: "Phenomena, sans-serif" }}>
              {slide.heading}
            </p>
          )}
          <div className="flex items-center justify-center gap-8 md:gap-24">
            {[slide.left, slide.right].map((side, i) => (
              <div key={i} className="flex flex-col items-center gap-3 md:gap-4">
                <IconChip name={side.icon} accent={accent} size={44} />
                <p className="text-base md:text-2xl opacity-70" style={{ fontFamily: "Sailors, Georgia, serif" }}>
                  {side.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "icon-row": {
      const dense = slide.items.length > 4;
      return (
        <div className={`flex items-center justify-center ${dense ? "gap-2 md:gap-4" : "gap-3 md:gap-8"} max-w-6xl px-2`}>
          {slide.items.map((item, i) => (
            <div key={i} className={`flex items-center ${dense ? "gap-2 md:gap-4" : "gap-3 md:gap-8"}`}>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <IconChip name={item.icon} accent={accent} size={dense ? 22 : 32} compact={dense} />
                {item.label && (
                  <p className="text-sm md:text-lg opacity-70" style={{ fontFamily: "Sailors, Georgia, serif" }}>
                    {item.label}
                  </p>
                )}
              </div>
              {slide.connectArrows && i < slide.items.length - 1 && (
                <span className="text-lg md:text-2xl opacity-20 flex-shrink-0">→</span>
              )}
            </div>
          ))}
        </div>
      );
    }

    case "role-list":
      return (
        <div className="flex flex-col items-center gap-6 md:gap-8 max-w-4xl px-4">
          <p className="text-3xl md:text-6xl font-bold text-center" style={{ fontFamily: "Phenomena, sans-serif" }}>
            {slide.title}
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:gap-x-16 md:gap-y-6">
            {slide.roles.map((role, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl md:text-4xl">{role.emoji}</span>
                <span className="text-base md:text-2xl" style={{ fontFamily: "Sailors, Georgia, serif" }}>
                  {role.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

// Mostra la slide corrente dello step: avanza solo su comando dalla regia (Avanti/Indietro), mai da sola.
export default function SlideView({
  block,
  slide,
  index,
  total,
  accent,
}: {
  block: SlideBlock;
  slide: OpenDaySlide;
  index: number;
  total: number;
  accent: string;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-6 px-4">
      <div className="flex items-center gap-3">
        <p
          className="text-sm md:text-base uppercase tracking-widest font-bold"
          style={{ fontFamily: "Phenomena, sans-serif", color: accent }}
        >
          {block.title}
        </p>
        {total > 1 && (
          <span className="text-xs md:text-sm opacity-30" style={{ fontFamily: "Phenomena, sans-serif" }}>
            {index + 1}/{total}
          </span>
        )}
      </div>
      <SlideContent slide={slide} accent={accent} />
    </div>
  );
}
