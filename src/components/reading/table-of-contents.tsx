"use client";

import type { TocHeading } from "@/types/post";
import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
  className,
}: {
  headings: TocHeading[];
  className?: string;
}) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "rounded-2xl border border-border bg-card/60 p-5 text-sm backdrop-blur-sm",
        className
      )}
    >
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        On this page
      </p>
      <ol className="mt-4 space-y-2">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: `${Math.max(0, h.level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${h.id}`}
              className="focus-ring inline-block rounded-md py-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
