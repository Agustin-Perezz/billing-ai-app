import { expect, test } from "@playwright/test";

type AnalizeElement = { locator: string; text?: string };

const ANALIZE_ELEMENTS: readonly AnalizeElement[] = [
  { locator: "h1", text: "ANALYSIS" },
  { locator: "text=Drop bill image here or click to browse" },
  { locator: "text=Total Expenses" },
  { locator: "text=$4,250.00" },
  { locator: "text=Top Category" },
  { locator: "text=Utilities" },
  { locator: "text=Savings Found" },
  { locator: "text=$342.10" },
  { locator: "text=Monthly Trends" },
  { locator: "text=Recent Scans" },
  { locator: "text=AWS" },
  { locator: "text=Starbucks" },
  { locator: "text=Rent" },
];

test.describe("analize route elements exist", () => {
  for (const { locator, text } of ANALIZE_ELEMENTS) {
    const label = text ?? locator;
    test(`displays ${label}`, async ({ page }) => {
      await page.goto("/analize");
      await expect(page.locator(locator).first()).toBeVisible();
    });
  }

  test("bottom nav has 4 items", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/analize");
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(4);
  });
});
