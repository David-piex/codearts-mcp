import { describe, expect, it } from "vitest";
import {
  classifyToolAccess,
  collectModuleStats,
  collectProductToolStats,
  renderModuleStatsMarkdown,
  renderModuleStatsReportJson
} from "../../src/server/module-stats.js";

describe("classifyToolAccess", () => {
  it("treats list_runs as read and run_cases as write", () => {
    expect(classifyToolAccess("testplan_list_runs")).toBe("read");
    expect(classifyToolAccess("testplan_run_cases")).toBe("write");
  });

  it("uses the first action segment after the module name", () => {
    expect(classifyToolAccess("deploy_get_v4_deploy_record")).toBe("read");
    expect(classifyToolAccess("deploy_retry_v4_deploy_record")).toBe("write");
    expect(classifyToolAccess("pipeline_approve_run")).toBe("write");
    expect(classifyToolAccess("pipeline_switch_strategy")).toBe("write");
    expect(classifyToolAccess("pipeline_inherit_project_strategy")).toBe("write");
    expect(classifyToolAccess("req_batch_update_work_items")).toBe("write");
    expect(classifyToolAccess("req_leave_project")).toBe("write");
    expect(classifyToolAccess("req_upload_work_item_image")).toBe("write");
  });
});

describe("collectModuleStats", () => {
  it("returns the current per-module tool totals and read/write split", () => {
    expect(collectModuleStats()).toEqual([
      { module: "Req", total: 98, read: 60, write: 38 },
      { module: "Repo", total: 25, read: 17, write: 8 },
      { module: "Pipeline", total: 77, read: 42, write: 35 },
      { module: "Check", total: 8, read: 5, write: 3 },
      { module: "TestPlan", total: 7, read: 6, write: 1 },
      { module: "Deploy", total: 59, read: 44, write: 15 },
      { module: "Build", total: 22, read: 14, write: 8 },
      { module: "Artifact", total: 12, read: 11, write: 1 }
    ]);
  });

  it("returns the current aggregate product tool totals", () => {
    expect(collectProductToolStats()).toEqual({
      modules: 8,
        total: 308,
        read: 199,
        write: 109
    });
  });

  it("renders a markdown report from the current stats", () => {
    expect(renderModuleStatsMarkdown()).toContain("| Module | Total | Read | Write |");
    expect(renderModuleStatsMarkdown()).toContain("| Deploy | 59 | 44 | 15 |");
    expect(renderModuleStatsMarkdown()).toContain("- Product modules: `8`");
    expect(renderModuleStatsMarkdown()).toContain("- Product tools: `308`");
    expect(renderModuleStatsMarkdown()).toContain("- Shared HTTP total with auth tools: `310`");
  });

  it("renders a json report from the current stats", () => {
    expect(JSON.parse(renderModuleStatsReportJson())).toEqual({
      modules: [
        { module: "Req", total: 98, read: 60, write: 38 },
        { module: "Repo", total: 25, read: 17, write: 8 },
        { module: "Pipeline", total: 77, read: 42, write: 35 },
        { module: "Check", total: 8, read: 5, write: 3 },
        { module: "TestPlan", total: 7, read: 6, write: 1 },
        { module: "Deploy", total: 59, read: 44, write: 15 },
        { module: "Build", total: 22, read: 14, write: 8 },
        { module: "Artifact", total: 12, read: 11, write: 1 }
      ],
      totals: {
        modules: 8,
        total: 308,
        read: 199,
        write: 109,
        httpTotalWithAuth: 310
      }
    });
  });
});
