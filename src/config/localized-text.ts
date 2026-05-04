import { defaultLocale, locales } from "@/config/locales";
import { z } from "zod";

export type LocalizedText = Record<string, string>;

type LocalizedTextSeed = Partial<Record<string, string>>;

function getFallbackValue(seed: LocalizedTextSeed, localeCodes: readonly string[]): string {
  const preferred = seed[defaultLocale];
  if (typeof preferred === "string" && preferred.length > 0) {
    return preferred;
  }

  for (const locale of localeCodes) {
    const value = seed[locale];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return "";
}

export function createLocalizedText(seed: string | LocalizedTextSeed, localeCodes: readonly string[] = locales): LocalizedText {
  if (typeof seed === "string") {
    return Object.fromEntries(localeCodes.map((locale) => [locale, seed]));
  }

  const fallback = getFallbackValue(seed, localeCodes);
  return Object.fromEntries(
    localeCodes.map((locale) => {
      const value = seed[locale];
      return [locale, typeof value === "string" ? value : fallback];
    })
  );
}

export function normalizeLocalizedText(
  value: unknown,
  fallback: LocalizedText,
  localeCodes: readonly string[] = locales
): LocalizedText {
  if (typeof value === "string") {
    return createLocalizedText(value, localeCodes);
  }

  if (typeof value !== "object" || value === null) {
    return fallback;
  }

  const record = value as Partial<Record<string, unknown>>;
  const seed: LocalizedTextSeed = {};
  for (const locale of localeCodes) {
    const candidate = record[locale];
    if (typeof candidate === "string" && candidate.length > 0) {
      seed[locale] = candidate;
    }
  }

  return createLocalizedText({ ...fallback, ...seed });
}

/**
 * Like {@link normalizeLocalizedText}, but keeps explicit `""` per locale (optional copy).
 * Unknown/missing keys still inherit from `fallback`.
 */
export function normalizeLocalizedTextAllowEmpty(
  value: unknown,
  fallback: LocalizedText,
  localeCodes: readonly string[] = locales
): LocalizedText {
  if (typeof value === "string") {
    return createLocalizedText(value, localeCodes);
  }
  if (typeof value !== "object" || value === null) {
    return { ...fallback };
  }
  const record = value as Partial<Record<string, unknown>>;
  const next: LocalizedText = { ...fallback };
  for (const locale of localeCodes) {
    const candidate = record[locale];
    if (typeof candidate === "string") {
      next[locale] = candidate;
    }
  }
  return next;
}

/**
 * Only the active locale’s string (trimmed). No cross-locale fallback — use for optional per-locale UI.
 */
export function getLocalizedValueStrict(value: LocalizedText, locale: string): string {
  const raw = value[locale];
  if (typeof raw !== "string") {
    return "";
  }
  return raw.trim();
}

/**
 * Picks the best string for `locale`: first non-empty (after trim) in this order:
 * active locale → defaultLocale → each code in `locales` (deduped).
 * Empty or whitespace-only values are treated as missing so a single filled language
 * (e.g. only `es`) still shows on `/en` when other locales were never set.
 */
export function getLocalizedValue(
  value: LocalizedText,
  locale: string,
  fallbackLocale: string = defaultLocale,
  localeCodes: readonly string[] = locales
): string {
  const pick = (code: string): string | undefined => {
    const raw = value[code];
    if (typeof raw !== "string") return undefined;
    const t = raw.trim();
    return t.length > 0 ? t : undefined;
  };

  const seen = new Set<string>();
  const order: string[] = [];
  for (const code of [locale, fallbackLocale, ...localeCodes]) {
    if (!seen.has(code)) {
      seen.add(code);
      order.push(code);
    }
  }

  for (const code of order) {
    const p = pick(code);
    if (p !== undefined) return p;
  }

  return "";
}

export const localizedTextSchema = z
  .record(z.string().regex(/^[a-z]{2}(-[a-z0-9]+)?$/i), z.string().min(1))
  .refine((value) => Object.keys(value).length > 0, "at least one locale value is required");

/** Same keys as localized text, but values may be empty (optional copy per locale). */
export const localizedTextOptionalSchema = z
  .record(z.string().regex(/^[a-z]{2}(-[a-z0-9]+)?$/i), z.string())
  .refine((value) => Object.keys(value).length > 0, "at least one locale value is required");
