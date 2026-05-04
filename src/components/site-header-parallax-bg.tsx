"use client";

import { cssBackgroundUrl } from "@/lib/css-background-url";
import { useEffect, useRef, useState } from "react";

type Props = {
  imageSrc: string;
};

const PARALLAX_FACTOR = 0.38;
/** Cap keeps image inside the oversized layer without exposing edges */
const MAX_SHIFT_PX = 72;

/**
 * Parallax scoped to the header: background lags scroll (translateY) so motion reads when scrolling down/up.
 * Uses scroll position, not viewport-fixed backgrounds, so the hero/cover below is unaffected.
 */
export function SiteHeaderParallaxBg({ imageSrc }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shiftY, setShiftY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const apply = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -80 || rect.top > vh + 80) {
        setShiftY(0);
        return;
      }

      const scrollY = window.scrollY;
      const raw = scrollY * PARALLAX_FACTOR;
      setShiftY(Math.max(-MAX_SHIFT_PX, Math.min(MAX_SHIFT_PX, raw)));
    };

    const onScrollOrResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="site-header__parallax-wrap" aria-hidden>
      <div
        className="site-header__parallax-bg site-header__parallax-bg--dynamic"
        style={{
          backgroundImage: cssBackgroundUrl(imageSrc),
          transform: `translate3d(0, ${shiftY}px, 0)`
        }}
      />
    </div>
  );
}
