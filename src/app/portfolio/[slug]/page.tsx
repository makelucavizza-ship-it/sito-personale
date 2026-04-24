import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioItem, getPortfolioItems } from "@/lib/markdown";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getPortfolioItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getPortfolioItem(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
  };
}

export default function PortfolioItemPage({ params }: Props) {
  const item = getPortfolioItem(params.slug);
  if (!item) notFound();

  return (
    <div className="pt-24">
      <div className="max-w-3xl mx-auto px-6">
        <section className="py-16">
          <Link
            href="/portfolio"
            className="text-sm text-primary/40 hover:text-primary transition-colors mb-8 inline-block"
          >
            ← Portfolio
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <span
              className="text-xs px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.sector}
            </span>
            {item.services.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full border"
                style={{ borderColor: item.color + "40", color: item.color }}
              >
                {s}
              </span>
            ))}
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-primary mb-3"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            {item.title}
          </h1>
          <p className="text-primary/40 text-sm mb-8">{item.client}</p>

          {item.results.length > 0 && (
            <div
              className="rounded-2xl p-6 mb-10 border-2"
              style={{ borderColor: item.color + "40", backgroundColor: item.color + "08" }}
            >
              <h2
                className="text-lg font-bold text-primary mb-4"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Risultati
              </h2>
              <ul className="space-y-3">
                {item.results.map((r, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-primary/80 font-medium">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="prose prose-neutral max-w-none text-primary/70"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </section>

        <div className="py-8 border-t border-primary/10 text-center">
          <Link
            href="/audit"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Audit gratuito per la tua azienda
          </Link>
        </div>
      </div>
    </div>
  );
}
