import type { PostListItem } from "@/types/post";
import type { SearchIndexEntry, SearchProvider } from "@/lib/search/types";

export class LocalStaticSearchProvider implements SearchProvider {
  async search(query: string, index: SearchIndexEntry[]): Promise<PostListItem[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const ranked = index
      .map((post) => {
        const titleHit = post.title.toLowerCase().includes(q) ? 4 : 0;
        const excerptHit = (post.excerpt ?? "").toLowerCase().includes(q) ? 2 : 0;
        const tagHit = post.tags.some((tag) => tag.toLowerCase().includes(q)) ? 2 : 0;
        const bodyHit = post.searchableText.includes(q) ? 1 : 0;
        return {
          post,
          score: titleHit + excerptHit + tagHit + bodyHit,
        };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.post.published_at.localeCompare(a.post.published_at);
      });

    return ranked.map(({ post }) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      published_at: post.published_at,
      cover_image_url: post.cover_image_url,
      featured: post.featured,
      word_count: post.word_count,
    }));
  }
}

/**
 * Placeholder adapter for future hosted search integration.
 * Implement `search()` when ready to switch to a provider such as Algolia.
 */
export class ExternalSearchProvider implements SearchProvider {
  async search(query: string, index: SearchIndexEntry[]): Promise<PostListItem[]> {
    void query;
    void index;
    return [];
  }
}

export function createSearchProvider(mode: "local" | "external" = "local"): SearchProvider {
  return mode === "external"
    ? new ExternalSearchProvider()
    : new LocalStaticSearchProvider();
}
