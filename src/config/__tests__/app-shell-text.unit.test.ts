import { APP_SHELL_TEXT } from "@/config/app-shell-text";
import { defaultLocale } from "@/config/locales";
import { describe, expect, test } from "vitest";

describe("app shell text", () => {
  test("uses locale redirect from default locale", () => {
    expect(APP_SHELL_TEXT.LOCALE_REDIRECT_PATH).toBe(`/${defaultLocale}`);
  });

  test("defines non-empty metadata copy", () => {
    expect(APP_SHELL_TEXT.METADATA_TITLE.length).toBeGreaterThan(0);
    expect(APP_SHELL_TEXT.METADATA_DESCRIPTION.length).toBeGreaterThan(0);
  });
});
