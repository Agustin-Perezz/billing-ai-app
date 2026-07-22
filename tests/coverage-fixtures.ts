import { expect, test as testBase } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";

type CoverageFixture = {
  autoTestFixture: string;
};

export const test = testBase.extend<CoverageFixture>({
  autoTestFixture: [
    async ({ page }, use) => {
      const isChromium = test.info().project.name === "chromium";
      if (isChromium) {
        await Promise.all([
          page.coverage.startJSCoverage({ resetOnNavigation: false }),
          page.coverage.startCSSCoverage({ resetOnNavigation: false }),
        ]);
      }

      await use("autoTestFixture");

      if (isChromium) {
        const [jsCoverage, cssCoverage] = await Promise.all([
          page.coverage.stopJSCoverage(),
          page.coverage.stopCSSCoverage(),
        ]);
        await addCoverageReport([...jsCoverage, ...cssCoverage], test.info());
      }
    },
    { scope: "test", auto: true },
  ],
});

export { expect };
