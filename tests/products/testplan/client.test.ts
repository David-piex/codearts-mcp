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

  it("gets a test report overview", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          value: {
            uri: "report-1",
            name: "quality report",
            creator: "alice",
            version_uri: "version-1"
          }
        };
      }
    } as never);

    const result = await client.getTestReport({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "report-1"
    });

    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/test-reports/report-1"
    );
    expect(result).toEqual({
      report_id: "report-1",
      name: "quality report",
      creator: "alice",
      version_uri: "version-1",
      raw: {
        uri: "report-1",
        name: "quality report",
        creator: "alice",
        version_uri: "version-1"
      }
    });
  });

  it("lists test report issue details with filters", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 1,
          value: [
            {
              uri: "issue-detail-1",
              name: "login requirement",
              sequence_id: "REQ-1"
            }
          ]
        };
      }
    } as never);

    const result = await client.listTestReportIssues({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "report-1",
      page: 2,
      page_size: 10,
      keyword: "login",
      completed: false,
      query: {
        custom_filter: "owner"
      }
    });

    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/test-reports/report-1/issues?page_no=2&page_size=10&key_word=login&completed=false&custom_filter=owner"
    );
    expect(result).toEqual({
      issues: [
        {
          uri: "issue-detail-1",
          name: "login requirement",
          sequence_id: "REQ-1"
        }
      ],
      total: 1
    });
  });

  it("lists test report defect details with filters", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: [
            {
              workitem_id: "defect-1",
              name: "login defect",
              status_name: "closed",
              owner_name: "alice"
            }
          ]
        };
      }
    } as never);

    const result = await client.listTestReportDefects({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "report-1",
      page: 1,
      page_size: 20,
      keyword: "login",
      resolved: true
    });

    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/test-reports/report-1/defects?page_no=1&page_size=20&key_word=login&resolved=true"
    );
    expect(result).toEqual({
      defects: [
        {
          workitem_id: "defect-1",
          name: "login defect",
          status_name: "closed",
          owner_name: "alice"
        }
      ],
      total: 1
    });
  });

  it("lists test report quality attributes", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          total: 1,
          has_more: false,
          value: [
            {
              uri: "attribute-1",
              test_report_uri: "report-1",
              test_type: 1
            }
          ]
        };
      }
    } as never);

    const result = await client.listTestReportQualityAttributes({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "report-1"
    });

    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/test-reports/report-1/quality-attributes"
    );
    expect(result).toEqual({
      attributes: [
        {
          uri: "attribute-1",
          test_report_uri: "report-1",
          test_type: 1
        }
      ],
      total: 1,
      has_more: false
    });
  });

  it("lists testhub branches with offset paging", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          value: [
            {
              uri: "branch-1",
              name: "main"
            }
          ],
          total: 1
        };
      }
    } as never);

    const result = await client.listTesthubBranches({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      sort_field: "name",
      sort_type: "DESC"
    });

    expect(requestedPath).toBe(
      "/v4/testhub/projects/project-1/branches?offset=10&limit=10&sort_field=name&sort_type=DESC"
    );
    expect(result).toEqual({
      branches: [
        {
          uri: "branch-1",
          name: "main"
        }
      ],
      total: 1
    });
  });

  it("lists testhub iterators with filters", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          iterators: [
            {
              uri: "iterator-1",
              name: "Sprint 1",
              current_stage: "open"
            }
          ],
          total_count: 1
        };
      }
    } as never);

    const result = await client.listTesthubIterators({
      project_id: "project-1",
      page: 1,
      page_size: 20,
      name: "Sprint",
      current_stage: "open",
      branch_uri: "branch-1"
    });

    expect(requestedPath).toBe(
      "/v4/testhub/projects/project-1/iterators?offset=0&limit=20&name=Sprint&current_stage=open&branch_uri=branch-1"
    );
    expect(result).toEqual({
      iterators: [
        {
          uri: "iterator-1",
          name: "Sprint 1",
          current_stage: "open"
        }
      ],
      total: 1
    });
  });

  it("lists iterator issues and histories", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/issues?")) {
          return {
            issues: [
              {
                issue_id: "issue-1",
                subject: "login requirement"
              }
            ],
            total: 1
          };
        }

        return {
          histories: [
            {
              history_id: "history-1",
              operator: "alice",
              description: "created"
            }
          ],
          total: 1
        };
      }
    } as never);

    await expect(
      client.listIteratorIssues({
        project_id: "project-1",
        iterator_uri: "iterator-1",
        page: 2,
        page_size: 5
      })
    ).resolves.toEqual({
      issues: [
        {
          issue_id: "issue-1",
          subject: "login requirement"
        }
      ],
      total: 1
    });
    await expect(
      client.listIteratorHistories({
        project_id: "project-1",
        iterator_uri: "iterator-1",
        page: 1,
        page_size: 10
      })
    ).resolves.toEqual({
      histories: [
        {
          history_id: "history-1",
          operator: "alice",
          description: "created"
        }
      ],
      total: 1
    });
    expect(requests).toEqual([
      "/v4/testhub/projects/project-1/iterators/iterator-1/issues?offset=5&limit=5",
      "/v4/testhub/projects/project-1/iterators/iterator-1/histories?offset=0&limit=10"
    ]);
  });

  it("gets successful testcase count under a task", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          value: 7
        };
      }
    } as never);

    const result = await client.getTaskSuccessTestCasesCount({
      project_uuid: "project-1",
      version_uri: "version-1",
      task_uri: "task-1"
    });

    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/tasks/task-1/testcases-count"
    );
    expect(result).toEqual({
      task_uri: "task-1",
      success_count: 7,
      value: 7
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

  it("lists custom reports and loads custom report templates", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/custom-reports?")) {
          return {
            result: {
              value: [{ uri: "report-1", name: "quality report" }],
              total: 1
            }
          };
        }

        return {
          result: {
            value: {
              uri: "template-1",
              name: "quality template"
            }
          }
        };
      }
    } as never);

    await expect(
      client.listCustomReports({
        project_id: "project-1",
        version_uri: "version-1",
        type: "2"
      })
    ).resolves.toEqual({
      reports: [{ uri: "report-1", name: "quality report" }],
      total: 1
    });
    await expect(
      client.getCustomTemplate({
        project_id: "project-1",
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      template_id: "template-1",
      name: "quality template",
      raw: {
        uri: "template-1",
        name: "quality template"
      }
    });
    expect(requests).toEqual([
      "/v4/project-1/versions/version-1/custom-reports?type=2",
      "/v4/project-1/versions/version-1/custom-template"
    ]);
  });

  it("lists progress reports through the v5 endpoint", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            progress_reports: [{ uri: "progress-1", name: "weekly progress" }],
            total: 1
          }
        };
      }
    } as never);

    const result = await client.listProgressReports({
      project_uuid: "project-1",
      version_uri: "version-1",
      type: "1",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe(
      "/v5/project-1/versions/version-1/progress-reports?type=1&page_no=2&page_size=10"
    );
    expect(result).toEqual({
      reports: [{ uri: "progress-1", name: "weekly progress" }],
      total: 1
    });
  });

  it("lists custom template reports and test reports", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/custom-template-reports?")) {
          return {
            result: {
              value: [{ uri: "template-report-1", name: "template report" }],
              total: 1
            }
          };
        }

        return {
          value: [{ uri: "report-1", name: "release report" }],
          total: 1
        };
      }
    } as never);

    await expect(
      client.listCustomTemplateReports({
        project_id: "project-1",
        version_uri: "version-1",
        type: "2",
        page: 1,
        page_size: 10
      })
    ).resolves.toEqual({
      reports: [{ uri: "template-report-1", name: "template report" }],
      total: 1
    });
    await expect(
      client.listTestReports({
        project_id: "project-1",
        keyword: "release",
        own: true,
        page: 2,
        page_size: 20
      })
    ).resolves.toEqual({
      reports: [{ uri: "report-1", name: "release report" }],
      total: 1
    });
    expect(requests).toEqual([
      "/v4/project-1/versions/version-1/custom-template-reports?page_no=1&page_size=10&type=2",
      "/testreport/v4/project-1/test-reports?page_no=2&page_size=20&key_word=release&own=true"
    ]);
  });

  it("loads rule check task report and summary", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.endsWith("/summary?severity=2&status=0")) {
          return {
            result: {
              severity_list: [{ severity: "2", count: 3 }]
            }
          };
        }

        return {
          value: {
            uri: "rule-report-1",
            name: "rule check"
          }
        };
      }
    } as never);

    await expect(
      client.getRuleCheckTaskReport({
        project_id: "project-1",
        version_uri: "version-1",
        task_uri: "task-1"
      })
    ).resolves.toEqual({
      report_id: "rule-report-1",
      name: "rule check",
      raw: {
        uri: "rule-report-1",
        name: "rule check"
      }
    });
    await expect(
      client.getRuleCheckTaskSummary({
        project_id: "project-1",
        version_uri: "version-1",
        task_uri: "task-1",
        severity: "2",
        status: 0
      })
    ).resolves.toEqual({
      task_uri: "task-1",
      raw: {
        severity_list: [{ severity: "2", count: 3 }]
      }
    });
    expect(requests).toEqual([
      "/v4/project-1/versions/version-1/rule-check/tasks/task-1",
      "/v4/project-1/versions/version-1/rule-check/tasks/task-1/summary?severity=2&status=0"
    ]);
  });

  it("loads case templates and testcase v4 detail", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/case-templates/")) {
          return {
            result: {
              value: {
                uri: "template-1",
                name: "manual case"
              }
            }
          };
        }

        return {
          result: {
            value: {
              uri: "case-1",
              name: "login case"
            }
          }
        };
      }
    } as never);

    await expect(
      client.getCaseTemplate({
        project_id: "project-1",
        template_uri: "template-1"
      })
    ).resolves.toEqual({
      template_id: "template-1",
      name: "manual case",
      raw: {
        uri: "template-1",
        name: "manual case"
      }
    });
    await expect(
      client.getTestcaseV4({
        project_uuid: "project-1",
        version_uri: "version-1",
        case_uri: "case-1"
      })
    ).resolves.toEqual({
      case_id: "case-1",
      name: "login case",
      raw: {
        uri: "case-1",
        name: "login case"
      }
    });
    expect(requests).toEqual([
      "/v4/project-1/case-templates/template-1",
      "/v4/testcases/case-1?version_uri=version-1&project_uuid=project-1"
    ]);
  });

  it("lists testcase fields and test types", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/field/batch-query")) {
          return {
            result: {
              fields: [{ id: "field-1", name: "priority" }],
              total: 1
            }
          };
        }

        return {
          result: {
            value: [{ code: "manual", name: "Manual" }],
            total: 1
          }
        };
      }
    } as never);

    await expect(
      client.listTestcaseFields({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      fields: [{ id: "field-1", name: "priority" }],
      total: 1
    });
    await expect(
      client.listTestTypes({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      types: [{ code: "manual", name: "Manual" }],
      total: 1
    });
    expect(requests).toEqual([
      "/v4/project-1/testcase/field/batch-query",
      "/v4/project-1/test-types"
    ]);
  });

  it("lists TestHub services and loads TestHub testcase details", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path === "/v4/testhub/services") {
          return {
            result: {
              value: [{ service_id: 1, name: "manual" }],
              total: 1
            }
          };
        }
        if (path.includes("/testcases/")) {
          return {
            result: {
              value: {
                testcase_id: "case-1",
                name: "login case"
              }
            }
          };
        }

        return {
          result: {
            testcase_id: "case-2",
            name: "logout case"
          }
        };
      }
    } as never);

    await expect(client.listTesthubServices()).resolves.toEqual({
      services: [{ service_id: 1, name: "manual" }],
      total: 1
    });
    await expect(
      client.getTesthubCase({
        project_id: "project-1",
        case_uri: "case-1"
      })
    ).resolves.toEqual({
      case_id: "case-1",
      name: "login case",
      raw: {
        testcase_id: "case-1",
        name: "login case"
      }
    });
    await expect(
      client.getTesthubCaseByNumber({
        project_id: "project-1",
        testcase_number: "TC-001",
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      case_id: "case-2",
      name: "logout case",
      raw: {
        testcase_id: "case-2",
        name: "logout case"
      }
    });
    expect(requests).toEqual([
      "/v4/testhub/services",
      "/v4/testhub/projects/project-1/testcases/case-1",
      "/v4/testhub/projects/project-1/testcase?testcase_number=TC-001&version_uri=version-1"
    ]);
  });

  it("lists TestHub v5 iterators and loads iterator detail", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/v5/testhub/projects/")) {
          return [
            {
              plan_id: "iterator-1",
              name: "sprint 1"
            }
          ];
        }

        return {
          value: {
            uri: "iterator-1",
            name: "sprint 1"
          }
        };
      }
    } as never);

    await expect(
      client.listTesthubIteratorsV5({
        project_id: "project-1",
        page: 2,
        page_size: 10,
        name: "sprint",
        current_stage: "execute",
        branch_uri: "master",
        fix_version_ids: "fix-1",
        query_all_version: true
      })
    ).resolves.toEqual({
      iterators: [
        {
          plan_id: "iterator-1",
          name: "sprint 1"
        }
      ],
      total: 1
    });
    await expect(
      client.getIterator({
        project_uuid: "project-1",
        iterator_uri: "iterator-1"
      })
    ).resolves.toEqual({
      iterator_id: "iterator-1",
      name: "sprint 1",
      raw: {
        uri: "iterator-1",
        name: "sprint 1"
      }
    });
    expect(requests).toEqual([
      "/v5/testhub/projects/project-1/iterators?offset=10&limit=10&name=sprint&current_stage=execute&branch_uri=master&fix_version_ids=fix-1&query_all_version=true",
      "/v4/iterators/iterator-1?project_uuid=project-1"
    ]);
  });

  it("lists attachments and project field configurations", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/attachments?")) {
          return {
            result: {
              value: [{ uri: "attachment-1", name: "evidence.png" }],
              total: 1
            }
          };
        }

        return {
          result: {
            value: [{ field_key: "priority", name: "Priority" }],
            total: 1
          }
        };
      }
    } as never);

    await expect(
      client.listAttachments({
        project_id: "project-1",
        resource_uri: "case-1",
        resource_type: "TestCase"
      })
    ).resolves.toEqual({
      attachments: [{ uri: "attachment-1", name: "evidence.png" }],
      total: 1
    });
    await expect(
      client.listProjectFieldConfigs({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      fields: [{ field_key: "priority", name: "Priority" }],
      total: 1
    });
    expect(requests).toEqual([
      "/GT3KServer/v4/project-1/resources/case-1/attachments?resource_type=TestCase",
      "/GT3KServer/v4/projects/project-1/field-configs"
    ]);
  });

  it("loads project users and metadata configuration endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/users?")) {
          return {
            value: [{ user_id: "user-1", user_name: "alice" }],
            total: 1
          };
        }
        if (path.includes("/current-user/package-permission?")) {
          return {
            result: {
              value: {
                has_package_permission: true
              }
            }
          };
        }
        if (path.includes("/users/user-1/package-permission?")) {
          return {
            value: {
              has_package_permission: false
            }
          };
        }
        if (path.endsWith("/domain-user-count")) {
          return {
            result: {
              value: 12
            }
          };
        }
        if (path.includes("/tags?")) {
          return {
            result: {
              value: [{ label_id: "tag-1", label_name: "smoke" }],
              total: 1
            }
          };
        }

        return {
          result: {
            value: {
              display: [{ field_key: "name" }],
              hidden: [{ field_key: "owner" }]
            }
          }
        };
      }
    } as never);

    await expect(
      client.listProjectUsers({
        project_id: "project-1",
        page: 2,
        page_size: 20,
        keyword: "ali"
      })
    ).resolves.toEqual({
      users: [{ user_id: "user-1", user_name: "alice" }],
      total: 1
    });
    await expect(
      client.getCurrentUserPackagePermission({
        project_id: "project-1",
        package_type: "TEST_PLAN"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      package_type: "TEST_PLAN",
      raw: {
        has_package_permission: true
      }
    });
    await expect(
      client.getUserPackagePermission({
        project_id: "project-1",
        user_id: "user-1",
        package_type: "TEST_PLAN"
      })
    ).resolves.toEqual({
      user_id: "user-1",
      package_type: "TEST_PLAN",
      raw: {
        has_package_permission: false
      }
    });
    await expect(
      client.getDomainUserCount({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      value: 12,
      raw: {
        value: 12
      }
    });
    await expect(
      client.listProjectTags({
        project_id: "project-1",
        resource_type: "TestCase"
      })
    ).resolves.toEqual({
      tags: [{ label_id: "tag-1", label_name: "smoke" }],
      total: 1
    });
    await expect(
      client.getCustomizedColumns({
        project_id: "project-1",
        service_type: 1,
        stage_type: 2
      })
    ).resolves.toEqual({
      project_id: "project-1",
      raw: {
        display: [{ field_key: "name" }],
        hidden: [{ field_key: "owner" }]
      }
    });
    expect(requests).toEqual([
      "/v4/projects/project-1/users?page_no=2&page_size=20&key_word=ali",
      "/v4/projects/project-1/current-user/package-permission?package_type=TEST_PLAN",
      "/v4/projects/project-1/users/user-1/package-permission?package_type=TEST_PLAN",
      "/v4/projects/project-1/domain-user-count",
      "/v4/projects/project-1/tags?resource_type=TestCase",
      "/GT3KServer/v4/projects/project-1/customized-columns?service_type=1&stage_type=2"
    ]);
  });
});
