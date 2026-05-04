import { defaultLocale, Locale, locales } from "@/config/locales";
import { TemplateId } from "@/themes/templates";

export const PREFERENCE_KEYS = {
  LOCALE_COOKIE: "wedding_locale",
  LOCALE_STORAGE: "wedding.locale",
  THEME_PREVIEW_STORAGE: "wedding.themePreviewTemplateId",
  LIVE_CONFIG_UPDATED_AT: "wedding.liveConfigUpdatedAt",
  LIVE_DRAFT_CONFIG: "wedding.liveDraftConfig"
} as const;

export const PREFERENCE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function isTemplateIdPreference(value: string): value is TemplateId {
  return (
    value === "amorea-signature" ||
    value === "classic" ||
    value === "botanical-deluxe" ||
    value === "dark-luxury" ||
    value === "ivory-editorial"
  );
}

export function resolveLocaleFromAcceptLanguage(
  headerValue: string | null,
  supportedLocaleCodes: readonly string[] = locales
): Locale {
  if (!headerValue) {
    return defaultLocale;
  }

  const tags = headerValue
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean) as string[];

  for (const tag of tags) {
    const match = supportedLocaleCodes.find(
      (localeCode) => tag === localeCode || tag.startsWith(`${localeCode}-`) || localeCode.startsWith(`${tag}-`)
    );
    if (match) {
      return match;
    }
  }

  return supportedLocaleCodes[0] ?? defaultLocale;
}
