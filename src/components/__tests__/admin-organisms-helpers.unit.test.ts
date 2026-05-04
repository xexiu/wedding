import { isTemplateId } from "@/components/organisms/admin-modules/template-controls.helpers";
import { describe, expect, test } from "vitest";

describe("admin organisms helpers", () => {
  test("isTemplateId validates known ids", () => {
    expect(isTemplateId("classic")).toBe(true);
    expect(isTemplateId("unknown")).toBe(false);
  });
});
