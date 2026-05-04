"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { translate } from "@/components/organisms/sections/helpers";
import { StorySectionProps } from "@/components/organisms/sections/types";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";

export function StorySection({ props, locale, theme }: StorySectionProps) {
  const uiText = getSectionUiText(locale);
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");

  return (
    <SectionShell showHeading={!isAmorea} title={translate(props.title, locale)} cardClassName={theme.sectionCard}>
      <p>{uiText.storyPlaceholder}</p>
    </SectionShell>
  );
}
