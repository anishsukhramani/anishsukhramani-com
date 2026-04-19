import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/content/posts";
import { absolutePublicUrl } from "@/lib/seo/public-url";

const canonical = absolutePublicUrl("/blog");

export const metadata: Metadata = {
  title: "Writings",
  description: "All published essays and notes.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts({ limit: 2000 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header className="max-w-2xl">
        <h1 className="font-heading text-page font-semibold tracking-tight">
          Writings
        </h1>
        <p className="mt-4 text-lead text-muted-foreground">
          Browse every article in one place.
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">Nothing published yet.</p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
