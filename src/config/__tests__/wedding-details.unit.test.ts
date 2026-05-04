import { defaultWeddingDetails, normalizeWeddingDetails } from "@/config/wedding-details";
import { describe, expect, test } from "vitest";

describe("wedding details", () => {
  test("normalizeWeddingDetails falls back to defaults", () => {
    const normalized = normalizeWeddingDetails({});
    expect(normalized.brideName).toBe(defaultWeddingDetails.brideName);
    expect(normalized.venueName.en).toBe(defaultWeddingDetails.venueName.en);
  });

  test("normalizeWeddingDetails keeps provided values", () => {
    const normalized = normalizeWeddingDetails({
      ...defaultWeddingDetails,
      brideName: "Test Bride",
      groomName: "Test Groom",
      headerImageUrl: "  /my-header.png  ",
      venueName: { en: "Venue", es: "Lugar", ro: "Loc" }
    });
    expect(normalized.brideName).toBe("Test Bride");
    expect(normalized.groomName).toBe("Test Groom");
    expect(normalized.headerImageUrl).toBe("/my-header.png");
    expect(normalized.headerEffect).toBe("static");
    expect(normalized.venueName.es).toBe("Lugar");
  });

  test("normalizeWeddingDetails falls back per-event venues to default venueName when omitted", () => {
    const normalized = normalizeWeddingDetails({
      venueName: { en: "Main Hall", es: "Salon", ro: "Sala" }
    });
    expect(normalized.ceremonyVenue.en).toBe("Main Hall");
    expect(normalized.dinnerVenue.en).toBe("Main Hall");
    expect(normalized.partyVenue.en).toBe("Main Hall");
  });

  test("normalizeWeddingDetails maps aperitivo venue to dinner venue when omitted", () => {
    const normalized = normalizeWeddingDetails({
      venueName: { en: "Default", es: "D", ro: "D" },
      dinnerVenue: { en: "Restaurant", es: "Restaurante", ro: "Restaurant" }
    });
    expect(normalized.aperitivoVenue.en).toBe("Restaurant");
    expect(normalized.aperitivoVenue.es).toBe("Restaurante");
  });

  test("normalizeWeddingDetails keeps distinct per-event venues", () => {
    const normalized = normalizeWeddingDetails({
      venueName: { en: "Default", es: "D", ro: "D" },
      ceremonyVenue: { en: "Church", es: "Iglesia", ro: "Biserica" },
      dinnerVenue: { en: "Restaurant", es: "Restaurante", ro: "Restaurant" },
      partyVenue: { en: "Club", es: "Club", ro: "Club" },
      partyTime: "22:30"
    });
    expect(normalized.ceremonyVenue.en).toBe("Church");
    expect(normalized.dinnerVenue.es).toBe("Restaurante");
    expect(normalized.partyVenue.ro).toBe("Club");
    expect(normalized.partyTime).toBe("22:30");
  });
});
