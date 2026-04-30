"use client";

import * as React from "react";
import { Check, Copy, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { triggerHaptic } from "@/lib/haptics";

const surface =
  "relative isolate overflow-hidden rounded-2xl border border-white/45 bg-white/10 p-4 shadow-[inset_0_1px_0_rgb(255,255,255,0.78),0_10px_30px_rgb(0,0,0,0.05)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/38 before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:ring-1 after:ring-white/60 dark:border-white/20 dark:bg-white/4 dark:shadow-[inset_0_1px_0_rgb(255,255,255,0.18),0_10px_30px_rgb(0,0,0,0.35)] dark:before:from-white/12 dark:after:ring-white/15 sm:p-5";

const COPY_MS = 2000;

export function ConnectEmailCard({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);
  const [announce, setAnnounce] = React.useState("");
  const resetRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  React.useEffect(() => {
    return () => {
      if (resetRef.current !== undefined) clearTimeout(resetRef.current);
    };
  }, []);

  async function copyEmail() {
    setAnnounce("");
    try {
      await navigator.clipboard.writeText(email);
      triggerHaptic(50);
      setCopied(true);
      setAnnounce("Email copied to clipboard.");
      if (resetRef.current !== undefined) clearTimeout(resetRef.current);
      resetRef.current = setTimeout(() => {
        setCopied(false);
        setAnnounce("");
      }, COPY_MS);
    } catch {
      setAnnounce("Could not copy. Try selecting the address manually.");
    }
  }

  return (
    <div className={cn(surface)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <Mail
            className="mt-0.5 size-6 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="font-heading text-base font-semibold tracking-tight text-foreground">
              Email
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Click copy to reveal and use the address.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => void copyEmail()}
          className={cn(
            "focus-ring inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/55 bg-white/12 px-5 text-sm font-medium shadow-[inset_0_1px_0_rgb(255,255,255,0.88)] transition-[transform,opacity,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-white/2 hover:border-white/72 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 dark:border-white/24 dark:bg-white/8 dark:shadow-[inset_0_1px_0_rgb(255,255,255,0.24)] dark:hover:bg-white/12 dark:hover:border-white/30"
          )}
          aria-label={copied ? "Email copied" : "Copy email address"}
        >
          {copied ? (
            <Check className="size-4 text-primary" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
          {copied ? "Copied" : "Copy email"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
