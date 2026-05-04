import {
  getMutationErrorStatus,
  getMutationSuccessStatus,
  getTemplateAppliedStatus
} from "@/components/admin-modules/query-errors";
import { describe, expect, test } from "vitest";

describe("query-errors", () => {
  test("maps success messages by action", () => {
    expect(getMutationSuccessStatus("save")).toBe("Saved");
    expect(getMutationSuccessStatus("exportYaml")).toBe("YAML exported");
    expect(getMutationSuccessStatus("importYaml")).toBe("YAML imported");
  });

  test("maps error messages by action", () => {
    expect(getMutationErrorStatus("save")).toBe("Failed");
    expect(getMutationErrorStatus("exportYaml")).toBe("YAML export failed");
    expect(getMutationErrorStatus("importYaml")).toBe("YAML import failed");
  });

  test("builds template applied status consistently", () => {
    expect(getTemplateAppliedStatus("classic")).toBe("Applied classic defaults");
  });
});
