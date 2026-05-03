import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SummaryTextProps = {
  children: ReactNode;
  className?: string;
};

export function SummaryText({ children, className }: SummaryTextProps) {
  return (
    <div className={cn("max-w-[65ch]", className)}>
      <p className="grid grid-cols-[auto_1fr] items-start gap-x-3 text-xl leading-relaxed text-zinc-600 sm:text-2xl dark:text-zinc-400">
        <span className="flex h-[1lh] items-center justify-center">
          <span
            className="size-2 shrink-0 rounded-full bg-green-500 animate-pulse motion-reduce:animate-none"
            aria-hidden
          />
        </span>
        <span className="min-w-0">{children}</span>
      </p>
    </div>
  );
}
