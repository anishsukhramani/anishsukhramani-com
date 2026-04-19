import type { Metadata } from "next";
import Image from "next/image";
import { absolutePublicUrl } from "@/lib/seo/public-url";

const canonical = absolutePublicUrl("/about");

export const metadata: Metadata = {
  title: "About",
  description: "Background, work, and what drives this journal.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const gallery = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <header className="max-w-2xl">
        <h1 className="font-heading text-page font-semibold tracking-tight">
          About
        </h1>
        <p className="mt-4 text-lead text-muted-foreground">
          Builder, writer, and lifelong learner. Replace this copy with your
          story.
        </p>
      </header>

      <section className="mt-14 grid gap-6 sm:grid-cols-3">
        {gallery.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/80 bg-muted"
          >
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </section>

      <section className="mt-16 max-w-[65ch] space-y-6 text-prose leading-relaxed text-foreground/90">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          Now
        </h2>
        <p>
          Describe what you are building, reading, or exploring. This section is
          a calm snapshot for visitors who want context before they dive into
          your essays.
        </p>
        <h2 className="font-heading mt-12 text-2xl font-semibold tracking-tight">
          Background
        </h2>
        <p>
          Add your professional history, principles, and the themes that tie
          your writing together. Keep paragraphs short so scanners stay engaged.
        </p>
      </section>
    </div>
  );
}
