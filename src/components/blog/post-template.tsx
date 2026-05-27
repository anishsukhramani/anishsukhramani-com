import type { ReactNode } from "react";
import { BrandImage } from "@/components/media/brand-image";
import { ReadingProgress } from "@/components/reading/reading-progress";
import { RelatedPosts } from "@/components/reading/related-posts";
import { estimateReadMinutes } from "@/lib/content/markdown";
import type { Post, PostListItem } from "@/types/post";

export function PostTemplate({
  post,
  related,
  children,
}: {
  post: Post;
  related: PostListItem[];
  children: ReactNode;
}) {
  const minutes = estimateReadMinutes(post.word_count);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-6xl px-4 pb-16 pt-0 sm:px-8">
        <div className="mx-auto max-w-[65ch] lg:max-w-5xl">
          <header className="border-b border-border/60 pb-10 text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {new Date(post.published_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="mt-4 font-heading text-hero font-semibold leading-[1.15] tracking-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 max-w-[65ch] text-lead leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            )}
            <p className="mt-6 text-sm text-muted-foreground">{minutes} min read</p>
          </header>
          {post.cover_image_url && (
            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-border/80 bg-muted">
              <BrandImage
                src={post.cover_image_url}
                alt={post.cover_image_alt ?? ""}
                context={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
                loading="eager"
              />
            </div>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-[65ch] lg:max-w-5xl">{children}</div>

        <div className="mx-auto max-w-[65ch] lg:max-w-5xl">
          <RelatedPosts posts={related} />
        </div>
      </article>
    </>
  );
}
