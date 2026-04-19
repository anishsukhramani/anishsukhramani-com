import type { Metadata } from "next";
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
    href: "https://medium.com",
  },
  {
    name: "DEV",
    description: "Technical posts and community discussions.",
    href: "https://dev.to",
  },
];

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <header className="max-w-2xl">
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          Newsletter
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick a platform and subscribe. Embed areas are ready for your iframe
          subscribe URLs.
        </p>
      </header>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {platforms.map((p) => (
          <Card
            key={p.name}
            className="flex flex-col border-border/80 shadow-sm"
          >
            <CardHeader>
              <CardTitle className="font-heading text-xl">{p.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{p.description}</p>
              <a
                href={p.href}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open platform
              </a>
            </CardHeader>
            <CardContent className="mt-auto flex-1">
              <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
                Paste your subscribe iframe from {p.name} here.
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
