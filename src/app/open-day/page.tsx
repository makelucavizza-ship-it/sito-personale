import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RegiaView from "@/components/open-day/RegiaView";

export const metadata: Metadata = {
  title: "Regia — Open Day",
  robots: { index: false, follow: false },
};

export default function OpenDayRegiaPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const expectedKey = process.env.OPEN_DAY_KEY;
  const providedKey = searchParams.key;

  // Protezione leggera: senza OPEN_DAY_KEY configurata la regia è
  // raggiungibile solo in sviluppo locale, mai in produzione.
  const allowed = expectedKey ? providedKey === expectedKey : process.env.NODE_ENV !== "production";

  if (!allowed) notFound();

  return <RegiaView regiaKey={providedKey ?? ""} />;
}
