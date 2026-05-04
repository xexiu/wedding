import { describe, expect, it, vi } from "vitest";
import { defaultModuleProps } from "@/config/modules";
import { NextRequest } from "next/server";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn()
}));

vi.mock("@/lib/locales-store", async () => {
  const { defaultMessagesByLocale } = await import("@/config/admin-ui-text-bundles");
  return {
    getLocaleConfigs: vi.fn(async () => [
      {
        code: "en",
        name: "EN",
        enabled: true,
        isDefault: true,
        messages: defaultMessagesByLocale("en")
      }
    ]),
    saveLocaleConfigs: vi.fn(async <T,>(x: T) => x)
  };
});

vi.mock("@/lib/site-config-store", () => ({
  getSiteConfig: vi.fn(async () => ({
    templateId: "classic",
    cadencePreset: "mobile-balanced",
    themeTokens: {
      primary: { inherit: true, value: "#be123c" },
      secondary: { inherit: true, value: "#f9a8d4" },
      accent: { inherit: true, value: "#f97316" },
      surface: { inherit: true, value: "#ffffff" },
      text: { inherit: true, value: "#4a1d2a" },
      buttonBg: { inherit: true, value: "#be123c" },
      buttonText: { inherit: true, value: "#ffffff" },
      buttonRadius: { inherit: true, value: 10 }
    },
    moduleFlags: [{ id: "heroCarousel", enabled: true }],
    moduleOrder: ["heroCarousel"],
    weddingDetails: {
      brideName: "A",
      groomName: "B",
      headerImageUrl: "",
      headerEffect: "static",
      weddingDate: "2026-01-01",
      venueName: { en: "X", es: "X", ro: "X" },
      eventSubtitle: { en: "S", es: "S", ro: "S" },
      ceremonyTime: "16:00",
      dinnerTime: "19:00",
      rsvpDeadline: "2025-12-01",
      contactEmail: "x@y.com",
      contactPhone: "123",
      rsvpNameLabel: { en: "Name", es: "Nombre", ro: "Nume" },
      rsvpAttendingLabel: { en: "Attend", es: "Asiste", ro: "Particip" },
      rsvpDeclineLabel: { en: "Decline", es: "No", ro: "Nu" },
      rsvpDietaryLabel: { en: "Diet", es: "Dieta", ro: "Dieta" },
      rsvpPlusOneLabel: { en: "Plus", es: "Plus", ro: "Plus" }
    },
    moduleProps: {
      heroCarousel: defaultModuleProps.heroCarousel,
      countdown: {},
      ourStory: { title: { en: "Our Story", es: "Nuestra Historia", ro: "Povestea Noastra" } },
      schedule: defaultModuleProps.schedule,
      photoMosaic: { columns: 3 },
      faq: { title: { en: "FAQ", es: "Preguntas", ro: "Intrebari" } },
      rsvp: { title: { en: "RSVP", es: "Confirmacion", ro: "Confirmare" } }
    }
  })),
  saveSiteConfig: vi.fn(async (x) => x)
}));

import { GET, PATCH, POST, PUT } from "@/app/api/admin/modules/route";

