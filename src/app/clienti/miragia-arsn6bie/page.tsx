import type { Metadata } from "next";
import MiragiaOnboarding from "@/components/clienti/MiragiaOnboarding";

// Pagina privata per la cliente Miragià: non indicizzata, non linkata,
// esclusa dalla sitemap e volutamente assente da robots.txt.
export const metadata: Metadata = {
  title: { absolute: "Onboarding Miragià" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  openGraph: null,
  twitter: null,
  referrer: "no-referrer",
};

export default function MiragiaOnboardingPage() {
  return <MiragiaOnboarding />;
}
