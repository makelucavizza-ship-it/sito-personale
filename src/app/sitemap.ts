import { MetadataRoute } from "next";
import { getPortfolioItems } from "@/lib/markdown";
import { guideDates } from "./guide/guide-dates";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lucavizza.it";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/chi-sono`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/servizi/marketing-digitale`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/servizi/automazione-ai`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/agenzie`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/audit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contatti`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/risorse/bandi-digitalizzazione-romagna`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guide/agente-vocale-ai-cos-e-come-funziona`, lastModified: guideDates["agente-vocale-ai-cos-e-come-funziona"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/come-non-perdere-chiamate-ristorante`, lastModified: guideDates["come-non-perdere-chiamate-ristorante"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/automazione-ai-per-ristoranti`, lastModified: guideDates["automazione-ai-per-ristoranti"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/automazione-ai-per-saloni-centri-estetici`, lastModified: guideDates["automazione-ai-per-saloni-centri-estetici"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/quanto-costa-non-rispondere-al-telefono`, lastModified: guideDates["quanto-costa-non-rispondere-al-telefono"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/automazione-ai-per-studi-medici-e-ambulatori`, lastModified: guideDates["automazione-ai-per-studi-medici-e-ambulatori"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/come-automatizzare-gli-appuntamenti-senza-centralino`, lastModified: guideDates["come-automatizzare-gli-appuntamenti-senza-centralino"], changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/guide/marketing-digitale-per-pmi-da-dove-iniziare`, lastModified: guideDates["marketing-digitale-per-pmi-da-dove-iniziare"], changeFrequency: "monthly", priority: 0.8 },
  ];

  const portfolioPages: MetadataRoute.Sitemap = getPortfolioItems().map((item) => ({
    url: `${base}/portfolio/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...portfolioPages];
}
