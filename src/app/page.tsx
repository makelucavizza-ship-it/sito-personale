import Hero from "@/components/home/Hero";
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
