"use client";

import { LocaleCode } from "@/components/admin-modules/types";
import { createLocalizedText, LocalizedText, normalizeLocalizedText } from "@/config/localized-text";
import { defaultLocale, isLocale, locales } from "@/config/locales";

export function resolveInitialLocale(locale: string, localeOptions: readonly string[] = locales): LocaleCode {
  if (isLocale(locale, localeOptions)) {
    return locale;
  }

  return defaultLocale;
}

export function emptyLocalizedText(): LocalizedText {
  return createLocalizedText("");
}

export function toLocalizedRecord(value: unknown): LocalizedText {
  return normalizeLocalizedText(value, emptyLocalizedText());
}
