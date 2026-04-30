import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absolutePublicUrl } from "@/lib/seo/public-url";

const canonical = absolutePublicUrl("/newsletter");

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe on the platforms where this work is syndicated.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const platforms = [
  {
    name: "Medium",
    description: "Long-form essays and curated lists.",
    href: "https://anishsukhramani.medium.com/",
    imageSrc: "/mediumprofile1.png",
    imageAlt: "Medium profile preview",
  },
  {
    name: "DEV",
    description: "Technical posts and community discussions.",
    href: "https://dev.to/anishsukhramani",
    imageSrc: "/devto1.png",
    imageAlt: "DEV profile preview",
  },
];

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <header className="w-full">
        <h1 className="font-heading text-page font-semibold tracking-tight text-muted-foreground">
          Newsletter.
        </h1>
        <p className="mt-1 text-lead text-muted-foreground">
          Follow along on your preferred platform to get new posts, thoughtful updates, and occasional behind-the-scenes notes.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${p.name} profile in a new tab`}
            className="focus-ring block rounded-2xl"
          >
            <Card className="flex h-full flex-col border-border/80 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <CardTitle className="font-heading text-xl">{p.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </CardHeader>
              <CardContent className="mt-auto flex-1">
                <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                  <Image
                    src={p.imageSrc}
                    alt={p.imageAlt}
                    width={1024}
                    height={557}
                    className="h-auto w-full rounded-lg object-contain"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
