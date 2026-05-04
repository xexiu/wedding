import { APP_SHELL_TEXT } from "@/config/app-shell-text";
import { CardSurface } from "@/components/atoms/card-surface";
import { Locale } from "@/config/locales";
import { getLocalizedValue } from "@/config/localized-text";
import { WeddingDetails } from "@/config/wedding-details";

type HomeHeroSummaryProps = {
  details: WeddingDetails;
  locale: Locale;
  heroCardClassName: string;
};

export function HomeHeroSummary({ details, locale, heroCardClassName }: HomeHeroSummaryProps) {
  return (
    <CardSurface
      as="section"
      className={`home-hero-summary mx-auto w-full max-w-5xl rounded-2xl p-4 text-center shadow-sm sm:rounded-3xl sm:p-6 ${heroCardClassName}`}
    >
      <h1 className="home-hero-summary__names font-script text-3xl font-bold sm:text-4xl" style={{ color: "var(--theme-primary)" }}>
        {details.brideName}
        {APP_SHELL_TEXT.HERO_NAMES_SEPARATOR}
        {details.groomName}
      </h1>
      <p className="home-hero-summary__meta mt-2 text-sm sm:text-base" style={{ color: "var(--theme-text)" }}>
        {getLocalizedValue(details.eventSubtitle, locale)}
        {APP_SHELL_TEXT.HERO_META_SEPARATOR}
        {details.weddingDate}
        {APP_SHELL_TEXT.HERO_META_SEPARATOR}
        {getLocalizedValue(details.venueName, locale)}
      </p>
    </CardSurface>
  );
}
