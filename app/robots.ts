import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://topio.pl",
    sitemap: "https://topio.pl/sitemap.xml",
  };
}
