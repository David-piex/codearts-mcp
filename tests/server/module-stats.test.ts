import { describe, expect, it } from "vitest";
import {
  classifyToolAccess,
  collectHttpToolTotal,
  collectModuleStats,
  collectProductToolStats,
  renderModuleStatsMarkdown,
  renderModuleStatsReportJson,
} from "../../src/server/module-stats.js";
import { collectProductToolManifest } from "../../src/server/tool-manifest.js";

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
    expect(classifyToolAccess("pipeline_inherit_project_strategy")).toBe(
      "write",
    );
    expect(classifyToolAccess("req_batch_update_work_items")).toBe("write");
    expect(classifyToolAccess("req_change_release_plan_status")).toBe("write");
    expect(classifyToolAccess("req_leave_project")).toBe("write");
    expect(classifyToolAccess("req_upload_work_item_image")).toBe("write");
    expect(classifyToolAccess("repo_associate_branch_work_items")).toBe(
      "write",
    );
    expect(classifyToolAccess("repo_bulk_delete_protected_branches")).toBe(
      "write",
    );
  });
});

describe("collectModuleStats", () => {
  it("returns the current per-module tool totals and read/write split", () => {
    expect(collectModuleStats()).toEqual([
      { module: "Req", total: 343, read: 208, write: 135 },
      { module: "Repo", total: 372, read: 241, write: 131 },
      { module: "Pipeline", total: 126, read: 75, write: 51 },
      { module: "Check", total: 104, read: 84, write: 20 },
      { module: "TestPlan", total: 313, read: 257, write: 56 },
      { module: "Deploy", total: 79, read: 58, write: 21 },
      { module: "Build", total: 138, read: 97, write: 41 },
      { module: "Artifact", total: 52, read: 44, write: 8 },
    ]);
  });

  it("returns the current aggregate product tool totals", () => {
    expect(collectProductToolStats()).toEqual({
      modules: 8,
      total: collectProductToolManifest().length,
      read: 1064,
      write: 463,
    });
  });

  it("renders a markdown report from the current stats", () => {
    expect(renderModuleStatsMarkdown()).toContain(
      "| Module | Total | Read | Write |",
    );
    expect(renderModuleStatsMarkdown()).toContain("| Deploy | 79 | 58 | 21 |");
    expect(renderModuleStatsMarkdown()).toContain("- Product modules: `8`");
    expect(renderModuleStatsMarkdown()).toContain(
      `- Product tools: \`${collectProductToolManifest().length}\``,
    );
    expect(renderModuleStatsMarkdown()).toContain(
      `- Shared HTTP total with auth tools: \`${collectHttpToolTotal()}\``,
    );
  });

  it("renders a json report from the current stats", () => {
    expect(JSON.parse(renderModuleStatsReportJson())).toEqual({
      modules: [
        { module: "Req", total: 343, read: 208, write: 135 },
        { module: "Repo", total: 372, read: 241, write: 131 },
        { module: "Pipeline", total: 126, read: 75, write: 51 },
        { module: "Check", total: 104, read: 84, write: 20 },
        { module: "TestPlan", total: 313, read: 257, write: 56 },
        { module: "Deploy", total: 79, read: 58, write: 21 },
        { module: "Build", total: 138, read: 97, write: 41 },
        { module: "Artifact", total: 52, read: 44, write: 8 },
      ],
      totals: {
        modules: 8,
        total: collectProductToolManifest().length,
        read: 1064,
        write: 463,
        httpTotalWithAuth: collectHttpToolTotal(),
      },
    });
  });
});
