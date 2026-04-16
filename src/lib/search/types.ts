import type { PostListItem } from "@/types/post";

export type SearchIndexEntry = PostListItem & {
  tags: string[];
  searchableText: string;
};

export interface SearchProvider {
  search(query: string, index: SearchIndexEntry[]): Promise<PostListItem[]>;
}
