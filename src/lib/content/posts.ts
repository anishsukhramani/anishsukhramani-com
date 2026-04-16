import "server-only";

import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import matter from "gray-matter";
import { z } from "zod";
import {
  countWords,
  extractHeadingsFromMarkdown,
  markdownToPlainText,
} from "@/lib/content/markdown";
import type { Post, PostFrontmatter, PostListItem } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const ARTIFACT_CACHE_PATH = path.join(
  process.cwd(),
  ".cache",
  "content-artifacts.json"
);

const frontmatterSchema: z.ZodType<PostFrontmatter> = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    excerpt: z.string().min(1).optional(),
    publishedAt: z
      .union([z.string(), z.date()])
      .transform((value) =>
        typeof value === "string" ? new Date(value).toISOString() : value.toISOString()
      ),
    updatedAt: z
      .union([z.string(), z.date()])
      .optional()
      .transform((value) =>
        !value
          ? undefined
          : typeof value === "string"
            ? new Date(value).toISOString()
            : value.toISOString()
      ),
    coverImage: z.string().min(1).optional(),
    coverImageAlt: z.string().min(1).optional(),
    featured: z.boolean().optional(),
    tags: z.array(z.string().min(1)).optional(),
    canonical: z.string().url().optional(),
    noindex: z.boolean().optional(),
    keywords: z.array(z.string().min(1)).optional(),
    geo: z
      .object({
        region: z.string().min(1).optional(),
        country: z.string().min(1).optional(),
        locale: z.string().min(1).optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.coverImage && !data.coverImageAlt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "coverImageAlt is required when coverImage is set",
        path: ["coverImageAlt"],
      });
    }
  });

export type SearchSourcePost = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "published_at" | "cover_image_url" | "word_count"
> & {
  tags: string[];
  searchableText: string;
};

const readAllPostsCached = cache(async (): Promise<Post[]> => {
  const artifactCache = await readArtifactCache();
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const mdxFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();

  const posts = await Promise.all(
    mdxFiles.map((fileName) => readPostFile(fileName, artifactCache))
  );

  return posts.sort((a, b) =>
    a.published_at < b.published_at ? 1 : a.published_at > b.published_at ? -1 : 0
  );
});

export async function getAllPosts(options?: {
  limit?: number;
  featuredOnly?: boolean;
}): Promise<PostListItem[]> {
  let posts = await readAllPostsCached();
  if (options?.featuredOnly) {
    posts = posts.filter((post) => post.featured);
  }
  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }
  return posts.map(toListItem);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await readAllPostsCached();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const posts = await readAllPostsCached();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function getSitemapPosts(): Promise<
  Array<{ slug: string; updated_at: string; noindex: boolean }>
> {
  const posts = await readAllPostsCached();
  return posts.map((post) => ({
    slug: post.slug,
    updated_at: post.updated_at,
    noindex: post.noindex,
  }));
}

export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): Promise<PostListItem[]> {
  const posts = await readAllPostsCached();
  const others = posts.filter((post) => post.slug !== currentSlug);
  const wanted = new Set(tags.map(normalizeTag));

  const scored = others
    .map((post) => ({
      post,
      score: post.tags.reduce(
        (n, tag) => (wanted.has(normalizeTag(tag)) ? n + 1 : n),
        0
      ),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.published_at.localeCompare(a.post.published_at);
    });

  return scored.slice(0, limit).map(({ post }) => toListItem(post));
}

export async function searchPostsSource(query: string, limit = 50): Promise<PostListItem[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const sources = await getSearchSource();
  const ranked = sources
    .map((post) => {
      const titleHit = post.title.toLowerCase().includes(q) ? 4 : 0;
      const tagHit = post.tags.some((tag) => tag.toLowerCase().includes(q)) ? 2 : 0;
      const bodyHit = post.searchableText.includes(q) ? 1 : 0;
      return { post, score: titleHit + tagHit + bodyHit };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.post.published_at.localeCompare(a.post.published_at);
    });

  return ranked.slice(0, limit).map(({ post }) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    published_at: post.published_at,
    cover_image_url: post.cover_image_url,
    featured: false,
    word_count: post.word_count,
  }));
}

export async function getSearchSource(): Promise<SearchSourcePost[]> {
  const posts = await readAllPostsCached();
  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    published_at: post.published_at,
    cover_image_url: post.cover_image_url,
    word_count: post.word_count,
    tags: post.tags,
    searchableText: [
      post.title,
      post.description,
      post.excerpt ?? "",
      post.tags.join(" "),
      post.plain_text.slice(0, 7000),
    ]
      .join(" ")
      .toLowerCase(),
  }));
}

async function readPostFile(
  fileName: string,
  artifactCache: ArtifactCache
): Promise<Post> {
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const checksum = createHash("sha256").update(raw).digest("hex");
  const parsed = matter(raw);
  const fm = frontmatterSchema.parse(parsed.data);
  const cached = artifactCache.artifacts[fm.slug];
  const plainText =
    cached && cached.checksum === checksum
      ? cached.searchableText
      : markdownToPlainText(parsed.content);
  const headings =
    cached && cached.checksum === checksum
      ? cached.headings
      : extractHeadingsFromMarkdown(parsed.content);
  const wordCount =
    cached && cached.checksum === checksum ? cached.word_count : countWords(plainText);

  return {
    id: fm.slug,
    slug: fm.slug,
    title: fm.title,
    description: fm.description,
    excerpt: fm.excerpt ?? null,
    body: parsed.content.trim(),
    plain_text: plainText,
    headings,
    published_at: fm.publishedAt,
    updated_at: fm.updatedAt ?? fm.publishedAt,
    cover_image_url: fm.coverImage ?? null,
    cover_image_alt: fm.coverImageAlt ?? null,
    featured: fm.featured ?? false,
    word_count: wordCount,
    tags: (fm.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
    canonical: fm.canonical ?? null,
    noindex: fm.noindex ?? false,
    keywords: fm.keywords ?? [],
    geo: fm.geo ?? null,
  };
}

function toListItem(post: Post): PostListItem {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    published_at: post.published_at,
    cover_image_url: post.cover_image_url,
    featured: post.featured,
    word_count: post.word_count,
  };
}

function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

type ArtifactEntry = {
  checksum: string;
  word_count: number;
  headings: Post["headings"];
  searchableText: string;
};

type ArtifactCache = {
  generatedAt: string;
  artifacts: Record<string, ArtifactEntry>;
};

async function readArtifactCache(): Promise<ArtifactCache> {
  try {
    const raw = await fs.readFile(ARTIFACT_CACHE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<ArtifactCache>;
    return {
      generatedAt: parsed.generatedAt ?? "",
      artifacts: parsed.artifacts ?? {},
    };
  } catch {
    return {
      generatedAt: "",
      artifacts: {},
    };
  }
}
