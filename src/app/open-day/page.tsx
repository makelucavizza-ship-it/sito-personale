import type { Metadata } from "next";
import RegiaView from "@/components/open-day/RegiaView";

export const metadata: Metadata = {
  title: "Regia — Open Day",
  robots: { index: false, follow: false },
};

// La pagina è visibile a chiunque abbia il link (non indicizzata): chi la apre vede la
// presentazione in corso, ma può farla avanzare solo inserendo la password nella regia
// stessa, verificata lato server in /api/open-day/state. "key" in query resta solo una
// scorciatoia per Luca, per sbloccarla subito da un link salvato invece che digitarla.
export default function OpenDayRegiaPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  return <RegiaView regiaKey={searchParams.key ?? ""} />;
}
