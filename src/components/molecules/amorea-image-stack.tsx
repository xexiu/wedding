"use client";

import { applySlideTokens, translate } from "@/components/organisms/sections/helpers";
import type { CarouselSlideConfig } from "@/config/modules";
import type { Locale } from "@/config/locales";
import type { WeddingDetails } from "@/config/wedding-details";
import { resolveCarouselImageSrc } from "@/lib/carousel-images";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type AmoreaImageStackProps = {
  slides: CarouselSlideConfig[];
  locale: Locale;
  details: WeddingDetails;
  stackAutoplayMs: number;
};

export function AmoreaImageStack({ slides, locale, details, stackAutoplayMs }: AmoreaImageStackProps) {
  const entries = useMemo(
    () =>
      slides
        .map((slide, slideIndex) => ({
          slide,
          slideIndex,
          src: resolveCarouselImageSrc(slide.image)
        }))
        .filter((x) => x.src.length > 0),
    [slides]
  );

  const n = entries.length;
  const [k, setK] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (n === 0) return;
    setK((prev) => (prev >= n ? 0 : prev));
  }, [n]);

  const go = useCallback(
    (delta: number) => {
      if (n === 0) return;
      setK((prev) => (prev + delta + n) % n);
    },
    [n]
  );

  const goBoth = useCallback(
    (delta: number) => {
      if (n === 0) return;
      setK((prev) => (prev + delta + n) % n);
      setLightboxIndex((prev) => (prev + delta + n) % n);
    },
    [n]
  );

  useEffect(() => {
    if (lightboxOpen || n <= 1 || stackAutoplayMs < 500) return;
    const id = window.setInterval(() => go(1), stackAutoplayMs);
    return () => window.clearInterval(id);
  }, [go, lightboxOpen, n, stackAutoplayMs]);

  function openLightbox() {
    setLightboxIndex(k);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        ev.preventDefault();
        closeLightbox();
      }
      if (ev.key === "ArrowLeft") {
        ev.preventDefault();
        goBoth(-1);
      }
      if (ev.key === "ArrowRight") {
        ev.preventDefault();
        goBoth(1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [goBoth, lightboxOpen]);

  const active = entries[k]?.slide;
  const titleText = active
    ? applySlideTokens(translate(active.title, locale), details)
    : "";
  const subText = active ? applySlideTokens(translate(active.subtitle, locale), details) : "";

  const lbEntry = lightboxOpen ? entries[lightboxIndex] : undefined;
  const lbTitle = lbEntry ? applySlideTokens(translate(lbEntry.slide.title, locale), details) : "";

  if (n === 0) {
    return (
      <div className="amorea-img-stack amorea-img-stack--empty subcard-body">
        Add at least one slide with an image in admin (Hero → carousel slides). Use a filename from{" "}
        <code className="rounded bg-rose-100 px-1">public/carousel/images/</code>, a site path, or a full image URL.
      </div>
    );
  }

  return (
    <>
      <div className="amorea-img-stack amorea-img-stack--layout" style={{ "--n": n, "--k": k } as React.CSSProperties}>
        <div className="amorea-img-stack__col amorea-img-stack__col--stack">
          <div className="amorea-img-stack__viewport">
            {entries.map(({ slideIndex, src }, idxInEntries) => {
              const order = (idxInEntries - k + n) % n;
              const isTop = order === 0;
              const scale = Math.max(0.78, 1 - order * 0.065);
              const translateY = order * 16;
              const tilt = ((slideIndex * 31) % 21) - 10;
              return (
                <article
                  key={`${slideIndex}-${src}`}
                  className={`amorea-img-stack__card${isTop ? " amorea-img-stack__card--top" : ""}`}
                  aria-hidden={!isTop}
                  {...(isTop
                    ? {
                        role: "button" as const,
                        tabIndex: 0,
                        "aria-label": "Open photo fullscreen",
                        onClick: openLightbox,
                        onKeyDown: (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openLightbox();
                          }
                        }
                      }
                    : {})}
                  style={{
                    zIndex: 50 - order,
                    opacity: Math.max(0.72, 1 - order * 0.06),
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${tilt}deg)`
                  }}
                >
                  <img src={src} alt="" className="amorea-img-stack__img" draggable={false} />
                </article>
              );
            })}
          </div>
        </div>

        <div className="amorea-img-stack__col amorea-img-stack__col--meta">
          <p className="amorea-img-stack__counter" aria-live="polite">
            {k + 1}/{n}
          </p>
          <h2 className="amorea-img-stack__title">{titleText}</h2>
          <p className="amorea-img-stack__subtitle">{subText}</p>
          <div className="amorea-img-stack__controls">
            <button type="button" className="amorea-img-stack__btn" aria-label="Previous photo" onClick={() => go(-1)}>
              ‹
            </button>
            <button type="button" className="amorea-img-stack__btn" aria-label="Next photo" onClick={() => go(1)}>
              ›
            </button>
          </div>
        </div>
      </div>

      {lightboxOpen && lbEntry && typeof document !== "undefined"
        ? createPortal(
            <div
              className="amorea-img-lightbox"
              role="dialog"
              aria-modal="true"
              aria-labelledby="amorea-img-lightbox-title"
            >
              <div className="amorea-img-lightbox__shell" onClick={closeLightbox}>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="amorea-img-lightbox__close"
                  aria-label="Close fullscreen photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                >
                  ×
                </button>
                {n > 1 ? (
                  <button
                    type="button"
                    className="amorea-img-lightbox__nav amorea-img-lightbox__nav--prev"
                    aria-label="Previous photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      goBoth(-1);
                    }}
                  >
                    ‹
                  </button>
                ) : null}
                {n > 1 ? (
                  <button
                    type="button"
                    className="amorea-img-lightbox__nav amorea-img-lightbox__nav--next"
                    aria-label="Next photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      goBoth(1);
                    }}
                  >
                    ›
                  </button>
                ) : null}
                <div className="amorea-img-lightbox__panel" onClick={(e) => e.stopPropagation()}>
                  <p id="amorea-img-lightbox-title" className="sr-only">
                    {lbTitle}
                  </p>
                  <img
                    src={lbEntry.src}
                    alt={lbTitle || "Carousel photo"}
                    className="amorea-img-lightbox__img"
                    draggable={false}
                  />
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
