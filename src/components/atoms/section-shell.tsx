"use client";

import { CardSurface } from "@/components/atoms/card-surface";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  cardClassName: string;
  /** When false, hides the large section title (Amorea static layout uses in-section labels). */
  showHeading?: boolean;
};

export function SectionShell({ title, children, cardClassName, showHeading = true }: Props) {
  return (
    <CardSurface
      as="section"
      className={`section-shell mx-auto my-5 w-full rounded-2xl p-4 shadow-sm backdrop-blur sm:my-6 sm:rounded-3xl sm:p-6 lg:my-8 lg:p-8 ${
        showHeading ? "" : "section-shell--amorea "
      }${cardClassName}`}
    >
      {showHeading ? (
        <h2
          className="section-shell__title mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl"
          style={{ color: "var(--theme-primary)", fontSize: "calc(2.3rem * var(--layout-title-scale, 1))" }}
        >
          {title}
        </h2>
      ) : null}
      <div className="section-shell__content" style={{ color: "var(--theme-text)" }}>
        {children}
      </div>
    </CardSurface>
  );
}
