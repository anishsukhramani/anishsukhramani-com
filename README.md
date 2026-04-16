# Blogsite (Static MDX Architecture)

This project is a Next.js App Router blog with:

- file-based posts in `content/posts/*.mdx`
- reusable blog templates/components for consistent UI
- per-post SEO metadata + JSON-LD infrastructure
- static in-app search index (`public/search-index.json`)

No database or admin backend is required.

## Local Development

```bash
npm install
npm run dev
```

`npm run dev` automatically runs `prepare:content`, which regenerates:

- `public/search-index.json` (client-side search data)
- `.cache/content-artifacts.json` (precomputed headings/word counts/search text)

## Publishing a New Blog Post

1. Add a new file in `content/posts/<slug>.mdx`.
2. Include frontmatter:

```yaml
---
slug: your-post-slug
title: Your post title
description: SEO description for this post
excerpt: Optional short summary
publishedAt: 2026-01-01T09:00:00+00:00
updatedAt: 2026-01-01T09:00:00+00:00
coverImage: /optional-cover.jpg
coverImageAlt: Required when coverImage is present
featured: false
tags:
  - nextjs
  - mdx
keywords:
  - keyword one
  - keyword two
geo:
  locale: en_US
---
```

3. Write your MDX content below frontmatter.
4. Redeploy.

## SEO and Search Notes

- Each post uses shared metadata + JSON-LD helpers from `src/lib/seo/post.ts`.
- `sitemap.xml` is generated from static post slugs.
- `/search` loads `public/search-index.json` and runs ranking in the browser.
- Missing required frontmatter fields fail during `npm run build`.

## Security Notes

- Static architecture removes auth/admin attack surface.
- Security headers are configured in `next.config.ts`.
- Keep secrets out of client code and out of committed env files.
