export const supportedLocales = ["en", "es", "ro"] as const;

export const locales = supportedLocales;

export type Locale = string;

export const defaultLocale = "en";

export function isLocale(value: string, candidates: readonly string[] = supportedLocales): value is Locale {
  return candidates.includes(value);
}
