import { artifactToolNames } from "../products/artifact/tools/index.js";
import { buildToolNames } from "../products/build/tools/index.js";
import { checkToolNames } from "../products/check/tools/index.js";
import { deployToolNames } from "../products/deploy/tools/index.js";
import { pipelineToolNames } from "../products/pipeline/tools/index.js";
import { repoToolNames } from "../products/repo/tools/index.js";
import { reqToolNames } from "../products/req/tools/index.js";
import { testPlanToolNames } from "../products/testplan/tools/index.js";

const WRITE_ACTIONS = new Set([
  "add",
  "append",
  "approve",
  "batch",
  "bind",
  "change",
  "clear",
  "close",
  "configure",
  "copy",
  "create",
  "delete",
  "disable",
  "enable",
  "inherit",
  "import",
  "leave",
  "merge",
  "modify",
  "move",
  "pass",
  "prepare",
  "refuse",
  "reject",
  "retry",
  "review",
  "rollback",
  "run",
  "set",
  "start",
  "stop",
  "switch",
  "upload",
  "update"
]);

const moduleToolMap = {
  Req: reqToolNames,
  Repo: repoToolNames,
  Pipeline: pipelineToolNames,
  Check: checkToolNames,
  TestPlan: testPlanToolNames,
  Deploy: deployToolNames,
  Build: buildToolNames,
  Artifact: artifactToolNames
} as const;

export type ModuleName = keyof typeof moduleToolMap;
export type ToolAccess = "read" | "write";

export type ModuleToolStats = {
  module: ModuleName;
  total: number;
  read: number;
  write: number;
};

export function classifyToolAccess(toolName: string): ToolAccess {
  const [, action = ""] = toolName.split("_");
  return WRITE_ACTIONS.has(action) ? "write" : "read";
}

export function collectModuleStats(): ModuleToolStats[] {
  return Object.entries(moduleToolMap).map(([module, toolNames]) => {
    const write = toolNames.filter((toolName) => classifyToolAccess(toolName) === "write").length;
    return {
      module: module as ModuleName,
      total: toolNames.length,
      read: toolNames.length - write,
      write
    };
  });
}

export function collectProductToolStats() {
  const moduleStats = collectModuleStats();

  return {
    modules: moduleStats.length,
    total: moduleStats.reduce((sum, item) => sum + item.total, 0),
    read: moduleStats.reduce((sum, item) => sum + item.read, 0),
    write: moduleStats.reduce((sum, item) => sum + item.write, 0)
  };
}

export function renderModuleStatsMarkdown(): string {
  const moduleStats = collectModuleStats();
  const totals = collectProductToolStats();
  const lines = [
    "| Module | Total | Read | Write |",
    "| --- | --- | --- | --- |",
    ...moduleStats.map(
      (item) => `| ${item.module} | ${item.total} | ${item.read} | ${item.write} |`
    ),
    "",
    `- Product modules: \`${totals.modules}\``,
    `- Product tools: \`${totals.total}\``,
    `- Product reads: \`${totals.read}\``,
    `- Product writes: \`${totals.write}\``,
    `- Shared HTTP total with auth tools: \`${totals.total + 2}\``
  ];

  return lines.join("\n");
}

export function renderModuleStatsReportJson(): string {
  const moduleStats = collectModuleStats();
  const totals = collectProductToolStats();

  return JSON.stringify(
    {
      modules: moduleStats,
      totals: {
        ...totals,
        httpTotalWithAuth: totals.total + 2
      }
    },
    null,
    2
  );
}
