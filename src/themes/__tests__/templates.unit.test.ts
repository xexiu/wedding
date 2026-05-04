import { getTemplateDefaults, getTemplateStyles, getTemplateThemeTokenValues, templates } from "@/themes/templates";
import { describe, expect, test } from "vitest";

describe("templates", () => {
  test("returns styles for known template", () => {
    const styles = getTemplateStyles("classic");
    expect(styles.pageBg).toContain("invitation-default-page");
  });

  test("falls back to first template for unknown template id", () => {
    const defaults = getTemplateDefaults("unknown" as never);
    expect(defaults).toEqual(templates[0].defaults);
  });

  test("returns theme token values from template defaults", () => {
    const values = getTemplateThemeTokenValues("dark-luxury");
    expect(values.buttonRadius).toBe(4);
  });
});
