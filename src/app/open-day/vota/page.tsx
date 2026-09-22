import type { Metadata } from "next";
import VotaView from "@/components/open-day/VotaView";

export const metadata: Metadata = {
  title: "Vota — Open Day",
  robots: { index: false, follow: false },
};

export default function OpenDayVotaPage() {
  return <VotaView />;
}
