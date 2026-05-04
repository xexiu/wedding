"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { PhotoMosaicSectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";

export function PhotoMosaicSection({ props, locale, theme }: PhotoMosaicSectionProps) {
  const uiText = getSectionUiText(locale);
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");

  return (
    <SectionShell showHeading={!isAmorea} title={uiText.photoMosaicTitle} cardClassName={theme.sectionCard}>
      <p>
        {uiText.photoMosaicPlaceholder} {props.columns}.
      </p>
    </SectionShell>
  );
}
