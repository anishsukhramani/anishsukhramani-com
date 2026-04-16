"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const placeholders = [
  "Search topics, titles, ideas...",
  "Find essays on architecture and systems",
  "Look up SEO, performance, and design notes",
];

export function HomeSearch() {
  const router = useRouter();
  const [q, setQ] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;
    router.push(`/search?q=${encodeURIComponent(v)}`);
  }

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onSubmit={onSubmit}
      className="w-full max-w-xl"
    />
  );
}
