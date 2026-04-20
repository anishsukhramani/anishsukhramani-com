"use client";

import { usePathname } from "next/navigation";
import { isBlogPostPath } from "@/lib/nav/blog-post-path";
import { useReadingProgressValue } from "@/components/reading/reading-progress-provider";

/**
 * Mobile-only: thin progress line below the fixed top bar. On `lg+`, progress is
 * rendered inside {@link BlogPostTopBar}.
 */
export function ReadingProgress() {
  const pathname = usePathname();
  const blogPost = isBlogPostPath(pathname);
  const { progress, reduceMotion } = useReadingProgressValue();

  if (!blogPost) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-[calc(env(safe-area-inset-top,0px)+3.5rem)] z-[35] h-0.5 bg-transparent lg:hidden"
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
  );
}
