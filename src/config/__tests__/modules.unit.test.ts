import { defaultModuleProps, getVisibleModuleOrder, normalizeModuleProps } from "@/config/modules";
import { describe, expect, test } from "vitest";

describe("modules config", () => {
  test("getVisibleModuleOrder returns enabled modules in order", () => {
    expect(getVisibleModuleOrder()).toContain("heroCarousel");
  });

  test("normalizeModuleProps returns defaults for invalid input", () => {
    expect(normalizeModuleProps(null)).toEqual(defaultModuleProps);
  });

  test("normalizeModuleProps keeps valid values", () => {
    const normalized = normalizeModuleProps({
      heroCarousel: { ...defaultModuleProps.heroCarousel, autoplayMs: 3210, showDots: false },
      ourStory: { title: { en: "Story", es: "Historia", ro: "Poveste" } },
      schedule: { ...defaultModuleProps.schedule, showPartyRow: false },
      photoMosaic: { columns: 4 },
      faq: defaultModuleProps.faq,
      rsvp: defaultModuleProps.rsvp
    });

    expect(normalized.heroCarousel.autoplayMs).toBe(3210);
    expect(normalized.heroCarousel.showDots).toBe(false);
    expect(normalized.countdown).toEqual({});
    expect(normalized.photoMosaic.columns).toBe(4);
  });
});
