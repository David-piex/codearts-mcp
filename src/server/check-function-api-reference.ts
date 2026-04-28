import {
  functionApiReferencePath,
  loadFunctionApiReference,
  normalizeMarkdownForComparison,
  renderCurrentFunctionApiReference
} from "./function-api-reference.js";

async function main() {
  const current = loadFunctionApiReference();
  const expected = await renderCurrentFunctionApiReference();

  if (normalizeMarkdownForComparison(current) === normalizeMarkdownForComparison(expected)) {
    process.stdout.write(`${functionApiReferencePath} is in sync\n`);
    return;
  }

  process.stderr.write(`out of sync: ${functionApiReferencePath}\n`);
  process.exitCode = 1;
}

await main();
