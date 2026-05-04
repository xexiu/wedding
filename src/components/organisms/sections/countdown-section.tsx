"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { DEFAULT_COUNTDOWN, getCountdownParts } from "@/components/organisms/sections/helpers";
import { formatWeddingDateLabel } from "@/lib/format-wedding-date";
import { getSectionPixelTokens } from "@/components/organisms/sections/pixel-tokens";
import { CountdownSectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";
import { useEffect, useMemo, useState } from "react";

export function CountdownSection({ details, props, locale, cadencePreset, theme }: CountdownSectionProps) {
  /** `null` until mount so SSR and the first client render match (no `Date.now()` hydration drift). */
  const [nowMs, setNowMs] = useState<number | null>(null);
  const uiText = getSectionUiText(locale);
  const SECTION_PIXEL_TOKENS = useMemo(() => getSectionPixelTokens(cadencePreset), [cadencePreset]);

  useEffect(() => {
    setNowMs(Date.now());
    const intervalId = window.setInterval(() => setNowMs(Date.now()), 60000);
    return () => window.clearInterval(intervalId);
  }, []);

  const countdown = useMemo(
    () => (nowMs == null ? DEFAULT_COUNTDOWN : getCountdownParts(details.weddingDate, nowMs)),
    [details.weddingDate, nowMs]
  );
  const weddingDateLabel = useMemo(
    () => formatWeddingDateLabel(details.weddingDate, locale),
    [details.weddingDate, locale]
  );
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");

  if (isAmorea) {
    return (
      <SectionShell showHeading={false} title={uiText.countdownTitle} cardClassName={theme.sectionCard}>
        <div className="amorea-countdown amorea-countdown--exact">
          <span className="amorea-countdown-floral-top" aria-hidden>
            🌸
          </span>
          <p className="amorea-countdown-script">{uiText.countdownKicker}</p>
          <div className="amorea-countdown-numbers">
            <div className="amorea-countdown-cell subcard-level-2">
              <span className="amorea-countdown-number">{countdown.days}</span>
              <span className="amorea-countdown-label subcard-body">{uiText.countdownDays}</span>
            </div>
            <span className="amorea-countdown-separator">·</span>
            <div className="amorea-countdown-cell subcard-level-2">
              <span className="amorea-countdown-number">{countdown.hours}</span>
              <span className="amorea-countdown-label subcard-body">{uiText.countdownHours}</span>
            </div>
            <span className="amorea-countdown-separator">·</span>
            <div className="amorea-countdown-cell subcard-level-2">
              <span className="amorea-countdown-number">{countdown.minutes}</span>
              <span className="amorea-countdown-label subcard-body">{uiText.countdownMinutes}</span>
            </div>
          </div>
          <p className="amorea-countdown-footer">{uiText.countdownFooter}</p>
          {weddingDateLabel ? (
            <p className="amorea-countdown-wedding-date">
              <time dateTime={details.weddingDate}>{weddingDateLabel}</time>
            </p>
          ) : null}
          <span className="amorea-countdown-floral-bot" aria-hidden>
            🌿
          </span>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell title={uiText.countdownTitle} cardClassName={theme.sectionCard}>
      <div className={`amorea-countdown ${SECTION_PIXEL_TOKENS.COUNTDOWN.CARD}`}>
        <p className={SECTION_PIXEL_TOKENS.COUNTDOWN.KICKER}>{uiText.countdownKicker}</p>
        <div className={SECTION_PIXEL_TOKENS.COUNTDOWN.GRID}>
          <div className={`${SECTION_PIXEL_TOKENS.COUNTDOWN.BLOCK} subcard-level-2`}>
            <p className={SECTION_PIXEL_TOKENS.COUNTDOWN.NUMBER}>{countdown.days}</p>
            <p className={`${SECTION_PIXEL_TOKENS.COUNTDOWN.LABEL} subcard-body`}>{uiText.countdownDays}</p>
          </div>
          <div className={`${SECTION_PIXEL_TOKENS.COUNTDOWN.BLOCK} subcard-level-2`}>
            <p className={SECTION_PIXEL_TOKENS.COUNTDOWN.NUMBER}>{countdown.hours}</p>
            <p className={`${SECTION_PIXEL_TOKENS.COUNTDOWN.LABEL} subcard-body`}>{uiText.countdownHours}</p>
          </div>
          <div className={`${SECTION_PIXEL_TOKENS.COUNTDOWN.BLOCK} subcard-level-2`}>
            <p className={SECTION_PIXEL_TOKENS.COUNTDOWN.NUMBER}>{countdown.minutes}</p>
            <p className={`${SECTION_PIXEL_TOKENS.COUNTDOWN.LABEL} subcard-body`}>{uiText.countdownMinutes}</p>
          </div>
        </div>
        <p className={SECTION_PIXEL_TOKENS.COUNTDOWN.FOOTER}>
          {uiText.countdownFooter}
        </p>
        <p className={SECTION_PIXEL_TOKENS.COUNTDOWN.DATE}>{weddingDateLabel}</p>
      </div>
    </SectionShell>
  );
}
