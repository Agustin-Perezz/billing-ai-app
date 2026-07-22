import { basename } from "node:path";
import { defineConfig, devices } from "@playwright/test";
import type { CoverageReportOptions } from "monocart-reporter";

const PROJECT_NAME = basename(process.cwd());

const coverageReportOptions: CoverageReportOptions = {
  name: "Next.js V8 Coverage Report",

  entryFilter: (entry) => {
    return (
      entry.url.includes("next/static/chunks") ||
      entry.url.includes("next/server/app")
    );
  },

  sourceFilter: (sourcePath) => {
    return sourcePath.includes("src/app");
  },

  sourcePath: (fileSource) => {
    const list = ["_N_E/", `${PROJECT_NAME}/`];
    for (const pre of list) {
      if (fileSource.startsWith(pre)) {
        return fileSource.slice(pre.length);
      }
    }
    return fileSource;
  },

  reports: ["v8", "console-details", "lcov"],
};

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  globalTeardown: "./global-teardown.ts",
  reporter: [
    ["list"],
    ["monocart-reporter", { coverage: coverageReportOptions }],
  ],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm test:command",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
