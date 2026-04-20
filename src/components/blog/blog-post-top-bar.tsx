"use client";

import { usePathname } from "next/navigation";
import { isBlogPostPath } from "@/lib/nav/blog-post-path";
import { useReadingProgressValue } from "@/components/reading/reading-progress-provider";

/** Fixed top strip on `/blog/[slug]` only; z-30 so the sidebar rail (z-40) stays on top. Reading progress sits on the top edge of this bar (lg+). */
export function BlogPostTopBar() {
  const pathname = usePathname();
  const { progress, reduceMotion } = useReadingProgressValue();

  if (!isBlogPostPath(pathname)) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-30 hidden pt-[env(safe-area-inset-top,0px)] lg:block">
      <div className="relative bg-background">
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-0.5 overflow-hidden bg-transparent"
          aria-hidden
        >
          <div
            className="h-full w-full origin-left bg-primary/80"
            style={{
              transform: `scaleX(${progress})`,
              transition: reduceMotion ? "none" : "transform 120ms ease-out",
            }}
          />
        </div>
        <div className="h-32" aria-hidden />
      </div>
    </div>
  );
}
