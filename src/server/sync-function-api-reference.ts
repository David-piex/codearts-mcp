import { writeFileSync } from "node:fs";
import {
  functionApiReferencePath,
  loadFunctionApiReference,
  normalizeMarkdownForComparison,
  renderCurrentFunctionApiReference
} from "./function-api-reference.js";

async function main() {
  const current = loadFunctionApiReference();
  const next = await renderCurrentFunctionApiReference();

  if (normalizeMarkdownForComparison(current) === normalizeMarkdownForComparison(next)) {
    process.stdout.write(`${functionApiReferencePath} is already in sync\n`);
    return;
  }

  writeFileSync(functionApiReferencePath, next, "utf8");
  process.stdout.write(`updated ${functionApiReferencePath}\n`);
}

await main();
