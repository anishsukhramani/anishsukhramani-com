import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";

const aiTrainingBots = [
  "GPTBot",
  "CCBot",
  "ClaudeBot",
  "anthropic-ai",
  "Omgilibot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/search"],
      },
      ...aiTrainingBots.map((userAgent) => ({
        userAgent,
        disallow: ["/"],
      })),
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
