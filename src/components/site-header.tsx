import type { HeaderEffect } from "@/config/header-effect";
import { SiteHeaderParallaxBg } from "@/components/site-header-parallax-bg";
import type { CSSProperties } from "react";

/** Same blues as `.amorea-closing` for consistency across templates. */
const HEADER_FALLBACK_GRADIENT = "linear-gradient(160deg, #4a6da7, #2a3f5e)";

type SiteHeaderProps = {
  brideName: string;
  groomName: string;
  headerImageUrl: string;
  effect: HeaderEffect;
};

export function SiteHeader({ brideName, groomName, headerImageUrl, effect }: SiteHeaderProps) {
  const src = headerImageUrl.trim();
  const hasImage = src.length > 0;
  const useParallaxLayer = effect === "parallax" && hasImage;
  const useKenBurns = effect === "kenBurns" && hasImage;
  const useAurora = effect === "aurora" && !hasImage;
  const frostedOverlay = effect === "frosted";

  const rootClass = [
    "site-header",
    hasImage && "site-header--has-image",
    `site-header--${effect}`
  ]
    .filter(Boolean)
    .join(" ");

  const gradientStyle: CSSProperties | undefined =
    !hasImage && !useAurora ? { background: HEADER_FALLBACK_GRADIENT } : undefined;

  return (
    <header className={rootClass} style={gradientStyle} role="banner">
      {useParallaxLayer ? <SiteHeaderParallaxBg imageSrc={src} /> : null}

      {hasImage && !useParallaxLayer ? (
        <div
          className={["site-header__img-slot", useKenBurns ? "site-header__img-slot--ken" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <img className="site-header__photo" src={src} alt="" decoding="async" />
        </div>
      ) : null}

      {useAurora ? <div className="site-header__aurora" aria-hidden /> : null}

      {hasImage || (!hasImage && frostedOverlay) || useAurora ? (
        <div
          className={["site-header__overlay", frostedOverlay ? "site-header__overlay--frosted" : ""]
            .filter(Boolean)
            .join(" ")}
          aria-hidden
        />
      ) : null}

      <div className="site-header__inner">
        <p className="site-header__names">
          <span className="site-header__name">{brideName}</span>
          <span className="site-header__amp" aria-hidden>
            {" "}
            &amp;{" "}
          </span>
          <span className="site-header__name">{groomName}</span>
        </p>
      </div>
    </header>
  );
}
