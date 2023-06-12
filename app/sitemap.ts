import { getSitemapUrls } from "@/services/sitemap";

export default async function sitemap() {
  const sitemapUrls = await getSitemapUrls();

  const pages = sitemapUrls.map(({ url, updated_at: updatedAt }) => ({
    url: `${process.env.FRONTEND_HOST}${url}`,
    lastModified: new Date(updatedAt).toISOString(),
  }));

  const routes = ["", "/kontakt"].map((route) => ({
    url: `${process.env.FRONTEND_HOST}${route}`,
    lastModified: new Date().toISOString(),
    priority: 1,
  }));

  return [...routes, ...pages];
}
