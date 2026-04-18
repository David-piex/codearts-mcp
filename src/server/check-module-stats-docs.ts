import {
  findDriftedModuleStatsDocuments,
  loadTrackedModuleStatsDocuments
} from "./module-stats-docs.js";

function main() {
  const documents = loadTrackedModuleStatsDocuments();
  const drifted = findDriftedModuleStatsDocuments(documents);

  if (drifted.length === 0) {
    process.stdout.write("module stats docs are in sync\n");
    return;
  }

  for (const path of drifted) {
    process.stderr.write(`out of sync: ${path}\n`);
  }

  process.exitCode = 1;
}

main();
