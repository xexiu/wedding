"use client";

import { CarouselDots } from "@/components/molecules/carousel-dots";
import { AmoreaImageStack } from "@/components/molecules/amorea-image-stack";
import { AmoreaLetterOverlay } from "@/components/molecules/amorea-letter-overlay";
import { CardSurface } from "@/components/atoms/card-surface";
import { WaxSeal } from "@/components/atoms/wax-seal";
import { applySlideTokens, translate } from "@/components/organisms/sections/helpers";
import { getSectionPixelTokens } from "@/components/organisms/sections/pixel-tokens";
import { HeroCarouselSectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";
import { useEffect, useMemo, useState } from "react";

export function HeroCarouselSection({ details, props, locale, cadencePreset, theme }: HeroCarouselSectionProps) {
  const uiText = getSectionUiText(locale);
  const SECTION_PIXEL_TOKENS = useMemo(() => getSectionPixelTokens(cadencePreset), [cadencePreset]);
  const slides = useMemo(
    () => [
      {
        title: translate(props.slideOneTitle, locale),
        subtitle: applySlideTokens(translate(props.slideOneSubtitle, locale), details)
      },
      {
        title: translate(props.slideTwoTitle, locale),
        subtitle: applySlideTokens(translate(props.slideTwoSubtitle, locale), details)
      },
      {
        title: translate(props.slideThreeTitle, locale),
        subtitle: applySlideTokens(translate(props.slideThreeSubtitle, locale), details)
      }
    ],
    [
      details,
      locale,
      props.slideOneSubtitle,
      props.slideOneTitle,
      props.slideThreeSubtitle,
      props.slideThreeTitle,
      props.slideTwoSubtitle,
      props.slideTwoTitle
    ]
  );
  const [index, setIndex] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const isAmorea = theme.carouselCard.includes("invitation-amorea-carousel");

  useEffect(() => {
    if (isAmorea) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, props.autoplayMs);
    return () => clearInterval(timer);
  }, [isAmorea, slides.length, props.autoplayMs]);

  function openClassicEnvelope() {
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
        className={
          isAmorea
            ? `amorea-hero-carousel amorea-cover-section amorea-hero-stack-only ${theme.carouselCard} overflow-visible`
            : `${SECTION_PIXEL_TOKENS.HERO.SHELL} ${theme.carouselCard}`
        }
      >
        <div className={isAmorea ? "amorea-cover" : SECTION_PIXEL_TOKENS.HERO.WRAP}>
          {isAmorea ? (
            <div className="amorea-cover-inner">
              <AmoreaImageStack
                slides={props.carouselSlides}
                locale={locale}
                details={details}
                stackAutoplayMs={props.stackAutoplayMs}
              />
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={openClassicEnvelope}
                className={`${SECTION_PIXEL_TOKENS.HERO.ENVELOPE} amorea-envelope-button ${isEnvelopeOpen ? "is-open" : ""}`}
              >
                <span className={`amorea-envelope-flap ${isEnvelopeOpen ? "is-open" : ""}`} />
                <span className="amorea-envelope-letter">
                  <span className="amorea-envelope-letter-title">
                    {details.brideName} &amp; {details.groomName}
                  </span>
                  <span className="amorea-envelope-letter-sub">{uiText.heroInvitation}</span>
                </span>
              </button>
              <div className={SECTION_PIXEL_TOKENS.HERO.SEAL_WRAP}>
                <WaxSeal
                  outerClassName={`${SECTION_PIXEL_TOKENS.HERO.SEAL_OUTER} amorea-gifts-seal`}
                  innerClassName=""
                  symbol="♥"
                  symbolClassName="amorea-wax-seal-symbol"
                />
              </div>
            </>
          )}
        </div>

        {!isAmorea ? (
          <>
            <h1 className={SECTION_PIXEL_TOKENS.HERO.TITLE} style={{ color: "var(--theme-primary)" }}>
              {slides[index].title}
            </h1>
            <p className={SECTION_PIXEL_TOKENS.HERO.SUBTITLE} style={{ color: "var(--theme-text)" }}>
              {slides[index].subtitle}
            </p>
            {props.showDots ? <CarouselDots count={slides.length} activeIndex={index} onSelect={setIndex} /> : null}
          </>
        ) : null}
      </CardSurface>

      {!isAmorea && isLetterOpen ? (
        <AmoreaLetterOverlay details={details} locale={locale} onClose={closeLetter} />
      ) : null}
    </>
  );
}
