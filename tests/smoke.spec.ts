import { expect, test } from "./coverage-fixtures";

test("home page loads and shows heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("To get started");
});
