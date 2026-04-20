import type { Metadata } from "next";
import { absolutePublicUrl } from "@/lib/seo/public-url";
import { DEFAULT_SOCIAL_IMAGE_URL, formatSeoPageTitle } from "@/lib/seo/seo";

const canonical = absolutePublicUrl("/remote");

const description =
  "Silicon Valley standard remote engineering for early-stage teams: asynchronous by default, zero-friction communication, and daily overlap with Pacific Time while building compliance-heavy healthcare AI systems for a San Jose startup.";

const overlapSchedule = [
  {
    window: "7:00-9:00 AM PT",
    focus: "Standup sync and scope lock",
    detail:
      "Fast handoff on priorities with founders and engineering leads before the core SF day ramps.",
  },
  {
    window: "9:00 AM-1:00 PM PT",
    focus: "Deep execution with rapid feedback loops",
    detail:
      "Architecture, implementation, and review cycles happen inside shared channels with concise decision logs.",
  },
  {
    window: "1:00-4:00 PM PT",
    focus: "Cross-functional alignment and release prep",
    detail:
      "Product and engineering updates stay async-first so decisions do not wait on calendar-heavy meetings.",
  },
  {
    window: "After 6:00 PM PT",
    focus: "Async shipping advantage",
    detail:
      "Code is reviewed, documented, and queued so progress continues while SF sleeps.",
  },
] as const;

export const metadata: Metadata = {
  title: "Remote",
  description,
  alternates: { canonical },
  openGraph: {
    title: formatSeoPageTitle("Remote"),
    description,
    url: canonical,
    images: [{ url: DEFAULT_SOCIAL_IMAGE_URL }],
  },
  twitter: {
    card: "summary_large_image",
    title: formatSeoPageTitle("Remote"),
    description,
    images: [DEFAULT_SOCIAL_IMAGE_URL],
  },
};

export default function RemotePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header className="max-w-[65ch]">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Operating model
        </p>
        <h1 className="mt-4 font-heading text-page font-semibold tracking-tight">
          Remote by default. Silicon Valley standard.
        </h1>
        <p className="mt-6 text-lead leading-relaxed text-muted-foreground">
          I partner with early-stage teams as a Remote Software Engineer
          (Applied AI), optimized for founders and engineering managers working
          on Pacific Time.
        </p>
      </header>

      <section className="mt-14 rounded-3xl border border-border/70 bg-muted/30 p-6 sm:p-8">
        <h2 className="font-heading text-section font-semibold tracking-tight">
          PT overlap schedule
        </h2>
        <p className="mt-3 max-w-[65ch] text-prose leading-relaxed text-muted-foreground">
          The timezone gap is treated as leverage, not drag. Communication stays
          asynchronous by default, while critical collaboration always has PT
          overlap.
        </p>
        <ol className="mt-8 space-y-4">
          {overlapSchedule.map((slot) => (
            <li
              key={slot.window}
              className="grid gap-3 rounded-2xl border border-border/60 bg-background/80 p-4 sm:grid-cols-[12rem_minmax(0,1fr)]"
            >
              <p className="font-mono text-sm text-muted-foreground">{slot.window}</p>
              <div>
                <h3 className="font-heading text-subsection font-semibold tracking-tight">
                  {slot.focus}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {slot.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-border/70 bg-card p-6">
          <h2 className="font-heading text-subsection font-semibold tracking-tight">
            Zero-friction communication
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Decision logs in shared channels with clear owner and deadline.</li>
            <li>Short daily updates focused on risk, ETA, and next unblocker.</li>
            <li>Written-first planning that reduces meeting load for the team.</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-border/70 bg-card p-6">
          <h2 className="font-heading text-subsection font-semibold tracking-tight">
            Trust anchor for healthcare AI
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            I currently build compliance-heavy healthcare AI systems for
            Neurality Health AI, a San Jose startup. That operating environment
            keeps execution disciplined, documentation clear, and delivery ready
            for high-accountability teams.
          </p>
        </article>
      </section>
    </div>
  );
}
