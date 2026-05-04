import { defaultSiteManifest, validateSiteManifest } from "@/config/site-manifest";
import { describe, expect, it } from "vitest";

describe("site manifest schema", () => {
  it("accepts the default manifest", () => {
    expect(validateSiteManifest(defaultSiteManifest)).toEqual(defaultSiteManifest);
  });

  it("rejects invalid module props", () => {
    expect(() =>
      validateSiteManifest({
        ...defaultSiteManifest,
        moduleProps: {
          ...defaultSiteManifest.moduleProps,
          photoMosaic: { columns: 99 }
        }
      })
    ).toThrow();
  });
});
