import { describe, expect, test } from "vitest";
import { defaultMessagesByLocale } from "@/config/admin-ui-text-bundles";
import { parseLocaleConfigItems, parseLocaleConfigsPutBody } from "@/lib/locale-config-payload";

describe("locale-config-payload", () => {
  test("parseLocaleConfigItems accepts valid array", () => {
    const en = defaultMessagesByLocale("en");
    const parsed = parseLocaleConfigItems([
      { code: "en", name: "English", enabled: true, isDefault: true, messages: en }
    ]);
    expect(parsed).toHaveLength(1);
    expect(parsed?.[0].code).toBe("en");
  });

  test("parseLocaleConfigItems rejects non-array", () => {
    expect(parseLocaleConfigItems({})).toBeNull();
  });

  test("parseLocaleConfigsPutBody reads locales key", () => {
    const en = defaultMessagesByLocale("en");
    const parsed = parseLocaleConfigsPutBody({
      locales: [{ code: "en", name: "English", enabled: true, isDefault: true, messages: en }]
    });
    expect(parsed).toHaveLength(1);
  });
});
