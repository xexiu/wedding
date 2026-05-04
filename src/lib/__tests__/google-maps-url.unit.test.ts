import { describe, expect, it } from "vitest";

import { googleMapsDirectionsUrl } from "@/lib/google-maps-url";

describe("googleMapsDirectionsUrl", () => {
  it("encodes destination for directions URL", () => {
    const url = googleMapsDirectionsUrl("The Garden Estate, Bucharest");
    expect(url).toMatch(/^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=/);
    expect(url).toContain(encodeURIComponent("The Garden Estate, Bucharest"));
  });

  it("falls back to plain Maps when destination is empty", () => {
    expect(googleMapsDirectionsUrl("")).toBe("https://www.google.com/maps/");
    expect(googleMapsDirectionsUrl("   ")).toBe("https://www.google.com/maps/");
  });
});
