/** Display name for `<title>`, Open Graph, and branding. */
export const SITE_DISPLAY_NAME = "Anish Sukhramani" as const;
export const PROFESSIONAL_IDENTITY =
  "Anish Sukhramani - Remote Software Engineer (Applied AI)" as const;

/**
 * Canonical site origin (no trailing slash). Used for metadata, sitemap, and
 * JSON-LD. In production, set `NEXT_PUBLIC_SITE_URL` to exactly one preferred
 * host (e.g. `https://anishsukhramani.com`). Redirect the alternate host
 * (apex vs `www`) to this URL in Vercel domain settings so crawlers never see
 * two live origins.
 */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
  );
}

export function sitePageTitle(segment: string): string {
  return `${segment} | ${PROFESSIONAL_IDENTITY}`;
}

export function getSameAsProfiles(): string[] {
  return [
    process.env.NEXT_PUBLIC_SAME_AS_GITHUB,
    process.env.NEXT_PUBLIC_SAME_AS_LINKEDIN,
    process.env.NEXT_PUBLIC_SAME_AS_X,
  ].filter((value): value is string => Boolean(value));
}
