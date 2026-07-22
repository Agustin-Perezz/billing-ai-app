import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { FullConfig, TestInfo } from "@playwright/test";
import { CDPClient } from "monocart-coverage-reports";
import { addCoverageReport } from "monocart-reporter";

const globalTeardown = async (config: FullConfig) => {
  console.log("globalTeardown ...");

  const client = await CDPClient({ port: 9230 });
  if (!client) {
    console.error("coverage: CDPClient connection failed (port 9230)");
    return;
  }

  const dir = await client.writeCoverage();
  await client.close();

  if (!existsSync(dir)) {
    console.error("coverage: not found coverage dir");
    return;
  }

  for (const filename of readdirSync(dir)) {
    const content = readFileSync(resolve(dir, filename)).toString("utf-8");
    const json = JSON.parse(content);
    let coverageList: Array<{ url: string; source?: string }> = json.result;

    coverageList = coverageList.filter((entry) =>
      entry.url?.startsWith("file:"),
    );
    coverageList = coverageList.filter((entry) =>
      entry.url.includes("next/server/app"),
    );
    coverageList = coverageList.filter(
      (entry) => !entry.url.includes("manifest.js"),
    );

    if (!coverageList.length) continue;

    coverageList.forEach((entry) => {
      const filePath = fileURLToPath(entry.url);
      if (existsSync(filePath)) {
        entry.source = readFileSync(filePath).toString("utf8");
      } else {
        console.error("coverage: not found file", filePath);
      }
    });

    const mockTestInfo = { config } as TestInfo;
    await addCoverageReport(coverageList, mockTestInfo);
  }
};

export default globalTeardown;
