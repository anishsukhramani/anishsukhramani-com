import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch, Globe, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { absolutePublicUrl } from "@/lib/seo/public-url";

const canonical = absolutePublicUrl("/connect");

export const metadata: Metadata = {
  title: "Connect",
  description: "Social profiles and a direct line for thoughtful messages.",
  alternates: { canonical },
  openGraph: { url: canonical },
};

const socials = [
  { label: "GitHub", href: "https://github.com", icon: GitBranch },
  { label: "X / Twitter", href: "https://twitter.com", icon: MessageCircle },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Globe },
];

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <header className="max-w-2xl">
        <h1 className="font-heading text-page font-semibold tracking-tight">
          Connect
        </h1>
        <p className="mt-4 text-lead text-muted-foreground">
          Say hello, propose a collaboration, or share something worth reading.
        </p>
      </header>

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-section font-semibold">Profiles</h2>
          <ul className="mt-6 space-y-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-border/80 bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Update these URLs in the source to match your real profiles.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
          <h2 className="font-heading text-subsection font-semibold">Send a note</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This form is a visual shell. Wire it to Resend or your API when you
            are ready; until then, email works instantly.
          </p>
          <form className="mt-6 space-y-4" action="#" method="post">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} />
            </div>
            <Button type="button" variant="secondary" className="w-full" disabled>
              Send (configure API)
            </Button>
          </form>
          <a
            href="mailto:hello@example.com"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Mail className="size-4" aria-hidden />
            hello@example.com
          </a>
        </div>
      </section>
    </div>
  );
}
