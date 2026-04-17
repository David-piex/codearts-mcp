import { describe, expect, it } from "vitest";
import { mapCheckTasks } from "../../../../src/products/check/tools/list-tasks.js";

describe("mapCheckTasks", () => {
  it("returns normalized check tasks with pagination", () => {
    const result = mapCheckTasks(
      [
        {
          task_id: "task-1",
          task_name: "scan-demo",
          project_name: "demo",
          repository_name: "demo-repo",
          branch_name: "main",
          language: "java",
          status: "running"
        }
      ],
      1,
      20,
      1
    );

    expect(result.items).toEqual([
      {
        id: "task-1",
        name: "scan-demo",
        projectName: "demo",
        repositoryName: "demo-repo",
        branchName: "main",
        language: "java",
        status: "running"
      }
    ]);
    expect(result.page_info).toEqual({
      page: 1,
      pageSize: 20,
      total: 1
    });
  });
});
