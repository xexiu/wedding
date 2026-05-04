import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/site-config-store", () => ({
  getSiteConfig: vi.fn(async () => ({
    templateId: "classic",
    moduleFlags: [],
    moduleOrder: [],
    weddingDetails: {
      brideName: "Ana",
      groomName: "Paul",
      headerImageUrl: "",
      headerEffect: "static",
      weddingDate: "2027-01-01",
      venueName: { en: "Venue X", es: "Lugar X", ro: "Loc X" },
      eventSubtitle: { en: "Subtitle", es: "Subtitulo", ro: "Subtitlu" },
      ceremonyTime: "16:00",
      dinnerTime: "19:00",
      rsvpDeadline: "2026-12-01",
      contactEmail: "a@b.com",
      contactPhone: "123",
      rsvpNameLabel: { en: "Name", es: "Nombre", ro: "Nume" },
      rsvpAttendingLabel: { en: "Attend", es: "Asiste", ro: "Particip" },
      rsvpDeclineLabel: { en: "Decline", es: "No asisto", ro: "Refuz" },
      rsvpDietaryLabel: { en: "Diet", es: "Dieta", ro: "Dieta" },
      rsvpPlusOneLabel: { en: "Plus one", es: "Acompanante", ro: "Insotitor" }
    },
    moduleProps: {
      heroCarousel: { autoplayMs: 5000, showDots: true },
      countdown: {},
      ourStory: { title: { en: "Story", es: "Historia", ro: "Poveste" } },
      schedule: { showAperitivoRow: false, showPartyRow: true },
      photoMosaic: { columns: 3 },
      faq: { title: { en: "FAQ", es: "Preguntas", ro: "Intrebari" } },
      rsvp: { title: { en: "RSVP", es: "Confirmacion", ro: "Confirmare" } }
    }
  }))
}));

import { answerFromKnowledge } from "@/lib/knowledge";

describe("knowledge matcher", () => {
  it("returns date from site config", async () => {
    await expect(answerFromKnowledge("what is the wedding date?")).resolves.toContain("2027-01-01");
  });

  it("returns fallback or yaml answer", async () => {
    await expect(answerFromKnowledge("unknown question xxx")).resolves.toBeTypeOf("string");
  });
});
