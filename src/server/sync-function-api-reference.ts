import { readdirSync, unlinkSync, writeFileSync } from "node:fs";
import {
  functionApiReferencePath,
  loadFunctionApiReference,
  normalizeMarkdownForComparison,
  renderCurrentFunctionApiReferenceFiles
} from "./function-api-reference.js";

async function main() {
  const nextFiles = await renderCurrentFunctionApiReferenceFiles();
  const nextPaths = new Set(nextFiles.map((file) => file.path));
  const staleFiles = readdirSync("docs/wiki")
    .filter((name) => /^Function-API-Reference-.+\.md$/.test(name))
    .map((name) => `docs/wiki/${name}`)
    .filter((path) => !nextPaths.has(path));
  const updatedPaths: string[] = [];

  for (const file of nextFiles) {
    let current = "";

    try {
      current = loadFunctionApiReference(file.path);
    } catch {
      current = "";
    }

    if (normalizeMarkdownForComparison(current) === normalizeMarkdownForComparison(file.content)) {
      continue;
    }

    writeFileSync(file.path, file.content, "utf8");
    updatedPaths.push(file.path);
  }

  for (const staleFile of staleFiles) {
    unlinkSync(staleFile);
    updatedPaths.push(staleFile);
  }

  if (updatedPaths.length === 0) {
    process.stdout.write(`${functionApiReferencePath} and module pages are already in sync\n`);
    return;
  }

  process.stdout.write(`updated ${updatedPaths.join(", ")}\n`);
}

await main();
