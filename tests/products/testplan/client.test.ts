import { describe, expect, it } from "vitest";
import { createTestPlanClient } from "../../../src/products/testplan/client.js";

describe("createTestPlanClient", () => {
  it("uses paging query params when listing plan issues", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return [];
      }
    } as never);

    const result = await client.listIssues({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 2,
      page_size: 50
    });

    expect(requestedPath).toBe(
      "/v1/projects/project-1/plans/plan-1/issues?offset=50&limit=50"
    );
    expect(result).toEqual({
      issues: [],
      total: 0
    });
  });

  it("maps richer plan issue fields", async () => {
    const client = createTestPlanClient({
      get: async () => ({
        issues: [
          {
            issue_id: "issue-1",
            subject: "login broken",
            tracker_name: "Bug",
            parent_issue_id: "parent-1",
            owner_name: "alice",
            status: "open",
            severity: "critical",
            module_name: "auth",
            iteration: "Sprint 1",
            start_date: "2026-04-01",
            end_date: "2026-04-10",
            workitem_id: 101,
            region_id: 7
          }
        ],
        total: 1
      })
    } as never);

    const result = await client.listIssues({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20
    });

    expect(result).toEqual({
      issues: [
        {
          issue_id: "issue-1",
          subject: "login broken",
          tracker_name: "Bug",
          parent_issue_id: "parent-1",
          owner_name: "alice",
          status: "open",
          severity: "critical",
          module: "auth",
          iteration: "Sprint 1",
          start_date: "2026-04-01",
          end_date: "2026-04-10",
          workitem_id: "101",
          region_id: "7"
        }
      ],
      total: 1
    });
  });

  it("passes stable list case filters and query overrides to batch-query", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          testcases: [],
          total: 0
        };
      }
    } as never);

    const result = await client.listCases({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 2,
      page_size: 50,
      keyword: "login",
      owner_id: "user-1",
      status: "draft",
      priority: "P1",
      module_id: "module-1",
      label_id: "label-1",
      test_case_type: "manual",
      query: {
        custom_field: "value",
        include_deleted: false
      }
    });

    expect(requestedPath).toBe("/GT3KServer/v4/project-1/testcases/batch-query");
    expect(requestedBody).toEqual({
      page_no: 2,
      page_size: 50,
      offset: 50,
      limit: 50,
      keyword: "login",
      iterator_uri: "plan-1",
      version_uri: "plan-1",
      owner_id: "user-1",
      status: "draft",
      priority: "P1",
      module_id: "module-1",
      label_id: "label-1",
      test_case_type: "manual",
      custom_field: "value",
      include_deleted: false
    });
    expect(result).toEqual({
      cases: [],
      total: 0
    });
  });

  it("maps run case aliases to the execute payload", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          run_id: "run-1",
          accepted_count: 1,
          status: "queued"
        };
      }
    } as never);

    const result = await client.runCases({
      project_id: "project-1",
      execute_list: [
        {
          case_id: "case-1",
          executor_id: "user-1",
          result_id: "0",
          start_time: "2020-06-22 18:11:54",
          end_time: "2020-06-23 18:11:54",
          duration: 120,
          remark: "batch smoke"
        }
      ]
    });

    expect(requestedPath).toBe("/GT3KServer/v4/project-1/testcases/execute");
    expect(requestedBody).toEqual({
      execute_list: [
        {
          testcase_id: "case-1",
          execute_id: "user-1",
          result_id: "0",
          start_time: "2020-06-22 18:11:54",
          end_time: "2020-06-23 18:11:54",
          duration: 120,
          description: "batch smoke"
        }
      ]
    });
    expect(result).toEqual({
      run_id: "run-1",
      accepted_count: 1,
      status: "queued"
    });
  });

  it("lists test suite tasks using the v4 batch query endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            tasks: [
              {
                uri: "task-1",
                name: "smoke suite",
                version_uri: "version-1",
                status_code: 1,
                status_name: "running",
                executor_id: "user-1",
                executor_name: "alice"
              }
            ],
            total: 1
          }
        };
      }
    } as never);

    const result = await client.listTasks({
      project_id: "project-1",
      version_uri: "version-1",
      page: 2,
      page_size: 10,
      keyword: "smoke",
      status_codes: [1],
      executor_ids: ["user-1"]
    });

    expect(requestedPath).toBe("/v4/project-1/versions/version-1/tasks/batch-query");
    expect(requestedBody).toEqual({
      keyword: "smoke",
      status_codes: [1],
      executor_ids: ["user-1"],
      page_no: 2,
      page_size: 10
    });
    expect(result).toEqual({
      tasks: [
        {
          task_id: "task-1",
          name: "smoke suite",
          version_uri: "version-1",
          status_code: 1,
          status_name: "running",
          executor_id: "user-1",
          executor_name: "alice"
        }
      ],
      total: 1
    });
  });

  it("gets test suite task detail with an optional version query", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            uri: "task-1",
            name: "smoke suite",
            version_uri: "version-1",
            status_code: 2,
            status_name: "done"
          }
        };
      }
    } as never);

    const result = await client.getTask({
      project_id: "project-1",
      task_uri: "task-1",
      version_uri: "version-1"
    });

    expect(requestedPath).toBe("/v4/project-1/tasks/task-1?version_uri=version-1");
    expect(result).toEqual({
      task_id: "task-1",
      name: "smoke suite",
      version_uri: "version-1",
      status_code: 2,
      status_name: "done",
      executor_id: undefined,
      executor_name: undefined
    });
  });

  it("lists task assigned cases through GT3K batch query", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            testcases: [
              {
                case_uri: "case-1",
                name: "login",
                status: "ready",
                result: "passed",
                executor_id: "user-1",
                executor_name: "alice"
              }
            ],
            total_count: 1
          }
        };
      }
    } as never);

    const result = await client.listTaskCases({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20,
      status: ["ready"],
      version_uri: "version-1"
    });

    expect(requestedPath).toBe("/GT3KServer/v4/project-1/tasks/task-1/testcases/batch-query");
    expect(requestedBody).toEqual({
      page_no: 1,
      page_size: 20,
      status: ["ready"],
      version_uri: "version-1"
    });
    expect(result).toEqual({
      cases: [
        {
          case_id: "case-1",
          name: "login",
          status: "ready",
          result: "passed",
          executor_id: "user-1",
          executor_name: "alice"
        }
      ],
      total: 1
    });
  });

  it("lists task execution results with iterator query", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            results: [
              {
                uri: "result-1",
                name: "login result",
                task_uri: "task-1",
                version_uri: "version-1",
                executor_id: "user-1",
                executor_name: "alice",
                result: "passed"
              }
            ],
            total: 1
          }
        };
      }
    } as never);

    const result = await client.listTaskResults({
      project_id: "project-1",
      task_uri: "task-1",
      page: 1,
      page_size: 20,
      iterator_uri: "version-1"
    });

    expect(requestedPath).toBe(
      "/v4/project-1/tasks/task-1/results?page_no=1&page_size=20&iterator_uri=version-1"
    );
    expect(result).toEqual({
      results: [
        {
          result_id: "result-1",
          name: "login result",
          task_uri: "task-1",
          version_uri: "version-1",
          executor_id: "user-1",
          executor_name: "alice",
          status: "passed"
        }
      ],
      total: 1
    });
  });
});
