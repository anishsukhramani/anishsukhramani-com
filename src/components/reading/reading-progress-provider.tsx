"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { isBlogPostPath } from "@/lib/nav/blog-post-path";
import { useReadingProgress } from "@/lib/hooks/use-reading-progress";

type Value = { progress: number; reduceMotion: boolean };

const ReadingProgressContext = React.createContext<Value | null>(null);

export function ReadingProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const blogPost = isBlogPostPath(pathname);
  const value = useReadingProgress(blogPost);

  return (
    <ReadingProgressContext.Provider value={value}>
      {children}
    </ReadingProgressContext.Provider>
  );
}

export function useReadingProgressValue(): Value {
  const ctx = React.useContext(ReadingProgressContext);
  if (!ctx) {
    throw new Error(
      "useReadingProgressValue must be used within ReadingProgressProvider"
    );
  }
  return ctx;
}
