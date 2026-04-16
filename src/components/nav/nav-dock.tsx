"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
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
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { BrandMark } from "@/components/nav/brand-mark";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Writings", icon: BookOpen },
  { href: "/search", label: "Search", icon: Search },
  { href: "/about", label: "About", icon: User },
  { href: "/newsletter", label: "Newsletter", icon: Mail },
  { href: "/connect", label: "Connect", icon: Link2 },
] as const;

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
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "size-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                active && "text-foreground"
              )}
              aria-hidden
            />
            <span className="hidden lg:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function NavDock() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[4.75rem] border-r border-border bg-sidebar lg:flex xl:w-[13rem] xl:flex-col">
        <div className="flex h-full flex-col items-center gap-2 px-2 py-4 xl:items-stretch xl:px-3">
          <Link
            href="/"
            className="mb-2 flex w-full items-center justify-center rounded-xl px-1.5 py-2 transition-colors hover:bg-sidebar-accent/60 xl:mx-auto xl:w-full xl:max-w-none"
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
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile top bar: symmetric columns so the mark sits in true horizontal center */}
      <div className="fixed left-0 right-0 top-0 z-40 grid h-14 w-full grid-cols-[1fr_minmax(0,3fr)_1fr] items-center gap-x-2 border-b border-border bg-sidebar/95 px-3 backdrop-blur sm:gap-x-3 sm:px-4 lg:hidden">
        <div className="min-w-0" aria-hidden />
        <Link
          href="/"
          className="flex h-full min-h-10 w-full min-w-0 items-center justify-center rounded-lg px-1 py-1 transition-opacity hover:opacity-90"
          aria-label="Home"
        >
          <BrandMark variant="mobile" className="w-full max-w-full" />
        </Link>
        <div className="flex min-w-0 items-center justify-end gap-2">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-10 rounded-xl"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
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
    </>
  );
}
