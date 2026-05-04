"use client";

import { AmoreaContentOverlay } from "@/components/molecules/amorea-content-overlay";
import { SectionShell } from "@/components/atoms/section-shell";
import { translate } from "@/components/organisms/sections/helpers";
import { GiftsSectionProps } from "@/components/organisms/sections/types";
import { getLocalizedValueStrict } from "@/config/localized-text";
import { useState } from "react";

function GiftBadgeTitle({ word }: { word: string }) {
  const trimmed = word.trim();
  if (!trimmed) {
    return null;
  }
  const first = trimmed[0] ?? "";
  const rest = trimmed.slice(1);
  return (
    <span className="amorea-gifts-badge-title">
      <span className="amorea-gifts-badge-first">{first}</span>
      {rest ? <span className="amorea-gifts-badge-rest">{rest}</span> : null}
    </span>
  );
}

export function GiftsSection({ props, locale, theme }: GiftsSectionProps) {
  const isAmorea = theme.sectionCard.includes("invitation-amorea-section");
  const [modalOpen, setModalOpen] = useState(false);

  const badgeWord = translate(props.title, locale);
  const messageAboveBadge = getLocalizedValueStrict(props.message, locale);
  const modalTitle = translate(props.modalTitle, locale);
  const modalSubtitle = translate(props.modalSubtitle, locale);
  const modalBody = translate(props.modalBody, locale);
  const openLabel = translate(props.modalOpenButtonLabel, locale);

  const giftsKicker = (
    <div className="amorea-gifts-kicker" aria-hidden>
      <span className="amorea-gifts-kicker-icon">👰🏻‍♀️</span>
      <span className="amorea-gifts-kicker-icon">🤵🏻</span>
    </div>
  );

  const giftsBadgeLabel =
    [badgeWord, openLabel].filter((s) => s.trim().length > 0).join(". ") ||
    openLabel ||
    badgeWord;

  const giftsBadge = (
    <button
      type="button"
      className="amorea-gifts-badge amorea-gifts-badge--exact mx-auto"
      onClick={() => setModalOpen(true)}
      aria-label={giftsBadgeLabel}
    >
      <GiftBadgeTitle word={badgeWord} />
      <span className="amorea-gifts-modal-hint">{openLabel}</span>
    </button>
  );

  const giftsBadgeCompact = (
    <button
      type="button"
      className="amorea-gifts-badge amorea-gifts-badge--compact mx-auto"
      onClick={() => setModalOpen(true)}
      aria-label={giftsBadgeLabel}
    >
      <GiftBadgeTitle word={badgeWord} />
      <span className="amorea-gifts-modal-hint">{openLabel}</span>
    </button>
  );

  const overlay =
    modalOpen ? (
      <AmoreaContentOverlay
        title={modalTitle}
        subtitle={modalSubtitle}
        body={modalBody}
        onClose={() => setModalOpen(false)}
      />
    ) : null;

  if (isAmorea) {
    return (
      <>
        <SectionShell showHeading={false} title={badgeWord} cardClassName={theme.sectionCard}>
          <div className="amorea-gifts amorea-gifts--exact text-center">
            {giftsKicker}
            {messageAboveBadge ? (
              <p className="amorea-gifts-message mx-auto max-w-sm">{messageAboveBadge}</p>
            ) : null}
            {giftsBadge}
          </div>
        </SectionShell>
        {overlay}
      </>
    );
  }

  return (
    <>
      <SectionShell title={badgeWord} cardClassName={theme.sectionCard}>
        <div className="amorea-gifts text-center">
          {giftsKicker}
          {messageAboveBadge ? (
            <p className="amorea-gifts-message mx-auto max-w-sm">{messageAboveBadge}</p>
          ) : null}
          {giftsBadgeCompact}
        </div>
      </SectionShell>
      {overlay}
    </>
  );
}
