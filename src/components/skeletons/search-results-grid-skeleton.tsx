import { PostCardSkeleton } from "@/components/skeletons/post-card-skeleton";

export function SearchResultsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
