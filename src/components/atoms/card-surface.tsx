"use client";

import { ReactNode } from "react";

type CardSurfaceElement = "section" | "div";

type CardSurfaceProps = {
  as?: CardSurfaceElement;
  className?: string;
  children: ReactNode;
};

export function CardSurface({ as = "section", className = "", children }: CardSurfaceProps) {
  const Element = as;
  return <Element className={`card-surface ${className}`.trim()}>{children}</Element>;
}
