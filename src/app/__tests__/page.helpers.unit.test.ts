import { buildThemeCssVars, getVisibleModuleOrder, isModuleEnabled } from "@/app/[locale]/page.helpers";
import { describe, expect, test } from "vitest";

describe("page helpers", () => {
  test("filters module order by enabled flags", () => {
    const order = getVisibleModuleOrder(
      [
        { id: "heroCarousel", enabled: true },
        { id: "countdown", enabled: false },
        { id: "faq", enabled: true }
      ],
      ["heroCarousel", "countdown", "faq"]
    );

    expect(order).toEqual(["heroCarousel", "faq"]);
  });

  test("maps theme values to css variables", () => {
    const vars = buildThemeCssVars({
      primary: "#111111",
      secondary: "#222222",
      accent: "#333333",
      surface: "#444444",
      text: "#555555",
      buttonBg: "#666666",
      buttonText: "#777777",
      buttonRadius: 10
    });

    expect(vars).toMatchObject({
      "--theme-primary": "#111111",
      "--theme-button-radius": "10px"
    });
  });

  test("returns false when module is disabled", () => {
    const enabled = isModuleEnabled(
      [
        { id: "heroCarousel", enabled: false },
        { id: "countdown", enabled: true }
      ],
      "heroCarousel"
    );

    expect(enabled).toBe(false);
  });

  test("excludes each module when disabled", () => {
    const allIds = [
      "heroCarousel",
      "envelope",
      "poem",
      "ourSong",
      "countdown",
      "dressCode",
      "gifts",
      "ourStory",
      "schedule",
      "photoMosaic",
      "faq",
      "rsvp"
    ] as const;

    for (const disabledId of allIds) {
      const flags = allIds.map((id) => ({ id, enabled: id !== disabledId }));
      const order = getVisibleModuleOrder(flags, [...allIds]);
      expect(order).not.toContain(disabledId);
    }
  });
});
