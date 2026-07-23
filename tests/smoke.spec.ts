import { expect, test } from "./coverage-fixtures";

test("home page loads and shows heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "ANALYSIS" })).toBeVisible();
});
