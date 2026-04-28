import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portfolio", "/risorse/bandi-digitalizzazione-romagna"],
      },
    ],
    sitemap: "https://lucavizza.it/sitemap.xml",
  };
}
