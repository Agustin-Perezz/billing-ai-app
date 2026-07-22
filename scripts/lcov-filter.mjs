import { readFileSync, writeFileSync } from "node:fs";

const file = "monocart-report/coverage/lcov.info";
const content = readFileSync(file, "utf-8");

const filtered = content
  .split("\nend_of_record\n")
  .filter((block) => {
    const sf = block.match(/^SF:(.+)$/m);
    return sf && sf[1].startsWith("src/");
  })
  .map((block) => block + "\nend_of_record\n")
  .join("");

writeFileSync(file, filtered);
console.log(`lcov filtered to source-mapped entries: ${file}`);
