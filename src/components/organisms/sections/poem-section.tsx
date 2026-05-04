"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { translate } from "@/components/organisms/sections/helpers";
import { PoemSectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";

export function PoemSection({ props, locale, theme }: PoemSectionProps) {
  const uiText = getSectionUiText(locale);
  const title = translate(props.title, locale).trim();
  const subtitle = translate(props.subtitle, locale).trim();
  const body = translate(props.body, locale).trim();
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");

  if (!title && !body) {
    return null;
  }

  const shellTitle = title || uiText.poemFallbackTitle;

  return (
    <SectionShell showHeading={false} title={shellTitle} cardClassName={theme.sectionCard}>
      <div className={isAmorea ? "amorea-poem amorea-poem--exact" : "space-y-3 px-1 py-2"}>
        {title ? (
          <h2
            className={isAmorea ? "amorea-poem-title" : "text-center font-semibold"}
            style={{
              fontFamily: props.titleFontFamily,
              fontSize: `${props.titleFontSizePx}px`
            }}
          >
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p
            className={isAmorea ? "amorea-poem-subtitle" : "text-center opacity-90"}
            style={{
              fontFamily: props.subtitleFontFamily,
              fontSize: `${props.subtitleFontSizePx}px`
            }}
          >
            {subtitle}
          </p>
        ) : null}
        {body ? (
          <div
            className={isAmorea ? "amorea-poem-body" : "text-center leading-relaxed"}
            style={{
              fontFamily: props.bodyFontFamily,
              fontSize: `${props.bodyFontSizePx}px`,
              whiteSpace: "pre-wrap"
            }}
          >
            {body}
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
