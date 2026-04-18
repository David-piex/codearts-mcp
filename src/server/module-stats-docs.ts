import { readFileSync } from "node:fs";
import { collectModuleStats, collectProductToolStats } from "./module-stats.js";

export const trackedModuleStatsDocumentPaths = [
  "README.md",
  "docs/wiki/Capability-Matrix.md",
  "docs/wiki/Current-Implementation-Status-2026-04-17.md",
  "docs/wiki/Tool-Status-Matrix.md"
] as const;

type ModuleName =
  | "Req"
  | "Repo"
  | "Pipeline"
  | "Check"
  | "TestPlan"
  | "Deploy"
  | "Build"
  | "Artifact";

type ReadWriteMatrixMeta = {
  live: string;
  keyGaps: string;
};

type ImplementationStatusMeta = {
  live: string;
  notes: string;
};

type ToolStatusSummaryMeta = {
  summary: string;
  conclusion: string;
};

type ReadmeModuleNumbersMeta = {
  liveStatus: string;
  breakdown: string;
};

const readWriteMatrixMeta: Record<ModuleName, ReadWriteMatrixMeta> = {
  Req: {
    live: "Validated",
    keyGaps: "Project and work-item read/write paths are now fully live-validated"
  },
  Repo: {
    live: "Validated",
    keyGaps: "No material gap in the currently exposed surface"
  },
  Pipeline: {
    live: "Validated",
    keyGaps: "More non-empty samples would help, but no structural gap remains"
  },
  Check: {
    live: "Validated",
    keyGaps: "Tool-level live closure is complete"
  },
  TestPlan: {
    live: "Partial",
    keyGaps: "`get_plan / list_runs / get_case / run_cases` are unpublished in Beijing 4"
  },
  Deploy: {
    live: "Partial",
    keyGaps:
      "Expanded Deploy v4 environment/record/variable surface is implemented; the detailed live split is maintained in `docs/wiki/Deploy-Live-Validated.md`"
  },
  Build: {
    live: "Validated",
    keyGaps:
      "19 tools are fully live-validated and 3 helper/configuration tools are currently code/test-only"
  },
  Artifact: {
    live: "Partial",
    keyGaps:
      "5 tools are fully live-validated, and 7 routes are now re-confirmed by live smoke as unpublished in Beijing 4"
  }
};

const implementationStatusMeta: Record<ModuleName, ImplementationStatusMeta> = {
  Req: {
    live: "Validated",
    notes:
      "Project and work-item read/write loops now have real AK/SK validation on a writable sampled project."
  },
  Repo: {
    live: "Validated",
    notes: "Full module-level live loop completed."
  },
  Pipeline: {
    live: "Validated",
    notes: "Full module-level live loop completed."
  },
  Check: {
    live: "Validated",
    notes: "Full tool-level live loop completed."
  },
  TestPlan: {
    live: "Partial",
    notes:
      "Two scanned projects now return real plan samples; 4 routes are re-confirmed as unpublished in Beijing 4."
  },
  Deploy: {
    live: "Partial",
    notes:
      "The detailed Deploy page is the source of truth for the expanded v4 surface. `deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_app_log`, and `deploy_stop_app` now all have real AK/SK validation on at least one healthy path. The remaining real blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`), plus a rollback-eligible sample for `deploy_rollback_app`."
  },
  Build: {
    live: "Validated",
    notes:
      "19 tools are fully AK/SK validated on the current surface, while 3 helper/configuration tools are currently covered by code/test validation only."
  },
  Artifact: {
    live: "Partial",
    notes:
      "Five tools are AK/SK Full; the remaining seven are re-confirmed as unpublished in Beijing 4."
  }
};

