import { MetadataRoute } from "next";
import { getPortfolioItems } from "@/lib/markdown";

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
  ];

  const portfolioPages: MetadataRoute.Sitemap = getPortfolioItems().map((item) => ({
    url: `${base}/portfolio/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...portfolioPages];
}
