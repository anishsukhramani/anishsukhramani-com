"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { isBlogSectionPath } from "@/lib/nav/blog-section-path";

const CLASS = "blog-hide-scrollbar";

/** Hides the default vertical scrollbar on blog routes only (Firefox + WebKit). */
export function BlogScrollbar() {
  const pathname = usePathname();
  const onBlog = isBlogSectionPath(pathname);

  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (onBlog) {
      html.classList.add(CLASS);
      body.classList.add(CLASS);
    } else {
      html.classList.remove(CLASS);
      body.classList.remove(CLASS);
    }
    return () => {
      html.classList.remove(CLASS);
      body.classList.remove(CLASS);
    };
  }, [onBlog]);

  return null;
}
