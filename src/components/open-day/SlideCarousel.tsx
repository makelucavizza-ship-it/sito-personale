"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

function SlideContent({ slide }: { slide: OpenDaySlide }) {
  if (slide.icon === "funnel" || slide.icon === "crm" || slide.icon === "case-study") {
    const icons = slide.icon === "funnel" ? FUNNEL_ICONS : slide.icon === "crm" ? CRM_ICONS : CASE_STUDY_ICONS;
    const parts = slide.keyword.split(/\s*(?:→|·)\s*/);
    return (
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 md:gap-8">
          {icons.map((Icon, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-8">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-bg/10 flex items-center justify-center">
                <Icon size={36} className="opacity-90" />
              </div>
              {i < icons.length - 1 && <ArrowRight size={24} className="opacity-30 hidden md:block" />}
            </div>
          ))}
        </div>
        <p className="text-xl md:text-3xl text-center opacity-70 px-4" style={{ fontFamily: "Sailors, Georgia, serif" }}>
          {parts.join(" → ")}
        </p>
      </div>
    );
  }

  if (slide.icon === "numbers") {
    const [left, right] = slide.keyword.split(/\s*—\s*/);
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
        <p className="text-4xl md:text-7xl font-bold text-[#5bc783]" style={{ fontFamily: "Phenomena, sans-serif" }}>
          {left}
        </p>
        <p className="text-4xl md:text-7xl font-bold text-[#ee826d]" style={{ fontFamily: "Phenomena, sans-serif" }}>
          {right}
        </p>
      </div>
    );
  }

  if (slide.icon === "quote") {
    return (
      <p className="text-3xl md:text-6xl text-center leading-tight px-4" style={{ fontFamily: "Sailors, Georgia, serif" }}>
        &ldquo;{slide.keyword}&rdquo;
      </p>
    );
  }

  if (slide.image) {
    const isContain = slide.imageFit === "contain";
    return (
      <div className="flex flex-col items-center gap-6">
        {isContain ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slide.image}
            alt={slide.keyword}
            className="max-h-[58vh] w-auto rounded-2xl shadow-2xl object-contain"
          />
        ) : (
          <div className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
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
    <div className="flex flex-col items-center gap-6 text-center px-4">
      {Icon && <Icon size={64} className="opacity-80" strokeWidth={1.5} />}
      <p className="text-4xl md:text-7xl font-bold" style={{ fontFamily: "Phenomena, sans-serif" }}>
        {slide.keyword}
      </p>
      {slide.lines?.map((line, i) => (
        <p key={i} className="text-lg md:text-2xl opacity-60" style={{ fontFamily: "Sailors, Georgia, serif" }}>
          {line}
        </p>
      ))}
    </div>
  );
}

export default function SlideCarousel({ block, intervalMs = 6000 }: { block: SlideBlock; intervalMs?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [block]);

  useEffect(() => {
    if (block.slides.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % block.slides.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [block, intervalMs]);

  const slide = block.slides[index];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      <p className="text-xs md:text-sm uppercase tracking-widest opacity-40" style={{ fontFamily: "Phenomena, sans-serif" }}>
        {block.title}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex items-center justify-center"
        >
          <SlideContent slide={slide} />
        </motion.div>
      </AnimatePresence>
      {block.slides.length > 1 && (
        <div className="flex gap-2">
          {block.slides.map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-opacity"
              style={{ backgroundColor: "currentColor", opacity: i === index ? 0.8 : 0.2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
