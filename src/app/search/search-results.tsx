"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { SearchResultsGridSkeleton } from "@/components/skeletons/search-results-grid-skeleton";
import { createSearchProvider } from "@/lib/search/providers";
import type { SearchIndexEntry } from "@/lib/search/types";
import type { PostListItem } from "@/types/post";

const provider = createSearchProvider("local");

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [results, setResults] = React.useState<PostListItem[]>([]);
  const [state, setState] = React.useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  );

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      const q = query.trim();
      if (!q) {
        setResults([]);
        setState("idle");
        return;
      }

      setState("loading");
      try {
        const res = await fetch("/search-index.json", { cache: "force-cache" });
        if (!res.ok) throw new Error("Failed to load search index");
        const index = (await res.json()) as SearchIndexEntry[];
        const matches = await provider.search(q, index);
        if (!cancelled) {
          setResults(matches.slice(0, 100));
          setState("ready");
        }
      } catch {
        if (!cancelled) {
          setResults([]);
          setState("error");
        }
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (!query.trim()) {
    return (
      <p className="mt-8 text-muted-foreground">
        Enter a query above to search all published posts.
      </p>
    );
  }

  const resultLabel =
    state === "ready" ? (
      <p className="mt-6 text-sm text-muted-foreground">Results for “{query}”</p>
    ) : null;

  if (state === "loading") {
    return (
      <>
        <p className="mt-6 text-sm text-muted-foreground">Results for “{query}”</p>
        <SearchResultsGridSkeleton />
      </>
    );
  }

  if (state === "error") {
    return (
      <>
        <p className="mt-6 text-sm text-muted-foreground">Results for “{query}”</p>
        <p className="mt-8 text-muted-foreground">
          Search index is unavailable. Rebuild the app to regenerate it.
        </p>
      </>
    );
  }

  if (results.length === 0) {
    return (
      <>
        <p className="mt-6 text-sm text-muted-foreground">Results for “{query}”</p>
        <p className="mt-8 text-muted-foreground">No articles matched.</p>
      </>
    );
  }

  return (
    <>
      {resultLabel}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
