import { readFileSync } from "node:fs";
import { collectModuleStats, collectProductToolStats } from "./module-stats.js";

export const trackedModuleStatsDocumentPaths = [
  "README.md",
  "docs/wiki/Capability-Matrix.md",
  "docs/wiki/Module-Live-Readiness.md"
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
    live: "Partial",
    keyGaps:
      "Scrum project, module, member, iteration, plan, work-item, work-item-tree count, project-wide work-item record history, child-work-item, comment, work-hour, image upload/download, attachment delete, association, plan work-item management, plan image update, plan-context work item creation, project demand-statistic/project summary/work-item completion-rate reads, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler/project-public-config reads, board work-item reads, and field/cache reads are implemented; deeper live coverage is still expanding for member, batch, plan, plan work-item management, plan image update, plan-context work item creation, new summary/statistics reads, cache reads, and board samples"
  },
  Repo: {
    live: "Validated",
    keyGaps:
      "All 25 Repo tools, including `repo_create_repository`, now have real AK/SK validation on the writable sampled project"
  },
  Pipeline: {
    live: "Partial",
    keyGaps:
      "The original execution surface is live-validated, but the 51 newly added extension-endpoint/group/variable-group/rule-management/tag-management/tenant-strategy/project-strategy tools still need real AK/SK validation"
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
      "Expanded Deploy v4 environment/record/variable surface is implemented, but execute-class write paths still require dedicated runtime samples"
  },
  Build: {
    live: "Validated",
    keyGaps:
      "All 22 tools are now fully live-validated, including the 3 helper/configuration tools via real dry-run previews"
  },
  Artifact: {
    live: "Partial",
    keyGaps:
      "5 tools are fully live-validated, and 7 routes are now re-confirmed by live smoke as unpublished in Beijing 4"
  }
};

const implementationStatusMeta: Record<ModuleName, ImplementationStatusMeta> = {
  Req: {
    live: "Partial",
    notes:
      "Req now covers Scrum project, module, member, iteration, plan, work-item, work-item-tree count, project-wide work-item record history, child-work-item, comment, work-hour, image upload/download, attachment delete, association, related-user, plan work-item management, plan image update, plan-context work item creation, project demand-statistic/project summary/work-item completion-rate reads, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler/project-public-config reads, board work-item reads, field/cache reads, and flow-transition tools. Core project/work-item paths have live coverage; member, batch-operation, plan, plan work-item management, plan image update, plan-context work item creation, new summary/statistics reads, cache reads, and board reads still need deeper live coverage."
  },
  Repo: {
    live: "Validated",
    notes:
      "All 25 Repo tools are now live-validated. `repo_create_repository` has real AK/SK coverage through the HTTP MCP session on the writable sampled project."
  },
  Pipeline: {
    live: "Partial",
    notes:
      "The original 16-tool execution surface remains live-validated. The newly added delete/enable/disable, extension-endpoint, tag-management, group-management, variable-group, rule-management, tenant-strategy, and project-strategy tools currently have unit regression coverage, but real AK/SK validation is still pending."
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
      "`deploy_create_application`, `deploy_modify_application`, `deploy_start_app`, `deploy_get_execution_params`, `deploy_get_history_detail`, `deploy_get_app_log`, `deploy_stop_app`, and `deploy_rollback_app` already have real AK/SK coverage on at least one healthy path. The remaining practical blocker is the outdated Node.js template runtime (`Node v10.9.0` + `forever`) and the need for dedicated execute-class samples."
  },
  Build: {
    live: "Validated",
    notes:
      "All 22 tools are now AK/SK Full on the current surface, including the 3 helper/configuration tools through real dry-run previews on the live job config."
  },
  Artifact: {
    live: "Partial",
    notes:
      "Five tools are AK/SK Full; the remaining seven are re-confirmed as unpublished in Beijing 4."
  }
};

