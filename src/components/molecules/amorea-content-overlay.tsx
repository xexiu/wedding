"use client";

import { useEffect } from "react";

type AmoreaContentOverlayProps = {
  title: string;
  subtitle: string;
  body: string;
  onClose: () => void;
};

/** Same shell as the invitation letter modal (overlay + card + close). Content is free-form for gifts / info. */
export function AmoreaContentOverlay({ title, subtitle, body, onClose }: AmoreaContentOverlayProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const subtitleTrim = subtitle.trim();
  const bodyTrim = body.trim();

  return (
    <div className="amorea-letter-overlay" role="dialog" aria-modal="true" aria-labelledby="amorea-content-overlay-title" onClick={onClose}>
      <div className="amorea-letter-card" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="amorea-letter-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="amorea-letter-flap">
          <div className="amorea-letter-toile" />
        </div>
        <div className="amorea-letter-body">
          <div className="amorea-letter-flowers" aria-hidden>
            🌸🌿
          </div>
          <div className="amorea-letter-frame amorea-content-overlay-frame">
            <h2 id="amorea-content-overlay-title" className="amorea-content-overlay-title">
              {title}
            </h2>
            {subtitleTrim ? <p className="amorea-content-overlay-subtitle">{subtitleTrim}</p> : null}
            {bodyTrim ? (
              <p className="amorea-letter-message amorea-content-overlay-body">{bodyTrim}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
