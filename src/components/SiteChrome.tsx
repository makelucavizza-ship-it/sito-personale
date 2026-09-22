"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // /open-day è una vista a schermo intero per la regia e per il voto da smartphone:
  // niente nav, footer o banner cookie del sito sopra.
  if (pathname?.startsWith("/open-day")) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
