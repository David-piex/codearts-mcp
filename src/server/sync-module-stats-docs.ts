import { writeFileSync } from "node:fs";
import {
  loadTrackedModuleStatsDocuments,
  syncModuleStatsDocuments,
  trackedModuleStatsDocumentPaths
} from "./module-stats-docs.js";

function main() {
  const documents = loadTrackedModuleStatsDocuments();
  const synced = syncModuleStatsDocuments(documents);

  for (const path of trackedModuleStatsDocumentPaths) {
    if (synced[path] !== documents[path]) {
      writeFileSync(path, synced[path], "utf8");
      process.stdout.write(`updated ${path}\n`);
    } else {
      process.stdout.write(`unchanged ${path}\n`);
    }
  }
}

main();
