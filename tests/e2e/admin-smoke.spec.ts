import { expect, test } from "@playwright/test";

test("admin page loads", async ({ page }) => {
  await page.goto("/en/admin");
  await expect(page.getByText("Modules Admin")).toBeVisible();
});
