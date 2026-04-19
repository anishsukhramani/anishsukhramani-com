import Link from "next/link";
import Image from "next/image";
import type { PostListItem } from "@/types/post";
import { estimateReadMinutes } from "@/lib/content/markdown";
import { Card, CardContent } from "@/components/ui/card";

export function RelatedPosts({ posts }: { posts: PostListItem[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-border pt-12" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="font-heading text-section font-semibold tracking-tight"
      >
        Read next
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block origin-center transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-[0.98]"
          >
            <Card className="h-full overflow-hidden border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-0.5 dark:shadow-[0_8px_30px_rgb(0,0,0,0.18)]">
              <div className="relative aspect-[16/10] w-full bg-muted">
                {post.cover_image_url ? (
                  <Image
                    src={post.cover_image_url}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    No cover
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <p className="font-heading text-subsection font-semibold leading-snug tracking-tight group-hover:text-primary">
                  {post.title}
                </p>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                <p className="mt-4 text-xs text-muted-foreground">
                  {post.word_count
                    ? `${estimateReadMinutes(post.word_count)} min read`
                    : "Article"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
