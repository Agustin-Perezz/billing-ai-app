import { expect, test } from "./coverage-fixtures";

const MOCK_EXPENSE = {
  vendor: "Acme",
  amount: 42.5,
  date: new Date().toISOString().slice(0, 10),
  category: "Utilities",
  savingsFound: 5,
};

test.describe("analyze page structure", () => {
  test("renders top bar, explorer, and bottom nav", async ({ page }) => {
    await page.addInitScript(() => window.localStorage.clear());
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/analyze");

    await expect(page.getByRole("heading", { name: "ANALYSIS" })).toBeVisible();
    await expect(page.getByText("Total Expenses")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();
  });
});

test.describe("api/extract route", () => {
  test("rejects invalid image payload with 400", async ({ request }) => {
    const res = await request.post("/api/extract", {
      data: { image: "not-a-data-url" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid image payload");
  });
});

test.describe("localStorage persistence", () => {
  test("persists scans across page reloads", async ({ page }) => {
    await page.goto("/analyze");
    await page.evaluate(() => window.localStorage.clear());
    await page.route("**/api/extract", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ expense: MOCK_EXPENSE }),
      });
    });
    await page.reload();

    await page.setInputFiles('input[type="file"]', "tests/fixtures/bill.png");
    await expect(page.getByText("Acme")).toBeVisible({ timeout: 10000 });

    await page.reload();

    await expect(page.getByText("Acme")).toBeVisible();
    await expect(page.getByText("$42.50").first()).toBeVisible();
  });

  test("survives corrupted localStorage data", async ({ page }) => {
    await page.goto("/analyze");
    await page.evaluate(() =>
      window.localStorage.setItem("billing_scans", "{broken json"),
    );
    await page.reload();

    await expect(page.getByText("$0.00").first()).toBeVisible();
    await expect(
      page.getByText("No scans yet — upload a bill to begin."),
    ).toBeVisible();
  });
});

test.describe("upload error handling", () => {
  test("silently handles API failure without crashing", async ({ page }) => {
    await page.goto("/analyze");
    await page.evaluate(() => window.localStorage.clear());
    await page.route("**/api/extract", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "OpenAI is down" }),
      });
    });
    await page.reload();

    await page.setInputFiles('input[type="file"]', "tests/fixtures/bill.png");

    await expect(page.getByText("$0.00").first()).toBeVisible();
    await expect(
      page.getByText("No scans yet — upload a bill to begin."),
    ).toBeVisible();
  });
});

test.describe("multi-scan rendering", () => {
  test("shows multiple scans with dividers between them", async ({ page }) => {
    const scans = [
      {
        vendor: "Acme",
        amount: 42.5,
        date: "2026-07-15",
        category: "Utilities",
        savingsFound: 5,
      },
      {
        vendor: "Globex",
        amount: 99.99,
        date: "2026-07-10",
        category: "Software",
        savingsFound: 0,
      },
    ];

    await page.goto("/analyze");
    await page.evaluate((data) => {
      window.localStorage.setItem("billing_scans", JSON.stringify(data));
    }, scans);
    await page.reload();

    await expect(page.getByText("Acme")).toBeVisible();
    await expect(page.getByText("Globex")).toBeVisible();
    await expect(page.getByText("$42.50").first()).toBeVisible();
    await expect(page.getByText("$99.99").first()).toBeVisible();
  });

  test("aggregates top category and savings across scans", async ({ page }) => {
    const scans = [
      {
        vendor: "Acme",
        amount: 100,
        date: "2026-07-15",
        category: "Utilities",
        savingsFound: 10,
      },
      {
        vendor: "Globex",
        amount: 50,
        date: "2026-07-10",
        category: "Utilities",
        savingsFound: 5,
      },
    ];

    await page.goto("/analyze");
    await page.evaluate((data) => {
      window.localStorage.setItem("billing_scans", JSON.stringify(data));
    }, scans);
    await page.reload();

    await expect(page.getByText("Total Expenses")).toBeVisible();
    await expect(page.getByText("$150.00").first()).toBeVisible();
    await expect(page.getByText("Utilities")).toBeVisible();
    await expect(page.getByText("$15.00").first()).toBeVisible();
  });
});
