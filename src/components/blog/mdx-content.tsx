import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createMdxComponents } from "@/components/blog/mdx-components";
import { cn } from "@/lib/utils";

const proseArticleClassName = cn(
  "prose prose-neutral max-w-none text-left dark:prose-invert",
  /* Match site heading + body scale; width cap is set by the parent wrapper. */
  "prose-headings:font-heading prose-headings:text-foreground",
  "prose-h2:mt-14 prose-h2:scroll-mt-28 prose-h2:font-semibold prose-h2:text-section prose-h2:tracking-tight",
  "prose-h3:mt-12 prose-h3:scroll-mt-28 prose-h3:font-semibold prose-h3:text-subsection",
  "prose-h4:mt-10 prose-h4:scroll-mt-28 prose-h4:font-semibold prose-h4:text-xl",
  "prose-p:mt-5 prose-p:text-foreground/90",
  "prose-a:text-primary prose-a:underline prose-a:underline-offset-4",
  "prose-ul:my-6 prose-ol:my-6",
  "prose-strong:text-foreground prose-strong:font-semibold",
  "[&_pre]:not-prose",
  /* Two-column reading on wide screens; keep structural blocks intact. */
  "lg:columns-2 lg:gap-12 lg:text-justify lg:hyphens-auto",
  "[&_h2]:break-inside-avoid [&_h3]:break-inside-avoid [&_h4]:break-inside-avoid",
  "[&_figure]:break-inside-avoid [&_pre]:break-inside-avoid [&_blockquote]:break-inside-avoid",
  /* Mermaid diagrams and section dividers span both columns for breathing room. */
  "lg:[&_figure]:[column-span:all] lg:[&_hr]:[column-span:all] lg:[&>pre]:[column-span:all]",
  /* Tighten top margins on the first child of each column so headings/figures don't drift. */
  "[&>:first-child]:mt-0"
);

export function MdxContent({
  source,
  imageContext,
}: {
  source: string;
  imageContext?: string;
}) {
  return (
    <section className={proseArticleClassName}>
      <MDXRemote
        source={source}
        components={createMdxComponents(imageContext)}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "append" }],
            ],
          },
        }}
      />
    </section>
  );
}
