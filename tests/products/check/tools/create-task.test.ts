import { describe, expect, it } from "vitest";
import {
  mapCreatedTask,
  previewCreateTask
} from "../../../../src/products/check/tools/create-task.js";

describe("previewCreateTask", () => {
  it("returns a dry-run summary for creating a check task", () => {
    const result = previewCreateTask({
      project_id: "project-1",
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      projectId: "project-1",
      name: "scan-demo",
      repositoryUrl: "https://example.com/demo.git",
      branchName: "main",
      language: "java",
      executed: false
    });
  });
});

describe("mapCreatedTask", () => {
  it("returns normalized created task data", () => {
    const result = mapCreatedTask({
      task_id: "task-1",
      task_name: "scan-demo",
      project_id: "project-1",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      status: "created"
    });

    expect(result.item).toEqual({
      id: "task-1",
      projectId: "project-1",
      name: "scan-demo",
      repositoryUrl: "https://example.com/demo.git",
      branchName: "main",
      language: "java",
      status: "created",
      executed: true
    });
  });
});
