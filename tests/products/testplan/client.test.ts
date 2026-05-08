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

  it("gets task execution parameters with an optional project query", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          value: {
            task_name_regex: "^[a-z]+$",
            task_name_message: "invalid"
          }
        };
      }
    } as never);

    const result = await client.getTaskExecutionParam({
      task_uri: "task-1",
      project_uuid: "project-1"
    });

    expect(requestedPath).toBe(
      "/v4/tasks/task-1/execution-parameters?project_uuid=project-1"
    );
    expect(result).toEqual({
      task_uri: "task-1",
      parameters: {
        task_name_regex: "^[a-z]+$",
        task_name_message: "invalid"
      }
    });
  });

  it("gets task result detail with paging and result filter", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            task_result: {
              uri: "result-1",
              status: "done"
            },
            test_result_list: [
              {
                uri: "case-result-1",
                result: "passed"
              }
            ],
            total_count: 1
          }
        };
      }
    } as never);

    const result = await client.getTaskResultDetail({
      project_id: "project-1",
      task_uri: "task-1",
      result_uri: "result-1",
      page: 2,
      page_size: 10,
      result: "passed"
    });

    expect(requestedPath).toBe(
      "/v4/project-1/tasks/task-1/results/result-1?page_no=2&page_size=10&result=passed"
    );
    expect(result).toEqual({
      result_id: "result-1",
      task_result: {
        uri: "result-1",
        status: "done"
      },
      test_results: [
        {
          uri: "case-result-1",
          result: "passed"
        }
      ],
      total: 1
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

  it("lists task assigned cases through the v4 batch query endpoint", async () => {
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
                uri: "case-1",
                name: "login",
                status: "ready",
                result: "passed",
                executor_id: "user-1",
                executor_name: "alice"
              }
            ],
            total: 1
          }
        };
      }
    } as never);

    const result = await client.listTaskCasesV4({
      project_id: "project-1",
      task_uri: "task-1",
      page: 1,
      page_size: 15,
      results: ["passed"],
      status: ["ready"],
      version_uri: "version-1",
      owners: ["user-1"],
      rank_ids: ["rank-1"]
    });

    expect(requestedPath).toBe("/v4/project-1/tasks/task-1/testcases/batch-query");
    expect(requestedBody).toEqual({
      page_no: 1,
      page_size: 15,
      results: ["passed"],
      status: ["ready"],
      version_uri: "version-1",
      owners: ["user-1"],
      rank_ids: ["rank-1"]
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

  it("creates and updates test suite tasks using documented v4 endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          result: {
            uri: "task-1",
            name: "smoke suite",
            version_uri: "version-1",
            status_code: 1,
            status_name: "ready"
          }
        };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "PUT", path, body });
        return {
          result: {
            uri: "task-1",
            name: "smoke suite updated",
            version_uri: "version-1",
            status_code: 2,
            status_name: "done"
          }
        };
      }
    } as never);

    await expect(
      client.createTask({
        project_id: "project-1",
        name: "smoke suite",
        description: "daily smoke",
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      task_id: "task-1",
      name: "smoke suite",
      version_uri: "version-1",
      status_code: 1,
      status_name: "ready"
    });
    await expect(
      client.updateTask({
        project_id: "project-1",
        task_uri: "task-1",
        name: "smoke suite updated",
        description: "daily smoke updated",
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      task_id: "task-1",
      name: "smoke suite updated",
      version_uri: "version-1",
      status_code: 2,
      status_name: "done"
    });
    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v4/project-1/tasks",
        body: {
          uri: undefined,
          name: "smoke suite",
          description: "daily smoke",
          version_uri: "version-1"
        }
      },
      {
        method: "PUT",
        path: "/v4/project-1/tasks/task-1",
        body: {
          uri: undefined,
          name: "smoke suite updated",
          description: "daily smoke updated",
          version_uri: "version-1"
        }
      }
    ]);
  });

  it("batch deletes test suite tasks with a delete request body", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      delete: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            deleted_count: 2
          }
        };
      }
    } as never);

    const result = await client.batchDeleteTasks({
      project_id: "project-1",
      task_uris: ["task-1", "task-2"],
      version_uri: "version-1"
    });

    expect(requestedPath).toBe("/v4/project-1/tasks/batch-delete");
    expect(requestedBody).toEqual({
      version_uri: "version-1",
      task_uris: ["task-1", "task-2"]
    });
    expect(result).toEqual({
      deleted_count: 2,
      task_uris: ["task-1", "task-2"]
    });
  });

  it("creates task relations through the v5 endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            uri: "task-1",
            name: "suite with relations",
            version_uri: "version-1",
            status_code: 1,
            status_name: "ready"
          }
        };
      }
    } as never);

    const result = await client.createTaskRelations({
      project_id: "project-1",
      name: "suite with relations",
      version_uri: "version-1",
      owner_id: "user-1",
      service_type: 0,
      execute_way: 1
    });

    expect(requestedPath).toBe("/v5/project-1/tasks");
    expect(requestedBody).toEqual({
      uri: undefined,
      name: "suite with relations",
      stage: undefined,
      number: undefined,
      tags: undefined,
      description: undefined,
      region: undefined,
      version_uri: "version-1",
      owner_id: "user-1",
      parent_uri: undefined,
      test_case_condition: undefined,
      service_type: 0,
      module_id: undefined,
      module_name: undefined,
      release_dev: undefined,
      status_code: undefined,
      ext_param: undefined,
      execute_way: 1
    });
    expect(result).toEqual({
      task_id: "task-1",
      name: "suite with relations",
      version_uri: "version-1",
      status_code: 1,
      status_name: "ready"
    });
  });

  it("initializes and stops task execution through documented endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          total: 1,
          value: {
            task_result_vo: {
              uri: "result-1"
            }
          },
          has_more: false
        };
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });
        return {
          value: "ok"
        };
      }
    } as never);

    await expect(
      client.initTaskExecution({
        project_id: "project-1",
        task_uri: "task-1",
        release_dev: "1.0.0",
        version_uri: "version-1",
        is_query: true
      })
    ).resolves.toEqual({
      result_id: "result-1",
      task_uri: "task-1",
      total: 1,
      has_more: false
    });
    await expect(
      client.stopTaskExecution({
        project_id: "project-1",
        task_uri: "task-1",
        result_uri: "result-1"
      })
    ).resolves.toEqual({
      result_uri: "result-1",
      value: "ok",
      stopped: true
    });
    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v4/project-1/tasks/task-1/results/init",
        body: {
          release_dev: "1.0.0",
          version_uri: "version-1",
          is_query: true
        }
      },
      {
        method: "DELETE",
        path: "/v4/project-1/tasks/task-1/results/result-1"
      }
    ]);
  });
});
