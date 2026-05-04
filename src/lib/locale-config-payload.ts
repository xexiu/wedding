import type { LocaleConfigItem } from "@/lib/locales-store";

function isValidLocaleCode(value: string): boolean {
  return /^[a-z]{2}(-[a-z0-9]+)?$/i.test(value);
}

/** Validates the `locales` array (from API body or full-site YAML). */
export function parseLocaleConfigItems(raw: unknown): LocaleConfigItem[] | null {
  if (!Array.isArray(raw)) {
    return null;
  }

  for (const locale of raw) {
    if (
      !locale ||
      typeof locale !== "object" ||
      typeof (locale as LocaleConfigItem).code !== "string" ||
      !isValidLocaleCode((locale as LocaleConfigItem).code) ||
      typeof (locale as LocaleConfigItem).name !== "string" ||
      typeof (locale as LocaleConfigItem).enabled !== "boolean" ||
      typeof (locale as LocaleConfigItem).isDefault !== "boolean" ||
      typeof (locale as LocaleConfigItem).messages !== "object" ||
      (locale as LocaleConfigItem).messages === null
    ) {
      return null;
    }
  }

  return raw as LocaleConfigItem[];
}

/** Validates `{ locales: [...] }` request bodies. */
export function parseLocaleConfigsPutBody(payload: unknown): LocaleConfigItem[] | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }
  const locales = (payload as { locales?: unknown }).locales;
  return parseLocaleConfigItems(locales);
}
