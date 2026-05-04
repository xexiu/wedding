import { describe, expect, test } from "vitest";

import { applySlideTokens, getCountdownParts, translate } from "@/components/organisms/sections/helpers";
import { formatWeddingDateLabel } from "@/lib/format-wedding-date";

describe("sections helpers", () => {
  test("translate uses active locale", () => {
    const text = { en: "Hello", es: "Hola", ro: "Salut" };
    expect(translate(text, "es")).toBe("Hola");
  });

  test("applySlideTokens injects wedding details", () => {
    const result = applySlideTokens("{bride} & {groom} - {date}", {
      brideName: "Alexandra",
      groomName: "Matei",
      weddingDate: "2026-09-12"
    });

    expect(result).toBe("Alexandra & Matei - 2026-09-12");
  });

  test("getCountdownParts returns zeroed values for invalid date", () => {
    expect(getCountdownParts("invalid-date", Date.now())).toEqual({
      days: "000",
      hours: "00",
      minutes: "00"
    });
  });

  test("formatWeddingDateLabel maps locale and keeps invalid input as-is", () => {
    expect(formatWeddingDateLabel("2026-09-12", "en")).toMatch(/2026/);
    expect(formatWeddingDateLabel("2026-09-12", "es")).toBeTruthy();
    expect(formatWeddingDateLabel("not-a-date", "en")).toBe("not-a-date");
  });
});
