"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

const sharedThemeVariables = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "13px",
};

const lightThemeVariables = {
  ...sharedThemeVariables,
  background: "transparent",
  primaryColor: "#f5f5f5",
  primaryTextColor: "#171717",
  primaryBorderColor: "#d4d4d4",
  lineColor: "#525252",
  secondaryColor: "#ffffff",
  tertiaryColor: "#e5e5e5",
  clusterBkg: "#fafafa",
  clusterBorder: "#d4d4d4",
  edgeLabelBackground: "#ffffff",
};

const darkThemeVariables = {
  ...sharedThemeVariables,
  background: "transparent",
  primaryColor: "#262626",
  primaryTextColor: "#fafafa",
  primaryBorderColor: "#525252",
  lineColor: "#a3a3a3",
  secondaryColor: "#171717",
  tertiaryColor: "#404040",
  clusterBkg: "#1f1f1f",
  clusterBorder: "#525252",
  edgeLabelBackground: "#171717",
};

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const isDark = resolvedTheme === "dark";
    const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

    async function renderDiagram() {
      try {
        setError(null);
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: isDark ? darkThemeVariables : lightThemeVariables,
          flowchart: {
            useMaxWidth: true,
            htmlLabels: false,
            curve: "basis",
            padding: 14,
            nodeSpacing: 45,
            rankSpacing: 55,
          },
        });

        const result = await mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (err) {
        if (!cancelled) {
          setSvg("");
          setError(err instanceof Error ? err.message : "Could not render diagram.");
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, rawId, resolvedTheme]);

  if (error) {
    return (
      <pre
        className={cn(
          "not-prose my-8 overflow-x-auto rounded-2xl border border-destructive/30 bg-muted/40 p-4 text-xs text-destructive",
          className
        )}
      >
        {error}
      </pre>
    );
  }

  return (
    <figure
      className={cn(
        "not-prose my-8 rounded-2xl border border-border/80 bg-card p-3 shadow-sm sm:p-4",
        !svg && "min-h-32",
        className
      )}
    >
      <div
        className="flex w-full items-center justify-center [&_svg]:h-auto [&_svg]:max-w-full"
        aria-label="Mermaid diagram"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </figure>
  );
}
