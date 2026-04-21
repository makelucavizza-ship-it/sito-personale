import type { Metadata } from "next";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Luca Vizza — Marketing Digitale & AI Automation per PMI",
  description:
    "Freelance di marketing digitale e AI automation per PMI italiane. Social media, advertising, automazioni AI, email marketing. Basato in Romagna, lavoro in tutta Italia. Audit gratuito.",
  keywords: [
    "marketing digitale freelance",
    "AI automation PMI",
    "social media marketing Romagna",
    "consulente marketing digitale Italia",
    "automazione AI aziende",
    "freelance marketing Rimini",
    "email marketing",
    "Meta Ads Google Ads freelance",
  ],
};
import PilotBanner from "@/components/home/PilotBanner";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PilotBanner />
      <ServicesCarousel />
      <FAQ />
    </>
  );
}
