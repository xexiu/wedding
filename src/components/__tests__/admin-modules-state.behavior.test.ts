import { moveItem, toggleModule } from "@/components/admin-modules-state";
import { describe, expect, it } from "vitest";

describe("admin module state behavior", () => {
  it("reorders modules", () => {
    const result = moveItem(["heroCarousel", "countdown", "faq"], 0, 2);
    expect(result).toEqual(["countdown", "faq", "heroCarousel"]);
  });

  it("toggles module enable state", () => {
    const result = toggleModule(
      [
        { id: "heroCarousel", enabled: true },
        { id: "countdown", enabled: false }
      ],
      "countdown"
    );
    expect(result[1].enabled).toBe(true);
  });
});
