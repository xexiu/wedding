"use client";

import { SectionShell } from "@/components/atoms/section-shell";
import { translate } from "@/components/organisms/sections/helpers";
import { DressCodeSectionProps } from "@/components/organisms/sections/types";

export function DressCodeSection({ props, locale, theme }: DressCodeSectionProps) {
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");

  if (isAmorea) {
    return (
      <SectionShell showHeading={false} title={translate(props.title, locale)} cardClassName={theme.sectionCard}>
        <div className="amorea-dresscode amorea-dresscode--exact text-center">
          <div className="amorea-dresscode-badge">
            <span className="amorea-dresscode-text-d">D</span>
            <div className="amorea-dresscode-text-rest">
              RESS
              <br />
              CODE
            </div>
          </div>
          <p className="amorea-dresscode-text amorea-dresscode-desc">{translate(props.description, locale)}</p>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell title={translate(props.title, locale)} cardClassName={theme.sectionCard}>
      <div className="amorea-dresscode text-center">
        <div className="amorea-dresscode-badge mx-auto mb-3 flex h-14 w-36 items-center justify-center rounded-md">
          <span className="amorea-dresscode-badge-label">Dress Code</span>
        </div>
        <p className="amorea-dresscode-text mx-auto max-w-xs">{translate(props.description, locale)}</p>
        <div className="mx-auto mt-4 flex w-20 items-end justify-center gap-5 text-4xl text-slate-500">
          <span aria-hidden="true">♀</span>
          <span aria-hidden="true">♂</span>
        </div>
      </div>
    </SectionShell>
  );
}
