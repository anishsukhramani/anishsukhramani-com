import { Skeleton } from "@/components/ui/skeleton";

/** Matches SearchInput outer spacing and control height. */
export function SearchInputSkeleton() {
  return <Skeleton className="mt-6 h-12 w-full max-w-2xl rounded-2xl" />;
}
