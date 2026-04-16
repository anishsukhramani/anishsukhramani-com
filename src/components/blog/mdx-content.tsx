import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[13px]">
      <MDXRemote
        source={source}
        components={mdxComponents}
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
    </div>
  );
}
