import { defaultMessagesByLocale } from "@/config/admin-ui-text-bundles";
import { getLocaleValidationWarnings } from "@/components/organisms/admin-modules/locale-manager.validation";
import { describe, expect, test } from "vitest";

describe("locale manager validation", () => {
  test("reports empty required message fields", () => {
    const warnings = getLocaleValidationWarnings({
      code: "en",
      name: "English",
      enabled: true,
      isDefault: true,
      messages: {
        ...defaultMessagesByLocale("en"),
        save: ""
      }
    });

    expect(warnings.some((warning) => warning.type === "empty" && warning.field === "save")).toBe(true);
  });

  test("reports duplicate semantic labels", () => {
    const warnings = getLocaleValidationWarnings({
      code: "en",
      name: "English",
      enabled: true,
      isDefault: true,
      messages: {
        ...defaultMessagesByLocale("en"),
        save: "same",
        enabled: "same"
      }
    });

    expect(
      warnings.some(
        (warning) =>
          warning.type === "duplicate" &&
          ((warning.fieldA === "save" && warning.fieldB === "enabled") ||
            (warning.fieldA === "enabled" && warning.fieldB === "save"))
      )
    ).toBe(true);
  });
});
