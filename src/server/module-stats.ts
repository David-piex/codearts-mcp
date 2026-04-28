import {
  classifyToolAccess,
  collectProductToolManifest,
  collectToolManifest,
  productToolModuleOrder,
  type ProductToolModule,
  type ToolAccess
} from "./tool-manifest.js";

export type ModuleName = ProductToolModule;
export { classifyToolAccess, type ToolAccess };

export type ModuleToolStats = {
  module: ModuleName;
  total: number;
  read: number;
  write: number;
};

export function collectModuleStats(): ModuleToolStats[] {
  const entries = collectProductToolManifest();

  return productToolModuleOrder.map((module) => {
    const moduleTools = entries.filter((entry) => entry.module === module);
    const write = moduleTools.filter((entry) => entry.access === "write").length;

    return {
      module,
      total: moduleTools.length,
      read: moduleTools.length - write,
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

export function collectHttpToolTotal() {
  return collectToolManifest({ mode: "http" }).length;
}

export function collectHttpAuthToolTotal() {
  return collectToolManifest({ mode: "http", kind: "auth" }).length;
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
    `- Shared HTTP total with auth tools: \`${collectHttpToolTotal()}\``
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
        httpTotalWithAuth: collectHttpToolTotal()
      }
    },
    null,
    2
  );
}
