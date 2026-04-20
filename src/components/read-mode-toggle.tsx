"use client";

import * as React from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { triggerHaptic } from "@/lib/haptics";

function getFullscreenElement(): Element | null {
  if (typeof document === "undefined") return null;
  const d = document as Document & {
    webkitFullscreenElement?: Element | null;
  };
  return document.fullscreenElement ?? d.webkitFullscreenElement ?? null;
}

export function ReadModeToggle() {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(getFullscreenElement()));
    sync();
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  const toggle = React.useCallback(async () => {
    triggerHaptic(50);
    const root = document.documentElement;
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
    };
    const html = root as HTMLElement & {
      webkitRequestFullscreen?: () => void;
    };

    try {
      if (getFullscreenElement()) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
      } else {
        if (root.requestFullscreen) await root.requestFullscreen();
        else if (html.webkitRequestFullscreen) html.webkitRequestFullscreen();
      }
    } catch {
      // Not allowed, unsupported, or user gesture required
    }
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="rounded-xl"
      aria-label={isFullscreen ? "Exit read mode" : "Enter read mode"}
      aria-pressed={isFullscreen}
      onClick={toggle}
    >
      {isFullscreen ? (
        <Minimize2 className="size-4" aria-hidden />
      ) : (
        <Maximize2 className="size-4" aria-hidden />
      )}
    </Button>
  );
}
