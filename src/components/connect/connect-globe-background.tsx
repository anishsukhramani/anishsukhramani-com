"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export function ConnectGlobeBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[56rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 opacity-65 sm:opacity-70 dark:opacity-75">
        <World
          globeConfig={{
            // Fully transparent ocean/background; only continent dots visible.
            globeColor: isDark ? "#000000" : "#ffffff",
            polygonColor: isDark ? "rgba(238,238,238,0.72)" : "rgba(22,22,22,0.4)",
            showAtmosphere: false,
            atmosphereColor: "rgba(0,0,0,0)",
            atmosphereAltitude: 0,
            emissive: isDark ? "#000000" : "#ffffff",
            emissiveIntensity: 0,
            shininess: 0,
            ambientLight: isDark ? "#e7e7e7" : "#4a4a4a",
            directionalLeftLight: isDark ? "#f7f7f7" : "#2d2d2d",
            directionalTopLight: isDark ? "#dddddd" : "#3a3a3a",
            pointLight: isDark ? "#d0d0d0" : "#3f3f3f",
            rotateSpeed: 0.0018,
          }}
        />
      </div>
    </div>
  );
}
