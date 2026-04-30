import { readdirSync } from "node:fs";
import {
  functionApiReferencePath,
  loadFunctionApiReference,
  normalizeMarkdownForComparison,
  renderCurrentFunctionApiReferenceFiles
} from "./function-api-reference.js";

async function main() {
  const expectedFiles = await renderCurrentFunctionApiReferenceFiles();
  const expectedPaths = new Set(expectedFiles.map((file) => file.path));
  const staleFiles = readdirSync("docs/wiki")
    .filter((name) => /^Function-API-Reference-.+\.md$/.test(name))
    .map((name) => `docs/wiki/${name}`)
    .filter((path) => !expectedPaths.has(path));
  const outOfSyncPaths: string[] = [];

  for (const file of expectedFiles) {
    let current = "";

    try {
      current = loadFunctionApiReference(file.path);
    } catch {
      outOfSyncPaths.push(file.path);
      continue;
    }

    if (normalizeMarkdownForComparison(current) !== normalizeMarkdownForComparison(file.content)) {
      outOfSyncPaths.push(file.path);
    }
  }

  outOfSyncPaths.push(...staleFiles);

  if (outOfSyncPaths.length === 0) {
    process.stdout.write(`${functionApiReferencePath} and module pages are in sync\n`);
  } else {
    process.stderr.write(`out of sync: ${outOfSyncPaths.join(", ")}\n`);
    process.exitCode = 1;
  }
}

await main();
