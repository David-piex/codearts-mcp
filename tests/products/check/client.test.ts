import { describe, expect, it } from "vitest";
import { createCheckClient } from "../../../src/products/check/client.js";

function createClient(transport: Record<string, unknown>) {
  return createCheckClient(transport as never);
}

function createTaskInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "project-1",
    task_name: "scan-demo",
    git_url: "https://example.com/demo.git",
    git_branch: "main",
    language: "java",
    ...(overrides ?? {})
  };
}

function createProjectPageInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "project-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  };
}

function createTaskRefInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    task_id: "task-1",
    ...(overrides ?? {})
  };
}

function createTaskPageInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    task_id: "task-1",
    page: 1,
    page_size: 20,
    ...(overrides ?? {})
  };
}

function createProjectTaskInput<T extends Record<string, unknown>>(overrides?: T) {
  return {
    project_id: "project-1",
    task_id: "task-1",
    ...(overrides ?? {})
  };
}

describe("createCheckClient", () => {
  it("uses the documented create-task payload with rule_sets", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          task_id: "task-1",
          task_name: "scan-demo"
        };
      }
    });

    await client.createTask(createTaskInput({
      rule_set_id: "ruleset-1",
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist",
      task_type: "full"
    }));

    expect(requestedPath).toBe("/v2/project-1/task");
    expect(requestedBody).toEqual({
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      check_type: ["source"],
      resource_pool_id: "pool-1",
      resource_pool_type: "custom",
      include_paths: "src,lib",
      exclude_dir: "dist",
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
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    });

    await client.createTask(createTaskInput({
      task_type: "incremental"
    }));

    expect(requestedBody).toEqual({
      task_name: "scan-demo",
      git_url: "https://example.com/demo.git",
      git_branch: "main",
      check_type: ["source"],
      resource_pool_id: undefined,
      resource_pool_type: undefined,
      include_paths: undefined,
      exclude_dir: undefined,
      language: ["java"],
      task_type: "inc"
    });
  });

  it("uses the project-scoped metrics endpoint when project_id is provided", async () => {
    let requestedPath = "";
    const client = createClient({
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
    });

    await client.getMetrics(createProjectTaskInput());

    expect(requestedPath).toBe("/v2/project-1/tasks/task-1/metrics-summary");
  });

  it("sends an empty json object when running a task", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    });

    await client.runTask(createTaskRefInput());

    expect(requestedBody).toEqual({});
  });

  it("passes the documented ref when running a task", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1",
          exec_id: "exec-1"
        };
      }
    });

    const result = await client.runTask(
      createTaskRefInput({
        ref: "refs/merge-requests/12/head"
      })
    );

    expect(requestedBody).toEqual({
      ref: "refs/merge-requests/12/head"
    });
    expect(result).toEqual({
      task_id: "task-1",
      job_id: "exec-1",
      exec_id: "exec-1",
      status: undefined
    });
  });

  it("sends an empty json object when stopping a task", async () => {
    let requestedBody: unknown;
    const client = createClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          task_id: "task-1"
        };
      }
    });

    await client.stopTask(createTaskRefInput());

    expect(requestedBody).toEqual({});
  });

  it("falls back to the requested task id when stop returns an empty success body", async () => {
    const client = createClient({
      post: async () => null
    });

    const result = await client.stopTask(createTaskRefInput());

    expect(result).toEqual({
      task_id: "task-1",
      status: undefined
    });
  });

  it("uses the real project-scoped tasks endpoint when project_id is provided", async () => {
    let requestedPath = "";
    const client = createClient({
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
    });

    const result = await client.listTasks(createProjectPageInput());

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
    const client = createClient({
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
    });

    const result = await client.listRulesets(createProjectPageInput());

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
    const client = createClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          defects: [],
          total: 0
        };
      }
    });

    await client.listTaskIssues(
      createTaskPageInput({
        page: 2,
        page_size: 50,
        severity: "1",
        rule_id: "rule-1",
        rule_name: "NullPointer",
        file_path: "src/App.java",
        status: "open",
        checker: "java"
      })
    );

    expect(requestedPath).toBe(
      "/v2/tasks/task-1/defects-detail?offset=50&limit=50&defect_level=1&rule_id=rule-1&rule_name=NullPointer&file_path=src%2FApp.java&status=open&checker=java"
    );
  });

  it("maps documented defects-detail fields into MCP issue items", async () => {
    const client = createClient({
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
    });

    const result = await client.listTaskIssues(createTaskPageInput());

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

  it("uses documented task log, path tree, and console log endpoints", async () => {
    const paths: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        paths.push(path);
        if (path.includes("/log-detail")) {
          return { result: { log_info: [{ display_name: "compile", level: "error" }] } };
        }
        if (path.includes("/listpathtree")) {
          return {
            result: {
              info: [{ file_name: "src", file_path: "/src", is_leaf: false }],
              total: 1
            }
          };
        }
        return { result: { log: "scan started", hasMore: false } };
      }
    });

    await expect(client.getTaskLogDetail({
      project_id: "project-1",
      task_id: "task-1",
      execute_id: "exec-1"
    })).resolves.toEqual({
      task_id: "task-1",
      raw: { log_info: [{ display_name: "compile", level: "error" }] }
    });
    await expect(client.listTaskPathTree({
      project_id: "project-1",
      task_id: "task-1",
      current_path: "/src",
      page: 2,
      page_size: 20
    })).resolves.toEqual({
      nodes: [{ file_name: "src", file_path: "/src", is_leaf: false }],
      total: 1
    });
    await expect(client.getConsoleLog({
      job_id: "job-1",
      start_offset: 0,
      end_offset: 100,
      size: 200,
      sort: "asc"
    })).resolves.toEqual({
      job_id: "job-1",
      raw: { log: "scan started", hasMore: false }
    });
    expect(paths).toEqual([
      "/v2/project-1/tasks/task-1/log-detail?execute_id=exec-1",
      "/v2/project-1/tasks/task-1/listpathtree?offset=20&limit=20&current_path=%2Fsrc",
      "/v1/console-log?job_id=job-1&start_offset=0&end_offset=100&size=200&sort=asc"
    ]);
  });

  it("maps top-level defects summary fields for task detail", async () => {
    const client = createClient({
      get: async () => ({
        task_id: "task-1",
        task_name: "sample",
        git_url: "git@example.com/demo.git",
        git_branch: "master",
        review_result: "success",
        last_check_time: "2026-04-17T00:57:38Z"
      })
    });

    const result = await client.getTask(createTaskRefInput());

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
    const client = createClient({
      get: async () => ({
        metric_info: {
          code_size: "5",
          code_duplication_total: "2"
        }
      })
    });

    const result = await client.getMetrics(createProjectTaskInput());

    expect(result).toEqual({
      task_id: "task-1",
      code_lines: 5,
      issues_count: undefined,
      duplicated_lines: 2
    });
  });

  it("reads additional task metadata endpoints from the Check API docs", async () => {
    const requests: string[] = [];
    const client = createClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.endsWith("/resource-pool")) {
          return { result: { pool_id: "pool-1", pool_name: "default" } };
        }
        if (path.endsWith("/jobs")) {
          return { result: { jobs: [{ job_id: "job-1", status: "done" }], total: 1 } };
        }
        if (path.endsWith("/progress")) {
          return { result: { progress: 100 } };
        }
        if (path.endsWith("/rulesets")) {
          return { result: { value: [{ id: "ruleset-1", name: "Java" }], total: 1 } };
        }
        if (path.endsWith("/check-parameters")) {
          return { result: { parameters: [{ id: "param-1", name: "threshold" }], total: 1 } };
        }
        if (path.endsWith("/settings")) {
          return { result: { value: { language: "java" } } };
        }

        return { result: { branches: [{ id: "branch-1", name: "main" }], total: 1 } };
      }
    });

    await expect(client.getTaskResourcePool(createTaskRefInput())).resolves.toEqual({
      task_id: "task-1",
      raw: { pool_id: "pool-1", pool_name: "default" }
    });
    await expect(client.listTaskJobs(createTaskRefInput())).resolves.toEqual({
      jobs: [{ job_id: "job-1", status: "done" }],
      total: 1
    });
    await expect(client.getTaskProgress(createTaskRefInput())).resolves.toEqual({
      task_id: "task-1",
      raw: { progress: 100 }
    });
    await expect(client.listTaskRulesetsV2(createProjectTaskInput())).resolves.toEqual({
      rulesets: [{ id: "ruleset-1", name: "Java" }],
      total: 1
    });
    await expect(client.listTaskRulesetsV3(createProjectTaskInput())).resolves.toEqual({
      rulesets: [{ id: "ruleset-1", name: "Java" }],
      total: 1
    });
    await expect(
      client.getTaskRulesetCheckParametersV2({
        project_id: "project-1",
        task_id: "task-1",
        ruleset_id: "ruleset-1"
      })
    ).resolves.toEqual({
      parameters: [{ id: "param-1", name: "threshold" }],
      total: 1
    });
    await expect(
      client.getTaskRulesetCheckParametersV3({
        project_id: "project-1",
        task_id: "task-1",
        ruleset_id: "ruleset-1"
      })
    ).resolves.toEqual({
      parameters: [{ id: "param-1", name: "threshold" }],
      total: 1
    });
    await expect(client.getTaskSettings(createProjectTaskInput())).resolves.toEqual({
      task_id: "task-1",
      raw: { language: "java" }
    });
    await expect(client.listTaskBranches(createProjectTaskInput())).resolves.toEqual({
      branches: [{ id: "branch-1", name: "main" }],
      total: 1
    });

    expect(requests).toEqual([
      "/v1/tasks/task-1/resource-pool",
      "/v4/tasks/task-1/jobs",
      "/v2/tasks/task-1/progress",
      "/v2/project-1/tasks/task-1/rulesets",
      "/v3/project-1/tasks/task-1/rulesets",
      "/v2/project-1/tasks/task-1/ruleset/ruleset-1/check-parameters",
      "/v3/project-1/tasks/task-1/ruleset/ruleset-1/check-parameters",
      "/v2/project-1/tasks/task-1/settings",
      "/v3/project-1/tasks/task-1/branches"
    ]);
  });
});
