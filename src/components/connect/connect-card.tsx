import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const surfaceBase =
  "group relative isolate overflow-hidden flex min-h-[4.5rem] flex-col justify-center gap-1 rounded-2xl border border-white/45 bg-white/10 p-4 text-left shadow-[inset_0_1px_0_rgb(255,255,255,0.78),0_10px_30px_rgb(0,0,0,0.05)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/38 before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:ring-1 after:ring-white/60 dark:border-neutral-800 dark:bg-black dark:shadow-none dark:backdrop-blur-none dark:before:hidden dark:after:hidden sm:min-h-[5rem] sm:p-5";

const surfaceInteractive =
  "focus-ring outline-none transition-[transform,opacity,background-color,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/16 hover:border-white/65 hover:shadow-[inset_0_1px_0_rgb(255,255,255,0.9),0_14px_34px_rgb(0,0,0,0.08)] dark:hover:bg-neutral-950 dark:hover:border-neutral-700 dark:hover:shadow-none active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

const surfaceInactive =
  "cursor-default transition-none hover:translate-y-0";

type ConnectCardProps = {
  /** When omitted, renders a non-interactive placeholder (same visual shell). */
  href?: string;
  title: string;
  description: string;
  icon: LucideIcon;
  external?: boolean;
  /** Shown under description when `href` is missing (e.g. env hint). */
  inactiveHint?: string;
};

export function ConnectCard({
  href,
  title,
  description,
  icon: Icon,
  external = true,
  inactiveHint,
}: ConnectCardProps) {
  const label =
    external === false ? title : `${title} (opens in a new tab)`;

  const inner = (
    <>
      <span className="flex items-start gap-4">
        <Icon
          className={cn(
            "size-6 shrink-0 text-muted-foreground transition-[color] duration-200 ease-out motion-reduce:transition-none",
            href && "group-hover:text-foreground"
          )}
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className="font-heading text-base font-semibold tracking-tight text-foreground">
            {title}
          </span>
          <span className="mt-1 block text-sm leading-snug text-muted-foreground">
            {description}
          </span>
          {!href && inactiveHint ? (
            <span className="mt-2 block text-xs text-muted-foreground">
              {inactiveHint}
            </span>
          ) : null}
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div
        className={cn(surfaceBase, surfaceInactive)}
        aria-disabled="true"
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(surfaceBase, surfaceInteractive)}
      {...(external
        ? { target: "_blank", rel: "noreferrer", "aria-label": label }
        : { "aria-label": label })}
    >
      {inner}
    </Link>
  );
}
