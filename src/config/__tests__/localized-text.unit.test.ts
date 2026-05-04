import {
  createLocalizedText,
  getLocalizedValue,
  getLocalizedValueStrict,
  localizedTextSchema,
  normalizeLocalizedText,
  normalizeLocalizedTextAllowEmpty,
  type LocalizedText
} from "@/config/localized-text";
import { defaultLocale, locales } from "@/config/locales";
import { describe, expect, test } from "vitest";

describe("localized-text", () => {
  test("createLocalizedText maps string to all locales", () => {
    const value = createLocalizedText("hello");
    for (const locale of locales) {
      expect(value[locale]).toBe("hello");
    }
  });

  test("createLocalizedText falls back to default locale", () => {
    const value = createLocalizedText({ [defaultLocale]: "base" });
    for (const locale of locales) {
      expect(value[locale]).toBe("base");
    }
  });

  test("normalizeLocalizedText uses fallback for invalid values", () => {
    const fallback = createLocalizedText("fallback");
    expect(normalizeLocalizedText(null, fallback)).toEqual(fallback);
  });

  test("normalizeLocalizedText preserves known locale values", () => {
    const fallback = createLocalizedText("fallback");
    const value = normalizeLocalizedText({ en: "Hello", es: "Hola" }, fallback);
    expect(value.en).toBe("Hello");
    expect(value.es).toBe("Hola");
  });

  test("localizedTextSchema validates all locale keys", () => {
    const parsed = localizedTextSchema.parse(createLocalizedText("ok"));
    expect(parsed).toEqual(createLocalizedText("ok"));
  });

  test("getLocalizedValue skips blank strings and falls back across locales", () => {
    const value = createLocalizedText({ en: "   ", es: "Hola", ro: "" });
    expect(getLocalizedValue(value, "en")).toBe("Hola");
    expect(getLocalizedValue(value, "es")).toBe("Hola");
  });

  test("getLocalizedValue prefers the active locale when set", () => {
    const value = createLocalizedText({ en: "Hi", es: "Hola", ro: "Salut" });
    expect(getLocalizedValue(value, "en")).toBe("Hi");
    expect(getLocalizedValue(value, "es")).toBe("Hola");
  });

  test("normalizeLocalizedTextAllowEmpty keeps explicit empty strings", () => {
    const fallback = createLocalizedText("default");
    const value = normalizeLocalizedTextAllowEmpty({ en: "A", es: "" }, fallback);
    expect(value.en).toBe("A");
    expect(value.es).toBe("");
  });

  test("getLocalizedValueStrict does not fall back to other locales", () => {
    const value: LocalizedText = { en: "Only EN", es: "   ", ro: "" };
    expect(getLocalizedValueStrict(value, "en")).toBe("Only EN");
    expect(getLocalizedValueStrict(value, "es")).toBe("");
    expect(getLocalizedValueStrict(value, "ro")).toBe("");
  });
});
