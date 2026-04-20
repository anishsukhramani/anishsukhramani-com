import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { createMdxComponents } from "@/components/blog/mdx-components";

export function MdxContent({
  source,
  imageContext,
}: {
  source: string;
  imageContext?: string;
}) {
  return (
    <section className="[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[13px]">
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
