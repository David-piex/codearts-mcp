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

  it("reads additional project metadata endpoints from the tmp API docs", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/defects?")) {
          return { result: { value: [{ id: "defect-1", subject: "login bug" }], total: 1 } };
        }
        if (path.includes("/issues?")) {
          return { result: { value: [{ id: "issue-1", subject: "login story" }], total: 1 } };
        }
        if (path.includes("/field-configs")) {
          return { result: { value: [{ uri: "field-1", name: "priority" }], total: 1 } };
        }
        if (path.includes("/user-info/check")) {
          return { code: "200", data: "ok", message: "success" };
        }
        if (path.includes("/mindmap-creator-name")) {
          return { code: "200", data: "alice" };
        }
        if (path.includes("/permission/")) {
          return { code: "200", data: "read" };
        }
        if (path.includes("/v4/testhub/progress/")) {
          return { uri: "operation-2", completed: false };
        }

        return { data: { uri: "operation-1", completed: true } };
      }
    } as never);

    await expect(
      client.listProjectDefects({
        project_id: "project-1",
        page: 2,
        page_size: 10,
        keyword: "login",
        module_id: "module-1",
        iteration_ids: "iteration-1"
      })
    ).resolves.toEqual({
      defects: [{ id: "defect-1", subject: "login bug" }],
      total: 1
    });
    await expect(
      client.listProjectIssues({
        project_id: "project-1",
        page: 1,
        page_size: 20,
        tracker_id: "tracker-1",
        status_id: "status-1",
        module_id: "module-1",
        show_page_flag: "true",
        keyword: "login"
      })
    ).resolves.toEqual({
      issues: [{ id: "issue-1", subject: "login story" }],
      total: 1
    });
    await expect(client.listV4ProjectFieldConfigs({ project_id: "project-1" })).resolves.toEqual({
      fields: [{ uri: "field-1", name: "priority" }],
      total: 1
    });
    await expect(client.checkUserInfo({ project_id: "project-1" })).resolves.toEqual({
      project_id: "project-1",
      value: "ok",
      raw: { code: "200", data: "ok", message: "success" }
    });
    await expect(client.getMindmapCreatorName({ project_id: "project-1" })).resolves.toEqual({
      project_id: "project-1",
      value: "alice",
      raw: { code: "200", data: "alice" }
    });
    await expect(
      client.getMindmapPermission({
        project_id: "project-1",
        id: "mindmap-1"
      })
    ).resolves.toEqual({
      id: "mindmap-1",
      value: "read",
      raw: { code: "200", data: "read" }
    });
    await expect(
      client.getProjectProgress({
        project_id: "project-1",
        operation_uri: "operation-1"
      })
    ).resolves.toEqual({
      raw: { uri: "operation-1", completed: true }
    });
    await expect(
      client.getTesthubProgress({
        project_uuid: "project-1",
        operation_uri: "operation-2"
      })
    ).resolves.toEqual({
      raw: { uri: "operation-2", completed: false }
    });

    expect(requests).toEqual([
      "/v4/projects/project-1/defects?page_no=2&page_size=10&key_word=login&module_id=module-1&iteration_ids=iteration-1",
      "/v4/projects/project-1/issues?page_no=1&page_size=20&tracker_id=tracker-1&status_id=status-1&module_id=module-1&show_page_flag=true&key_word=login",
      "/v4/projects/project-1/field-configs",
      "/v1/project-1/user-info/check",
      "/v2/project-1/mindmap-creator-name",
      "/v1/project-1/permission/mindmap-1",
      "/v1/project-1/progress/operation-1",
      "/v4/testhub/progress/operation-2?project_uuid=project-1"
    ]);
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

  it("gets quality report overview statistics", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            is_async_operate: true,
            async_uri: "operation-1",
            status: "success"
          }
        };
      }
    } as never);

    const result = await client.getQualityReportOverview({
      project_id: "project-1",
      version_uri: "version-1",
      module_id: "module-1",
      fixed_version_id: "fixed-1",
      owner_id: "user-1",
      own: true,
      pi_filter: { all_pi: true }
    });

    expect(requestedPath).toBe("/v5/projects/project-1/report/overview");
    expect(requestedBody).toEqual({
      version_uri: "version-1",
      module_id: "module-1",
      fixed_version_id: "fixed-1",
      owner_id: "user-1",
      own: true,
      pi_filter: { all_pi: true }
    });
    expect(result).toEqual({
      raw: {
        is_async_operate: true,
        async_uri: "operation-1",
        status: "success"
      }
    });
  });

  it("gets service type overview statistics", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            is_async_operate: true,
            async_uri: "operation-2",
            status: "success"
          }
        };
      }
    } as never);

    const result = await client.getServiceTypeOverview({
      project_id: "project-1",
      version_uri: "version-1"
    });

    expect(requestedPath).toBe("/v5/projects/project-1/service-types/overview");
    expect(requestedBody).toEqual({
      version_uri: "version-1"
    });
    expect(result).toEqual({
      raw: {
        is_async_operate: true,
        async_uri: "operation-2",
        status: "success"
      }
    });
  });

  it("lists requirements overview entries", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            value: {
              total_number: 1,
              requirement_overview_list: [{ workitemId: "req-1", name: "login" }]
            }
          }
        };
      }
    } as never);

    const result = await client.listRequirementsOverview({
      project_id: "project-1",
      version_uri: "version-1",
      page: 1,
      page_size: 5,
      key_word: "login"
    });

    expect(requestedPath).toBe("/v4/project-1/versions/version-1/requirements/overview");
    expect(requestedBody).toEqual({
      page_no: 1,
      page_size: 5,
      key_word: "login"
    });
    expect(result).toEqual({
      requirements: [{ workitemId: "req-1", name: "login" }],
      total: 1,
      raw: {
        total_number: 1,
        requirement_overview_list: [{ workitemId: "req-1", name: "login" }]
      }
    });
  });

  it("lists requirements overview testcase details", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            value: {
              total_number: 1,
              testcase_list: [{ case_no: "TC-1", case_name: "login succeeds" }]
            }
          }
        };
      }
    } as never);

    const result = await client.listRequirementsOverviewTestcases({
      project_id: "project-1",
      version_uri: "version-1",
      work_item_id: "REQ-1",
      work_item_name: "login",
      page: 2,
      page_size: 10
    });

    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/requirements/overview/testcase"
    );
    expect(requestedBody).toEqual({
      work_item_id: "REQ-1",
      work_item_name: "login",
      page_no: 2,
      page_size: 10
    });
    expect(result).toEqual({
      testcases: [{ case_no: "TC-1", case_name: "login succeeds" }],
      total: 1,
      raw: {
        total_number: 1,
        testcase_list: [{ case_no: "TC-1", case_name: "login succeeds" }]
      }
    });
  });

  it("lists requirements overview defect details", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            value: {
              total_number: 1,
              defect_list: [{ defect_no: "BUG-1", defect_name: "login fails" }]
            }
          }
        };
      }
    } as never);

    const result = await client.listRequirementsOverviewDefects({
      project_id: "project-1",
      version_uri: "version-1",
      work_item_id: "REQ-1",
      page: 1,
      page_size: 5
    });

    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/requirements/overview/defect"
    );
    expect(requestedBody).toEqual({
      work_item_id: "REQ-1",
      page_no: 1,
      page_size: 5
    });
    expect(result).toEqual({
      defects: [{ defect_no: "BUG-1", defect_name: "login fails" }],
      total: 1,
      raw: {
        total_number: 1,
        defect_list: [{ defect_no: "BUG-1", defect_name: "login fails" }]
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

  it("lists issue related testcases", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            value: {
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
              total_count: 1
            }
          }
        };
      }
    } as never);

    const result = await client.listIssueTestcases({
      project_id: "project-1",
      issue_id: "issue-1",
      page: 2,
      page_size: 10,
      version_uri: "version-1",
      relate_type: "requirement",
      key_word: "login",
      sort_field: "name",
      sort_type: "DESC",
      rank_ids: ["rank-1"],
      result_codes: ["0"]
    });

    expect(requestedPath).toBe("/v4/project-1/issues/issue-1/testcases/batch-query");
    expect(requestedBody).toEqual({
      page_no: 2,
      page_size: 10,
      version_uri: "version-1",
      relate_type: "requirement",
      key_word: "login",
      sort_field: "name",
      sort_type: "DESC",
      rank_ids: ["rank-1"],
      result_codes: ["0"]
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
      total: 1,
      raw: {
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
        total_count: 1
      }
    });
  });

  it("lists issue testcase counts", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          result: {
            value: [{ issue_id: "issue-1", case_count: 3 }]
          }
        };
      }
    } as never);

    const result = await client.listIssueCaseCounts({
      project_id: "project-1",
      version_uri: "version-1",
      issue_ids: ["issue-1"],
      service_type: -1,
      service_types: [0, 1],
      parent_id: "parent-1",
      task_uri: "task-1"
    });

    expect(requestedPath).toBe("/v4/issues/case-total");
    expect(requestedBody).toEqual({
      project_uuid: "project-1",
      version_uri: "version-1",
      issue_ids: ["issue-1"],
      service_type: -1,
      service_types: [0, 1],
      parent_id: "parent-1",
      task_uri: "task-1"
    });
    expect(result).toEqual({
      counts: [{ issue_id: "issue-1", case_count: 3 }],
      total: 1
    });
  });

  it("searches features and lists feature testcase counts", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path === "/v4/features/search") {
          return {
            result: {
              value: [{ uri: "feature-1", name: "login", type: "TestItem" }],
              total: 1
            }
          };
        }

        return {
          result: {
            value: [{ feature_uri: "feature-1", case_count: 3 }]
          }
        };
      }
    } as never);

    await expect(
      client.searchFeatures({
        project_uuid: "project-1",
        version_uri: "version-1",
        key_word: "login",
        page: 1,
        page_size: 10,
        parent_uri: "parent-1"
      })
    ).resolves.toEqual({
      features: [{ uri: "feature-1", name: "login", type: "TestItem" }],
      total: 1,
      raw: {
        value: [{ uri: "feature-1", name: "login", type: "TestItem" }],
        total: 1
      }
    });
    await expect(
      client.listFeatureCaseCounts({
        project_uuid: "project-1",
        version_uri: "version-1",
        upward_recursion: true,
        contain_root: true,
        feature_uris: ["feature-1"],
        test_case_conditions: []
      })
    ).resolves.toEqual({
      counts: [{ feature_uri: "feature-1", case_count: 3 }],
      total: 1,
      raw: {
        value: [{ feature_uri: "feature-1", case_count: 3 }]
      }
    });
    expect(requests).toEqual([
      {
        path: "/v4/features/search",
        body: {
          version_uri: "version-1",
          project_uuid: "project-1",
          key_word: "login",
          page_no: 1,
          page_size: 10,
          parent_uri: "parent-1"
        }
      },
      {
        path: "/v4/versions/version-1/features/case-total",
        body: {
          project_uuid: "project-1",
          contain_root: true,
          test_case_conditions: [],
          feature_uris: ["feature-1"],
          upward_recursion: true
        }
      }
    ]);
  });

  it("lists feature children from v4 and GT3K feature tree endpoints", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        return {
          result: {
            value: [
              {
                uri: "feature-child-1",
                name: "child",
                type: "TestItem",
                case_total: 2,
                has_child: false
              }
            ],
            total: 1
          }
        };
      }
    } as never);

    const input = {
      feature_uri: "feature-1",
      project_uuid: "project-1",
      version_uri: "version-1",
      service_type: "0",
      contain_total: true,
      sort_type: "ASC"
    };

    await expect(client.listFeatureChildren(input)).resolves.toEqual({
      children: [
        {
          uri: "feature-child-1",
          name: "child",
          type: "TestItem",
          case_total: 2,
          has_child: false
        }
      ],
      total: 1,
      raw: {
        value: [
          {
            uri: "feature-child-1",
            name: "child",
            type: "TestItem",
            case_total: 2,
            has_child: false
          }
        ],
        total: 1
      }
    });
    await expect(client.listGt3kFeatureChildren(input)).resolves.toEqual({
      children: [
        {
          uri: "feature-child-1",
          name: "child",
          type: "TestItem",
          case_total: 2,
          has_child: false
        }
      ],
      total: 1,
      raw: {
        value: [
          {
            uri: "feature-child-1",
            name: "child",
            type: "TestItem",
            case_total: 2,
            has_child: false
          }
        ],
        total: 1
      }
    });
    await expect(client.listFeatureChildrenV5(input)).resolves.toEqual({
      children: [
        {
          uri: "feature-child-1",
          name: "child",
          type: "TestItem",
          case_total: 2,
          has_child: false
        }
      ],
      total: 1,
      raw: {
        value: [
          {
            uri: "feature-child-1",
            name: "child",
            type: "TestItem",
            case_total: 2,
            has_child: false
          }
        ],
        total: 1
      }
    });
    await expect(
      client.listGt3kFeatureChildrenV5({
        ...input,
        page_number: 1,
        page_size: 10
      })
    ).resolves.toEqual({
      children: [
        {
          uri: "feature-child-1",
          name: "child",
          type: "TestItem",
          case_total: 2,
          has_child: false
        }
      ],
      total: 1,
      raw: {
        value: [
          {
            uri: "feature-child-1",
            name: "child",
            type: "TestItem",
            case_total: 2,
            has_child: false
          }
        ],
        total: 1
      }
    });
    expect(requests).toEqual([
      {
        path: "/v4/features/feature-1/children",
        body: {
          project_uuid: "project-1",
          version_uri: "version-1",
          service_type: "0",
          contain_total: true,
          sort_type: "ASC"
        }
      },
      {
        path: "/GT3KServer/v4/features/feature-1/children",
        body: {
          project_uuid: "project-1",
          version_uri: "version-1",
          service_type: "0",
          contain_total: true,
          sort_type: "ASC"
        }
      },
      {
        path: "/v5/features/feature-1/children",
        body: {
          project_uuid: "project-1",
          version_uri: "version-1",
          service_type: "0",
          contain_total: true,
          sort_type: "ASC"
        }
      },
      {
        path: "/GT3KServer/v5/features/feature-1/children",
        body: {
          project_uuid: "project-1",
          version_uri: "version-1",
          service_type: "0",
          contain_total: true,
          sort_type: "ASC",
          page_number: 1,
          page_size: 10
        }
      }
    ]);
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

  it("lists rule check tasks and loads report and summary", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      post: async (path: string, body: unknown) => {
        requests.push(`${path} ${JSON.stringify(body)}`);
        return {
          result: {
            value: [
              {
                uri: "task-1",
                name: "rule check",
                status: "success"
              }
            ],
            total: 1,
            page_no: 1,
            page_size: 10
          }
        };
      },
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
      client.listRuleCheckTasks({
        project_id: "project-1",
        version_uri: "version-1",
        page: 1,
        page_size: 10,
        name: "rule"
      })
    ).resolves.toEqual({
      tasks: [
        {
          uri: "task-1",
          name: "rule check",
          status: "success"
        }
      ],
      total: 1,
      raw: {
        value: [
          {
            uri: "task-1",
            name: "rule check",
            status: "success"
          }
        ],
        total: 1,
        page_no: 1,
        page_size: 10
      }
    });
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
      '/v4/project-1/versions/version-1/rule-check/tasks {"page_no":1,"page_size":10,"name":"rule"}',
      "/v4/project-1/versions/version-1/rule-check/tasks/task-1",
      "/v4/project-1/versions/version-1/rule-check/tasks/task-1/summary?severity=2&status=0"
    ]);
  });

  it("lists branch testcase duplicate numbers", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createTestPlanClient({
      post: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            value: ["TC-1"],
            total: 1,
            has_more: false,
            reason: "duplicate"
          }
        };
      }
    } as never);

    await expect(
      client.listBranchTestcaseDuplicateNumbers({
        project_id: "project-1",
        version_uri: "version-1",
        numbers: ["TC-1"],
        uri_to_number_list: [{ uri: "case-1", number: "TC-2" }]
      })
    ).resolves.toEqual({
      numbers: ["TC-1"],
      total: 1,
      has_more: false,
      reason: "duplicate",
      raw: {
        value: ["TC-1"],
        total: 1,
        has_more: false,
        reason: "duplicate"
      }
    });
    expect(requestedPath).toBe(
      "/v4/project-1/versions/version-1/testcases/duplicate-numbers"
    );
    expect(requestedBody).toEqual({
      numbers: ["TC-1"],
      uri_to_number_list: [{ uri: "case-1", number: "TC-2" }]
    });
  });

  it("loads case templates and testcase v4 detail", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.startsWith("/v1/projects/project-1/testcase?")) {
          return {
            result: {
              value: {
                testcase_id: "case-project-number-1",
                name: "project case by number"
              }
            }
          };
        }
        if (path.startsWith("/v1/projects/")) {
          return {
            result: {
              value: {
                testcase_id: "case-project-1",
                name: "project case"
              }
            }
          };
        }
        if (path.startsWith("/v4/projects/")) {
          return {
            result: {
              value: {
                id: "case-project-v4-1",
                name: "project case v4"
              }
            }
          };
        }
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
    await expect(
      client.getProjectTestcase({
        project_id: "project-1",
        testcase_id: "case-project-1"
      })
    ).resolves.toEqual({
      case_id: "case-project-1",
      name: "project case",
      raw: {
        testcase_id: "case-project-1",
        name: "project case"
      }
    });
    await expect(
      client.getProjectTestcaseV4({
        project_id: "project-1",
        testcase_uri: "case-project-v4-1",
        plan_id: "plan-1"
      })
    ).resolves.toEqual({
      case_id: "case-project-v4-1",
      name: "project case v4",
      raw: {
        id: "case-project-v4-1",
        name: "project case v4"
      }
    });
    await expect(
      client.getProjectTestcaseByNumber({
        project_id: "project-1",
        testcase_number: "TC-101",
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      case_id: "case-project-number-1",
      name: "project case by number",
      raw: {
        testcase_id: "case-project-number-1",
        name: "project case by number"
      }
    });
    expect(requests).toEqual([
      "/v4/project-1/case-templates/template-1",
      "/v4/testcases/case-1?version_uri=version-1&project_uuid=project-1",
      "/v1/projects/project-1/testcases/case-project-1",
      "/v4/projects/project-1/testcases/case-project-v4-1?plan_id=plan-1",
      "/v1/projects/project-1/testcase?testcase_number=TC-101&version_uri=version-1"
    ]);
  });

  it("lists case templates and solution templates", async () => {
    const requests: Array<{ path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path.includes("solution-templates")) {
          return {
            total: 1,
            value: [{ uri: "solution-template-1", name: "solution" }]
          };
        }

        return {
          result: {
            value: [{ uri: "case-template-1", name: "case template" }],
            total: 1
          }
        };
      }
    } as never);

    await expect(
      client.listCaseTemplates({
        project_id: "project-1",
        name: "case",
        is_default: true,
        is_recommended: false,
        industry_type: 10
      })
    ).resolves.toEqual({
      templates: [{ uri: "case-template-1", name: "case template" }],
      total: 1
    });
    await expect(
      client.listSolutionTemplates({
        project_id: "project-1",
        name: "solution",
        is_recommended: false,
        industry_type: 12
      })
    ).resolves.toEqual({
      templates: [{ uri: "solution-template-1", name: "solution" }],
      total: 1
    });

    expect(requests).toEqual([
      {
        path: "/v4/project-1/case-templates/batch-query",
        body: {
          name: "case",
          is_default: true,
          is_recommended: false,
          industry_type: 10
        }
      },
      {
        path: "/v4/project-1/solution-templates/batch-query",
        body: {
          name: "solution",
          is_recommended: false,
          industry_type: 12
        }
      }
    ]);
  });

  it("loads TestPlan mindmap, assets, and test design templates", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/mindmaps/")) {
          return {
            code: "success",
            data: {
              id: "mindmap-1",
              name: "Checkout flow"
            }
          };
        }
        if (path.includes("/mindmap-recycles/")) {
          return {
            code: "success",
            data: {
              id: "recycle-1",
              mindmap_name: "Deleted checkout flow"
            }
          };
        }
        if (path.includes("/mindmap-backups/")) {
          return {
            code: "success",
            data: {
              id: "backup-1",
              bak_name: "Nightly backup"
            }
          };
        }
        if (path.includes("/testcases/")) {
          return {
            code: "success",
            data: {
              id: "draft-case-1",
              case_name: "Draft checkout"
            }
          };
        }
        if (path.endsWith("/asset")) {
          return {
            code: "success",
            data: [{ id: "asset-1", name: "Common factors" }]
          };
        }

        return {
          code: "success",
          data: {
            id: "template-1",
            name: "API design"
          }
        };
      }
    } as never);

    await expect(
      client.getMindmap({
        project_id: "project-1",
        id: "mindmap-1"
      })
    ).resolves.toEqual({
      mindmap_id: "mindmap-1",
      name: "Checkout flow",
      raw: {
        id: "mindmap-1",
        name: "Checkout flow"
      }
    });
    await expect(
      client.getMindmapRecycle({
        project_id: "project-1",
        id: "recycle-1"
      })
    ).resolves.toEqual({
      recycle_id: "recycle-1",
      name: "Deleted checkout flow",
      raw: {
        id: "recycle-1",
        mindmap_name: "Deleted checkout flow"
      }
    });
    await expect(
      client.getMindmapBackup({
        project_id: "project-1",
        id: "backup-1"
      })
    ).resolves.toEqual({
      backup_id: "backup-1",
      name: "Nightly backup",
      raw: {
        id: "backup-1",
        bak_name: "Nightly backup"
      }
    });
    await expect(
      client.getTestDesignTestcase({
        project_id: "project-1",
        id: "draft-case-1"
      })
    ).resolves.toEqual({
      case_id: "draft-case-1",
      name: "Draft checkout",
      raw: {
        id: "draft-case-1",
        case_name: "Draft checkout"
      }
    });
    await expect(client.listAssets({ project_id: "project-1" })).resolves.toEqual({
      assets: [{ id: "asset-1", name: "Common factors" }],
      total: 1
    });
    await expect(
      client.getTestDesignTemplate({
        project_id: "project-1",
        id: "template-1"
      })
    ).resolves.toEqual({
      template_id: "template-1",
      name: "API design",
      raw: {
        id: "template-1",
        name: "API design"
      }
    });

    expect(requests).toEqual([
      "/v1/project-1/mindmaps/mindmap-1",
      "/v2/project-1/mindmap-recycles/recycle-1",
      "/v2/project-1/mindmap-backups/backup-1",
      "/v2/project-1/testcases/draft-case-1",
      "/v1/project-1/asset",
      "/v2/project-1/templates/template-1"
    ]);
  });

  it("loads TestPlan mindmap statistics, asset tree, and factor details", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/statistics/")) {
          return {
            code: "success",
            data: { testcase_count: 3, factor_count: 2 }
          };
        }
        if (path.includes("/asset-tree/")) {
          return {
            code: "success",
            data: [{ id: "node-1", name: "Root", factor_cnt: 2 }]
          };
        }

        return {
          code: "success",
          data: {
            id: "factor-1",
            name: "Browser"
          }
        };
      }
    } as never);

    await expect(
      client.getMindmapStatistics({
        project_id: "project-1",
        mindmap_id: "mindmap-1"
      })
    ).resolves.toEqual({
      mindmap_id: "mindmap-1",
      raw: { testcase_count: 3, factor_count: 2 }
    });
    await expect(
      client.listAssetTree({
        project_id: "project-1",
        asset_id: "asset-1"
      })
    ).resolves.toEqual({
      nodes: [{ id: "node-1", name: "Root", factor_cnt: 2 }],
      total: 1
    });
    await expect(
      client.getFactor({
        project_id: "project-1",
        id: "factor-1"
      })
    ).resolves.toEqual({
      factor_id: "factor-1",
      name: "Browser",
      raw: {
        id: "factor-1",
        name: "Browser"
      }
    });

    expect(requests).toEqual([
      "/v1/project-1/statistics/mindmap-1",
      "/v1/project-1/asset-tree/asset-1",
      "/v1/project-1/factor/factor-1"
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
        if (path.startsWith("/v4/projects/project-1/customized-columns")) {
          return {
            result: {
              value: {
                display: [{ field_key: "name-v4" }],
                hidden: [{ field_key: "owner-v4" }]
              }
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
    await expect(
      client.getCustomizedColumnsV4({
        project_id: "project-1",
        service_type: -1,
        stage_type: 3
      })
    ).resolves.toEqual({
      project_id: "project-1",
      raw: {
        display: [{ field_key: "name-v4" }],
        hidden: [{ field_key: "owner-v4" }]
      }
    });
    expect(requests).toEqual([
      "/v4/projects/project-1/users?page_no=2&page_size=20&key_word=ali",
      "/v4/projects/project-1/current-user/package-permission?package_type=TEST_PLAN",
      "/v4/projects/project-1/users/user-1/package-permission?package_type=TEST_PLAN",
      "/v4/projects/project-1/domain-user-count",
      "/v4/projects/project-1/tags?resource_type=TestCase",
      "/GT3KServer/v4/projects/project-1/customized-columns?service_type=1&stage_type=2",
      "/v4/projects/project-1/customized-columns?service_type=-1&stage_type=3"
    ]);
  });

  it("loads project and domain configuration read endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/domain/detail-info")) {
          return {
            value: {
              region: "cn-north-4",
              status: "normal"
            }
          };
        }
        if (path.endsWith("/advanced-feature/trial")) {
          return {
            result: {
              value: {
                trial_use: true,
                remaining_days: 7
              }
            }
          };
        }
        if (path.endsWith("/advanced-feature/trusted")) {
          return {
            value: "success"
          };
        }
        if (path.includes("/domain/frozen/info?")) {
          return {
            result: {
              value: {
                freeze_status: 0
              }
            }
          };
        }
        if (path.includes("/domain/need-popup?")) {
          return {
            value: false
          };
        }
        if (path.includes("/user/disclaimer?")) {
          return {
            result: {
              value: true
            }
          };
        }
        if (path.endsWith("/message-notices")) {
          return {
            result: {
              value: [{ id: "notice-1", name: "Requirement update" }],
              total: 1
            }
          };
        }
        if (path.includes("/issue-update-notification?")) {
          return {
            value: {
              enabled: true
            }
          };
        }
        if (path.endsWith("/master")) {
          return {
            value: "master-version-1"
          };
        }

        return {
          value: true
        };
      }
    } as never);

    await expect(
      client.getProjectDomainDetailInfo({
        project_id: "project-1",
        order_query_type: "mix"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      raw: {
        region: "cn-north-4",
        status: "normal"
      }
    });
    await expect(
      client.getProjectAdvancedFeatureTrial({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      raw: {
        trial_use: true,
        remaining_days: 7
      }
    });
    await expect(
      client.getProjectAdvancedFeatureTrusted({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      value: "success",
      raw: {
        value: "success"
      }
    });
    await expect(
      client.getDomainFrozenInfo({
        project_uuid: "project-1"
      })
    ).resolves.toEqual({
      project_uuid: "project-1",
      raw: {
        freeze_status: 0
      }
    });
    await expect(
      client.getDomainNeedPopup({
        project_uuid: "project-1"
      })
    ).resolves.toEqual({
      project_uuid: "project-1",
      value: false,
      raw: {
        value: false
      }
    });
    await expect(
      client.getUserDisclaimer({
        type: "testplan"
      })
    ).resolves.toEqual({
      type: "testplan",
      value: true,
      raw: {
        value: true
      }
    });
    await expect(
      client.getProjectMessageNotices({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      notices: [{ id: "notice-1", name: "Requirement update" }],
      total: 1
    });
    await expect(
      client.getProjectIssueUpdateNotification({
        project_id: "project-1",
        owner_id: "user-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      owner_id: "user-1",
      raw: {
        enabled: true
      }
    });
    await expect(
      client.getProjectMasterVersion({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      value: "master-version-1",
      raw: {
        value: "master-version-1"
      }
    });
    await expect(client.checkUserExists()).resolves.toEqual({
      value: true,
      raw: {
        value: true
      }
    });
    expect(requests).toEqual([
      "/v4/projects/project-1/domain/detail-info?order_query_type=mix",
      "/v4/projects/project-1/advanced-feature/trial",
      "/v4/projects/project-1/advanced-feature/trusted",
      "/v4/domain/frozen/info?project_uuid=project-1",
      "/v4/domain/need-popup?project_uuid=project-1",
      "/v4/user/disclaimer?type=testplan",
      "/v4/projects/project-1/message-notices",
      "/v4/projects/project-1/issue-update-notification?owner_id=user-1",
      "/v4/projects/project-1/master",
      "/v4/user/exist"
    ]);
  });

  it("gets TestPlan domain, declaration, branch, and own testcase read endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.startsWith("/GT3KServer/v4/branches")) {
          return { value: [{ uri: "branch-1", name: "main" }], total: 1 };
        }
        if (path.startsWith("/v4/branches")) {
          return { result: { value: [{ uri: "branch-2", name: "dev" }], total: 1 } };
        }
        if (path.startsWith("/GT3KServer/v4/current-user/testcases")) {
          return { value: [{ uri: "case-1", name: "GT3K case" }], total: 1 };
        }
        if (path.startsWith("/v4/current-user/testcases")) {
          return { value: [{ uri: "case-2", name: "v4 case" }], total: 1 };
        }
        if (path.startsWith("/GT3KServer/v4/domain/info")) {
          return { value: { access: "trial" } };
        }

        return { value: true };
      }
    } as never);

    await expect(
      client.getDomainDetailInfo({
        domain_id: "domain-1",
        region: "cn-north-4",
        order_query_type: "mix"
      })
    ).resolves.toEqual({
      value: true,
      raw: { value: true }
    });
    await expect(client.getFreeDeclaration()).resolves.toEqual({
      value: true,
      raw: { value: true }
    });
    await expect(client.getGt3kUserInfoDomain()).resolves.toEqual({
      value: true,
      raw: { value: true }
    });
    await expect(client.getUserInfoDomain()).resolves.toEqual({
      value: true,
      raw: { value: true }
    });
    await expect(
      client.listGt3kBranches({
        project_uuid: "project-1",
        sort_field: "name",
        sort_type: "ASC"
      })
    ).resolves.toEqual({
      branches: [{ uri: "branch-1", name: "main" }],
      total: 1
    });
    await expect(
      client.listV4Branches({
        project_uuid: "project-1",
        sort_field: "name",
        sort_type: "DESC"
      })
    ).resolves.toEqual({
      branches: [{ uri: "branch-2", name: "dev" }],
      total: 1
    });
    await expect(
      client.getGt3kDomainInfo({
        project_uuid: "project-1"
      })
    ).resolves.toEqual({
      raw: { access: "trial" }
    });
    await expect(
      client.listGt3kCurrentUserTestcases({
        page: 2,
        page_size: 20,
        sort_field: "name",
        sort_type: "ASC",
        keyword: "login"
      })
    ).resolves.toEqual({
      testcases: [{ uri: "case-1", name: "GT3K case" }],
      total: 1
    });
    await expect(
      client.listCurrentUserTestcases({
        page: 1,
        page_size: 10,
        sort_field: "name",
        sort_type: "DESC",
        keyword: "smoke"
      })
    ).resolves.toEqual({
      testcases: [{ uri: "case-2", name: "v4 case" }],
      total: 1
    });

    expect(requests).toEqual([
      "/v4/domain/detail-info?domain_id=domain-1&region=cn-north-4&order_query_type=mix",
      "/v4/free-declaration",
      "/GT3KServer/v4/user-info/domain",
      "/v4/user-info/domain",
      "/GT3KServer/v4/branches?project_uuid=project-1&sort_field=name&sort_type=ASC",
      "/v4/branches?project_uuid=project-1&sort_field=name&sort_type=DESC",
      "/GT3KServer/v4/domain/info?project_uuid=project-1",
      "/GT3KServer/v4/current-user/testcases?page_no=2&page_size=20&sort_field=name&sort_type=ASC&keyword=login",
      "/v4/current-user/testcases?page_no=1&page_size=10&sort_field=name&sort_type=DESC&keyword=smoke"
    ]);
  });

  it("gets TestPlan testcase statistics, comments, reviews, and resource checks", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("comments")) {
          return { value: [{ id: "comment-1", content: "ok" }], total: 1 };
        }
        if (path.includes("review")) {
          return { value: [{ id: "review-1", reviewer: "alice" }], total: 1 };
        }
        if (path.includes("change-statistics")) {
          return { result: { add_testcases_number: 1 } };
        }

        return { value: 1 };
      }
    } as never);

    await expect(
      client.getGt3kTestcaseChangeStatistics({
        project_id: "project-1",
        version_id: "version-1"
      })
    ).resolves.toEqual({
      raw: { add_testcases_number: 1 }
    });
    await expect(
      client.getTestcaseChangeStatistics({
        project_id: "project-1",
        version_uri: "version-2"
      })
    ).resolves.toEqual({
      raw: { add_testcases_number: 1 }
    });
    await expect(
      client.listTestcaseComments({
        project_id: "project-1",
        testcase_id: "case-1",
        page: 1,
        page_size: 10,
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      comments: [{ id: "comment-1", content: "ok" }],
      total: 1
    });
    await expect(
      client.checkResourceExists({
        project_id: "project-1",
        resource_uri: "resource-1",
        version_uri: "version-1",
        type: 3
      })
    ).resolves.toEqual({
      value: 1,
      raw: { value: 1 }
    });
    await expect(
      client.listTestcaseReviews({
        testcase_uri: "case-1",
        project_uuid: "project-1",
        version_uri: "version-1",
        page: 2,
        page_size: 5
      })
    ).resolves.toEqual({
      reviews: [{ id: "review-1", reviewer: "alice" }],
      total: 1
    });
    await expect(
      client.listV4TestcaseReviews({
        testcase_uri: "case-1",
        project_uuid: "project-1",
        version_uri: "version-1",
        page: 1,
        page_size: 10
      })
    ).resolves.toEqual({
      reviews: [{ id: "review-1", reviewer: "alice" }],
      total: 1
    });

    expect(requests).toEqual([
      "/GT3KServer/v4/project-1/versions/version-1/testcases/change-statistics",
      "/v4/project-1/versions/version-2/testcases/change-statistics",
      "/GT3KServer/v4/project-1/testcases/case-1/comments?page_no=1&page_size=10&version_uri=version-1",
      "/v4/project-1/resources/resource-1/exist?version_uri=version-1&type=3",
      "/GT3KServer/v4/testcases/case-1/review?project_uuid=project-1&version_uri=version-1&page_no=2&page_size=5",
      "/v4/testcases/case-1/review?project_uuid=project-1&version_uri=version-1&page_no=1&page_size=10"
    ]);
  });

  it("gets TestPlan release, access, service, image, and user config read endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("release-versions")) {
          return { value: ["v1", "v2"], total: 2 };
        }
        if (path === "/v1/services") {
          return { services: [{ id: "service-1", name: "local" }], total: 1 };
        }
        if (path.includes("access-info")) {
          return { value: { quota: 10 } };
        }

        return { value: 1 };
      }
    } as never);

    await expect(
      client.listReleaseVersions({
        project_id: "project-1",
        resource_type: "1",
        version_uri: "version-1",
        limit: 2
      })
    ).resolves.toEqual({
      versions: [{ value: "v1" }, { value: "v2" }],
      total: 2
    });
    await expect(
      client.getDomainAccessInfo({
        project_uuid: "project-1"
      })
    ).resolves.toEqual({
      raw: { quota: 10 }
    });
    await expect(client.listRegisteredServices()).resolves.toEqual({
      services: [{ id: "service-1", name: "local" }],
      total: 1
    });
    await expect(
      client.getImageCapacityWarning({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      value: 1,
      raw: { value: 1 }
    });
    await expect(
      client.checkUserDefinedConfigUsed({
        project_id: "project-1",
        config_id: "config-1",
        type: "1"
      })
    ).resolves.toEqual({
      value: 1,
      raw: { value: 1 }
    });

    expect(requests).toEqual([
      "/v4/projects/project-1/release-versions?resource_type=1&version_uri=version-1&limit=2",
      "/v4/domain/access-info?project_uuid=project-1",
      "/v1/services",
      "/v4/projects/project-1/image/capacity/warning",
      "/v4/projects/project-1/user-defined-configs/config-1/used?type=1"
    ]);
  });

  it("gets TestPlan service, environment, iterator, license, and configuration endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.startsWith("/v4/service/offering")) {
          return [{ id: "offering-1", name: "TestPlan" }];
        }
        if (path.includes("/environments")) {
          return { environments: [{ id: "env-1", name: "dev" }], total_count: 1 };
        }
        if (path.includes("/iterator-infos")) {
          return { value: [{ uri: "iterator-1", name: "Sprint" }], total: 1 };
        }
        if (path.includes("/visible-services")) {
          return { value: [{ id: "service-1", name: "EchoTest" }], total: 1 };
        }
        if (path.includes("/resource-number-rule")) {
          return { value: [{ id: "rule-1", name: "case-rule" }], total: 1 };
        }
        if (path.includes("/testcase/global/config")) {
          return { value: { display: true } };
        }
        if (path.includes("/system-config")) {
          return { value: true };
        }
        if (path.includes("/projects/member/exist")) {
          return { value: true };
        }
        if (path.includes("/license/specification")) {
          return { value: "small" };
        }

        return { value: [] };
      }
    } as never);

    await expect(client.listServiceOfferings({ serviceNames: "testplan" })).resolves.toEqual({
      offerings: [{ id: "offering-1", name: "TestPlan" }],
      total: 1
    });
    await expect(
      client.listEnvironments({
        project_id: "project-1",
        page: 2,
        page_size: 10
      })
    ).resolves.toEqual({
      environments: [{ id: "env-1", name: "dev" }],
      total: 1
    });
    await expect(client.listIteratorInfos({ project_id: "project-1" })).resolves.toEqual({
      iterators: [{ uri: "iterator-1", name: "Sprint" }],
      total: 1
    });
    await expect(client.listGt3kIteratorInfos({ project_id: "project-1" })).resolves.toEqual({
      iterators: [{ uri: "iterator-1", name: "Sprint" }],
      total: 1
    });
    await expect(client.listVisibleServices({ project_id: "project-1" })).resolves.toEqual({
      services: [{ id: "service-1", name: "EchoTest" }],
      total: 1
    });
    await expect(client.listGt3kVisibleServices({ project_id: "project-1" })).resolves.toEqual({
      services: [{ id: "service-1", name: "EchoTest" }],
      total: 1
    });
    await expect(client.getLicenseSpecification()).resolves.toEqual({
      value: "small",
      raw: { value: "small" }
    });
    await expect(client.listResourceNumberRules({ project_id: "project-1" })).resolves.toEqual({
      rules: [{ id: "rule-1", name: "case-rule" }],
      total: 1
    });
    await expect(
      client.getProjectTestcaseGlobalConfig({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      raw: { display: true }
    });
    await expect(
      client.getProjectSystemConfig({
        project_uuid: "project-1",
        owner_id: "user-1",
        feature_name: "DisplayOldFunctionTest"
      })
    ).resolves.toEqual({
      value: true,
      raw: { value: true }
    });
    await expect(client.checkProjectMemberExists()).resolves.toEqual({
      value: true,
      raw: { value: true }
    });

    expect(requests).toEqual([
      "/v4/service/offering?serviceNames=testplan",
      "/v1/projects/project-1/environments?offset=10&limit=10",
      "/v4/projects/project-1/iterator-infos",
      "/GT3KServer/v4/projects/project-1/iterator-infos",
      "/v4/project-1/visible-services",
      "/GT3KServer/v4/project-1/visible-services",
      "/v4/license/specification",
      "/v4/project-1/resource-number-rule",
      "/v4/projects/project-1/testcase/global/config",
      "/v4/projects/project-1/system-config?owner_id=user-1&feature_name=DisplayOldFunctionTest",
      "/v4/projects/member/exist"
    ]);
  });

  it("lists iterator issue testcase references", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return { value: ["case-1", "case-2"] };
      }
    } as never);

    await expect(
      client.listIteratorIssueCases({
        project_id: "project-1",
        iterator_uri: "iterator-1",
        workitem_list: [{ work_item_id: "issue-1", has_child: false, is_open: true }]
      })
    ).resolves.toEqual({
      case_ids: [{ value: "case-1" }, { value: "case-2" }],
      total: 2
    });
    expect(requestedPath).toBe(
      "/v4/project-1/iterators/iterator-1/issues/cases/batch-query"
    );
    expect(requestedBody).toEqual({
      workitem_list: [{ work_item_id: "issue-1", has_child: false, is_open: true }]
    });
  });

  it("lists testcase work item relations", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          value: [
            {
              test_case_uri: "case-1",
              issue_id: "issue-1",
              title: "login requirement"
            }
          ],
          total: 1
        };
      }
    } as never);

    await expect(
      client.listTestcaseRelations({
        project_id: "project-1",
        test_case_uris: ["case-1"],
        page: 1,
        page_size: 10,
        version_uri: "version-1",
        relate_type: "requirement",
        keyWord: "login",
        ownerContainEmpty: true
      })
    ).resolves.toEqual({
      relations: [
        {
          test_case_uri: "case-1",
          issue_id: "issue-1",
          title: "login requirement"
        }
      ],
      total: 1
    });
    expect(requestedPath).toBe("/v4/testcases/relations/batch-query");
    expect(requestedBody).toEqual({
      project_uuid: "project-1",
      test_case_uris: ["case-1"],
      page_no: 1,
      page_size: 10,
      version_uri: "version-1",
      relate_type: "requirement",
      keyWord: "login",
      ownerContainEmpty: true
    });
  });

  it("gets TestPlan report, repo, task, resource, usage, alert, and dashboard endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("custom-infos")) {
          return { value: [{ uri: "info-1", name: "summary" }], total: 1 };
        }
        if (path.includes("service-repos?")) {
          return { value: [{ repository_id: "repo-1", name: "repo" }], total: 1 };
        }
        if (path.endsWith("/repo")) {
          return { value: { repository_id: "repo-1", branch: "main" } };
        }
        if (path.includes("defects/batch-query")) {
          return { value: [{ id: "defect-1", name: "bug" }], total: 1 };
        }
        if (path.includes("resource-pools")) {
          return { value: [{ id: "pool-1", name: "default" }], total: 1 };
        }
        if (path.includes("domain/usage")) {
          return { value: [{ id: "usage-1", name: "storage" }], total: 1 };
        }
        if (path.includes("service/config")) {
          return { value: { config_key: "task_clear_config_key" } };
        }
        if (path.includes("alert/user/name")) {
          return { result: "ok" };
        }
        if (path.includes("alert-templates/name")) {
          return { result: false };
        }
        if (path.includes("alert-templates")) {
          return { list: [{ id: "template-1", name: "default" }], total: 1 };
        }
        if (path.includes("dashboard/run-panel")) {
          return { value: { running: 1 } };
        }
        if (path.includes("dashboard/statistic/block")) {
          return {
            result: {
              pageList: [{ id: "block-1", label: "region-a", subtaskcase_overstock_count: 2 }],
              totalSize: 1
            }
          };
        }
        if (path.includes("/dashboards")) {
          return {
            result: {
              page_list: [{ id: "dashboard-1", name: "ops" }],
              total_size: 1
            }
          };
        }
        if (path.includes("testcase/field/batch-query")) {
          return { value: [{ uri: "field-1", name: "Priority" }], total: 1 };
        }
        if (path.includes("testcase/field/field-1")) {
          return { value: { uri: "field-1", name: "Priority" } };
        }
        if (path.includes("issue-ids")) {
          return { value: ["issue-1"], total: 1 };
        }
        if (path.includes("descendant-uris")) {
          return { value: ["feature-child-1"], total: 1 };
        }
        if (path.includes("free-declaration")) {
          return { value: true };
        }
        if (path.includes("/branches/branch-1")) {
          return { value: { uri: "branch-1", name: "main" } };
        }

        return { value: [] };
      }
    } as never);

    await expect(
      client.listTestReportCustomInfos({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "report-1"
      })
    ).resolves.toEqual({
      infos: [{ uri: "info-1", name: "summary" }],
      total: 1
    });
    await expect(
      client.listProjectServiceRepos({
        project_id: "project-1",
        page: 1,
        page_size: 20
      })
    ).resolves.toEqual({
      repos: [{ repository_id: "repo-1", name: "repo" }],
      total: 1
    });
    await expect(
      client.listGt3kProjectServiceRepos({
        project_uuid: "project-1",
        page: 1,
        page_size: 20
      })
    ).resolves.toEqual({
      repos: [{ repository_id: "repo-1", name: "repo" }],
      total: 1
    });
    await expect(
      client.getProjectServiceRepo({
        project_id: "project-1",
        service_id: 7
      })
    ).resolves.toEqual({
      raw: { repository_id: "repo-1", branch: "main" }
    });
    await expect(
      client.listTaskDefects({
        project_id: "project-1",
        task_uri: "task-1",
        page: 2,
        page_size: 10,
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      defects: [{ id: "defect-1", name: "bug" }],
      total: 1
    });
    await expect(client.listResourcePools({ project_id: "project-1" })).resolves.toEqual({
      pools: [{ id: "pool-1", name: "default" }],
      total: 1
    });
    await expect(client.listTestexecutorResourcePools({ project_id: "project-1" })).resolves.toEqual({
      pools: [{ id: "pool-1", name: "default" }],
      total: 1
    });
    await expect(client.listDomainUsageInfos({ project_uuid: "project-1" })).resolves.toEqual({
      usages: [{ id: "usage-1", name: "storage" }],
      total: 1
    });
    await expect(client.listGt3kDomainUsageInfos({ project_uuid: "project-1" })).resolves.toEqual({
      usages: [{ id: "usage-1", name: "storage" }],
      total: 1
    });
    await expect(
      client.getServiceConfig({
        service_id: "service-1",
        key: "task_clear_config_key",
        type: "ServiceConfig"
      })
    ).resolves.toEqual({
      raw: { config_key: "task_clear_config_key" }
    });
    await expect(
      client.listAlertTemplates({
        service_id: "service-1",
        page: 3,
        page_size: 15,
        name: "default"
      })
    ).resolves.toEqual({
      templates: [{ id: "template-1", name: "default" }],
      total: 1
    });
    await expect(
      client.checkAlertUserName({
        service_id: "service-1",
        user_name: "alice",
        user_id: "user-1"
      })
    ).resolves.toEqual({
      value: "ok",
      raw: { result: "ok" }
    });
    await expect(
      client.checkAlertTemplateName({
        service_id: "service-1",
        name: "default",
        id: "template-1"
      })
    ).resolves.toEqual({
      value: false,
      raw: { result: false }
    });
    await expect(client.getDashboardRunPanel({ service_id: "service-1" })).resolves.toEqual({
      raw: { running: 1 }
    });
    await expect(
      client.listDashboardStatisticBlocks({
        service_id: "service-1",
        start_time: 1700000000000,
        end_time: 1700003600000,
        executor_type: "agent",
        label: "region-a",
        location_id: "location-1",
        page: 2,
        page_size: 10
      })
    ).resolves.toEqual({
      blocks: [{ id: "block-1", label: "region-a", subtaskcase_overstock_count: 2 }],
      total: 1
    });
    await expect(
      client.listDashboards({
        service_id: "service-1",
        name: "ops",
        page: 1,
        page_size: 6
      })
    ).resolves.toEqual({
      dashboards: [{ id: "dashboard-1", name: "ops" }],
      total: 1
    });
    await expect(client.listGt3kTestcaseFields({ project_id: "project-1" })).resolves.toEqual({
      fields: [{ uri: "field-1", name: "Priority" }],
      total: 1
    });
    await expect(client.getGt3kFreeDeclaration()).resolves.toEqual({
      value: true,
      raw: { value: true }
    });
    await expect(
      client.getBranch({
        branch_uri: "branch-1",
        project_uuid: "project-1"
      })
    ).resolves.toEqual({
      raw: { uri: "branch-1", name: "main" }
    });
    await expect(
      client.getGt3kBranch({
        branch_id: "branch-1",
        project_uuid: "project-1"
      })
    ).resolves.toEqual({
      raw: { uri: "branch-1", name: "main" }
    });
    await expect(
      client.listIteratorIssueIds({
        project_id: "project-1",
        iterator_uri: "iterator-1"
      })
    ).resolves.toEqual({
      issue_ids: [{ value: "issue-1" }],
      total: 1
    });
    await expect(
      client.listFeatureDescendantUris({
        project_id: "project-1",
        feature_uri: "feature-1"
      })
    ).resolves.toEqual({
      uris: [{ value: "feature-child-1" }],
      total: 1
    });
    await expect(
      client.getTestcaseField({
        project_id: "project-1",
        uri: "field-1"
      })
    ).resolves.toEqual({
      raw: { uri: "field-1", name: "Priority" }
    });

    expect(requests).toEqual([
      "/v4/project-1/versions/version-1/test-reports/report-1/custom-infos",
      "/v4/projects/project-1/service-repos?page_no=1&page_size=20",
      "/GT3KServer/v4/projects/project-1/service-repos?page_no=1&page_size=20",
      "/v4/projects/project-1/services/7/repo",
      "/v4/project-1/tasks/task-1/defects/batch-query?page_no=2&page_size=10&version_uri=version-1",
      "/v4/project-1/resource-pools",
      "/testexecutor/v4/project-1/resource-pools",
      "/v4/domain/usage?project_uuid=project-1",
      "/GT3KServer/v4/domain/usage?project_uuid=project-1",
      "/v1/projects/service-1/service/config?key=task_clear_config_key&type=ServiceConfig",
      "/v1/projects/service-1/alert-templates?name=default&page_num=3&page_size=15",
      "/v1/projects/service-1/alert/user/name?user_name=alice&user_id=user-1",
      "/v1/projects/service-1/alert-templates/name?name=default&id=template-1",
      "/v2/projects/service-1/dashboard/run-panel",
      "/v1/projects/service-1/dashboard/statistic/block?start_time=1700000000000&end_time=1700003600000&label=region-a&page_num=2&page_size=10&executor_type=agent&location_id=location-1",
      "/v2/projects/service-1/dashboards?page_number=1&page_size=6&name=ops",
      "/GT3KServer/v4/project-1/testcase/field/batch-query",
      "/GT3KServer/v4/free-declaration",
      "/v4/branches/branch-1?project_uuid=project-1",
      "/GT3KServer/v4/branches/branch-1?project_uuid=project-1",
      "/v4/project-1/iterators/iterator-1/issue-ids",
      "/v4/project-1/features/feature-1/descendant-uris",
      "/v4/project-1/testcase/field/field-1"
    ]);
  });

  it("gets TestPlan TestHub, defect iterator, progress, and API test read endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("/testhub/projects/") && path.includes("/tasks/")) {
          return { result: { uri: "task-1", name: "API suite" } };
        }
        if (path.includes("/defects/defect-1/iterators")) {
          return { value: [{ uri: "iterator-1", name: "Sprint" }], total: 1 };
        }
        if (path.includes("/progress/operation-1")) {
          return { uri: "operation-1", completed: true };
        }
        if (path.includes("/package-charge/popup")) {
          return { result: { popup: false, time_limit: 0 } };
        }
        if (path.includes("/package-usage")) {
          return { result: [{ name: "test_duration", used_percent: 0 }] };
        }
        if (path.includes("/package/status")) {
          return {
            result: [
              {
                spec_code: "codearts.testplan.china.echotest",
                resource_status: "normal"
              }
            ]
          };
        }
        if (path.includes("/concurrency/status")) {
          return {
            result: {
              spec_code: "codearts.testplan.china.apitest.concurrent",
              domain_order_status: "normal"
            }
          };
        }
        if (path.includes("/tasks/name")) {
          return "ok";
        }
        if (path.includes("/package-charge/message")) {
          return { result: { message: "ok" } };
        }
        if (path === "/v1/project-1/task/task-1") {
          return { result: { id: "task-1", status: "success" } };
        }
        if (path.includes("/getSuiteInfoPageUrl/")) {
          return { pageUrl: "https://example.com/suite" };
        }
        if (path.includes("/debug-log")) {
          return { status: "success", result: null, error: null };
        }

        return { value: {} };
      }
    } as never);

    await expect(
      client.getTesthubTask({
        project_id: "project-1",
        task_uri: "task-1",
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      task_id: "task-1",
      name: "API suite",
      raw: { uri: "task-1", name: "API suite" }
    });
    await expect(
      client.listGt3kDefectIterators({
        project_id: "project-1",
        defect_id: "defect-1"
      })
    ).resolves.toEqual({
      iterators: [{ uri: "iterator-1", name: "Sprint" }],
      total: 1
    });
    await expect(
      client.listDefectIterators({
        project_id: "project-1",
        defect_id: "defect-1"
      })
    ).resolves.toEqual({
      iterators: [{ uri: "iterator-1", name: "Sprint" }],
      total: 1
    });
    await expect(
      client.getGt3kProgress({
        operation_uri: "operation-1",
        project_uuid: "project-1"
      })
    ).resolves.toEqual({
      raw: { uri: "operation-1", completed: true }
    });
    await expect(
      client.getApiTestPackageChargePopup({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      raw: { popup: false, time_limit: 0 }
    });
    await expect(
      client.listApiTestPackageUsage({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      usages: [{ name: "test_duration", used_percent: 0 }],
      total: 1
    });
    await expect(
      client.listApiTestPackageStatus({
        service_id: "service-1"
      })
    ).resolves.toEqual({
      statuses: [
        {
          spec_code: "codearts.testplan.china.echotest",
          resource_status: "normal"
        }
      ],
      total: 1
    });
    await expect(
      client.getApiTestConcurrencyPackageStatus({
        test_type: "apitest"
      })
    ).resolves.toEqual({
      raw: {
        spec_code: "codearts.testplan.china.apitest.concurrent",
        domain_order_status: "normal"
      }
    });
    await expect(
      client.checkApiTestTaskName({
        service_id: "service-1",
        task_name: "smoke",
        task_id: "task-1"
      })
    ).resolves.toEqual({
      value: "ok",
      raw: { value: "ok" }
    });
    await expect(
      client.getApiTestPackageChargeMessage({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      raw: { message: "ok" }
    });
    await expect(
      client.getApiTestTaskStatus({
        project_id: "project-1",
        task_id: "task-1"
      })
    ).resolves.toEqual({
      task_id: "task-1",
      status: "success",
      raw: { id: "task-1", status: "success" }
    });
    await expect(
      client.getSuiteInfoPageUrl({
        testServiceId: "service-1",
        suiteId: "suite-1"
      })
    ).resolves.toEqual({
      page_url: "https://example.com/suite",
      raw: { pageUrl: "https://example.com/suite" }
    });
    await expect(
      client.getApiTestDebugLog({
        project_id: "project-1",
        case_id: "case-1",
        task_id: "task-1"
      })
    ).resolves.toEqual({
      raw: { status: "success", result: null, error: null }
    });

    expect(requests).toEqual([
      "/v4/testhub/projects/project-1/tasks/task-1?version_uri=version-1",
      "/GT3KServer/v4/project-1/defects/defect-1/iterators",
      "/v4/project-1/defects/defect-1/iterators",
      "/GT3KServer/v4/progress/operation-1?project_uuid=project-1",
      "/v1/projects/project-1/package-charge/popup",
      "/v1/projects/project-1/package-usage",
      "/v1/projects/service-1/package/status",
      "/v1/echotest/concurrency/status?test_type=apitest",
      "/v4/projects/service-1/tasks/name?task_name=smoke&task_id=task-1",
      "/v1/projects/project-1/package-charge/message",
      "/v1/project-1/task/task-1",
      "/v2/getSuiteInfoPageUrl/service-1/suite-1",
      "/v1/projects/project-1/testcases/case-1/task/task-1/debug-log"
    ]);
  });

  it("gets TestPlan API test histories, variables, AWs, and configuration endpoints", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        if (path.includes("execute-histories")) {
          return { value: [{ id: "history-1", result: "success" }], total: 1 };
        }
        if (path.includes("testcase-history")) {
          return { result: { testcase_execution_history: [{ id: "case-history-1" }] } };
        }
        if (path.includes("queryFreeTestTime")) {
          return { result: { freeQuota: 1, needPopup: false } };
        }
        if (path.includes("testsuite-history")) {
          return { result: { suite_execution_history: [{ suite_id: "suite-1" }] } };
        }
        if (path === "/attask/v1/system/parallel/summary") {
          return { result: { parallel_limit: 20, parallel_num: 1 } };
        }
        if (path === "/v3/hutaf-ticc/package/status") {
          return {
            result: {
              spec_code: "codearts.extension.concurrency.ticc",
              domain_order_status: "normal",
              resource_id: "resource-1",
              has_old_package: true
            }
          };
        }
        if (path === "/v2/project-1/task/task-2") {
          return { result: { id: "task-2", status: "success" } };
        }
        if (path.includes("dns-mapping")) {
          return { result: { host: "example.com" } };
        }
        if (path.includes("getGlobalParamNameList")) {
          return {
            result: {
              paramNames: [
                {
                  name: "hostURL",
                  isSensitive: false,
                  dynamicParamFlag: false,
                  category: "Static"
                }
              ]
            }
          };
        }
        if (path.includes("child_cata_data")) {
          return { result: [{ id: "folder-1", name: "Default Folder", cata_type: 4 }] };
        }
        if (path.includes("get_awName_view")) {
          return { result: [{ id: "view-1", name_view: "0" }] };
        }
        if (path.includes("param-property")) {
          return { result: ["hostURL"] };
        }
        if (path.includes("basic-aw")) {
          return { result: { aw_id: "aw-1", name: "login" } };
        }
        if (path.includes("public_aw_lib_and_aws")) {
          return { result: [{ id: "aw-lib-1", name: "public" }] };
        }
        if (path.includes("available/config")) {
          return { result: { custom_aw_available: true } };
        }
        if (path === "/v1/project/project-1?group_id=group-1") {
          return {
            result: {
              id: "project-info-1",
              name: "API project",
              repo_password: "secret-password",
              repo_private_key: "private-key",
              variables: [
                {
                  id: "var-1",
                  name: "token",
                  isSensitiveInfo: true,
                  property: "token-value",
                  functionParams: "token-value"
                }
              ],
              nested: {
                accessToken: "nested-token"
              }
            }
          };
        }
        if (path === "/v1/project-1/testcase/case-1") {
          return { result: { tmss_case_uri: "case-1", name: "API case v1" } };
        }
        if (path === "/v3/project-1/testcase/case-1?task_id=task-1") {
          return { result: { tmss_case_uri: "case-1", name: "API case v3" } };
        }
        if (path === "/v4/project-1/testcase/case-1?task_id=task-1") {
          return { result: { tmss_case_uri: "case-1", name: "API case v4" } };
        }
        if (path.includes("getVarGroupList")) {
          return { result: { page_list: [{ id: "group-1", name: "Default" }], total_size: 1 } };
        }
        if (path.includes("notice_config_list")) {
          return { result: [{ id: "notice-1", name: "case completed" }] };
        }
        if (path === "/v1/project-1/local/desensitization/config") {
          return {
            result: {
              name: "desensitization",
              value: "[\"zzz\",\"www\",\"www1\"]"
            }
          };
        }
        if (path.includes("get_timeOut_view")) {
          return { result: [{ id: "timeout-1", time_out: "10000" }] };
        }
        if (path === "/v3/project-1/variables?page_no=1&page_size=5&group_id=group-1") {
          return {
            result: [
              {
                id: "var-v3-1",
                name: "secret",
                isSensitiveInfo: true,
                property: "hidden",
                functionParams: "hidden"
              }
            ]
          };
        }
        if (path.includes("/variables?")) {
          return { value: [{ id: "var-1", name: "base_url" }], total: 1 };
        }
        if (
          path ===
          "/v1/variables/getVarbyGroup?project_id=project-1&page_no=2&page_size=5&group_id=group-1"
        ) {
          return {
            result: [
              {
                id: "var-group-1",
                name: "plain",
                isSensitiveInfo: false,
                property: "visible"
              }
            ]
          };
        }
        if (
          path ===
          "/v2/project-1/variable-synchronization?variable_name=base_url&group_id=group-1"
        ) {
          return { result: { syncable: [{ id: "group-1", name: "Default" }] } };
        }
        if (
          path === "/v1/project-1/variable-synchronization?variable_name=base_url&group_id=group-1"
        ) {
          return { result: { syncable: [{ id: "group-2", name: "Env" }], conflict: [] } };
        }
        if (path === "/v1/progress/progress-1?project_id=project-1") {
          return { result: { id: "progress-1", rate: 100 } };
        }

        return { value: {} };
      }
    } as never);

    await expect(
      client.listApiTestcaseExecuteHistories({
        project_id: "project-1",
        testcase_id: "case-1",
        page: 2,
        page_size: 10,
        plan_id: "plan-1"
      })
    ).resolves.toEqual({
      histories: [{ id: "history-1", result: "success" }],
      total: 1
    });
    await expect(
      client.listApiTestcaseHistory({
        project_id: "project-1",
        plan_id: "plan-1"
      })
    ).resolves.toEqual({
      histories: [{ id: "case-history-1" }],
      total: 1
    });
    await expect(client.getFreeTestTime({ testServiceId: "service-1" })).resolves.toEqual({
      raw: { freeQuota: 1, needPopup: false }
    });
    await expect(
      client.listApiTestsuiteHistory({
        project_id: "project-1",
        plan_id: "plan-1"
      })
    ).resolves.toEqual({
      histories: [{ suite_id: "suite-1" }],
      total: 1
    });
    await expect(client.getFunctionalTestParallelSummary()).resolves.toEqual({
      raw: { parallel_limit: 20, parallel_num: 1 }
    });
    await expect(client.getFunctionalTestPackageStatus()).resolves.toEqual({
      raw: {
        spec_code: "codearts.extension.concurrency.ticc",
        domain_order_status: "normal",
        resource_id: "resource-1",
        has_old_package: true
      }
    });
    await expect(
      client.getApiTestTaskStatusV2({
        project_id: "project-1",
        task_id: "task-2"
      })
    ).resolves.toEqual({
      task_id: "task-2",
      status: "success",
      raw: { id: "task-2", status: "success" }
    });
    await expect(client.getApiTestDnsMapping({ project_id: "project-1" })).resolves.toEqual({
      raw: { host: "example.com" }
    });
    await expect(
      client.listApiTestGlobalParamNames({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      params: [
        {
          name: "hostURL",
          isSensitive: false,
          dynamicParamFlag: false,
          category: "Static"
        }
      ],
      total: 1
    });
    await expect(
      client.listApiTestVariables({
        project_id: "project-1",
        group_id: "group-1",
        page: 1,
        page_size: 20
      })
    ).resolves.toEqual({
      variables: [{ id: "var-1", name: "base_url" }],
      total: 1
    });
    await expect(
      client.getApiTestBasicAwV3({
        project_id: "project-1",
        aw_id: "aw-1"
      })
    ).resolves.toEqual({
      raw: { aw_id: "aw-1", name: "login" }
    });
    await expect(
      client.listApiTestChildBasicAws({
        project_id: "project-1",
        parent_id: "TOP",
        aw_name: "login",
        source_type: 1
      })
    ).resolves.toEqual({
      aws: [{ id: "folder-1", name: "Default Folder", cata_type: 4 }],
      total: 1
    });
    await expect(client.listApiTestAwNameViews({ project_id: "project-1" })).resolves.toEqual({
      views: [{ id: "view-1", name_view: "0" }],
      total: 1
    });
    await expect(
      client.listApiTestBasicAwParamProperties({
        project_id: "project-1",
        aw_id: "aw-1"
      })
    ).resolves.toEqual({
      properties: ["hostURL"],
      total: 1
    });
    await expect(client.listPublicAwLibAndAws({ project_id: "project-1" })).resolves.toEqual({
      aws: [{ id: "aw-lib-1", name: "public" }],
      total: 1
    });
    await expect(
      client.getApiTestAvailableConfig({
        project_id: "project-1"
      })
    ).resolves.toEqual({
      raw: { custom_aw_available: true }
    });
    await expect(
      client.getApiTestProjectInfo({
        project_id: "project-1",
        group_id: "group-1"
      })
    ).resolves.toEqual({
      raw: {
        id: "project-info-1",
        name: "API project",
        repo_password: "[REDACTED]",
        repo_private_key: "[REDACTED]",
        variables: [
          {
            id: "var-1",
            name: "token",
            isSensitiveInfo: true,
            property: "[REDACTED]",
            functionParams: "[REDACTED]"
          }
        ],
        nested: {
          accessToken: "[REDACTED]"
        }
      }
    });
    await expect(
      client.getTestcaseScriptDetailV1({
        project_id: "project-1",
        tmss_case_uri: "case-1"
      })
    ).resolves.toEqual({
      case_id: "case-1",
      name: "API case v1",
      raw: { tmss_case_uri: "case-1", name: "API case v1" }
    });
    await expect(
      client.getTestcaseScriptDetailV3({
        project_id: "project-1",
        tmss_case_uri: "case-1",
        task_id: "task-1"
      })
    ).resolves.toEqual({
      case_id: "case-1",
      name: "API case v3",
      raw: { tmss_case_uri: "case-1", name: "API case v3" }
    });
    await expect(
      client.getTestcaseScriptDetailV4({
        project_id: "project-1",
        tmss_case_uri: "case-1",
        task_id: "task-1"
      })
    ).resolves.toEqual({
      case_id: "case-1",
      name: "API case v4",
      raw: { tmss_case_uri: "case-1", name: "API case v4" }
    });
    await expect(
      client.listVariableGroups({
        project_id: "project-1",
        page: 1,
        page_size: 10
      })
    ).resolves.toEqual({
      groups: [{ id: "group-1", name: "Default" }],
      total: 1
    });
    await expect(client.listNoticeConfigs({ project_id: "project-1" })).resolves.toEqual({
      notices: [{ id: "notice-1", name: "case completed" }],
      total: 1
    });
    await expect(client.listTimeoutSettings({ project_id: "project-1" })).resolves.toEqual({
      settings: [{ id: "timeout-1", time_out: "10000" }],
      total: 1
    });
    await expect(
      client.getProjectLocalConfig({
        project_id: "project-1",
        property: "desensitization"
      })
    ).resolves.toEqual({
      raw: {
        name: "desensitization",
        value: "[\"zzz\",\"www\",\"www1\"]"
      }
    });
    await expect(
      client.listVariablesV3({
        project_id: "project-1",
        group_id: "group-1",
        page: 1,
        page_size: 5
      })
    ).resolves.toEqual({
      variables: [
        {
          id: "var-v3-1",
          name: "secret",
          isSensitiveInfo: true,
          property: "[REDACTED]",
          functionParams: "[REDACTED]"
        }
      ],
      total: 1
    });
    await expect(
      client.listVariablesByGroup({
        project_id: "project-1",
        group_id: "group-1",
        page: 2,
        page_size: 5
      })
    ).resolves.toEqual({
      variables: [
        {
          id: "var-group-1",
          name: "plain",
          isSensitiveInfo: false,
          property: "visible"
        }
      ],
      total: 1
    });
    await expect(
      client.getVariableSynchronizationV2({
        project_id: "project-1",
        variable_name: "base_url",
        group_id: "group-1"
      })
    ).resolves.toEqual({
      raw: { syncable: [{ id: "group-1", name: "Default" }] }
    });
    await expect(
      client.getVariableSynchronization({
        project_id: "project-1",
        variable_name: "base_url",
        group_id: "group-1"
      })
    ).resolves.toEqual({
      raw: { syncable: [{ id: "group-2", name: "Env" }], conflict: [] }
    });
    await expect(
      client.getProgress({
        id: "progress-1",
        project_id: "project-1"
      })
    ).resolves.toEqual({
      raw: { id: "progress-1", rate: 100 }
    });

    expect(requests).toEqual([
      "/v1/project-1/api-testcases/case-1/execute-histories?offset=11&limit=10&plan_id=plan-1",
      "/v2/projects/project-1/testcase-history?plan_id=plan-1",
      "/v2/queryFreeTestTime/service-1",
      "/v2/projects/project-1/testsuite-history?plan_id=plan-1",
      "/attask/v1/system/parallel/summary",
      "/v3/hutaf-ticc/package/status",
      "/v2/project-1/task/task-2",
      "/v1/project-1/dns-mapping",
      "/v1/project-1/variables/getGlobalParamNameList",
      "/v4/project-1/variables?group_id=group-1&page_no=1&page_size=20",
      "/v3/project-1/basic-aw/aw-1",
      "/v1/project-1/aw_cata/child_cata_data?parent_id=TOP&is_contain_aw=false&aw_name=login&source_type=1",
      "/v1/project-1/get_awName_view",
      "/v1/project-1/basic-aw/aw-1/param-property",
      "/v1/project/project-1/public_aw_lib_and_aws",
      "/v1/project-1/available/config",
      "/v1/project/project-1?group_id=group-1",
      "/v1/project-1/testcase/case-1",
      "/v3/project-1/testcase/case-1?task_id=task-1",
      "/v4/project-1/testcase/case-1?task_id=task-1",
      "/v1/variables/getVarGroupList?project_id=project-1&page_no=1&page_size=10",
      "/v1/project-1/notice_config/notice_config_list",
      "/v1/project-1/get_timeOut_view",
      "/v1/project-1/local/desensitization/config",
      "/v3/project-1/variables?page_no=1&page_size=5&group_id=group-1",
      "/v1/variables/getVarbyGroup?project_id=project-1&page_no=2&page_size=5&group_id=group-1",
      "/v2/project-1/variable-synchronization?variable_name=base_url&group_id=group-1",
      "/v1/project-1/variable-synchronization?variable_name=base_url&group_id=group-1",
      "/v1/progress/progress-1?project_id=project-1"
    ]);
  });

  it("lists API test basic AWs in batch by id", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: [{ id: "aw-batch-1", name: "login" }]
        };
      }
    } as never);

    const result = await client.listApiTestBasicAwsBatch({
      project_id: "project-1",
      aw_ids: ["aw-batch-1"]
    });

    expect(requestedPath).toBe("/v1/project-1/basic-aws");
    expect(requestedBody).toEqual(["aw-batch-1"]);
    expect(result).toEqual({
      aws: [{ id: "aw-batch-1", name: "login" }],
      total: 1
    });
  });
});
