import { describe, expect, test } from "vitest";
import { DEFAULT_CADENCE_PRESET, isCadencePreset, resolveCadencePreset } from "@/themes/cadence";
import { getSectionPixelTokens } from "@/components/organisms/sections/pixel-tokens";

describe("cadence presets", () => {
  test("validates and resolves cadence preset values", () => {
    expect(isCadencePreset("mobile-tight")).toBe(true);
    expect(isCadencePreset("desktop-editorial")).toBe(true);
    expect(isCadencePreset("unknown")).toBe(false);
    expect(resolveCadencePreset("unknown")).toBe(DEFAULT_CADENCE_PRESET);
  });

  test("returns distinct hero shell tokens by preset", () => {
    const tight = getSectionPixelTokens("mobile-tight");
    const balanced = getSectionPixelTokens("mobile-balanced");
    const editorial = getSectionPixelTokens("desktop-editorial");

    expect(tight.HERO.SHELL).not.toBe(balanced.HERO.SHELL);
    expect(editorial.HERO.SHELL).not.toBe(balanced.HERO.SHELL);
  });
});
