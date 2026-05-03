import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const LEAD = "Speed cannot compromise security.";

type SecureCalloutProps = {
  className?: string;
};

export function SecureCallout({ className }: SecureCalloutProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-zinc-200/50 bg-zinc-50/50 p-8 shadow-sm backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/50",
        className
      )}
    >
      <Shield
        className="mb-6 size-5 shrink-0 text-zinc-500 dark:text-zinc-500"
        aria-hidden
      />
      <h2 className="font-heading text-section font-semibold tracking-tight text-foreground">
        The Compliance Standard
      </h2>
      <p className="mt-4 text-prose font-medium leading-relaxed text-foreground">
        {LEAD}
      </p>
      <p className="mt-4 text-prose leading-relaxed text-muted-foreground">
        I currently engineer AI systems for{" "}
        <strong className="font-semibold text-foreground">Neurality Health</strong>
        , a Silicon Valley startup operating in the highly regulated medical
        sector. This environment requires absolute discipline. The code I ship is
        HIPAA-compliant, the documentation is exhaustive, and the delivery is
        built for high-accountability engineering teams. I bring this exact
        standard of enterprise rigor to every codebase I touch.
      </p>
    </section>
  );
}