describe("/api/admin/modules", () => {
  it("returns config on GET", async () => {
    const req = new NextRequest("http://test/api/admin/modules", { method: "GET" });
    const res = await GET(req);
    expect(res.status).toBe(200);
  });

  it("accepts valid payload on PUT", async () => {
    const req = new Request("http://test/api/admin/modules", {
      method: "PUT",
      body: JSON.stringify({
        templateId: "classic",
        cadencePreset: "mobile-balanced",
        themeTokens: {
          primary: { inherit: true, value: "#be123c" },
          secondary: { inherit: true, value: "#f9a8d4" },
          accent: { inherit: true, value: "#f97316" },
          surface: { inherit: true, value: "#ffffff" },
          text: { inherit: true, value: "#4a1d2a" },
          buttonBg: { inherit: true, value: "#be123c" },
          buttonText: { inherit: true, value: "#ffffff" },
          buttonRadius: { inherit: true, value: 10 }
        },
        moduleFlags: [
          { id: "heroCarousel", enabled: true },
          { id: "countdown", enabled: true },
          { id: "ourStory", enabled: true },
          { id: "schedule", enabled: true },
          { id: "photoMosaic", enabled: true },
          { id: "faq", enabled: true },
          { id: "rsvp", enabled: true }
        ],
        moduleOrder: ["heroCarousel", "countdown", "ourStory", "schedule", "photoMosaic", "faq", "rsvp"],
        weddingDetails: {
          brideName: "A",
          groomName: "B",
          headerImageUrl: "",
          headerEffect: "static",
          weddingDate: "2026-01-01",
          venueName: { en: "X", es: "X", ro: "X" },
          eventSubtitle: { en: "S", es: "S", ro: "S" },
          ceremonyTime: "16:00",
          dinnerTime: "19:00",
          rsvpDeadline: "2025-12-01",
          contactEmail: "x@y.com",
          contactPhone: "123",
          rsvpNameLabel: { en: "Name", es: "Nombre", ro: "Nume" },
          rsvpAttendingLabel: { en: "Attend", es: "Asiste", ro: "Particip" },
          rsvpDeclineLabel: { en: "Decline", es: "No", ro: "Nu" },
          rsvpDietaryLabel: { en: "Diet", es: "Dieta", ro: "Dieta" },
          rsvpPlusOneLabel: { en: "Plus", es: "Plus", ro: "Plus" }
        },
        moduleProps: {
          heroCarousel: defaultModuleProps.heroCarousel,
          countdown: {},
          ourStory: { title: { en: "Our Story", es: "Nuestra Historia", ro: "Povestea Noastra" } },
          schedule: defaultModuleProps.schedule,
          photoMosaic: { columns: 3 },
          faq: { title: { en: "FAQ", es: "Preguntas", ro: "Intrebari" } },
          rsvp: { title: { en: "RSVP", es: "Confirmacion", ro: "Confirmare" } }
        }
      })
    });
    const res = await PUT(req as never);
    expect(res.status).toBe(200);
  });

  it("exports yaml bundle v2 (site + locales) on POST", async () => {
    const req = new NextRequest("http://test/api/admin/modules", { method: "POST" });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { yaml?: string };
    expect(body.yaml).toContain("exportVersion: 2");
    expect(body.yaml).toContain("locales:");
    expect(body.yaml).toContain("site:");
  });

  it("imports yaml on PATCH", async () => {
    const req = new Request("http://test/api/admin/modules", {
      method: "PATCH",
      body: JSON.stringify({
        yaml: `templateId: classic
cadencePreset: mobile-balanced
themeTokens:
  primary: { inherit: true, value: "#be123c" }
  secondary: { inherit: true, value: "#f9a8d4" }
  accent: { inherit: true, value: "#f97316" }
  surface: { inherit: true, value: "#ffffff" }
  text: { inherit: true, value: "#4a1d2a" }
  buttonBg: { inherit: true, value: "#be123c" }
  buttonText: { inherit: true, value: "#ffffff" }
  buttonRadius: { inherit: true, value: 10 }
moduleFlags:
  - id: heroCarousel
    enabled: true
  - id: countdown
    enabled: true
  - id: ourStory
    enabled: true
  - id: schedule
    enabled: true
  - id: photoMosaic
    enabled: true
  - id: faq
    enabled: true
  - id: rsvp
    enabled: true
moduleOrder:
  - heroCarousel
  - countdown
  - ourStory
  - schedule
  - photoMosaic
  - faq
  - rsvp
weddingDetails:
  brideName: A
  groomName: B
  headerImageUrl: ""
  headerEffect: static
  weddingDate: "2026-01-01"
  venueName: { en: "X", es: "X", ro: "X" }
  eventSubtitle: { en: "S", es: "S", ro: "S" }
  ceremonyTime: "16:00"
  dinnerTime: "19:00"
  rsvpDeadline: "2025-12-01"
  contactEmail: x@y.com
  contactPhone: "123"
  rsvpNameLabel: { en: "Name", es: "Nombre", ro: "Nume" }
  rsvpAttendingLabel: { en: "Attend", es: "Asiste", ro: "Particip" }
  rsvpDeclineLabel: { en: "Decline", es: "No", ro: "Nu" }
  rsvpDietaryLabel: { en: "Diet", es: "Dieta", ro: "Dieta" }
  rsvpPlusOneLabel: { en: "Plus", es: "Plus", ro: "Plus" }
moduleProps:
  heroCarousel:
    autoplayMs: 5000
    showDots: true
    slideOneTitle: { en: "We are getting married", es: "Nos casamos", ro: "Ne casatorim" }
    slideOneSubtitle: { en: "{bride} & {groom} - {date}", es: "{bride} y {groom} - {date}", ro: "{bride} si {groom} - {date}" }
    slideTwoTitle: { en: "A day to remember", es: "Un dia para recordar", ro: "O zi de neuitat" }
    slideTwoSubtitle: { en: "Ceremony, dinner and dancing together", es: "Ceremonia, cena y baile juntos", ro: "Ceremonie, cina si dans impreuna" }
    slideThreeTitle: { en: "Join our celebration", es: "Unete celebrarii", ro: "Alatura-te celebrarii" }
    slideThreeSubtitle: { en: "RSVP and plan your trip with us", es: "Confirma prezenta si planifica calatoria cu noi", ro: "Confirma prezenta si planifica drumul alaturi de noi" }
  countdown: {}
  ourStory:
    title: { en: "Our Story", es: "Nuestra Historia", ro: "Povestea Noastra" }
  schedule:
    showAperitivoRow: false
    showPartyRow: true
    ceremonyLabel: { en: "Ceremony", es: "Ceremonia", ro: "Ceremonie" }
    aperitivoLabel: { en: "Aperitivo", es: "Aperitivo", ro: "Aperitivo" }
    dinnerLabel: { en: "Dinner", es: "Cena", ro: "Cina" }
    partyLabel: { en: "Party", es: "Fiesta", ro: "Petrecere" }
  photoMosaic: { columns: 3 }
  faq:
    title: { en: "FAQ", es: "Preguntas", ro: "Intrebari" }
  rsvp:
    title: { en: "RSVP", es: "Confirmacion", ro: "Confirmare" }`
      })
    });
    const res = await PATCH(req as never);
    expect(res.status).toBe(200);
  });
});
