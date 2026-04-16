import { NavDock } from "@/components/nav/nav-dock";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-md"
      >
        Skip to content
      </a>
      <NavDock />
      <main
        id="main"
        className="min-h-screen pt-14 lg:ml-[4.75rem] lg:pt-0 xl:ml-[13rem]"
      >
        {children}
      </main>
    </>
  );
}
