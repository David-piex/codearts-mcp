import { describe, expect, it } from "vitest";
import { createCheckClient } from "../../../src/products/check/client.js";

describe("createCheckClient", () => {
  it("uses the documented create-task payload with rule_sets", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createCheckClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          task_id: "task-1",
          task_name: "scan-demo"
        };
      }
    } as never);

    await client.createTask({
      project_id: "project-1",
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      rule_set_id: "ruleset-1",
      task_type: "full"
    });

    expect(requestedPath).toBe("/v2/project-1/task");
    expect(requestedBody).toEqual({
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      check_type: ["source"],
      rule_sets: [
        {
          language: "java",
          ruleset_id: "ruleset-1"
        }
      ],
      task_type: "full"
    });
  });

  it("maps incremental task type to the documented inc value", async () => {
    let requestedBody: unknown;
    const client = createCheckClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    } as never);

    await client.createTask({
      project_id: "project-1",
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      language: "java",
      task_type: "incremental"
    });

    expect(requestedBody).toEqual({
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      check_type: ["source"],
      language: ["java"],
      task_type: "inc"
    });
  });

  it("uses the project-scoped metrics endpoint when project_id is provided", async () => {
    let requestedPath = "";
    const client = createCheckClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            summary: {
              code_lines: 1200
            }
          }
        };
      }
    } as never);

    await client.getMetrics({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/v2/project-1/tasks/task-1/metrics-summary");
  });

  it("sends an empty json object when running a task", async () => {
    let requestedBody: unknown;
    const client = createCheckClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    } as never);

    await client.runTask({ task_id: "task-1" });

    expect(requestedBody).toEqual({});
  });

  it("sends an empty json object when stopping a task", async () => {
    let requestedBody: unknown;
    const client = createCheckClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    } as never);

    await client.stopTask({ task_id: "task-1" });

    expect(requestedBody).toEqual({});
  });

  it("falls back to the requested task id when stop returns an empty success body", async () => {
    const client = createCheckClient({
      post: async () => null
    } as never);

    const result = await client.stopTask({ task_id: "task-1" });

    expect(result).toEqual({
      task_id: "task-1",
      status: undefined
    });
  });

  it("uses the real project-scoped tasks endpoint when project_id is provided", async () => {
    let requestedPath = "";
    const client = createCheckClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          tasks: [
            {
              task_id: "task-1",
              task_name: "scan-demo",
              git_url: "https://example.com/demo.git",
              git_branch: "main"
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listTasks({
      page: 1,
      page_size: 20,
      project_id: "project-1"
    });

    expect(requestedPath).toContain("/v2/project-1/tasks?offset=0&limit=20");
    expect(result.tasks[0]).toEqual({
      task_id: "task-1",
      task_name: "scan-demo",
      project_name: undefined,
      repository_name: "https://example.com/demo.git",
      branch_name: "main",
      language: undefined,
      status: undefined
    });
  });

  it("maps project-scoped ruleset responses from the real info payload", async () => {
    let requestedPath = "";
    const client = createCheckClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          info: [
            {
              template_id: "ruleset-1",
              template_name: "Java Default",
              language: "JAVA",
              creator_id: "system"
            }
          ]
        };
      }
    } as never);

    const result = await client.listRulesets({
      project_id: "project-1",
      page: 1,
      page_size: 20
    });

    expect(requestedPath).toContain("/v2/project-1/rulesets?offset=0&limit=20");
    expect(result).toEqual({
      rulesets: [
        {
          id: "ruleset-1",
          name: "Java Default",
          language: "java",
          is_system: true
        }
      ],
      total: 1
    });
  });

  it("uses the documented defects-detail endpoint for task issues", async () => {
    let requestedPath = "";
    const client = createCheckClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          defects: [],
          total: 0
        };
      }
    } as never);

    await client.listTaskIssues({
      task_id: "task-1",
      page: 2,
      page_size: 50
    });

    expect(requestedPath).toBe("/v2/tasks/task-1/defects-detail?offset=50&limit=50");
  });

  it("maps documented defects-detail fields into MCP issue items", async () => {
    const client = createCheckClient({
      get: async () => ({
        defects: [
          {
            defect_id: "issue-1",
            rule_name: "NullPointer",
            defect_level: "1",
            file_path: "src/App.java",
            line_number: "42"
          }
        ],
        total: 1
      })
    } as never);

    const result = await client.listTaskIssues({
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result).toEqual({
      issues: [
        {
          issue_id: "issue-1",
          rule_name: "NullPointer",
          severity: "1",
          file_path: "src/App.java",
          line: 42
        }
      ],
      total: 1
    });
  });

  it("maps top-level defects summary fields for task detail", async () => {
    const client = createCheckClient({
      get: async () => ({
        task_id: "task-1",
        task_name: "sample",
        git_url: "git@example.com/demo.git",
        git_branch: "master",
        review_result: "success",
        last_check_time: "2026-04-17T00:57:38Z"
      })
    } as never);

    const result = await client.getTask({ task_id: "task-1" });

    expect(result).toEqual({
      task_id: "task-1",
      task_name: "sample",
      project_name: undefined,
      repository_name: "git@example.com/demo.git",
      branch_name: "master",
      language: undefined,
      status: "success",
      last_check_time: "2026-04-17T00:57:38Z"
    });
  });

  it("maps top-level metric_info fields for metrics summary", async () => {
    const client = createCheckClient({
      get: async () => ({
        metric_info: {
          code_size: "5",
          code_duplication_total: "2"
        }
      })
    } as never);

    const result = await client.getMetrics({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result).toEqual({
      task_id: "task-1",
      code_lines: 5,
      issues_count: undefined,
      duplicated_lines: 2
    });
  });
});
