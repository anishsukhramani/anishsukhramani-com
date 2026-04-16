import type { MetadataRoute } from "next";
import { getSitemapPosts } from "@/lib/content/posts";
import { getSiteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl();
  const posts = await getSitemapPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/about",
    "/newsletter",
    "/connect",
  ].map((path) => ({
    url: `${site}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => !post.noindex)
    .map((post) => ({
      url: `${site}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
    }));

  return [...staticRoutes, ...postRoutes];
}
