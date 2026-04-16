import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "@/app/search/search-input";
import { SearchResults } from "@/app/search/search-results";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Search
        </h1>
        <p className="mt-2 text-muted-foreground">
          Search articles by topic, title, or keyword.
        </p>
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
      </header>
      <Suspense
        fallback={<p className="mt-8 text-muted-foreground">Loading search…</p>}
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
