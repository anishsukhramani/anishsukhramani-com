import { BlogPostTopBar } from "@/components/blog/blog-post-top-bar";
import { BlogScrollbar } from "@/components/nav/blog-scrollbar";
import { MainFrame } from "@/components/nav/main-frame";
import { NavDock } from "@/components/nav/nav-dock";
import { ReadingProgressProvider } from "@/components/reading/reading-progress-provider";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-md"
      >
        Skip to content
      </a>
      <BlogScrollbar />
      <NavDock />
      <ReadingProgressProvider>
        <BlogPostTopBar />
        <MainFrame>{children}</MainFrame>
      </ReadingProgressProvider>
    </>
  );
}
