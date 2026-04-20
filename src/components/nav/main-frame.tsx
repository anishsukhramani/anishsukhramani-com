"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isBlogPostPath } from "@/lib/nav/blog-post-path";

export function MainFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const blogPost = isBlogPostPath(pathname);

  return (
    <main
      id="main-content"
      className={cn(
        "min-h-screen pb-[env(safe-area-inset-bottom,0px)]",
        blogPost
          ? "pt-[calc(3.5rem+env(safe-area-inset-top,0px))] lg:ml-0 lg:pt-[calc(8rem+env(safe-area-inset-top,0px))] lg:pb-[env(safe-area-inset-bottom,0px)]"
          : "pt-[calc(3.5rem+env(safe-area-inset-top,0px))] lg:ml-[4.75rem] lg:pt-0 lg:pb-[env(safe-area-inset-bottom,0px)] xl:ml-[13rem]"
      )}
    >
      {children}
    </main>
  );
}