const toolStatusSummaryMeta: Record<ModuleName, ToolStatusSummaryMeta> = {
  Req: {
    summary: "`8 Full`",
    conclusion: "Project and work-item read/write paths are fully live-validated."
  },
  Repo: {
    summary: "`24 Full`",
    conclusion: "Module-level closure is complete."
  },
  Pipeline: {
    summary: "`16 Full`",
    conclusion: "Module-level closure is complete."
  },
  Check: {
    summary: "`8 Full`",
    conclusion: "Tool-level closure is complete."
  },
  TestPlan: {
    summary: "`1 Full / 2 Reachable / 4 Unpublished / 0 Code`",
    conclusion:
      "Real plan samples now exist on two projects, but detail/run routes are still unpublished in Beijing 4."
  },
  Deploy: {
    summary: "Expanded surface; see `docs/wiki/Deploy-Live-Validated.md`",
    conclusion:
      "The Deploy MCP surface now includes v4 application/environment/cluster/record/variable tools. The detailed live split is maintained in the dedicated Deploy page."
  },
  Build: {
    summary: "`19 Full / 0 Reachable / 0 Unpublished / 3 Code`",
    conclusion:
      "The remote Build surface is fully live-validated for 19 tools; 3 helper/configuration tools are currently covered by code/test validation only."
  },
  Artifact: {
    summary: "`5 Full / 0 Reachable / 7 Unpublished / 0 Code`",
    conclusion:
      "Five tools are fully validated; seven routes are unpublished in Beijing 4. The current tenant now exposes a real published file sample at `/codearts-mcp/1.0.0/codearts-mcp.tgz`."
  }
};

const readmeModuleNumbersMeta: Record<ModuleName, ReadmeModuleNumbersMeta> = {
  Req: {
    liveStatus: "Validated",
    breakdown: "`8 Full / 0 Reachable / 0 Unpublished / 0 Code`"
  },
  Repo: {
    liveStatus: "Validated",
    breakdown: "`24 Full`"
  },
  Pipeline: {
    liveStatus: "Validated",
    breakdown: "`16 Full`"
  },
  Check: {
    liveStatus: "Validated",
    breakdown: "`8 Full`"
  },
  TestPlan: {
    liveStatus: "Partial",
    breakdown: "`1 Full / 2 Reachable / 4 Unpublished / 0 Code`"
  },
  Deploy: {
    liveStatus: "Partial",
    breakdown: "Expanded surface; see `docs/wiki/Deploy-Live-Validated.md` for the current live split"
  },
  Build: {
    liveStatus: "Validated",
    breakdown: "`19 Full / 0 Reachable / 0 Unpublished / 3 Code`"
  },
  Artifact: {
    liveStatus: "Partial",
    breakdown: "`5 Full / 0 Reachable / 7 Unpublished / 0 Code`"
  }
};

export function replaceGeneratedSection(
  document: string,
  sectionName: string,
  content: string
): string {
  const startMarker = `<!-- GENERATED:${sectionName}:start -->`;
  const endMarker = `<!-- GENERATED:${sectionName}:end -->`;
  const startIndex = document.indexOf(startMarker);
  const endIndex = document.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`Missing generated markers for section ${sectionName}`);
  }

  const before = document.slice(0, startIndex + startMarker.length);
  const after = document.slice(endIndex);

  return `${before}\n${content}\n${after}`;
}

export function renderReadmeExposureSummaryMarkdown(): string {
  const totals = collectProductToolStats();
  return [
    `- \`${totals.modules}\` product modules`,
    `- \`${totals.total}\` product tools`,
    "- `2` session/auth tools for shared `http` mode",
    `- \`${totals.total + 2}\` total MCP tools in shared \`http\` mode`
  ].join("\n");
}

export function renderReadWriteMatrixMarkdown(): string {
  const moduleStats = collectModuleStats();
  return [
    "| Module | Read | Write | Live | Key Gaps |",
    "| --- | --- | --- | --- | --- |",
    ...moduleStats.map((item) => {
      const meta = readWriteMatrixMeta[item.module as ModuleName];
      return `| ${item.module} | ${item.read} | ${item.write} | ${meta.live} | ${meta.keyGaps} |`;
    })
  ].join("\n");
}

export function renderReadmeModuleNumbersMarkdown(): string {
  const moduleStats = collectModuleStats();
  return [
    "| Module | Tools | Live status | Current breakdown |",
    "| --- | --- | --- | --- |",
    ...moduleStats.map((item) => {
      const meta = readmeModuleNumbersMeta[item.module as ModuleName];
      return `| ${item.module} | ${item.total} | ${meta.liveStatus} | ${meta.breakdown} |`;
    })
  ].join("\n");
}

