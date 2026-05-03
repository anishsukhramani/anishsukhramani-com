import { cn } from "@/lib/utils";

const INTRO =
  "Speed requires the elimination of operational drag. I treat communication as an engineering problem: it must be low-latency and high-signal.";

const RULES = [
  {
    title: "Written-First",
    description:
      "Architecture and decisions are documented in shared channels with clear owners and strict deadlines.",
  },
  {
    title: "State Updates",
    description:
      "Daily syncs are strictly limited to three data points: Current Risk, ETA, and the Next Unblocker.",
  },
  {
    title: "Meeting Minimization",
    description:
      "If it can be a Loom video or a Markdown file, it will not be a 30-minute Zoom call.",
  },
] as const;

type RulesEngagementGridProps = {
  className?: string;
};

export function RulesEngagementGrid({ className }: RulesEngagementGridProps) {
  return (
    <section className={cn(className)}>
      <h2 className="font-heading text-section font-semibold tracking-tight text-foreground">
        Rules of Engagement
      </h2>
      <p className="mt-4 max-w-[65ch] text-prose leading-relaxed text-muted-foreground">
        {INTRO}
      </p>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {RULES.map((rule) => (
          <div key={rule.title} className="min-w-0">
            <p className="font-semibold text-foreground">{rule.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {rule.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
