import { describe, expect, test } from "vitest";

import {
  emptyLocalizedText,
  resolveInitialLocale,
  toLocalizedRecord
} from "@/components/admin-modules/helpers";
import { defaultLocale, locales } from "@/config/locales";

const emptyRecord = Object.fromEntries(locales.map((locale) => [locale, ""]));

describe("admin-modules helpers", () => {
  test("resolveInitialLocale falls back to default locale", () => {
    for (const locale of locales) {
      expect(resolveInitialLocale(locale)).toBe(locale);
    }

    expect(resolveInitialLocale("fr")).toBe(defaultLocale);
  });

  test("emptyLocalizedText returns all locales", () => {
    expect(emptyLocalizedText()).toEqual(emptyRecord);
  });

  test("toLocalizedRecord normalizes invalid input", () => {
    expect(toLocalizedRecord(null)).toEqual(emptyRecord);
    expect(toLocalizedRecord("test")).toEqual(
      Object.fromEntries(locales.map((locale) => [locale, "test"]))
    );
  });

  test("toLocalizedRecord preserves existing localized fields", () => {
    const localized = toLocalizedRecord({
      en: "hello",
      es: "hola"
    });
    expect(localized.en).toBe("hello");
    expect(localized.es).toBe("hola");
  });
});
