"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const placeholders = [
  "Search articles by topic, title, or keyword",
  "Try: static architecture, SEO systems, templates",
  "Find a post by phrase or concept",
];

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q")?.trim() ?? "";
  const [q, setQ] = React.useState(queryFromUrl);

  React.useEffect(() => {
    setQ(queryFromUrl);
  }, [queryFromUrl]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onSubmit={onSubmit}
      className="mt-6 max-w-2xl"
      buttonLabel="Find"
    />
  );
}
