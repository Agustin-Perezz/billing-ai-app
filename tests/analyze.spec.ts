import { expect, test } from "./coverage-fixtures";

const MOCK_EXPENSE = {
  vendor: "Acme",
  amount: 42.5,
  date: new Date().toISOString().slice(0, 10),
  category: "Utilities",
  savingsFound: 5,
};

test.describe("analyze route", () => {
  test("shows empty state before any scan", async ({ page }) => {
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto("/analyze");

    await expect(page.getByRole("heading", { name: "ANALYSIS" })).toBeVisible();
    await expect(page.getByText("Total Expenses")).toBeVisible();
    await expect(
      page.getByText("No scans yet — upload a bill to begin."),
    ).toBeVisible();
    await expect(page.getByText("$0.00").first()).toBeVisible();
  });

  test("bottom nav has 4 items", async ({ page }) => {
    await page.addInitScript(() => window.localStorage.clear());
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/analyze");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(4);
  });

  test("upload updates dashboard via mocked /api/extract", async ({ page }) => {
    await page.addInitScript(() => window.localStorage.clear());
    await page.route("**/api/extract", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ expense: MOCK_EXPENSE }),
      });
    });
    await page.goto("/analyze");

    await page.setInputFiles('input[type="file"]', "tests/fixtures/bill.png");

    await expect(page.getByText("Acme")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("$42.50").first()).toBeVisible();
    await expect(page.getByText("Utilities")).toBeVisible();
  });
});
