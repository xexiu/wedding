"use client";

import { AmoreaFloralCorner, AmoreaFloralCornerTr } from "@/components/atoms/amorea-floral-corners";
import { CardSurface } from "@/components/atoms/card-surface";
import { AmoreaLetterOverlay } from "@/components/molecules/amorea-letter-overlay";
import { EnvelopeSectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";
import { useState } from "react";

export function EnvelopeSection({ details, locale, theme }: EnvelopeSectionProps) {
  const isAmorea = theme.carouselCard.includes("invitation-amorea-carousel");
  const uiText = getSectionUiText(locale);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  if (!isAmorea) {
    return null;
  }

  function openEnvelope() {
    setIsEnvelopeOpen(true);
    window.setTimeout(() => setIsLetterOpen(true), 500);
  }

  function closeLetter() {
    setIsLetterOpen(false);
    setIsEnvelopeOpen(false);
  }

  return (
    <>
      <CardSurface
        as="section"
        className={`amorea-hero-carousel amorea-cover-section amorea-envelope-section ${theme.carouselCard} overflow-visible`}
      >
        <div className="amorea-cover">
          <div className="amorea-cover-floral-strip" aria-hidden />
          <AmoreaFloralCorner className="amorea-floral-tl" />
          <AmoreaFloralCornerTr className="amorea-floral-tr" />
          <div className="amorea-cover-inner">
            <h1 className="amorea-hero-couple">
              {details.brideName}
              <br />
              <span className="amorea-hero-amp">&amp;</span>
              {details.groomName}
            </h1>

            <div className="amorea-env-section">
              <div
                role="button"
                tabIndex={0}
                className={`amorea-env-outer ${isEnvelopeOpen ? "opened" : ""}`}
                onClick={openEnvelope}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openEnvelope();
                  }
                }}
              >
                <div className="amorea-env-body">
                  <div className="amorea-env-tri-left" />
                  <div className="amorea-env-tri-right" />
                </div>
                <div className="amorea-env-inside">
                  <div className="amorea-env-inside-pattern" />
                </div>
                <div className={`amorea-env-flap ${isEnvelopeOpen ? "open" : ""}`} />
                <div className="amorea-env-wax-seal" aria-hidden>
                  <span className="amorea-env-wax-seal-symbol">♥</span>
                </div>
                <div className="amorea-env-click-hint">{uiText.heroEnvelopeClickHint}</div>
              </div>
            </div>

            <p className="amorea-hero-seats">{uiText.amoreaSeatsLine}</p>
          </div>
        </div>
      </CardSurface>

      {isLetterOpen ? <AmoreaLetterOverlay details={details} locale={locale} onClose={closeLetter} /> : null}
    </>
  );
}
