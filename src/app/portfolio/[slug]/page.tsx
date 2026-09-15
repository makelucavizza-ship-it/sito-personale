import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioItem, getPortfolioItems } from "@/lib/markdown";
import { STATUS_LABEL, STATUS_CLASSES, hasCoverImage } from "@/components/portfolio/PortfolioCard";
import SitePreviewScroll from "@/components/portfolio/SitePreviewScroll";

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
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
    },
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

          {/* Hero */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_CLASSES[item.status]}`}
            >
              {STATUS_LABEL[item.status]}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full border"
              style={{ borderColor: item.color + "40", color: item.color }}
            >
              {item.sector}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-primary mb-3"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            {item.client}
          </h1>
          <p className="text-primary/60 text-lg mb-8 leading-relaxed">{item.summary}</p>

          {/* Cover */}
          {hasCoverImage(item.coverImage) &&
            (item.type.includes("sito-web") ? (
              <SitePreviewScroll
                src={item.siteScreenshot ?? item.coverImage}
                alt={item.title}
                color={item.color}
              />
            ) : (
              <div
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-12"
                style={{ backgroundColor: item.color + "15" }}
              >
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-contain p-6"
                />
              </div>
            ))}

          {/* Problema */}
          {item.problem && (
            <div className="mb-10">
              <h2
                className="text-lg font-bold text-primary mb-3"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Il problema
              </h2>
              <p className="text-primary/70 leading-relaxed">{item.problem}</p>
            </div>
          )}

          {/* Cosa ho fatto */}
          {item.whatIDid.length > 0 && (
            <div className="mb-10">
              <h2
                className="text-lg font-bold text-primary mb-4"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Cosa ho fatto
              </h2>
              <ul className="space-y-3">
                {item.whatIDid.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-primary/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risultato */}
          {item.result && (
            <div
              className="rounded-2xl p-6 mb-10 border-2"
              style={{ borderColor: item.color + "40", backgroundColor: item.color + "08" }}
            >
              <h2
                className="text-lg font-bold text-primary mb-3"
                style={{ fontFamily: "Phenomena, sans-serif" }}
              >
                Risultato
              </h2>
              <p className="text-primary/80 font-medium">{item.result}</p>
            </div>
          )}

          {/* Link al sito del cliente */}
          {item.clientUrl && item.clientUrl.startsWith("http") && (
            <a
              href={item.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
              style={{ color: item.color }}
            >
              Visita il sito →
            </a>
          )}
        </section>

        <div className="py-8 border-t border-primary/10 text-center">
          <h2
            className="text-2xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Vuoi un risultato simile?
          </h2>
          <Link
            href="/contatti"
            className="px-8 py-4 rounded-full bg-gradient-to-br from-[#ee826d] to-[#c8582e] text-white font-bold hover:from-[#d4602a] hover:to-[#b84d24] transition-colors inline-block"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Contattami
          </Link>
        </div>
      </div>
    </div>
  );
}
