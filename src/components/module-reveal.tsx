"use client";

import { MotionSettings } from "@/config/motion-settings";
import { ReactNode, useEffect, useRef, useState } from "react";

type ModuleRevealProps = {
  motion: MotionSettings;
  index: number;
  children: ReactNode;
};

export function ModuleReveal({ motion, index, children }: ModuleRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(!motion.scrollRevealEnabled);

  useEffect(() => {
    if (!motion.scrollRevealEnabled) {
      setVisible(true);
      return;
    }

    let cancelled = false;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 25% 0px" }
    );

    observer.observe(node);

    const failsafe = window.setTimeout(() => {
      if (!cancelled) setVisible(true);
    }, 12000);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [motion.scrollRevealEnabled]);

  return (
    <div
      ref={ref}
      className={`motion-reveal motion-reveal--${motion.revealStyle} ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${motion.staggerMs * index}ms` }}
    >
      {children}
    </div>
  );
}
