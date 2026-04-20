"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerHaptic } from "@/lib/haptics";

type PlaceholdersAndVanishInputProps = {
  placeholders: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  inputClassName?: string;
  buttonLabel?: string;
};

export function PlaceholdersAndVanishInput({
  placeholders,
  value,
  onChange,
  onSubmit,
  className,
  inputClassName,
  buttonLabel = "Search",
}: PlaceholdersAndVanishInputProps) {
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(
    typeof document === "undefined" ? true : document.visibilityState === "visible"
  );
  const [isVanishing, setIsVanishing] = React.useState(false);

  React.useEffect(() => {
    const onVisibility = () => setIsVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  React.useEffect(() => {
    if (!isVisible || placeholders.length <= 1 || value) return;
    const id = window.setInterval(() => {
      setPlaceholderIndex((idx) => (idx + 1) % placeholders.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [isVisible, placeholders.length, value]);

  const currentPlaceholder =
    placeholders.length > 0
      ? placeholders[placeholderIndex % placeholders.length]
      : "Search";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!value.trim()) {
      e.preventDefault();
      return;
    }

    triggerHaptic(50);
    setIsVanishing(true);
    window.setTimeout(() => {
      onSubmit(e);
      setIsVanishing(false);
    }, 220);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="group relative flex min-h-12 w-full items-center overflow-hidden rounded-2xl border border-border/80 bg-background/80 shadow-sm backdrop-blur">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <div className="relative h-full min-w-0 flex-1">
          {!value && (
            <span
              key={placeholderIndex}
              className={cn(
                "pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 pr-2 text-sm text-muted-foreground transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] motion-reduce:transition-none",
                isVanishing && "translate-y-1 opacity-0"
              )}
            >
              {currentPlaceholder}
            </span>
          )}

          <input
            type="search"
            name="q"
            value={value}
            onChange={onChange}
            aria-label="Search articles"
            className={cn(
              "h-full w-full bg-transparent pl-10 pr-3 text-sm outline-none placeholder:text-transparent",
              isVanishing && "text-transparent",
              inputClassName
            )}
          />

          {value && (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-10 top-1/2 max-w-[calc(100%-3.5rem)] -translate-y-1/2 truncate text-sm text-foreground transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
                isVanishing ? "scale-95 opacity-0" : "opacity-0"
              )}
            >
              {value}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="focus-ring mr-1.5 inline-flex min-h-11 min-w-11 origin-center items-center justify-center rounded-xl px-4 text-sm font-medium text-primary transition-[transform,opacity,color,background-color] duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-muted active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
