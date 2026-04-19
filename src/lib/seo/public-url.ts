import { getSiteUrl } from "@/lib/env";

/**
 * Absolute public URL for a pathname, aligned with sitemap and metadataBase.
 * Use "" or "/" for the site root.
 */
export function absolutePublicUrl(pathname: string): string {
  const base = getSiteUrl();
  if (!pathname || pathname === "/") {
    return base;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
