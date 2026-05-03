import { cn } from "@/lib/utils";

const INTRO =
  "The timezone gap is a strategic advantage, not a drag. My workflow is optimized to guarantee high-bandwidth alignment with your team, while reserving flexible, uninterrupted blocks for shipping code.";

const PHASES = [
  {
    meta: "PHASE 01 — THE SYNC",
    title: "The Sync (High-Bandwidth Alignment)",
    body:
      "Scope lock, architectural decisions, and rapid unblocking. We establish the vector during overlapping hours, ensuring perfect alignment before the asynchronous phase begins.",
  },
  {
    meta: "PHASE 02 — THE BUILD",
    title: "The Build (Deep Execution)",
    body:
      "I prioritize outcome over rigid desk hours. Execution happens during highly flexible, uninterrupted states of deep work. Code is written, reviewed, and staged inside shared channels using concise decision logs. Momentum never stalls waiting on calendar blocks.",
  },
  {
    meta: "PHASE 03 — THE DEPLOYMENT",
    title: "The Deployment (Zero-Downtime Shipping)",
    body:
      "My peak morning energy aligns perfectly with the Pacific Coast's lowest-traffic window. This creates a risk-free environment to deploy features, run database migrations, and test in production while your users—and your team—are asleep. You wake up to a stable, upgraded system.",
  },
] as const;

type PhaseTimelineProps = {
  className?: string;
};

export function PhaseTimeline({ className }: PhaseTimelineProps) {
  return (
    <section className={cn(className)}>
      <h2 className="font-heading text-section font-semibold tracking-tight text-foreground">
        The Continuous Deployment Cycle
      </h2>
      <p className="mt-4 max-w-[65ch] text-prose leading-relaxed text-muted-foreground">
        {INTRO}
      </p>
      <div className="mt-10 border-l border-zinc-200 pl-6 ml-1 dark:border-zinc-800">
        <div className="flex flex-col gap-10">
          {PHASES.map((phase) => (
            <div key={phase.meta} className="min-w-0">
              <p className="font-mono text-xs tracking-widest text-zinc-500 dark:text-zinc-500">
                {phase.meta}
              </p>
              <h3 className="mt-3 font-heading text-subsection font-semibold tracking-tight text-foreground">
                {phase.title}
              </h3>
              <p className="mt-3 text-prose leading-relaxed text-muted-foreground">
                {phase.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
