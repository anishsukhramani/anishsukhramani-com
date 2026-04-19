import Image from "next/image";
import type { ReactNode } from "react";
import { ReadingProgress } from "@/components/reading/reading-progress";
import { RelatedPosts } from "@/components/reading/related-posts";
import { TableOfContents } from "@/components/reading/table-of-contents";
import { estimateReadMinutes } from "@/lib/content/markdown";
import type { Post, PostListItem } from "@/types/post";

const TOC_WORD_THRESHOLD = 800;

export function PostTemplate({
  post,
  related,
  children,
}: {
  post: Post;
  related: PostListItem[];
  children: ReactNode;
}) {
  const showToc = post.word_count >= TOC_WORD_THRESHOLD && post.headings.length > 0;
  const minutes = estimateReadMinutes(post.word_count);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[65ch]">
          <header className="border-b border-border/60 pb-10">
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
              <p className="mt-6 text-lead leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            )}
            <p className="mt-6 text-sm text-muted-foreground">{minutes} min read</p>
          </header>
          {post.cover_image_url && (
            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-border/80 bg-muted">
              <Image
                src={post.cover_image_url}
                alt={post.cover_image_alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          )}
        </div>

        {showToc ? (
          <div className="mx-auto mt-12 grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,65ch)_260px] lg:justify-center">
            <div className="min-w-0">{children}</div>
            <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
              <TableOfContents headings={post.headings} />
            </aside>
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-[65ch]">{children}</div>
        )}

        <div className="mx-auto max-w-[65ch]">
          <RelatedPosts posts={related} />
        </div>
      </article>
    </>
  );
}
