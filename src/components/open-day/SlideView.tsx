"use client";

import Image from "next/image";
import {
  Sparkles, Building2, Palette, Repeat, Calendar, LayoutGrid, MessageSquare,
  Megaphone, Search, Smartphone, ArrowRight, ShoppingCart, Target, Mail, Phone,
  RotateCcw, UserCheck, AlertCircle, Lightbulb, TrendingUp, Monitor, Newspaper, Clock,
} from "lucide-react";
import type { OpenDaySlide, SlideBlock } from "@/data/open-day";

const ICONS: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  buildings: Building2,
  palette: Palette,
  repeat: Repeat,
  calendar: Calendar,
  grid: LayoutGrid,
  message: MessageSquare,
  megaphone: Megaphone,
  target: Target,
  stage: Calendar,
  site: Monitor,
  news: Newspaper,
  clock: Clock,
};

const FUNNEL_ICONS = [Search, Smartphone, ArrowRight, ShoppingCart];
const CRM_ICONS = [Mail, Phone, RotateCcw, UserCheck];
const CASE_STUDY_ICONS = [Building2, AlertCircle, Lightbulb, TrendingUp];

function IconChip({ icon: Icon, accent, size = 40 }: { icon: typeof Sparkles; accent: string; size?: number }) {
  return (
    <div
      className="w-14 h-14 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: `${accent}18` }}
    >
      <Icon size={size} style={{ color: accent }} strokeWidth={1.5} />
    </div>
  );
}

function SlideContent({ slide, accent }: { slide: OpenDaySlide; accent: string }) {
  if (slide.icon === "funnel" || slide.icon === "crm" || slide.icon === "case-study") {
    const icons = slide.icon === "funnel" ? FUNNEL_ICONS : slide.icon === "crm" ? CRM_ICONS : CASE_STUDY_ICONS;
    const parts = slide.keyword.split(/\s*(?:→|·)\s*/);
    return (
      <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-5xl">
        <div className="flex items-center justify-center gap-3 md:gap-8 flex-wrap">
          {icons.map((Icon, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-8">
              <IconChip icon={Icon} accent={accent} size={32} />
              {i < icons.length - 1 && <ArrowRight size={24} className="opacity-20 hidden md:block" />}
            </div>
          ))}
        </div>
        <p className="text-lg md:text-3xl text-center opacity-70 px-4" style={{ fontFamily: "Sailors, Georgia, serif" }}>
          {parts.join(" → ")}
        </p>
      </div>
    );
  }

  if (slide.icon === "numbers") {
    const [left, right] = slide.keyword.split(/\s*—\s*/);
    return (
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-14">
        <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#5bc783]" style={{ fontFamily: "Phenomena, sans-serif" }}>
          {left}
        </p>
        <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#ee826d]" style={{ fontFamily: "Phenomena, sans-serif" }}>
          {right}
        </p>
      </div>
    );
  }

  if (slide.icon === "quote") {
    return (
      <p
        className="text-3xl md:text-6xl lg:text-7xl text-center leading-tight px-4 max-w-6xl"
        style={{ fontFamily: "Sailors, Georgia, serif", color: accent }}
      >
        &ldquo;{slide.keyword}&rdquo;
      </p>
    );
  }

  if (slide.image) {
    const isContain = slide.imageFit === "contain";
    return (
      <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
        {isContain ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slide.image}
            alt={slide.keyword}
            className="max-h-[48vh] w-auto rounded-2xl shadow-2xl object-contain"
          />
        ) : (
          <div className="relative w-full max-w-4xl max-h-[48vh] aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image src={slide.image} alt={slide.keyword} fill className="object-cover" />
          </div>
        )}
        <p className="text-2xl md:text-4xl font-bold text-center" style={{ fontFamily: "Phenomena, sans-serif" }}>
          {slide.keyword}
        </p>
      </div>
    );
  }

  const Icon = slide.icon ? ICONS[slide.icon] : null;
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 text-center px-4 max-w-5xl">
      {Icon && <IconChip icon={Icon} accent={accent} />}
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
