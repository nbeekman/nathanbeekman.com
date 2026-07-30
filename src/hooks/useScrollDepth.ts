import React from "react";

import { track } from "../utils/analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

type Threshold = (typeof THRESHOLDS)[number];

/**
 * Fires page_scroll_depth once per threshold per page load.
 */
export const useScrollDepth = (): void => {
  const fired = React.useRef<Set<Threshold>>(new Set());

  React.useEffect(() => {
    let frame = 0;

    const report = (): void => {
      const { scrollHeight } = document.documentElement;
      if (scrollHeight <= 0) return;

      // Measured against the bottom of the viewport, so 100% means the bottom of the
      // viewport reached the bottom of the document.
      const depth = ((window.scrollY + window.innerHeight) / scrollHeight) * 100;

      THRESHOLDS.forEach((threshold) => {
        if (depth >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          track("page_scroll_depth", { percent: threshold });
        }
      });
    };

    const onScroll = (): void => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        report();
      });
    };

    // A viewport taller than the document never fires a scroll event. Report what is
    // already visible on mount so those sessions are not recorded as zero depth.
    report();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
};
