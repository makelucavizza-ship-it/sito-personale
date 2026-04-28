import type { Metadata } from "next";
import AuditForm from "@/components/audit/AuditForm";

export const metadata: Metadata = {
  title: "Quanto vale il tuo tempo? — Calcolatore gratuito",
  description:
    "Calcola quante ore (e quanti euro) stai perdendo ogni settimana su attività ripetibili. Report AI personalizzato in pochi minuti, gratis.",
};

export default function AuditPage() {
  return (
    <div className="pt-16">
      <AuditForm />
    </div>
  );
}
