/** Display name for `<title>`, Open Graph, and branding. */
export const SITE_DISPLAY_NAME = "Anish Sukhramani" as const;

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
  );
}

export function sitePageTitle(segment: string): string {
  return `${SITE_DISPLAY_NAME} | ${segment}`;
}
