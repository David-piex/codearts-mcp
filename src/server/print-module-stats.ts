import { renderModuleStatsMarkdown, renderModuleStatsReportJson } from "./module-stats.js";

function resolveFormat(argv: string[]): "markdown" | "json" {
  return argv.includes("--json") ? "json" : "markdown";
}

function main() {
  const format = resolveFormat(process.argv.slice(2));
  const output =
    format === "json" ? renderModuleStatsReportJson() : renderModuleStatsMarkdown();

  process.stdout.write(`${output}\n`);
}

main();
