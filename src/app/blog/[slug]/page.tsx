import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/blog/mdx-content";
import { PostTemplate } from "@/components/blog/post-template";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/content/posts";
import {
  buildPostBreadcrumbJsonLd,
  buildPostJsonLd,
  buildPostMetadata,
} from "@/lib/seo/post";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Not found" };
  }
  return buildPostMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(post.slug, post.tags, 3);
  const jsonLd = buildPostJsonLd(post);
  const breadcrumbLd = buildPostBreadcrumbJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PostTemplate post={post} related={related}>
        <MdxContent source={post.body} imageContext={post.title} />
      </PostTemplate>
    </>
  );
}
