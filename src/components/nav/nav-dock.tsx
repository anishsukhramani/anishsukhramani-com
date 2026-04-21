"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Clock3,
  Home,
  Link2,
  Mail,
  Menu,
  Search,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ReadModeToggle } from "@/components/read-mode-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { BrandMark } from "@/components/nav/brand-mark";
import { isBlogPostPath } from "@/lib/nav/blog-post-path";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Writings", icon: BookOpen },
  { href: "/remote", label: "Remote", icon: Clock3 },
  { href: "/search", label: "Search", icon: Search },
  { href: "/about", label: "About", icon: User },
  { href: "/newsletter", label: "Newsletter", icon: Mail },
  { href: "/connect", label: "Connect", icon: Link2 },
] as const;

const RAIL_CLOSE_MS = 280;
const RAIL_IDLE_MS = 4500;

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn("flex flex-col gap-1", className)}
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "focus-ring group flex min-h-11 origin-center items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-[transform,opacity,color,background-color] duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "size-5 shrink-0 transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                active && "text-foreground"
              )}
              aria-hidden
            />
            <span className="inline lg:sr-only xl:not-sr-only">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function NavRailContent() {
  return (
    <div className="flex h-full flex-col items-center gap-2 px-2 pt-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] xl:items-stretch xl:px-3">
      <Link
        href="/"
        className="focus-ring mb-2 flex min-h-11 w-full origin-center items-center justify-center rounded-xl px-1.5 py-2 transition-[transform,opacity,color,background-color] duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-sidebar-accent/60 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 xl:mx-auto xl:w-full xl:max-w-none"
        aria-label="Home"
      >
        <BrandMark variant="rail" className="w-full max-w-full" />
      </Link>
      <Separator className="mb-1 hidden w-auto xl:block" />
      <div className="flex flex-1 flex-col justify-center gap-1">
        <NavLinks className="items-center xl:items-stretch" />
      </div>
      <Separator className="mt-auto hidden xl:block" />
      <div className="mt-auto flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-1 xl:flex-row xl:items-center">
          <ThemeToggle />
          <ReadModeToggle />
        </div>
      </div>
    </div>
  );
}

export function NavDock() {
  const pathname = usePathname();
  const isBlogPost = isBlogPostPath(pathname);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [railOpen, setRailOpen] = React.useState(false);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const idleTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current !== undefined) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }, []);

  const clearIdleTimer = React.useCallback(() => {
    if (idleTimerRef.current !== undefined) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = undefined;
    }
  }, []);

  const openRail = React.useCallback(() => {
    clearCloseTimer();
    clearIdleTimer();
    setRailOpen(true);
  }, [clearCloseTimer, clearIdleTimer]);

  const scheduleRailClose = React.useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setRailOpen(false), RAIL_CLOSE_MS);
  }, [clearCloseTimer]);

  React.useEffect(() => {
    if (!isBlogPost) setRailOpen(false);
  }, [isBlogPost]);

  React.useEffect(() => {
    if (!isBlogPost || !railOpen) {
      clearIdleTimer();
      return;
    }

    const resetIdle = () => {
      clearIdleTimer();
      idleTimerRef.current = setTimeout(() => setRailOpen(false), RAIL_IDLE_MS);
    };

    resetIdle();
    const onMove = () => resetIdle();
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      clearIdleTimer();
    };
  }, [isBlogPost, railOpen, clearIdleTimer]);

  React.useEffect(() => {
    if (!isBlogPost || !railOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRailOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isBlogPost, railOpen]);

  const railBaseClass =
    "fixed inset-y-0 left-0 z-40 hidden w-[4.75rem] border-r border-white/12 bg-sidebar/85 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-sidebar/80 dark:shadow-[0_8px_30px_rgb(0,0,0,0.22)] lg:flex xl:w-[13rem] xl:flex-col";

  return (
    <>
      {/* Blog post (desktop): edge hit zone to reveal rail when hidden */}
      {isBlogPost && !railOpen && (
        <div
          className="fixed inset-y-0 left-0 z-[45] hidden w-3 cursor-e-resize lg:block"
          onMouseEnter={openRail}
          aria-hidden
        />
      )}

      {/* Keyboard: open rail (blog + rail hidden, lg+); mouse users use the left edge strip */}
      {isBlogPost && !railOpen && (
        <button
          type="button"
          className="focus-ring hidden lg:block lg:sr-only lg:focus:not-sr-only lg:focus:fixed lg:focus:left-4 lg:focus:top-[calc(env(safe-area-inset-top,0px)+5rem)] lg:focus:z-[100] lg:focus:inline-flex lg:focus:items-center lg:focus:gap-2 lg:focus:rounded-lg lg:focus:border lg:focus:border-border lg:focus:bg-background lg:focus:px-3 lg:focus:py-2 lg:focus:shadow-md"
          aria-label="Open site navigation"
          onClick={openRail}
        >
          <Menu className="size-4" aria-hidden />
        </button>
      )}

      {/* Desktop rail */}
      <aside
        className={cn(
          railBaseClass,
          isBlogPost &&
            "transition-transform duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] motion-reduce:transition-none",
          isBlogPost && !railOpen && "-translate-x-full",
          isBlogPost && railOpen && "translate-x-0"
        )}
        onMouseEnter={isBlogPost ? openRail : undefined}
        onMouseLeave={isBlogPost ? scheduleRailClose : undefined}
        inert={isBlogPost && !railOpen ? true : undefined}
      >
        <NavRailContent />
      </aside>

      {/* Mobile top bar: safe-area top + symmetric columns so the mark sits in true horizontal center */}
      <div className="fixed left-0 right-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)] lg:hidden">
        <div className="grid h-14 w-full grid-cols-[1fr_minmax(0,3fr)_1fr] items-center gap-x-2 border-b border-white/10 bg-sidebar/90 px-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:bg-sidebar/88 dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] sm:gap-x-3 sm:px-4">
          <div className="min-w-0" aria-hidden />
          <Link
            href="/"
            className="focus-ring flex h-full min-h-11 w-full min-w-0 origin-center items-stretch justify-center rounded-lg px-1 py-1 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:opacity-90 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
            aria-label="Home"
          >
            <BrandMark variant="mobile" className="w-full max-w-full" />
          </Link>
          <div className="flex min-w-0 items-center justify-end gap-2">
            <ThemeToggle />
            <ReadModeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-xl"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-5" aria-hidden />
              </Button>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-full flex-col gap-4 p-4">
                  <p className="font-heading text-lg font-semibold">Menu</p>
                  <NavLinks
                    className="flex-1"
                    onNavigate={() => setMobileOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}
