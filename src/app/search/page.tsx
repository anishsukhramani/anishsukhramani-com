import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "@/app/search/search-input";
import { SearchResults } from "@/app/search/search-results";
import { SearchInputSkeleton } from "@/components/skeletons/search-input-skeleton";
import { SearchResultsGridSkeleton } from "@/components/skeletons/search-results-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: false },
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header>
        <h1 className="font-heading text-page font-semibold tracking-tight">
          Search
        </h1>
        <p className="mt-2 text-lead text-muted-foreground">
          Search articles by topic, title, or keyword.
        </p>
        <Suspense fallback={<SearchInputSkeleton />}>
          <SearchInput />
        </Suspense>
      </header>
      <Suspense
        fallback={
          <>
            <Skeleton className="mt-6 h-4 w-48 rounded-md" />
            <SearchResultsGridSkeleton />
          </>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