const toolStatusSummaryMeta: Record<ModuleName, ToolStatusSummaryMeta> = {
  Req: {
    summary:
      "Expanded Scrum surface with project summary/statistics, tree count, project work-item history, child work items, work-hours, issue image upload/download, attachment delete, plan work-item management, and status/public-config/cache support",
    conclusion:
      "The Req MCP surface has grown from the original 8-tool core to project/module/member/iteration/plan/work-item/work-item-tree/project-wide-record-history/child-work-item collaboration, project demand-statistic/project summary/work-item completion-rate reads, work-hours, issue image upload/download, attachment delete, plan work-item management, plan image update, plan-context work item creation, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler and project-public-config reads, field/cache reads, and initial board work-item read coverage; core live loops are validated while deeper member, batch, plan, plan work-item management, plan image update, plan-context work item creation, summary/statistics read samples, cache-read, and board samples remain pending."
  },
  Repo: {
    summary: "`25 Full / 0 Reachable / 0 Unpublished / 0 Code`",
    conclusion:
      "`repo_create_repository` has joined the previously validated Repo surface, so the full 25-tool module is now AK/SK Full."
  },
  Pipeline: {
    summary: "`16 Full / 0 Reachable / 0 Unpublished / 51 Code`",
    conclusion:
      "Core execution closure remains complete, but the new extension-endpoint/tag/group/variable-group/rule-management/tenant-strategy/project-strategy tools still need live AK/SK validation."
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
    summary: "Expanded v4 surface with partial live closure",
    conclusion:
      "The Deploy MCP surface now includes v4 application/environment/cluster/record/variable tools. Read paths and selected write paths are live-validated, while full execute-class coverage still depends on dedicated runtime samples."
  },
  Build: {
    summary: "`22 Full / 0 Reachable / 0 Unpublished / 0 Code`",
    conclusion:
      "The remote Build surface is now fully live-validated, including the 3 helper/configuration tools via real dry-run previews on the live job config."
  },
  Artifact: {
    summary: "`5 Full / 0 Reachable / 7 Unpublished / 0 Code`",
    conclusion:
      "Five tools are fully validated; seven routes are unpublished in Beijing 4. The current tenant now exposes a real published file sample at `/codearts-mcp/1.0.0/codearts-mcp.tgz`."
  }
};

const readmeModuleNumbersMeta: Record<ModuleName, ReadmeModuleNumbersMeta> = {
  Req: {
    liveStatus: "Partial",
    breakdown:
      "Expanded Scrum surface with project summary/statistics reads, work-item-tree count, project work-item history reads, child work-item reads, work-hours, issue image upload/download, attachment delete, plan work-item management, plan image update, plan-context work item creation, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler and project-public-config reads plus field/cache reads and board work-item reads; see `docs/wiki/Req-Live-Validated.md` for validated paths and remaining live-depth gaps"
  },
  Repo: {
    liveStatus: "Validated",
    breakdown: "`25 Full / 0 Reachable / 0 Unpublished / 0 Code`"
  },
  Pipeline: {
    liveStatus: "Partial",
    breakdown: "`16 Full / 0 Reachable / 0 Unpublished / 51 Code`"
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
    breakdown: "Expanded v4 surface with partial live closure; see `docs/wiki/Module-Live-Readiness.md`"
  },
  Build: {
    liveStatus: "Validated",
    breakdown: "`22 Full / 0 Reachable / 0 Unpublished / 0 Code`"
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

  if (nextDocuments["docs/wiki/Module-Live-Readiness.md"]) {
    nextDocuments["docs/wiki/Module-Live-Readiness.md"] = replaceGeneratedSection(
      nextDocuments["docs/wiki/Module-Live-Readiness.md"],
      "module-live-readiness-table",
      renderImplementationStatusTableMarkdown()
    );
    nextDocuments["docs/wiki/Module-Live-Readiness.md"] =
      replaceGeneratedSection(
        nextDocuments["docs/wiki/Module-Live-Readiness.md"],
        "module-live-readiness-totals",
        renderImplementationStatusTotalsMarkdown()
      );
    nextDocuments["docs/wiki/Module-Live-Readiness.md"] = replaceGeneratedSection(
      nextDocuments["docs/wiki/Module-Live-Readiness.md"],
      "module-live-readiness-summary",
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
