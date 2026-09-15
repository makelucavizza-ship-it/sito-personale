import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type PortfolioType =
  | "sito-web"
  | "social"
  | "local-seo"
  | "ads"
  | "automazione";

export type PortfolioStatus = "online" | "in-corso" | "in-arrivo";

export interface PortfolioItem {
  slug: string;
  title: string;
  client: string;
  sector: string;
  // Nuovo schema (filtri, badge stato, pagina dettaglio)
  type: PortfolioType[];
  status: PortfolioStatus;
  year: number;
  summary: string;
  problem: string;
  whatIDid: string[];
  result?: string;
  clientUrl?: string;
  coverImage: string;
  // Schema esistente, mantenuto per compatibilità con le pagine attuali
  services: string[];
  date: string;
  description: string;
  results: string[];
  color: string;
  content: string;
}

export function getPortfolioItems(): PortfolioItem[] {
  const dir = path.join(contentDir, "portfolio");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        client: data.client ?? "",
        sector: data.sector ?? "",
        type: data.type ?? [],
        status: data.status ?? "in-arrivo",
        year: data.year ?? new Date(data.date ?? Date.now()).getFullYear(),
        summary: data.summary ?? data.description ?? "",
        problem: data.problem ?? "",
        whatIDid: data.whatIDid ?? [],
        result: data.result,
        clientUrl: data.clientUrl,
        coverImage: data.coverImage ?? "",
        services: data.services ?? [],
        date: data.date ?? "",
        description: data.description ?? "",
        results: data.results ?? [],
        color: data.color ?? "#3ad3ef",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPortfolioItem(slug: string): PortfolioItem | null {
  const file = path.join(contentDir, "portfolio", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    client: data.client ?? "",
    sector: data.sector ?? "",
    type: data.type ?? [],
    status: data.status ?? "in-arrivo",
    year: data.year ?? new Date(data.date ?? Date.now()).getFullYear(),
    summary: data.summary ?? data.description ?? "",
    problem: data.problem ?? "",
    whatIDid: data.whatIDid ?? [],
    result: data.result,
    clientUrl: data.clientUrl,
    coverImage: data.coverImage ?? "",
    services: data.services ?? [],
    date: data.date ?? "",
    description: data.description ?? "",
    results: data.results ?? [],
    color: data.color ?? "#3ad3ef",
    content,
  };
}
