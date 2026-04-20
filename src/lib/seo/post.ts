import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";
import { formatSeoPageTitle } from "@/lib/seo/seo";
import type { Post } from "@/types/post";

function buildPostSocialImageAlt(post: Post): string | undefined {
  const baseAlt = post.cover_image_alt?.trim();
  if (!baseAlt) return undefined;
  const brandedMarker = " | Anish Sukhramani - ";
  if (baseAlt.includes(brandedMarker)) return baseAlt;
  return `${baseAlt}${brandedMarker}${post.title}`;
}

export function buildPostMetadata(post: Post): Metadata {
  const site = getSiteUrl();
  const canonical = post.canonical ?? `${site}/blog/${post.slug}`;
  const description = post.description;
  const socialImageAlt = buildPostSocialImageAlt(post);

  return {
    title: post.title,
    description,
    alternates: { canonical },
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: formatSeoPageTitle(post.title),
      description,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      url: canonical,
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, alt: socialImageAlt }]
        : undefined,
      locale: post.geo?.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: formatSeoPageTitle(post.title),
      description,
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, alt: socialImageAlt }]
        : undefined,
    },
  };
}

export function buildPostJsonLd(post: Post) {
  const site = getSiteUrl();
  const canonical = post.canonical ?? `${site}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    description: post.description,
    image: post.cover_image_url ?? undefined,
    keywords: post.keywords.length > 0 ? post.keywords.join(",") : undefined,
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      name: "Anish Sukhramani",
    },
    publisher: {
      "@type": "Person",
      name: "Anish Sukhramani",
    },
    contentLocation:
      post.geo?.country || post.geo?.region
        ? {
            "@type": "Place",
            name: [post.geo?.region, post.geo?.country].filter(Boolean).join(", "),
          }
        : undefined,
  };
}

export function buildPostBreadcrumbJsonLd(post: Post) {
  const site = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writings",
        item: `${site}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: post.canonical ?? `${site}/blog/${post.slug}`,
      },
    ],
  };
}