export function renderImplementationStatusTableMarkdown(): string {
  const moduleStats = collectModuleStats();
  return [
    "| Module | Tools Implemented | Read | Write | Real-Live Status | Notes |",
    "| --- | --- | --- | --- | --- | --- |",
    ...moduleStats.map((item) => {
      const meta = implementationStatusMeta[item.module as ModuleName];
      return `| ${item.module} | ${item.total} | ${item.read} | ${item.write} | ${meta.live} | ${meta.notes} |`;
    })
  ].join("\n");
}

export function renderImplementationStatusTotalsMarkdown(): string {
  const totals = collectProductToolStats();
  return [
    `- Product modules implemented: \`${totals.modules}\``,
    `- Product tools implemented: \`${totals.total}\``,
    "- Auth/session tools implemented: `2`",
    `- Total MCP tools exposed: \`${totals.total + 2}\``
  ].join("\n");
}

export function renderToolStatusModuleSummaryMarkdown(): string {
  const moduleStats = collectModuleStats();
  return [
    "| Module | Tools | Real-Live Summary | Current Conclusion |",
    "| --- | --- | --- | --- |",
    ...moduleStats.map((item) => {
      const meta = toolStatusSummaryMeta[item.module as ModuleName];
      return `| ${item.module} | ${item.total} | ${meta.summary} | ${meta.conclusion} |`;
    })
  ].join("\n");
}

export function syncModuleStatsDocuments(documents: Record<string, string>): Record<string, string> {
  const nextDocuments = { ...documents };

  if (nextDocuments["README.md"]) {
    nextDocuments["README.md"] = replaceGeneratedSection(
      nextDocuments["README.md"],
      "readme-exposure-summary",
      renderReadmeExposureSummaryMarkdown()
    );
    nextDocuments["README.md"] = replaceGeneratedSection(
      nextDocuments["README.md"],
      "readme-module-numbers",
      renderReadmeModuleNumbersMarkdown()
    );
  }

  if (nextDocuments["docs/wiki/Capability-Matrix.md"]) {
    nextDocuments["docs/wiki/Capability-Matrix.md"] = replaceGeneratedSection(
      nextDocuments["docs/wiki/Capability-Matrix.md"],
      "capability-matrix",
      renderReadWriteMatrixMarkdown()
    );
  }

  if (nextDocuments["docs/wiki/Current-Implementation-Status-2026-04-17.md"]) {
    nextDocuments["docs/wiki/Current-Implementation-Status-2026-04-17.md"] = replaceGeneratedSection(
      nextDocuments["docs/wiki/Current-Implementation-Status-2026-04-17.md"],
      "implementation-status-table",
      renderImplementationStatusTableMarkdown()
    );
    nextDocuments["docs/wiki/Current-Implementation-Status-2026-04-17.md"] =
      replaceGeneratedSection(
        nextDocuments["docs/wiki/Current-Implementation-Status-2026-04-17.md"],
        "implementation-status-totals",
        renderImplementationStatusTotalsMarkdown()
      );
  }

  if (nextDocuments["docs/wiki/Tool-Status-Matrix.md"]) {
    nextDocuments["docs/wiki/Tool-Status-Matrix.md"] = replaceGeneratedSection(
      nextDocuments["docs/wiki/Tool-Status-Matrix.md"],
      "tool-status-module-summary",
      renderToolStatusModuleSummaryMarkdown()
    );
  }

  return nextDocuments;
}

export function findDriftedModuleStatsDocuments(
  documents: Record<string, string>
): string[] {
  const synced = syncModuleStatsDocuments(documents);

  return Object.keys(documents).filter((path) => documents[path] !== synced[path]);
}

export function loadTrackedModuleStatsDocuments(): Record<string, string> {
  return Object.fromEntries(
    trackedModuleStatsDocumentPaths.map((path) => [path, readFileSync(path, "utf8")])
  );
}
