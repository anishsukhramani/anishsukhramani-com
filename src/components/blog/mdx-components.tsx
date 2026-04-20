import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { BrandImage } from "@/components/media/brand-image";
import { cn } from "@/lib/utils";

function Summary({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mt-2 rounded-2xl border border-border/70 bg-muted/35 px-5 py-4",
        className
      )}
      aria-label="Executive summary"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        TL;DR
      </p>
      <div className="mt-3 text-prose leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}

export function createMdxComponents(imageContext?: string): MDXComponents {
  return {
    Summary,
    ExecutiveSummary: Summary,
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-14 scroll-mt-28 font-heading text-section font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-12 scroll-mt-28 font-heading text-subsection font-semibold",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn("mt-10 scroll-mt-28 font-heading text-xl font-semibold", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("mt-5 text-prose leading-[1.65] text-foreground/90", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-6 list-disc space-y-2 pl-6", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn("my-6 list-decimal space-y-2 pl-6", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-8 border-l-2 border-primary/40 pl-6 italic text-foreground/80",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "my-8 overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-[13px] leading-relaxed",
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-[0.9em]",
          className
        )}
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn("font-semibold text-foreground", className)} {...props} />
    ),
    em: ({ className, ...props }) => (
      <em className={cn("italic text-foreground/90", className)} {...props} />
    ),
    img: ({ className, alt, src, ...props }) => {
      if (!src) {
        return (
          <span className="mt-6 block text-sm text-muted-foreground">
            Image source missing.
          </span>
        );
      }
      return (
        <span className="my-8 block overflow-hidden rounded-2xl border border-border/80 bg-muted">
          <BrandImage
            src={String(src)}
            alt={alt ?? ""}
            context={imageContext}
            width={1400}
            height={900}
            className={cn("h-auto w-full object-cover", className)}
            sizes="(max-width: 1024px) 100vw, 900px"
            {...props}
          />
        </span>
      );
    },
  };
}
