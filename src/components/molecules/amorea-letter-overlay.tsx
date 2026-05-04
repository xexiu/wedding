"use client";

import { Locale } from "@/config/locales";
import { WeddingDetails } from "@/config/wedding-details";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";

type AmoreaLetterOverlayProps = {
  details: WeddingDetails;
  locale: Locale;
  onClose: () => void;
};

export function AmoreaLetterOverlay({ details, locale, onClose }: AmoreaLetterOverlayProps) {
  const uiText = getSectionUiText(locale);

  return (
    <div className="amorea-letter-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="amorea-letter-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="amorea-letter-close" onClick={onClose}>
          ×
        </button>
        <div className="amorea-letter-flap">
          <div className="amorea-letter-toile" />
        </div>
        <div className="amorea-letter-body">
          <div className="amorea-letter-flowers" aria-hidden>
            🌸🌿
          </div>
          <div className="amorea-letter-frame">
            <p className="amorea-letter-pretitle">{uiText.amoreaLetterPretitle}</p>
            <div className="amorea-letter-couple">
              {details.brideName}
              <br />
              <em>&amp;</em>
              <br />
              {details.groomName}
            </div>
            <div className="amorea-letter-divider" />
            <span className="amorea-letter-date">{details.weddingDate} &nbsp;</span>
            <span className="amorea-letter-venue">{details.venueName[locale] ?? details.venueName.en}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
