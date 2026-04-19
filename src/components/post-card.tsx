import Link from "next/link";
import Image from "next/image";
import type { PostListItem } from "@/types/post";
import { estimateReadMinutes } from "@/lib/content/markdown";
import { Card, CardContent } from "@/components/ui/card";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full origin-center transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-[0.98]"
    >
      <Card className="h-full overflow-hidden border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-0.5 dark:shadow-[0_8px_30px_rgb(0,0,0,0.18)]">
        <div className="relative aspect-[16/10] w-full bg-muted">
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-background text-xs text-muted-foreground">
              Editorial
            </div>
          )}
        </div>
        <CardContent className="space-y-3 p-6">
          <h2 className="font-heading text-subsection font-semibold leading-snug tracking-tight group-hover:text-primary">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {post.word_count
              ? `${estimateReadMinutes(post.word_count)} min read`
              : "Essay"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
