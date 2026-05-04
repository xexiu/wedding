import {
  createInheritedThemeTokens,
  DEFAULT_THEME_TOKEN_VALUES,
  isHexColor,
  normalizeButtonRadius,
  normalizeThemeTokens,
  resolveThemeTokenValues
} from "@/themes/theme-tokens";
import { describe, expect, test } from "vitest";

describe("theme-tokens", () => {
  test("isHexColor validates hex values", () => {
    expect(isHexColor("#abcdef")).toBe(true);
    expect(isHexColor("blue")).toBe(false);
  });

  test("normalizeButtonRadius clamps values", () => {
    expect(normalizeButtonRadius(-2, 10)).toBe(0);
    expect(normalizeButtonRadius(99, 10)).toBe(28);
    expect(normalizeButtonRadius("x", 10)).toBe(10);
  });

  test("normalizeThemeTokens applies fallbacks", () => {
    const normalized = normalizeThemeTokens({}, DEFAULT_THEME_TOKEN_VALUES);
    expect(normalized.primary.value).toBe(DEFAULT_THEME_TOKEN_VALUES.primary);
    expect(normalized.buttonRadius.value).toBe(DEFAULT_THEME_TOKEN_VALUES.buttonRadius);
  });

  test("resolveThemeTokenValues respects inherit flags", () => {
    const tokens = createInheritedThemeTokens(DEFAULT_THEME_TOKEN_VALUES);
    tokens.primary = { inherit: false, value: "#000000" };
    const resolved = resolveThemeTokenValues(tokens, DEFAULT_THEME_TOKEN_VALUES);
    expect(resolved.primary).toBe("#000000");
    expect(resolved.secondary).toBe(DEFAULT_THEME_TOKEN_VALUES.secondary);
  });
});
