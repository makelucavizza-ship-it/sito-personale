import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem, PortfolioStatus } from "@/lib/markdown";

const STATUS_LABEL: Record<PortfolioStatus, string> = {
  online: "Online",
  "in-corso": "In corso",
  "in-arrivo": "In arrivo",
};

const STATUS_CLASSES: Record<PortfolioStatus, string> = {
  online: "bg-accent-3 text-white",
  "in-corso": "bg-accent-2 text-primary",
  "in-arrivo": "bg-primary/15 text-primary/70",
};

function hasCoverImage(coverImage: string) {
  return coverImage.startsWith("/") || coverImage.startsWith("http");
}

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className="group rounded-2xl overflow-hidden border-2 border-primary/10 hover:border-coral/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col bg-white/40"
    >
      <div
        className="relative w-full aspect-[16/10] flex items-center justify-center"
        style={{ backgroundColor: item.color + "15" }}
      >
        {hasCoverImage(item.coverImage) ? (
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <span
            className="text-sm text-primary/30"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            {item.sector}
          </span>
        )}
        <span
          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${STATUS_CLASSES[item.status]}`}
        >
          {STATUS_LABEL[item.status]}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-primary/40 text-xs mb-1">{item.sector}</p>
        <h3
          className="text-xl font-bold text-primary mb-2 group-hover:text-coral transition-colors"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          {item.client}
        </h3>
        <p className="text-primary/60 text-sm leading-relaxed flex-1">
          {item.summary}
        </p>
      </div>
    </Link>
  );
}
