import { readFileSync } from "node:fs";
import {
  collectHttpAuthToolTotal,
  collectHttpToolTotal,
  collectModuleStats,
  collectProductToolStats,
  type ModuleName
} from "./module-stats.js";

export const trackedModuleStatsDocumentPaths = [
  "README.md",
  "docs/wiki/API-Reference.md",
  "docs/wiki/Capability-Matrix.md",
  "docs/wiki/Module-Live-Readiness.md",
  "docs/wiki/Req-API-Reference.md"
] as const;

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

const moduleBaseUrlEnv: Record<ModuleName, string> = {
  Req: "HUAWEICLOUD_REQ_BASE_URL",
  Repo: "HUAWEICLOUD_REPO_BASE_URL",
  Pipeline: "HUAWEICLOUD_PIPELINE_BASE_URL",
  Check: "HUAWEICLOUD_CHECK_BASE_URL",
  TestPlan: "HUAWEICLOUD_TESTPLAN_BASE_URL",
  Deploy: "HUAWEICLOUD_DEPLOY_BASE_URL",
  Build: "HUAWEICLOUD_BUILD_BASE_URL",
  Artifact: "HUAWEICLOUD_ARTIFACT_BASE_URL"
};

const readWriteMatrixMeta: Record<ModuleName, ReadWriteMatrixMeta> = {
  Req: {
    live: "Partial",
    keyGaps:
      "Current-user info/role reads, user-feature reads, Scrum project, module, member, project-domain, iteration, plan, work-item, work-item-tree count/list, work-item tag/index-count reads, project-wide work-item record history, child-work-item, comment, work-hour, work-hour-type, image upload/download, attachment upload/download/delete, associated issue/test-case/wiki reads, plan work-item management, plan image update, plan-context work item creation, project bug/demand-statistic/project summary/project bug-density/project bugs-per-developer/project completion-rate/work-item completion-rate reads, project due-days-after/workhour-config reads, status-name check, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler/project-public-config reads, board work-item reads, work-item template/copy writes, project-template update/delete writes, and field/cache reads are implemented; deeper live coverage is still expanding for member, batch, plan, plan work-item management, plan image update, plan-context work item creation, new summary/statistics/metric reads, cache reads, and board samples"
  },
  Repo: {
    live: "Partial",
    keyGaps:
      "The original 25 Repo collaboration tools have real AK/SK validation; the 6 repository import / remote mirror tools are implemented and unit-tested, but still need dedicated live samples"
  },
  Pipeline: {
    live: "Partial",
    keyGaps:
      "The original execution surface is live-validated. Official V2/V3/V5 read tools for artifact versions, manifest versions, plugin versions, templates, V3 pipeline list/status/detail/build-result/build-records are implemented; V3 status/detail live coverage still depends on a V3-compatible pipeline_id/build_id sample. The extension-endpoint/group/variable-group/rule-management/tag-management/tenant-strategy/project-strategy tools still need real AK/SK validation"
  },
  Check: {
    live: "Partial",
    keyGaps:
      "Core Check task/ruleset/metrics/defect reads and the six official read routes are AK/SK validated; newer write/trigger configuration tools are dry-run safe and still need dedicated real-write samples"
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
      "Core Build job, record, log, parameter, domain metadata, permission, code-tag, report, and resource-spec tools have live or smoke coverage; optional Git-code endpoint reads need endpoint-specific samples"
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
      "Req now covers current-user info/role reads, user-feature reads, Scrum project, module, member, project-domain, iteration, plan, work-item, work-item-tree count/list, work-item tag/index-count reads, project-wide work-item record history, child-work-item, comment, work-hour, work-hour-type, image upload/download, attachment upload/download/delete, associated issue/test-case/wiki reads, related-user, plan work-item management, plan image update, plan-context work item creation, project bug/demand-statistic/project summary/project bug-density/project bugs-per-developer/project completion-rate/work-item completion-rate reads, project due-days-after/workhour-config reads, status-name check, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler/project-public-config reads, board work-item reads, work-item template/copy writes, project-template update/delete writes, field/cache reads, and flow-transition tools. Core project/work-item paths have live coverage; member, batch-operation, plan, plan work-item management, plan image update, plan-context work item creation, new summary/statistics/metric reads, cache reads, and board reads still need deeper live coverage."
  },
  Repo: {
    live: "Partial",
    notes:
      "The original 25 Repo collaboration tools are live-validated, including `repo_create_repository` through the HTTP MCP session on the writable sampled project. The 6 repository import / remote mirror tools are implemented and covered by unit regression tests, but still need dedicated live samples before being marked AK/SK Full."
  },
  Pipeline: {
    live: "Partial",
    notes:
      "The original 16-tool execution surface remains live-validated. Official Pipeline read/query tools now include artifact versions, manifest versions, plugin version numbers, V3 templates, V3 pipeline list, V3 status/detail, and V3 build-result/build-records. Artifact/build-result and manifest-version paths are AK/SK-smoked; V3 status/detail/build-records need a V3-compatible pipeline_id/build_id sample. The delete/enable/disable, extension-endpoint, tag-management, group-management, variable-group, rule-management, tenant-strategy, and project-strategy tools currently have unit regression coverage, but real AK/SK validation is still pending."
  },
  Check: {
    live: "Partial",
    notes:
      "Core Check task/ruleset/metrics/defect reads are AK/SK validated. The official read routes for plugins, task webhook info, code-health SVG, criterion filters, criterions, and defect task statistics are live-validated on the codearts-check Beijing 4 endpoint. Write/trigger configuration tools default to dry-run and still need dedicated real-write samples."
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
      "Core Build job, record, log, parameter, domain metadata, permission, code-tag, report, and resource-spec tools are covered by live or smoke validation. Git-code endpoint reads are implemented and unit-tested, with endpoint-specific live samples optional."
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
      "Expanded Req surface with current-user info/role, user-feature, project bug/summary/statistics/metric, and project-domain reads plus tree count/list, work-item tag/index-count, project work-item history, child work items, work-hours/work-hour-types, issue image upload/download, attachment upload/download/delete, associated wiki reads, plan work-item management, work-item template/copy writes, project-template update/delete writes, project due-days-after/workhour-config reads, and status/public-config/cache support",
    conclusion:
      "The Req MCP surface has grown from the original 8-tool core to current-user info/role and user-feature reads, project/module/member/project-domain/iteration/plan/work-item/work-item-tree/project-wide-record-history/child-work-item collaboration, work-item tag/index-count reads, project bug/demand-statistic/project summary/project bug-density/project bugs-per-developer/project completion-rate/work-item completion-rate reads, work-hours/work-hour-type reads, issue image upload/download, attachment upload/download/delete, associated issue/test-case/wiki reads, plan work-item management, plan image update, plan-context work item creation, work-item template/copy writes, project-template update/delete writes, project due-days-after/workhour-config reads, status-name check, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler and project-public-config reads, field/cache reads, and initial board work-item read coverage; core live loops are validated while deeper member, batch, plan, plan work-item management, plan image update, plan-context work item creation, summary/statistics/metric read samples, cache-read, and board samples remain pending."
  },
  Repo: {
    summary: "`25 Full / 0 Reachable / 0 Unpublished / 6 Code`",
    conclusion:
      "`repo_create_repository` remains live-validated with the previous Repo surface. The repository import / remote mirror tools are code-complete and unit-tested, but not yet counted as AK/SK Full."
  },
  Pipeline: {
    summary: "`16 Full / 4 Reachable / 1 Unpublished / 52 Code`",
    conclusion:
      "Core execution closure remains complete. Official Pipeline read/query tools are implemented; artifact/build-result and manifest-version paths have AK/SK smoke coverage, while V3 status/detail/build-records still need a V3-compatible pipeline_id/build_id sample. The new extension-endpoint/tag/group/variable-group/rule-management/tenant-strategy/project-strategy tools still need live AK/SK validation."
  },
  Check: {
    summary: "`14 Full / 0 Reachable / 0 Unpublished / 5 Code`",
    conclusion:
      "Core Check closure remains usable for task/ruleset/metrics/defect workflows; official read routes are live-validated, while dry-run-safe write/trigger tools still need dedicated real-write samples."
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
    summary: "Expanded metadata read surface with live smoke coverage",
    conclusion:
      "The Build surface now includes metadata reads for domain status, permissions, code tags, report repositories/branches, resource specs, and optional Git-code repositories/branches."
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
      "Expanded Req surface with current-user info/role and user-feature reads, project bug/summary/statistics/metric reads, project domain reads, work-item-tree count/list, work-item tag/index-count reads, project work-item history reads, child work-item reads, work-hours/work-hour-type reads, issue image upload/download, attachment upload/download/delete, associated wiki reads, plan work-item management, plan image update, plan-context work item creation, work-item template/copy writes, project-template update/delete writes, project due-days-after/workhour-config reads, status-name check, status/status-attribute/status-detail/workflow-config/template/template-config/custom-field/status-rule-flag/status-config/optional-status-config/tracker-handler and project-public-config reads plus field/cache reads and board work-item reads; see `docs/wiki/Req-Live-Validated.md` for validated paths and remaining live-depth gaps"
  },
  Repo: {
    liveStatus: "Partial",
    breakdown: "`25 Full / 0 Reachable / 0 Unpublished / 6 Code`"
  },
  Pipeline: {
    liveStatus: "Partial",
    breakdown: "`16 Full / 4 Reachable / 1 Unpublished / 52 Code`"
  },
  Check: {
    liveStatus: "Partial",
    breakdown: "`14 Full / 0 Reachable / 0 Unpublished / 5 Code`"
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
    breakdown: "Expanded metadata read surface with live smoke coverage"
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
  const authToolTotal = collectHttpAuthToolTotal();
  return [
    `- \`${totals.modules}\` product modules`,
    `- \`${totals.total}\` product tools`,
    `- \`${authToolTotal}\` session/auth tools for shared \`http\` mode`,
    `- \`${collectHttpToolTotal()}\` total MCP tools in shared \`http\` mode`
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

export function renderApiReferenceScaleMarkdown(): string {
  const moduleStats = collectModuleStats();
  const totals = collectProductToolStats();
  return [
    "| 模块 | 工具数 | 读接口 | 写接口 | 基础 URL 环境变量 |",
    "| --- | ---: | ---: | ---: | --- |",
    ...moduleStats.map(
      (item) =>
        `| ${item.module} | ${item.total} | ${item.read} | ${item.write} | \`${moduleBaseUrlEnv[item.module]}\` |`
    ),
    "",
    `产品工具合计 \`${totals.total}\` 个。HTTP 共享模式额外提供 \`auth_configure_session\` 和 \`auth_clear_session\` 两个会话工具，因此 HTTP MCP 总工具数为 \`${collectHttpToolTotal()}\`。`
  ].join("\n");
}

export function renderReqApiReferenceScaleMarkdown(): string {
  const reqStats = collectModuleStats().find((item) => item.module === "Req");

  if (!reqStats) {
    throw new Error("Req module stats are missing.");
  }

  return [
    "| 范围 | 数量 |",
    "| --- | ---: |",
    `| Req MCP 工具 | ${reqStats.total} |`,
    `| 读工具 | ${reqStats.read} |`,
    `| 写工具 | ${reqStats.write} |`,
    `| 产品工具总数 | ${collectProductToolStats().total} |`,
    `| 含鉴权的共享 HTTP 工具 | ${collectHttpToolTotal()} |`
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
  const authToolTotal = collectHttpAuthToolTotal();
  return [
    `- Product modules implemented: \`${totals.modules}\``,
    `- Product tools implemented: \`${totals.total}\``,
    `- Auth/session tools implemented: \`${authToolTotal}\``,
    `- Total MCP tools exposed: \`${collectHttpToolTotal()}\``
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

  if (nextDocuments["docs/wiki/API-Reference.md"]) {
    nextDocuments["docs/wiki/API-Reference.md"] = replaceGeneratedSection(
      nextDocuments["docs/wiki/API-Reference.md"],
      "api-reference-scale",
      renderApiReferenceScaleMarkdown()
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

  if (nextDocuments["docs/wiki/Req-API-Reference.md"]) {
    nextDocuments["docs/wiki/Req-API-Reference.md"] = replaceGeneratedSection(
      nextDocuments["docs/wiki/Req-API-Reference.md"],
      "req-api-reference-scale",
      renderReqApiReferenceScaleMarkdown()
    );
  }

  return nextDocuments;
}

export function findDriftedModuleStatsDocuments(
  documents: Record<string, string>
): string[] {
  const synced = syncModuleStatsDocuments(documents);

  return Object.keys(documents).filter(
    (path) => documents[path].replace(/\r\n/g, "\n") !== synced[path].replace(/\r\n/g, "\n")
  );
}

export function loadTrackedModuleStatsDocuments(): Record<string, string> {
  return Object.fromEntries(
    trackedModuleStatsDocumentPaths.map((path) => [path, readFileSync(path, "utf8")])
  );
}
