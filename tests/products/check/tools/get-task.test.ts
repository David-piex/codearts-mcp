import { describe, expect, it } from "vitest";
import { mapCheckTask } from "../../../../src/products/check/tools/get-task.js";

describe("mapCheckTask", () => {
  it("returns normalized check task detail data", () => {
    const result = mapCheckTask({
      task_id: "task-1",
      task_name: "scan-demo",
      project_name: "Demo",
      repository_name: "demo-repo",
      branch_name: "main",
      language: "java",
      status: "running",
      last_check_time: "2026-04-16T10:00:00Z"
    });

    expect(result.item).toEqual({
      id: "task-1",
      name: "scan-demo",
      projectName: "Demo",
      repositoryName: "demo-repo",
      branchName: "main",
      language: "java",
      status: "running",
      lastCheckTime: "2026-04-16T10:00:00Z"
    });
  });
});
