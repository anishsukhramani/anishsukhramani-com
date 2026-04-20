import type { Metadata } from "next";
import { FrictionImage } from "@/components/media/friction-image";
import { HomeSearch } from "@/components/home-search";
import { PostCard } from "@/components/post-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllPosts } from "@/lib/content/posts";
import { PROFESSIONAL_IDENTITY } from "@/lib/env";
import { absolutePublicUrl } from "@/lib/seo/public-url";
import {
  buildPersonJsonLd,
  DEFAULT_SOCIAL_IMAGE_ALT,
  DEFAULT_SOCIAL_IMAGE_URL,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
} from "@/lib/seo/seo";

const canonical = absolutePublicUrl("");
const personJsonLd = buildPersonJsonLd();

export const metadata: Metadata = {
  title: {
    absolute: PROFESSIONAL_IDENTITY,
  },
  description: SEO_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical },
  openGraph: {
    title: PROFESSIONAL_IDENTITY,
    description: SEO_DESCRIPTION,
    url: canonical,
    images: [{ url: DEFAULT_SOCIAL_IMAGE_URL, alt: DEFAULT_SOCIAL_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: PROFESSIONAL_IDENTITY,
    description: SEO_DESCRIPTION,
    images: [{ url: DEFAULT_SOCIAL_IMAGE_URL, alt: DEFAULT_SOCIAL_IMAGE_ALT }],
  },
};

export default async function HomePage() {
  const featuredCandidates = await getAllPosts({
    featuredOnly: true,
    limit: 6,
  });
  const latest = await getAllPosts({ limit: 9 });
  const featured =
    featuredCandidates.length > 0 ? featuredCandidates : latest.slice(0, 3);
  const grid = latest;

  return (
    <>
      <JsonLd data={personJsonLd} />
      <div className="flex flex-col">
        <section className="border-b border-border/60 bg-gradient-to-b from-muted/30 to-background px-4 py-16 sm:px-8 lg:grid lg:min-h-[100dvh] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch lg:gap-0 lg:px-0 lg:py-0">
          <div className="mx-auto flex min-w-0 max-w-6xl flex-col justify-center space-y-8 lg:mx-0 lg:max-w-none lg:px-8 lg:py-24 xl:pl-12">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Personal journal
            </p>
            <h1 className="font-heading text-hero font-semibold leading-[1.1] tracking-tight">
              Calm writing for curious readers.
            </h1>
            <p className="max-w-xl text-lead leading-relaxed text-muted-foreground">
              Technical deep dives, product notes, and occasional essays — laid
              out with care so you can read without friction.
            </p>
            <HomeSearch />
          </div>
          {/* lg+: full viewport height, width from aspect ratio (no crop); flush right */}
          <div className="relative mx-auto mt-12 aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border/80 bg-muted shadow-xl lg:mt-0 lg:aspect-auto lg:h-[100dvh] lg:w-max lg:max-w-none lg:rounded-none lg:border-0 lg:shadow-none lg:overflow-visible">
            <FrictionImage
              src="/anishsukhramaniheroimage.jpg"
              alt="Portrait"
              context="Homepage hero"
              width={1884}
              height={2512}
              className="absolute inset-0 h-full w-full object-cover lg:relative lg:inset-auto lg:h-[100dvh] lg:w-auto lg:max-w-none lg:object-contain"
              preload
              quality={72}
              sizes="(max-width: 640px) 92vw, (max-width: 1023px) 100vw, 72vh"
            />
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-background/40 to-transparent dark:block lg:from-background/25" />
          </div>
        </section>

        {featured.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-section font-semibold tracking-tight">
                  Featured
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pieces worth reading slowly.
                </p>
              </div>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
          <h2 className="font-heading text-section font-semibold tracking-tight">
            Latest
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fresh from the desk.
          </p>
          {grid.length === 0 ? (
            <p className="mt-10 text-muted-foreground">
              No published posts yet. Add your first MDX article in{" "}
              <code>content/posts</code> and redeploy.
            </p>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
