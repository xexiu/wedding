"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { translate } from "@/components/organisms/sections/helpers";
import { getSectionPixelTokens } from "@/components/organisms/sections/pixel-tokens";
import { ScheduleSectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";
import { Locale } from "@/config/locales";
import { LocalizedText } from "@/config/localized-text";
import { googleMapsDirectionsUrl } from "@/lib/google-maps-url";
import { useMemo } from "react";

/** In-page anchors for schedule polaroids and cards (stable across locales). */
export const SCHEDULE_ANCHOR = {
  ceremony: "schedule-ceremony",
  aperitivo: "schedule-aperitivo",
  dinner: "schedule-dinner",
  party: "schedule-party"
} as const;

function firstTranslatedVenue(locale: Locale, ...texts: LocalizedText[]): string {
  for (const lt of texts) {
    const s = translate(lt, locale).trim();
    if (s) return s;
  }
  return "";
}

function scheduleCard(
  key: string,
  cardId: string,
  title: string,
  venue: string,
  time: string,
  mapsDestination: string,
  uiText: { scheduleTimeLabel: string; scheduleLocationButton: string },
  sectionPixel: {
    CARD: string;
    TITLE: string;
    BODY: string;
    META_ROW: string;
    META_TEXT: string;
    LOCATION_BUTTON: string;
  }
) {
  const mapsHref = googleMapsDirectionsUrl(mapsDestination);
  return (
    <div key={key} id={cardId} className={`${sectionPixel.CARD} subcard-level-2 scroll-mt-[max(5rem,env(safe-area-inset-top,0px))]`}>
      <p className={`${sectionPixel.TITLE} subcard-title`} style={{ color: "var(--theme-primary)" }}>
        {title}
      </p>
      <p className={`${sectionPixel.BODY} subcard-body`}>{venue}</p>
      <div className={sectionPixel.META_ROW}>
        <span className={sectionPixel.META_TEXT}>
          {uiText.scheduleTimeLabel}: {time}
        </span>
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={sectionPixel.LOCATION_BUTTON}
        >
          {uiText.scheduleLocationButton}
        </a>
      </div>
    </div>
  );
}

export function ScheduleSection({ details, props, locale, cadencePreset, theme }: ScheduleSectionProps) {
  const uiText = getSectionUiText(locale);
  const SECTION_PIXEL_TOKENS = useMemo(() => getSectionPixelTokens(cadencePreset), [cadencePreset]);
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");
  const S = SECTION_PIXEL_TOKENS.SCHEDULE;

  if (isAmorea) {
    const mapsCeremony = firstTranslatedVenue(locale, details.ceremonyVenue, details.venueName);
    const mapsAperitivo = firstTranslatedVenue(locale, details.aperitivoVenue, details.dinnerVenue, details.venueName);
    const mapsDinner = firstTranslatedVenue(locale, details.dinnerVenue, details.venueName);
    const mapsParty = firstTranslatedVenue(locale, details.partyVenue, details.venueName);

    const polaroids: { id: string; label: string; icon: string; anchorId: string }[] = [
      { id: "c", label: translate(props.ceremonyLabel, locale), icon: "🕊️", anchorId: SCHEDULE_ANCHOR.ceremony },
      ...(props.showAperitivoRow
        ? [
            {
              id: "a",
              label: translate(props.aperitivoLabel, locale),
              icon: "🍸",
              anchorId: SCHEDULE_ANCHOR.aperitivo
            }
          ]
        : []),
      { id: "d", label: translate(props.dinnerLabel, locale), icon: "🍽️", anchorId: SCHEDULE_ANCHOR.dinner },
      ...(props.showPartyRow
        ? [{ id: "p", label: translate(props.partyLabel, locale), icon: "🎉", anchorId: SCHEDULE_ANCHOR.party }]
        : [])
    ];

    return (
      <SectionShell showHeading={false} title={uiText.scheduleTitle} cardClassName={theme.sectionCard}>
        <div className="amorea-schedule amorea-schedule--exact">
          <div className="amorea-polaroids">
            {polaroids.map((p, i) => (
              <a
                key={p.id}
                href={`#${p.anchorId}`}
                className={`amorea-polaroid subcard-level-2${i === 1 ? " amorea-polaroid--offset" : ""}`}
              >
                <div className="amorea-polaroid-image">{p.icon}</div>
                <p className="amorea-polaroid-label subcard-title">{p.label}</p>
              </a>
            ))}
          </div>

          <div id={SCHEDULE_ANCHOR.ceremony} className="amorea-schedule-card subcard-level-2">
            <p className="amorea-schedule-card-title subcard-title">{translate(props.ceremonyLabel, locale)}</p>
            <p className="amorea-schedule-card-venue subcard-body">{translate(details.ceremonyVenue, locale)}</p>
            <a
              href={googleMapsDirectionsUrl(mapsCeremony)}
              target="_blank"
              rel="noopener noreferrer"
              className="amorea-schedule-location-btn"
            >
              {uiText.scheduleLocationButton}
            </a>
            <p className="amorea-schedule-card-time subcard-body">
              {uiText.scheduleTimeLabel}: {details.ceremonyTime}
            </p>
          </div>

          {props.showAperitivoRow ? (
            <div id={SCHEDULE_ANCHOR.aperitivo} className="amorea-schedule-card subcard-level-2">
              <p className="amorea-schedule-card-title subcard-title">{translate(props.aperitivoLabel, locale)}</p>
              <p className="amorea-schedule-card-venue subcard-body">{translate(details.aperitivoVenue, locale)}</p>
              <a
                href={googleMapsDirectionsUrl(mapsAperitivo)}
                target="_blank"
                rel="noopener noreferrer"
                className="amorea-schedule-location-btn"
              >
                {uiText.scheduleLocationButton}
              </a>
              <p className="amorea-schedule-card-time subcard-body">
                {uiText.scheduleTimeLabel}: {details.aperitivoTime}
              </p>
            </div>
          ) : null}

          <div id={SCHEDULE_ANCHOR.dinner} className="amorea-schedule-card subcard-level-2">
            <p className="amorea-schedule-card-title subcard-title">{translate(props.dinnerLabel, locale)}</p>
            <p className="amorea-schedule-card-venue subcard-body">{translate(details.dinnerVenue, locale)}</p>
            <a
              href={googleMapsDirectionsUrl(mapsDinner)}
              target="_blank"
              rel="noopener noreferrer"
              className="amorea-schedule-location-btn"
            >
              {uiText.scheduleLocationButton}
            </a>
            <p className="amorea-schedule-card-time subcard-body">
              {uiText.scheduleTimeLabel}: {details.dinnerTime}
            </p>
          </div>

          {props.showPartyRow ? (
            <div id={SCHEDULE_ANCHOR.party} className="amorea-schedule-card subcard-level-2">
              <p className="amorea-schedule-card-title subcard-title">{translate(props.partyLabel, locale)}</p>
              <p className="amorea-schedule-card-venue subcard-body">{translate(details.partyVenue, locale)}</p>
              <a
                href={googleMapsDirectionsUrl(mapsParty)}
                target="_blank"
                rel="noopener noreferrer"
                className="amorea-schedule-location-btn"
              >
                {uiText.scheduleLocationButton}
              </a>
              <p className="amorea-schedule-card-time subcard-body">
                {uiText.scheduleTimeLabel}: {details.partyTime}
              </p>
            </div>
          ) : null}
        </div>
      </SectionShell>
    );
  }

  const defaultCeremonyMaps = firstTranslatedVenue(locale, details.ceremonyVenue, details.venueName);
  const defaultAperitivoMaps = firstTranslatedVenue(locale, details.aperitivoVenue, details.dinnerVenue, details.venueName);
  const defaultDinnerMaps = firstTranslatedVenue(locale, details.dinnerVenue, details.venueName);
  const defaultPartyMaps = firstTranslatedVenue(locale, details.partyVenue, details.venueName);

  return (
    <SectionShell title={uiText.scheduleTitle} cardClassName={theme.sectionCard}>
      <div className={`amorea-schedule ${S.WRAP}`}>
        {scheduleCard(
          "ceremony",
          SCHEDULE_ANCHOR.ceremony,
          translate(props.ceremonyLabel, locale),
          translate(details.ceremonyVenue, locale),
          details.ceremonyTime,
          defaultCeremonyMaps,
          uiText,
          S
        )}
        {props.showAperitivoRow
          ? scheduleCard(
              "aperitivo",
              SCHEDULE_ANCHOR.aperitivo,
              translate(props.aperitivoLabel, locale),
              translate(details.aperitivoVenue, locale),
              details.aperitivoTime,
              defaultAperitivoMaps,
              uiText,
              S
            )
          : null}
        {scheduleCard(
          "dinner",
          SCHEDULE_ANCHOR.dinner,
          translate(props.dinnerLabel, locale),
          translate(details.dinnerVenue, locale),
          details.dinnerTime,
          defaultDinnerMaps,
          uiText,
          S
        )}
        {props.showPartyRow
          ? scheduleCard(
              "party",
              SCHEDULE_ANCHOR.party,
              translate(props.partyLabel, locale),
              translate(details.partyVenue, locale),
              details.partyTime,
              defaultPartyMaps,
              uiText,
              S
            )
          : null}
      </div>
    </SectionShell>
  );
}
