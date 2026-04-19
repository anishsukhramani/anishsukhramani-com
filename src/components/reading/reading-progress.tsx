"use client";

import * as React from "react";

export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onMq = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onMq);

    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-[calc(env(safe-area-inset-top,0px)+3.5rem)] z-30 h-0.5 bg-transparent lg:left-[4.75rem] lg:top-0 xl:left-[13rem]"
      aria-hidden
    >
      <div
        className="h-full w-full origin-left bg-primary/80"
        style={{
          transform: `scaleX(${progress})`,
          transition: reduceMotion ? "none" : "transform 120ms ease-out",
        }}
      />
    </div>
  );
}
