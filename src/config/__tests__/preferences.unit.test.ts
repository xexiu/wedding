import { resolveLocaleFromAcceptLanguage } from "@/config/preferences";
import { describe, expect, test } from "vitest";

describe("preferences", () => {
  test("resolves locale from accept-language priorities", () => {
    expect(resolveLocaleFromAcceptLanguage("es-ES,es;q=0.9,en;q=0.8")).toBe("es");
    expect(resolveLocaleFromAcceptLanguage("ro-RO,ro;q=0.9,en;q=0.8")).toBe("ro");
    expect(resolveLocaleFromAcceptLanguage("en-US,en;q=0.8")).toBe("en");
  });

  test("falls back to default locale when unknown", () => {
    expect(resolveLocaleFromAcceptLanguage("fr-FR,fr;q=0.9")).toBe("en");
    expect(resolveLocaleFromAcceptLanguage(null)).toBe("en");
  });
});
