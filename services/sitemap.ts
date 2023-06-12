import { SitemapUrls } from "@/types/sitemap";

export const getSitemapUrls = async (): Promise<SitemapUrls[]> => {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/v1/sitemaps`, {
    headers: {
      "x-api-key": `Bearer ${process.env.API_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("cannot fetch sitemap");
  }

  return res.json();
};
