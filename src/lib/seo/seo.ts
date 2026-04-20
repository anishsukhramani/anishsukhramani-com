import { absolutePublicUrl } from "@/lib/seo/public-url";
import { getSameAsProfiles, PROFESSIONAL_IDENTITY } from "@/lib/env";

export const SEO_TITLE_TEMPLATE = `%s | ${PROFESSIONAL_IDENTITY}`;

export const SEO_DESCRIPTION =
  "Silicon Valley-tested Remote Software Engineer (Applied AI). Currently building scalable Healthcare AI solutions for a San Jose startup. Specializing in high-velocity, asynchronous shipping for early-stage teams.";

export const SEO_KEYWORDS = [
  "Remote SWE",
  "Silicon Valley Remote Developer",
  "Software Engineer Applied AI",
  "Next.js Expert",
  "Asynchronous Startup Engineering",
] as const;

export const DEFAULT_SOCIAL_IMAGE_URL = absolutePublicUrl("/brand/S.png");
export const DEFAULT_SOCIAL_IMAGE_ALT =
  "Monogram letter S logo | Anish Sukhramani - Remote Software Engineer";

export function formatSeoPageTitle(segment: string): string {
  return `${segment} | ${PROFESSIONAL_IDENTITY}`;
}

export function buildPersonJsonLd() {
  const sameAs = getSameAsProfiles();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anish Sukhramani",
    jobTitle: "Remote Software Engineer (Applied AI)",
    worksFor: {
      "@type": "Organization",
      name: "Neurality Health AI",
      location: "San Jose, California",
    },
    workLocation: {
      "@type": "Place",
      name: "Remote",
    },
    description:
      "Remote Software Engineer (Applied AI) specializing in full-stack Next.js and agentic LLM integrations. Operating seamlessly in Pacific Standard Time (PST) with a proven remote track record in San Jose's tech ecosystem.",
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}
