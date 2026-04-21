import { describe, expect, it } from "vitest";
import {
  createCheckListTasksHandler,
  mapCheckTasks
} from "../../../../src/products/check/tools/list-tasks.js";

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

  it("renders readable preview text in MCP content", async () => {
    const handler = createCheckListTasksHandler({
      listTasks: async () => ({
        tasks: [
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
        total: 1
      })
    });

    const result = await handler({ page: 1, page_size: 20 });

    expect(result.content[0]?.text).toContain("id: task-1");
    expect(result.content[0]?.text).toContain("name: scan-demo");
    expect(result.content[0]?.text).toContain("status: running");
  });

  it("adds a project-scoped hint when the check task list is empty", async () => {
    const handler = createCheckListTasksHandler({
      listTasks: async () => ({
        tasks: [],
        total: 0
      })
    });

    const result = await handler({ page: 1, page_size: 20, project_id: "project-empty" });

    expect(result.content[0]?.text).toContain("0 check tasks found");
    expect(result.content[0]?.text).toContain("If you expected check tasks here");
    expect(result.content[0]?.text).toContain("project-empty");
  });
});
