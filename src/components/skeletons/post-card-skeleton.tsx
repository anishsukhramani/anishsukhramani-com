import { Skeleton } from "@/components/ui/skeleton";

/** Layout matches PostCard (cover 16/10 + content block). */
export function PostCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.18)]">
      <Skeleton className="aspect-[16/10] w-full shrink-0 rounded-none" />
      <div className="flex flex-col gap-3 p-6">
        <Skeleton className="h-6 w-[88%] rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-[92%] rounded-md" />
        <Skeleton className="h-4 w-[70%] rounded-md" />
        <Skeleton className="mt-1 h-3 w-24 rounded-md" />
      </div>
    </div>
  );
}
