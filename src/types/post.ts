export type PostGeo = {
  region?: string;
  country?: string;
  locale?: string;
};

export type PostFrontmatter = {
  slug: string;
  title: string;
  description: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  featured?: boolean;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
  keywords?: string[];
  geo?: PostGeo;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string | null;
  body: string;
  plain_text: string;
  headings: TocHeading[];
  published_at: string;
  updated_at: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  featured: boolean;
  word_count: number;
  tags: string[];
  canonical: string | null;
  noindex: boolean;
  keywords: string[];
  geo: PostGeo | null;
};

export type PostListItem = Pick<
  Post,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "published_at"
  | "cover_image_url"
  | "featured"
  | "word_count"
>;

export type TocHeading = { id: string; text: string; level: number };
