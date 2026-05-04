import { describe, expect, test } from "vitest";
import { getSectionUiText } from "@/components/organisms/sections/ui-text";

describe("sections ui text", () => {
  test("returns localized strings for known locale", () => {
    const roText = getSectionUiText("ro");
    expect(roText.countdownTitle).toBe("Numaratoare inversa");
    expect(roText.scheduleTitle).toBe("Program");
  });

  test("falls back to english for unknown locale", () => {
    const fallback = getSectionUiText("it");
    expect(fallback.countdownTitle).toBe("Countdown");
    expect(fallback.scheduleLocationButton).toBe("Location");
  });
});
