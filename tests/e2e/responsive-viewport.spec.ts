import { expect, test } from "@playwright/test";

test.describe("responsive smoke", () => {
  test("home page renders main hero and sections", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: /Alexandra\s*&\s*Matei/i })).toBeVisible();
    await expect(page.getByText("Countdown")).toBeVisible();
  });

  test("admin page keeps core controls accessible", async ({ page }) => {
    await page.goto("/en/admin");
    await expect(page.getByText("Modules Admin")).toBeVisible();
    await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
    await expect(page.getByText("Config YAML import/export")).toBeVisible();
  });

  test("yaml editor does not overflow viewport", async ({ page }) => {
    await page.goto("/en/admin");
    const yamlEditor = page.getByPlaceholder("Export to YAML or paste YAML manifest here");
    await expect(yamlEditor).toBeVisible();

    const width = await yamlEditor.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return { right: rect.right, vw: window.innerWidth };
    });
    expect(width.right).toBeLessThanOrEqual(width.vw + 1);
  });
});
