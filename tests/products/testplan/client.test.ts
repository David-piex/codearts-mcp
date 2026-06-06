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

  it("lists TestHub project testcases from v4 and v5 endpoints", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path.includes("/v5/testhub/")) {
          return {
            result: {
              total: 1,
              values: [
                {
                  id: "case-v5",
                  name: "api case",
                  number: "TC-002",
                  status: { name: "new" },
                  result: { name: "success" },
                  test_type: { name: "api" }
                }
              ]
            }
          };
        }

        return {
          total: 1,
          data: [
            {
              id: "case-v4",
              name: "manual case",
              number: "TC-001",
              status: { name: "new" },
              result: { name: "success" },
              test_type: { name: "manual" }
            }
          ]
        };
      }
    } as never);

    const v4Result = await client.listTesthubTestcases({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      plan_id: "version-1",
      subject: "login",
      owner_ids: ["user-1"],
      associate_issue_detail: true
    });
    const v5Result = await client.listTesthubTestcasesV5({
      project_id: "project-1",
      page: 3,
      page_size: 5,
      version_id: "version-1",
      execution_type_id: 3,
      useOffset: true
    });

    expect(v4Result.cases[0]).toMatchObject({
      case_id: "case-v4",
      name: "manual case",
      number: "TC-001",
      status: "new",
      result: "success",
      test_type: "manual"
    });
    expect(v4Result.total).toBe(1);
    expect(v5Result.cases[0]).toMatchObject({
      case_id: "case-v5",
      name: "api case",
      number: "TC-002",
      status: "new",
      result: "success",
      test_type: "api"
    });
    expect(v5Result.total).toBe(1);
    expect(requests).toEqual([
      {
        path: "/v4/testhub/projects/project-1/testcases/batch-query",
        body: {
          page_number: 2,
          page_size: 10,
          plan_id: "version-1",
          owner_ids: ["user-1"],
          subject: "login",
          associate_issue_detail: true
        }
      },
      {
        path: "/v5/testhub/projects/project-1/testcases/batch-query",
        body: {
          offset: 10,
          limit: 5,
          page_number: 3,
          page_size: 5,
          useOffset: true,
          version_id: "version-1",
          execution_type_id: 3
        }
      }
    ]);
  });

  it("lists testcase URI query results from v4 and v5 endpoints", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path === "/v4/testcase/exists") {
          return {
            result: ["case-v4-a"]
          };
        }
        if (path === "/v4/testcase-uris/search/used-for-automation") {
          return {
            result: {
              total: 1,
              value: ["case-auto-1"]
            }
          };
        }
        if (path.startsWith("/v5/")) {
          return {
            result: {
              total: 1,
              value: [
                {
                  id: "case-v5",
                  name: "api case",
                  type: "manual",
                  issue_id: "issue-1",
                  feature_uri: "feature-1"
                }
              ]
            }
          };
        }

        return {
          result: {
            total: 2,
            value: ["case-v4-a", "case-v4-b"]
          }
        };
      }
    } as never);

    const v4Result = await client.listTestcaseUrisV4({
      project_id: "project-1",
      page: 1,
      page_size: 10,
      version_uri: "version-1",
      case_uris: ["case-v4-a"],
      associated_issue: true
    });
    const v5Result = await client.listTestcaseUriInfosV5({
      project_id: "project-1",
      page: 2,
      page_size: 5,
      version_uri: "version-1",
      keyword: "api",
      service_types: [1, 2]
    });
    const existsResult = await client.checkTestcaseExists({
      project_uuid: "project-uuid-1",
      case_uris: ["case-v4-a"],
      version_uri: "version-1"
    });
    const automationResult = await client.searchTestcaseUrisUsedForAutomation({
      project_uuid: "project-uuid-1",
      page: 1,
      page_size: 20,
      keyword: "api",
      version_uri: "version-1",
      owner_ids: ["user-1"]
    });

    expect(v4Result).toMatchObject({
      uris: [
        { id: "case-v4-a", value: "case-v4-a" },
        { id: "case-v4-b", value: "case-v4-b" }
      ],
      total: 2
    });
    expect(v5Result).toMatchObject({
      cases: [
        {
          id: "case-v5",
          name: "api case",
          type: "manual",
          issue_id: "issue-1",
          feature_uri: "feature-1"
        }
      ],
      total: 1
    });
    expect(existsResult).toMatchObject({
      project_uuid: "project-uuid-1",
      existing_case_uris: ["case-v4-a"],
      total: 1
    });
    expect(automationResult).toMatchObject({
      uris: [{ id: "case-auto-1", value: "case-auto-1" }],
      total: 1
    });
    expect(requests).toEqual([
      {
        path: "/v4/project-1/testcases/uris/batch-query",
        body: {
          page_no: 1,
          page_size: 10,
          version_uri: "version-1",
          case_uris: ["case-v4-a"],
          associated_issue: true
        }
      },
      {
        path: "/v5/project-1/testcases/uris/batch-query",
        body: {
          page_no: 2,
          page_size: 5,
          keyword: "api",
          version_uri: "version-1",
          service_types: [1, 2]
        }
      },
      {
        path: "/v4/testcase/exists",
        body: {
          case_uris: ["case-v4-a"],
          version_uri: "version-1",
          project_uuid: "project-uuid-1"
        }
      },
      {
        path: "/v4/testcase-uris/search/used-for-automation",
        body: {
          page_no: 1,
          page_size: 20,
          project_uuid: "project-uuid-1",
          keyword: "api",
          version_uri: "version-1",
          owner_ids: ["user-1"]
        }
      }
    ]);
  });

  it("posts official TestPlan page and batch read requests", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path === "/v2/project-1/testpoints/page") {
          return { result: { page_list: [{ id: "testpoint-1", name: "Checkout point" }], total: 1 } };
        }
        if (path === "/v2/project-1/scenes/page") {
          return { result: { page_list: [{ id: "scene-1", name: "Checkout scene" }], total: 1 } };
        }
        if (path === "/v2/project-1/templates/templates-default") {
          return { result: { page_list: [{ id: "template-1", name: "Default template" }], total: 1 } };
        }
        if (path === "/v4/project-1/testcases/batch-list") {
          return { result: { testcases: [{ id: "case-1", name: "API case" }], total: 1 } };
        }
        if (path === "/v1/project-1/system-config/find-all") {
          return { result: { value: [{ id: "config-1", name: "timeout" }], total: 1 } };
        }

        return { result: { variableGroupName: [{ id: "group-1", name: "Default" }], total: 1 } };
      }
    } as never);

    await expect(
      client.listTestpointsPage({
        project_id: "project-1",
        page: 2,
        page_size: 5,
        deleted: "0",
        mindmap_id: "mindmap-1",
        node_id: "node-1"
      })
    ).resolves.toEqual({
      testpoints: [{ id: "testpoint-1", name: "Checkout point" }],
      total: 1,
      raw: { page_list: [{ id: "testpoint-1", name: "Checkout point" }], total: 1 }
    });
    await expect(
      client.listScenesPage({
        project_id: "project-1",
        page: 1,
        page_size: 10,
        offset: 3,
        deleted: "0"
      })
    ).resolves.toMatchObject({
      scenes: [{ id: "scene-1", name: "Checkout scene" }],
      total: 1
    });
    await expect(
      client.listDefaultTemplates({
        project_id: "project-1",
        page: 1,
        page_size: 20,
        name: ""
      })
    ).resolves.toMatchObject({
      templates: [{ id: "template-1", name: "Default template" }],
      total: 1
    });
    await expect(
      client.listTestcasesBatch({
        project_id: "project-1",
        page: 3,
        page_size: 10,
        keyword: "checkout",
        useOffset: false,
        version_uri: "version-1",
        service_type: -1,
        exeplatforms: ["api"],
        own: true,
        queryByDisplayCfg: false,
        custom_field_info: [{ field: "priority", value: "P1" }],
        test_designs: [true, "design-1"]
      })
    ).resolves.toMatchObject({
      cases: [{ id: "case-1", name: "API case" }],
      total: 1
    });
    await expect(
      client.listSystemConfigs({
        project_id: "project-1",
        params: { project_id: "project-1" },
        id: "config-1",
        key: 100,
        value: "enabled"
      })
    ).resolves.toMatchObject({
      configs: [{ id: "config-1", name: "timeout" }],
      total: 1
    });
    await expect(
      client.listVariableGroupNames({
        project_id: "project-1",
        page: 1,
        page_size: 10,
        query: "{\"pageNo\":1,\"pageSize\":10}"
      })
    ).resolves.toMatchObject({
      groups: [{ id: "group-1", name: "Default" }],
      total: 1
    });
    await expect(
      client.listVariableGroupNames({
        project_id: "project-1",
        page: 1,
        page_size: 10
      })
    ).resolves.toMatchObject({
      groups: [{ id: "group-1", name: "Default" }],
      total: 1
    });

    expect(requests).toEqual([
      {
        path: "/v2/project-1/testpoints/page",
        body: {
          params: {
            offset: 2,
            limit: 5,
            deleted: "no",
            mindmap_id: "mindmap-1",
            node_id: "node-1"
          }
        }
      },
      {
        path: "/v2/project-1/scenes/page",
        body: {
          params: {
            offset: 3,
            limit: 10,
            deleted: "no"
          }
        }
      },
      {
        path: "/v2/project-1/templates/templates-default",
        body: {
          params: {
            name: ""
          }
        }
      },
      {
        path: "/v4/project-1/testcases/batch-list",
        body: {
          page_no: 3,
          page_size: 10,
          keyword: "checkout",
          useOffset: false,
          version_uri: "version-1",
          service_type: -1,
          custom_field_info: [{ field: "priority", value: "P1" }],
          test_designs: [true, "design-1"],
          exeplatforms: ["api"],
          own: true,
          queryByDisplayCfg: false
        }
      },
      {
        path: "/v1/project-1/system-config/find-all",
        body: {
          params: {
            project_id: "project-1",
            id: "config-1",
            key: 100,
            value: "enabled"
          }
        }
      },
      {
        path: "/v1/project-1/variables/variablegroup_namepaging",
        body: {
          ListVariableGroupNamePagingRequestBody: [{ pageNo: 1, pageSize: 10 }]
        }
      },
      {
        path: "/v1/project-1/variables/variablegroup_namepaging",
        body: {
          ListVariableGroupNamePagingRequestBody: [null]
        }
      }
    ]);
  });

  it("searches official autotasks and issues tree endpoints", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path === "/v4/testcase/autotask/search") {
          return {
            result: {
              total: 1,
              value: [{ id: "task-1", name: "nightly smoke" }]
            }
          };
        }
        if (path === "/v4/projects/project-1/issues-tree") {
          return {
            result: {
              total: 1,
              value: [{ id: "issue-1", subject: "story root" }]
            }
          };
        }

        return {
          result: {
            total: 1,
            value: [{ id: "ipd-1", subject: "ipd root" }]
          }
        };
      }
    } as never);

    await expect(
      client.searchAutotask({
        project_uuid: "project-uuid-1",
        versionUri: "version-1",
        page: 2,
        page_size: 10,
        order: "desc",
        by: "create_time",
        condition: { key: "name", type: "like", value: "smoke" }
      })
    ).resolves.toEqual({
      tasks: [{ id: "task-1", name: "nightly smoke" }],
      total: 1,
      raw: { total: 1, value: [{ id: "task-1", name: "nightly smoke" }] }
    });
    await expect(
      client.listIssuesTree({
        project_id: "project-1",
        page_number: 2,
        page_size: 20,
        parent_id: "parent-1",
        tracker_id: "tracker-1",
        include_sub_issue: true,
        filter: {
          owner_ids: ["user-1"]
        }
      })
    ).resolves.toEqual({
      issues: [{ id: "issue-1", subject: "story root" }],
      total: 1,
      raw: { total: 1, value: [{ id: "issue-1", subject: "story root" }] }
    });
    await expect(
      client.listIpdIssuesTree({
        project_id: "project-1",
        page_number: 1,
        page_size: 50,
        tracker_id: "7",
        filter: {
          owner_ids: ["user-2"],
          keyword: "checkout"
        }
      })
    ).resolves.toEqual({
      issues: [{ id: "ipd-1", subject: "ipd root" }],
      total: 1,
      raw: { total: 1, value: [{ id: "ipd-1", subject: "ipd root" }] }
    });

    expect(requests).toEqual([
      {
        path: "/v4/testcase/autotask/search",
        body: {
          versionUri: "version-1",
          pageNo: 2,
          pageSize: 10,
          project_uuid: "project-uuid-1",
          offset: 10,
          limit: 10,
          order: "desc",
          by: "create_time",
          condition: { key: "name", type: "like", value: "smoke" }
        }
      },
      {
        path: "/v4/projects/project-1/issues-tree",
        body: {
          page_number: 2,
          page_size: 20,
          parent_id: "parent-1",
          tracker_id: "tracker-1",
          include_sub_issue: true,
          filter: {
            owner_ids: ["user-1"]
          }
        }
      },
      {
        path: "/v4/projects/project-1/ipd/issues-tree",
        body: {
          page_number: 1,
          page_size: 50,
          tracker_id: "7",
          filter: {
            owner_ids: ["user-2"],
            keyword: "checkout"
          }
        }
      }
    ]);
  });

  it("creates, updates, refreshes report writes and quality attributes with expected payloads", async () => {
    const requests: Array<{ method: string; path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "post", path, body });
        return { result: "report-created" };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "put", path, body });
        return { result: "success" };
      }
    } as never);

    const createResult = await client.createTestReport({
      project_id: "project-1",
      version_uri: "version-1",
      name: "report-a",
      test_conclusion: "ok",
      risk_analysis: "none",
      iterator_uris: ["iter-1"]
    });
    const updateResult = await client.updateTestReport({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "report-1",
      name: "report-b",
      body: {
        test_conclusion_details: "detail"
      }
    });
    const qualityResult = await client.updateTestReportQualityAttributes({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "report-1",
      body: {
        value: [{ key: "quality", value: "A" }]
      }
    });
    const refreshResult = await client.refreshCustomTemplateReport({
      project_id: "project-1",
      version_uri: "version-1",
      name: "report-c",
      type: "custom",
      workpiece_type: "issue",
      template_config: { sections: ["summary"] }
    });

    expect(createResult).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "report-created",
      name: "report-a"
    });
    expect(updateResult).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "report-1",
      name: "report-b",
      value: "success"
    });
    expect(qualityResult).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "report-1",
      value: "success"
    });
    expect(refreshResult).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "report-created",
      name: "report-c"
    });
    expect(requests).toEqual([
      {
        method: "post",
        path: "/v4/project-1/versions/version-1/test-reports",
        body: {
          name: "report-a",
          test_conclusion: "ok",
          risk_analysis: "none",
          iterator_uris: ["iter-1"]
        }
      },
      {
        method: "put",
        path: "/v4/project-1/versions/version-1/test-reports/report-1",
        body: {
          name: "report-b",
          test_conclusion_details: "detail"
        }
      },
      {
        method: "put",
        path: "/v4/project-1/versions/version-1/test-reports/report-1/quality-attributes",
        body: {
          value: [{ key: "quality", value: "A" }]
        }
      },
      {
        method: "post",
        path: "/v4/project-1/versions/version-1/custom-template-reports/refresh",
        body: {
          name: "report-c",
          type: "custom",
          workpiece_type: "issue",
          template_config: { sections: ["summary"] }
        }
      }
    ]);
  });

  it("adds, deletes, and updates project settings writes with expected payloads", async () => {
    const requests: Array<{ method: string; path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "post", path, body });
        return { status: "success", value: "success" };
      },
      delete: async (path: string, body?: unknown) => {
        requests.push({ method: "delete", path, body });
        return { status: "success", value: "success" };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "put", path, body });
        return { status: "success", value: "success" };
      }
    } as never);

    const addResult = await client.addProjectUsers({
      project_id: "project-1",
      user_id_List: ["user-1", "user-2"]
    });
    const deleteResult = await client.deleteProjectUsers({
      project_id: "project-1",
      user_id_List: ["user-1"]
    });
    const issueResult = await client.updateProjectIssueUpdateNotification({
      project_id: "project-1",
      owner_id: "user-1",
      is_display: "0"
    });
    const noticeResult = await client.updateProjectMessageNotices({
      project_id: "project-1",
      id: "notice-1",
      type: 1,
      send_email: true,
      send_message: false,
      notice_users: [{ id: "user-1", name: "alice" }]
    });

    expect(addResult).toMatchObject({
      project_id: "project-1",
      user_id_List: ["user-1", "user-2"],
      value: "success",
      status: "success"
    });
    expect(deleteResult).toMatchObject({
      project_id: "project-1",
      user_id_List: ["user-1"],
      value: "success",
      status: "success"
    });
    expect(issueResult).toMatchObject({
      project_id: "project-1",
      owner_id: "user-1",
      value: "success",
      status: "success"
    });
    expect(noticeResult).toMatchObject({
      project_id: "project-1",
      id: "notice-1",
      value: "success",
      status: "success"
    });
    expect(requests).toEqual([
      {
        method: "post",
        path: "/v4/projects/project-1/users",
        body: { user_id_List: ["user-1", "user-2"] }
      },
      {
        method: "delete",
        path: "/v4/projects/project-1/users",
        body: { user_id_List: ["user-1"] }
      },
      {
        method: "put",
        path: "/v4/projects/project-1/issue-update-notification",
        body: { owner_id: "user-1", is_display: "0" }
      },
      {
        method: "put",
        path: "/v4/projects/project-1/message-notices",
        body: {
          id: "notice-1",
          type: 1,
          send_email: true,
          send_message: false,
          project_id: "project-1",
          notice_users: [{ id: "user-1", name: "alice" }]
        }
      }
    ]);
  });

  it("creates custom template reports and updates or deletes progress reports", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "post", path, body });
        return { value: "custom-report-1" };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "put", path, body });
        return { status: "success", value: "success" };
      },
      delete: async (path: string) => {
        requests.push({ method: "delete", path });
        return { status: "success", value: "success" };
      }
    } as never);

    const createResult = await client.createCustomTemplateReport({
      project_id: "project-1",
      version_uri: "version-1",
      name: "custom-report",
      type: "custom",
      workpiece_type: "issue",
      template_config: { sections: ["summary"] },
      data: [{ issue_id: "70844211" }]
    });
    const updateResult = await client.updateProgressReport({
      project_uuid: "project-1",
      version_uri: "version-1",
      report_uri: "progress-1",
      name: "progress-report",
      analysis_dim_row: "owner",
      compare_dim_column: "status",
      filter: {
        ownerIds: "user-1",
        status: "new"
      }
    });
    const deleteResult = await client.deleteProgressReport({
      project_uuid: "project-1",
      version_uri: "version-1",
      report_uri: "progress-1"
    });

    expect(createResult).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "custom-report-1",
      name: "custom-report",
      value: "custom-report-1"
    });
    expect(updateResult).toMatchObject({
      project_uuid: "project-1",
      version_uri: "version-1",
      report_id: "progress-1",
      value: "success"
    });
    expect(deleteResult).toMatchObject({
      project_uuid: "project-1",
      version_uri: "version-1",
      report_id: "progress-1",
      deleted: true,
      value: "success"
    });
    expect(requests).toEqual([
      {
        method: "post",
        path: "/v4/project-1/versions/version-1/custom-template-reports",
        body: {
          name: "custom-report",
          type: "custom",
          workpiece_type: "issue",
          template_config: { sections: ["summary"] },
          data: [{ issue_id: "70844211" }]
        }
      },
      {
        method: "put",
        path: "/v4/project-1/versions/version-1/progress-reports/progress-1",
        body: {
          name: "progress-report",
          analysis_dim_row: "owner",
          compare_dim_column: "status",
          filter: {
            ownerIds: "user-1",
            status: "new"
          }
        }
      },
      {
        method: "delete",
        path: "/v4/project-1/versions/version-1/progress-reports/progress-1"
      }
    ]);
  });

  it("updates and deletes custom template reports and refreshes or creates progress reports", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "post", path, body });
        if (path === "/v4/project-1/versions/version-1/progress-reports/refresh") {
          return {
            result: {
              is_async_operate: true,
              async_uri: "operation-refresh-1",
              return_value: "refresh-queued"
            }
          };
        }
        return {
          is_async_operate: true,
          async_uri: "operation-create-1"
        };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "put", path, body });
        return { status: "success", value: "success" };
      },
      delete: async (path: string) => {
        requests.push({ method: "delete", path });
        return { status: "success", value: "deleted-report-1" };
      }
    } as never);

    const updateResult = await client.updateCustomTemplateReport({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "custom-report-1",
      name: "custom-report-updated",
      type: "custom",
      workpiece_type: "issue",
      template_config: { sections: ["summary"] },
      data: [{ issue_id: "70844211" }]
    });
    const deleteResult = await client.deleteCustomTemplateReport({
      project_id: "project-1",
      version_uri: "version-1",
      report_uri: "custom-report-1"
    });
    const refreshResult = await client.refreshProgressReport({
      project_uuid: "project-1",
      version_uri: "version-1",
      name: "progress-report",
      workpiece_type: "suite",
      analysis_dim_row: "owner",
      compare_dim_column: "status",
      filter: {
        ownerIds: "user-1",
        status: "new",
        featureUris: ["feature-1"]
      }
    });
    const createResult = await client.createProgressReport({
      project_uuid: "project-1",
      version_uri: "version-1",
      name: "progress-created",
      type: "2",
      workpiece_type: "progress",
      analysis_dim_row: "progress",
      filter: {
        startTime: "2025-10-01 23:59:59",
        endTime: "2025-10-18 23:59:59",
        featureUris: ["feature-1"]
      }
    });

    expect(updateResult).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "custom-report-1",
      name: "custom-report-updated",
      value: "success"
    });
    expect(deleteResult).toMatchObject({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "custom-report-1",
      deleted: true,
      value: "deleted-report-1"
    });
    expect(refreshResult).toEqual({
      project_uuid: "project-1",
      version_uri: "version-1",
      operation_uri: "operation-refresh-1",
      is_async_operate: true,
      return_value: "refresh-queued",
      value: undefined,
      raw: {
        is_async_operate: true,
        async_uri: "operation-refresh-1",
        return_value: "refresh-queued"
      }
    });
    expect(createResult).toEqual({
      project_uuid: "project-1",
      version_uri: "version-1",
      operation_uri: "operation-create-1",
      is_async_operate: true,
      return_value: undefined,
      value: undefined,
      raw: {
        is_async_operate: true,
        async_uri: "operation-create-1"
      }
    });
    expect(requests).toEqual([
      {
        method: "put",
        path: "/v4/project-1/versions/version-1/custom-template-reports/custom-report-1",
        body: {
          name: "custom-report-updated",
          type: "custom",
          workpiece_type: "issue",
          template_config: { sections: ["summary"] },
          data: [{ issue_id: "70844211" }]
        }
      },
      {
        method: "delete",
        path: "/v4/project-1/versions/version-1/custom-template-reports/custom-report-1"
      },
      {
        method: "post",
        path: "/v4/project-1/versions/version-1/progress-reports/refresh",
        body: {
          name: "progress-report",
          workpiece_type: "suite",
          analysis_dim_row: "owner",
          compare_dim_column: "status",
          filter: {
            ownerIds: "user-1",
            status: "new",
            featureUris: ["feature-1"]
          }
        }
      },
      {
        method: "post",
        path: "/v5/project-1/versions/version-1/progress-reports",
        body: {
          name: "progress-created",
          type: "2",
          workpiece_type: "progress",
          analysis_dim_row: "progress",
          filter: {
            startTime: "2025-10-01 23:59:59",
            endTime: "2025-10-18 23:59:59",
            featureUris: ["feature-1"]
          }
        }
      }
    ]);
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

  it("creates, updates, and deletes defect associations through iterator query params", async () => {
    const requests: Array<{ method: string; path: string }> = [];
    const client = createTestPlanClient({
      post: async (path: string) => {
        requests.push({ method: "post", path });
        return { status: "success", value: true };
      },
      put: async (path: string) => {
        requests.push({ method: "put", path });
        return { status: "success", value: true };
      },
      delete: async (path: string) => {
        requests.push({ method: "delete", path });
        return { status: "success", value: true };
      }
    } as never);

    await client.createDefectAssociation({
      project_id: "project-1",
      defect_id: "defect-1",
      iterator_uri: "iter-1"
    });
    await client.updateDefectAssociation({
      project_id: "project-1",
      defect_id: "defect-1",
      old_iterator_uri: "iter-1",
      new_iterator_uri: "iter-2"
    });
    await client.deleteDefectAssociation({
      project_id: "project-1",
      defect_id: "defect-1",
      iterator_uri: "iter-2"
    });

    expect(requests).toEqual([
      {
        method: "post",
        path: "/v4/project-1/defects/defect-1/association?iterator_uri=iter-1"
      },
      {
        method: "put",
        path: "/v4/project-1/defects/defect-1/association?old_iterator_uri=iter-1&new_iterator_uri=iter-2"
      },
      {
        method: "delete",
        path: "/v4/project-1/defects/defect-1/association?iterator_uri=iter-2"
      }
    ]);
  });

  it("lists task parameter templates", async () => {
    let requestedPath = "";
    let requestedOptions: unknown;
    const client = createTestPlanClient({
      get: async (path: string, options?: unknown) => {
        requestedPath = path;
        requestedOptions = options;
        return {
          result: [
            {
              id: "template-1",
              name: "smoke",
              serviceId: "service-1",
              value: "{\"env\":\"dev\"}"
            }
          ],
          status: "success"
        };
      }
    } as never);

    const result = await client.listTaskParameterTemplates({
      project_id: "project-1",
      serviceId: "service-1",
      sort_by: "createDate",
      sort_direction: "DESC",
      name: "smoke"
    });

    expect(requestedPath).toBe(
      "/config/v2/systemconfig/tasktemplate?serviceId=service-1&sort_by=createDate&sort_direction=DESC&name=smoke"
    );
    expect(requestedOptions).toEqual({
      headers: {
        "x-auth-groups": "project-1"
      }
    });
    expect(result).toEqual({
      serviceId: "service-1",
      templates: [
        {
          id: "template-1",
          name: "smoke",
          serviceId: "service-1",
          value: "{\"env\":\"dev\"}"
        }
      ],
      raw: {
        result: [
          {
            id: "template-1",
            name: "smoke",
            serviceId: "service-1",
            value: "{\"env\":\"dev\"}"
          }
        ],
        status: "success"
      }
    });
  });

  it("gets testcase dataset sample metadata", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          status: "success",
          result: {
            info: {
              file_name: "Testcase-Dataset-Simple-zh.xlsx"
            }
          }
        };
      }
    } as never);

    const result = await client.getTestcaseDatasetSample({
      project_id: "project-1"
    });

    expect(requestedPath).toBe("/v1/project-1/testcase/dataset/simple");
    expect(result).toEqual({
      project_id: "project-1",
      raw: {
        info: {
          file_name: "Testcase-Dataset-Simple-zh.xlsx"
        }
      }
    });
  });

  it("lists dynamic global variables for a task", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          code: "success",
          data: {
            variable_a: "alpha",
            variable_b: "beta"
          }
        };
      }
    } as never);

    const result = await client.listDynamicGlobalVariables({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(requestedPath).toBe("/dynamic-global-variable/project-1/task-1");
    expect(result).toEqual({
      project_id: "project-1",
      task_id: "task-1",
      value: {
        variable_a: "alpha",
        variable_b: "beta"
      },
      raw: {
        code: "success",
        data: {
          variable_a: "alpha",
          variable_b: "beta"
        }
      }
    });
  });

  it("gets a dynamic global variable by key", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          code: "success",
          data: "value-1"
        };
      }
    } as never);

    const result = await client.getDynamicGlobalVariable({
      project_id: "project-1",
      task_id: "task-1",
      key: "host"
    });

    expect(requestedPath).toBe("/dynamic-global-variable/project-1/task-1/host");
    expect(result).toEqual({
      project_id: "project-1",
      task_id: "task-1",
      key: "host",
      value: "value-1",
      raw: {
        code: "success",
        data: "value-1"
      }
    });
  });

  it("updates a dynamic global variable by key", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createTestPlanClient({
      put: async (path: string, body: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          code: "success",
          data: {
            updated: true
          }
        };
      }
    } as never);

    const result = await client.updateDynamicGlobalVariable({
      project_id: "project-1",
      task_id: "task-1",
      key: "host",
      body: {
        CreateVariableRequestBody: [
          {
            key: "host",
            value: "127.0.0.1",
            type: "String"
          }
        ]
      }
    });

    expect(requestedPath).toBe("/dynamic-global-variable/project-1/task-1/host");
    expect(requestedBody).toEqual({
      CreateVariableRequestBody: [
        {
          key: "host",
          value: "127.0.0.1",
          type: "String"
        }
      ]
    });
    expect(result).toEqual({
      project_id: "project-1",
      task_id: "task-1",
      key: "host",
      value: {
        updated: true
      },
      raw: {
        code: "success",
        data: {
          updated: true
        }
      }
    });
  });

  it("deletes a dynamic global variable by key", async () => {
    let requestedPath = "";
    const client = createTestPlanClient({
      delete: async (path: string) => {
        requestedPath = path;
        return {
          code: "success",
          data: {}
        };
      }
    } as never);

    const result = await client.deleteDynamicGlobalVariable({
      project_id: "project-1",
      task_id: "task-1",
      key: "host"
    });

    expect(requestedPath).toBe("/dynamic-global-variable/project-1/task-1/host");
    expect(result).toEqual({
      project_id: "project-1",
      task_id: "task-1",
      key: "host",
      raw: {
        code: "success",
        data: {}
      }
    });
  });

  it("deletes official TestPlan resources by documented endpoints", async () => {
    const requests: Array<{ path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      delete: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        return {
          status: "success",
          result: "success"
        };
      }
    } as never);

    await expect(client.deleteAsset({ project_id: "project-1", id: "asset-1" })).resolves.toEqual({
      asset_id: "asset-1",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteMindmap({ project_id: "project-1", id: "mindmap-1" })
    ).resolves.toEqual({
      mindmap_id: "mindmap-1",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteTestDesignTemplate({ project_id: "project-1", id: "template-1" })
    ).resolves.toEqual({
      template_id: "template-1",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteMindmapRecycle({ project_id: "project-1", id: "recycle-1" })
    ).resolves.toEqual({
      recycle_id: "recycle-1",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteMindmapBackup({ project_id: "project-1", id: "backup-1" })
    ).resolves.toEqual({
      backup_id: "backup-1",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteBasicAwsV1({
        project_id: "project-1",
        aw_ids: ["aw-1", "aw-2"],
        is_api: true
      })
    ).resolves.toEqual({
      aw_ids: ["aw-1", "aw-2"],
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteBasicAwsV2({ project_id: "project-1", aw_ids: ["aw-3"] })
    ).resolves.toEqual({
      aw_ids: ["aw-3"],
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(client.deleteFactor({ project_id: "project-1", id: "factor-1" })).resolves.toEqual({
      factor_id: "factor-1",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.batchDeleteFactors({ project_id: "project-1", factor_ids: ["factor-1", "factor-2"] })
    ).resolves.toEqual({
      factor_ids: ["factor-1", "factor-2"],
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteAttachment({ project_id: "project-1", attachment_uri: "attachment-1" })
    ).resolves.toEqual({
      attachment_uri: "attachment-1",
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteIssueDynamicRecords({
        project_id: "project-1",
        issue_id: "issue-1",
        owner_id: "owner-1"
      })
    ).resolves.toEqual({
      issue_id: "issue-1",
      owner_id: "owner-1",
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteCustomizedFilter({ project_id: "project-1", filter_uri: "filter-1" })
    ).resolves.toEqual({
      filter_uri: "filter-1",
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteVectors({ project_uuid: "project-uuid-1", case_uris: ["case-1", "case-2"] })
    ).resolves.toEqual({
      project_uuid: "project-uuid-1",
      case_uris: ["case-1", "case-2"],
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteRecycleResource({
        project_uuid: "project-uuid-1",
        resources: [{ resource_type: "TestCase", resource_uris: ["case-1"] }],
        is_async: true
      })
    ).resolves.toEqual({
      project_uuid: "project-uuid-1",
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.deleteTestcasesV3({
        project_id: "project-1",
        testcases: [{ id: "case-1", type: "TestCase" }],
        delete_git_script: true,
        iterator_uri: "iterator-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      value: "success",
      raw: { status: "success", result: "success" }
    });

    expect(requests).toEqual([
      { path: "/v1/project-1/asset/asset-1", body: undefined },
      { path: "/v1/project-1/mindmaps/mindmap-1", body: undefined },
      { path: "/v2/project-1/templates/template-1", body: undefined },
      { path: "/v2/project-1/mindmap-recycles/recycle-1", body: undefined },
      { path: "/v2/project-1/mindmap-backups/backup-1", body: undefined },
      { path: "/v1/project-1/basic-aws?is_api=true", body: ["aw-1", "aw-2"] },
      { path: "/v2/project-1/basic-aws", body: ["aw-3"] },
      { path: "/v1/project-1/factor/factor-1", body: undefined },
      { path: "/v1/project-1/factor", body: { params: ["factor-1", "factor-2"] } },
      { path: "/v4/project-1/attachments/attachment-1", body: undefined },
      {
        path: "/v4/projects/project-1/issue-update-records?issue_id=issue-1&owner_id=owner-1",
        body: undefined
      },
      { path: "/v4/projects/project-1/filters/filter-1", body: undefined },
      {
        path: "/v4/testcases/vector",
        body: { project_uuid: "project-uuid-1", case_uris: ["case-1", "case-2"] }
      },
      {
        path: "/v4/recycle",
        body: {
          project_uuid: "project-uuid-1",
          resources: [{ resource_type: "TestCase", resource_uris: ["case-1"] }],
          is_async: true
        }
      },
      {
        path: "/v3/project-1/testcases?delete_git_script=true&iterator_uri=iterator-1",
        body: [{ id: "case-1", type: "TestCase" }]
      }
    ]);
  });

  it("calls official TestPlan AW write endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "post", path, body });
        return {
          status: "success",
          result: { id: "cata-1", rate: 0 }
        };
      },
      delete: async (path: string, body?: unknown) => {
        requests.push({ method: "delete", path, body });
        return {
          status: "success",
          result: "success"
        };
      }
    } as never);

    await expect(
      client.createAwCataFirst({
        project_id: "project-1",
        name: "Smoke",
        desc: "desc",
        parent_id: "TOP",
        aw_type: 4,
        body: { custom: true }
      })
    ).resolves.toEqual({
      cata_id: "cata-1",
      value: { id: "cata-1", rate: 0 },
      raw: { id: "cata-1", rate: 0 }
    });
    await expect(
      client.deleteAwCatas({
        project_id: "project-1",
        items: [{ id: "cata-1", is_folder: true }]
      })
    ).resolves.toEqual({
      ids: ["cata-1"],
      value: { id: "cata-1", rate: 0 },
      raw: { id: "cata-1", rate: 0 }
    });
    await expect(
      client.deleteCustomAwFile({
        project_id: "project-1",
        basic_aw_id: "aw-1",
        aw_lib_id: "lib-1"
      })
    ).resolves.toEqual({
      basic_aw_id: "aw-1",
      aw_lib_id: "lib-1",
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.updateAwNameView({
        project_id: "project-1",
        name_view: "1",
        source_type: 2
      })
    ).resolves.toEqual({
      value: { id: "cata-1", rate: 0 },
      raw: { id: "cata-1", rate: 0 }
    });
    await expect(
      client.updateTimeOutView({
        project_id: "project-1",
        time_out: 30,
        source_type: 2
      })
    ).resolves.toEqual({
      value: { id: "cata-1", rate: 0 },
      raw: { id: "cata-1", rate: 0 }
    });
    await expect(
      client.saveAwRefreshToAll({
        project_id: "project-1",
        aw_id: "aw-1",
        body: { operation_type: "refresh" }
      })
    ).resolves.toEqual({
      aw_id: "aw-1",
      value: { id: "cata-1", rate: 0 },
      raw: { id: "cata-1", rate: 0 }
    });

    expect(requests).toEqual([
      {
        method: "post",
        path: "/v1/project-1/aw_cata/create_aw_cata",
        body: { custom: true, name: "Smoke", desc: "desc", parent_id: "TOP", aw_type: 4 }
      },
      {
        method: "post",
        path: "/v1/project-1/aw_cata/delete_aw_catas",
        body: [{ id: "cata-1", is_folder: true }]
      },
      {
        method: "delete",
        path: "/v1/project-1/basic-aw-lib/aw-1/lib-1",
        body: undefined
      },
      {
        method: "post",
        path: "/v1/project-1/update_awName_view?source_type=2",
        body: { project_id: "project-1", name_view: "1" }
      },
      {
        method: "post",
        path: "/v1/project-1/update_timeOut_view?source_type=2",
        body: { project_id: "project-1", time_out: 30 }
      },
      {
        method: "post",
        path: "/v1/project-1/basic-aw/refresh-to-all/save?aw_id=aw-1",
        body: { operation_type: "refresh" }
      }
    ]);
  });

  it("calls official TestPlan misc endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return { value: "success" };
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "PUT", path, body });
        return { code: "success", data: null };
      }
    } as never);

    await expect(
      client.batchSendNotifications({
        project_id: "project-1",
        type: "casecomment",
        receivers: ["user-1"],
        comment_id: "comment-1",
        inner_text: "hello"
      })
    ).resolves.toEqual({
      value: "success",
      raw: { value: "success" }
    });
    await expect(client.createResourceUriV4({ project_id: "project-1" })).resolves.toEqual({
      value: "success",
      raw: { value: "success" }
    });
    await expect(
      client.downloadClasses({ project_id: "project-1", testcase_ids: ["case-1"] })
    ).resolves.toEqual({
      value: "success",
      raw: { value: "success" }
    });
    await expect(
      client.updateUserInfos({
        project_id: "project-1",
        old_user_num: "old-user",
        new_user_num: "new-user",
        update_business_type: "mindmap",
        update_resource_id: "mindmap-1"
      })
    ).resolves.toEqual({
      value: null,
      raw: { code: "success", data: null }
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v4/project-1/notifications/batch-send",
        body: {
          type: "casecomment",
          receivers: ["user-1"],
          comment_id: "comment-1",
          inner_text: "hello"
        }
      },
      { method: "POST", path: "/GT3KServer/v4/project-1/resource-uri", body: undefined },
      {
        method: "POST",
        path: "/v1/project-1/scripts",
        body: { DownloadClassesRequestBody: ["case-1"] }
      },
      {
        method: "PUT",
        path: "/v1/project-1/update-userinfo",
        body: {
          params: {
            old_user_num: "old-user",
            new_user_num: "new-user",
            update_business_type: "mindmap",
            update_resource_id: "mindmap-1"
          }
        }
      }
    ]);
  });

  it("calls TestPlan import and upload endpoints", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: unknown;
      headers?: Record<string, string>;
    }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return { status: "success", result: { value: "import-1" } };
      },
      postMultipart: async (path: string, body: FormData, options?: { headers?: Record<string, string> }) => {
        requests.push({ method: "POST_MULTIPART", path, body, headers: options?.headers });
        return { status: "success", result: { id: "file-1" }, value: { id: "file-1" } };
      }
    } as never);

    await expect(
      client.importTasks({
        source_version_uri: "v1",
        dest_version_uri: "v2",
        source_task_uris: ["task-1"],
        project_uuid: "project-1",
        is_copy: true
      })
    ).resolves.toEqual({
      value: { value: "import-1" },
      raw: { value: "import-1" }
    });
    await expect(
      client.uploadBackground({
        project_id: "project-1",
        background_type: "background",
        file_name: "demo.png",
        file_content: new Uint8Array([1, 2, 3]),
        content_type: "image/png"
      })
    ).resolves.toMatchObject({
      value: { id: "file-1" },
      raw: { id: "file-1" }
    });
    await expect(
      client.createTestStepByCollection({
        project_id: "project-1",
        x_auth_token: "token",
        file_name: "collection.json",
        file_content: new Uint8Array([4, 5, 6]),
        branch_uri: "branch-1",
        tmss_case_uri: "case-1",
        content_type: "application/json"
      })
    ).resolves.toMatchObject({
      value: { id: "file-1" },
      raw: { id: "file-1" }
    });
    await expect(
      client.uploadFileToGit({
        project_id: "project-1",
        x_auth_token: "token",
        file_name: "payload.txt",
        file_content: new Uint8Array([7, 8, 9]),
        aw_ins_id: "aw-1",
        case_id: "case-1",
        is_combined_aw: true,
        content_type: "text/plain"
      })
    ).resolves.toMatchObject({
      value: { id: "file-1" },
      raw: { id: "file-1" }
    });
    await expect(
      client.uploadFileV3({
        project_id: "project-1",
        x_auth_token: "token",
        file_name: "script.yaml",
        file_content: new Uint8Array([10, 11, 12]),
        content_type: "application/yaml"
      })
    ).resolves.toMatchObject({
      value: { id: "file-1" },
      raw: { id: "file-1" }
    });

    expect(requests).toHaveLength(5);
    expect(requests[0]).toEqual({
      method: "POST",
      path: "/v4/tasks/import",
      body: {
        source_version_uri: "v1",
        dest_version_uri: "v2",
        source_task_uris: ["task-1"],
        project_uuid: "project-1",
        is_copy: true
      }
    });
    expect(requests[1]?.path).toBe("/v4/project-1/background/upload?background_type=background");
    expect(requests[2]?.path).toBe("/v1/project-1/postman-collection?branch_uri=branch-1&tmss_case_uri=case-1");
    expect(requests[2]?.headers).toEqual({ "X-Auth-Token": "token" });
    expect(requests[3]?.path).toBe("/v1/project-1/uploadFile?aw_ins_id=aw-1&case_id=case-1&is_combined_aw=true");
    expect(requests[3]?.headers).toEqual({ "X-Auth-Token": "token" });
    expect(requests[4]?.path).toBe("/v3/project-1/files");
    expect(requests[4]?.headers).toEqual({ "X-Auth-Token": "token" });

    const backgroundFile = (requests[1]?.body as FormData).get("param");
    const collectionFile = (requests[2]?.body as FormData).get("req");
    const gitFile = (requests[3]?.body as FormData).get("request");
    const v3File = (requests[4]?.body as FormData).get("request");

    expect(backgroundFile).toBeInstanceOf(File);
    expect(collectionFile).toBeInstanceOf(File);
    expect(gitFile).toBeInstanceOf(File);
    expect(v3File).toBeInstanceOf(File);
    expect((backgroundFile as File).name).toBe("demo.png");
    expect((collectionFile as File).name).toBe("collection.json");
    expect((gitFile as File).name).toBe("payload.txt");
    expect((v3File as File).name).toBe("script.yaml");
  });

  it("calls TestPlan attachment association and resource upload endpoints", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: unknown;
      headers?: Record<string, string>;
    }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return { status: "success", result: "success" };
      },
      postMultipart: async (path: string, body: FormData, options?: { headers?: Record<string, string> }) => {
        requests.push({ method: "POST_MULTIPART", path, body, headers: options?.headers });
        return {
          status: "success",
          result: {
            value:
              '[{\"docsize\":\"20270\",\"file_path\":\"attachment_obs/demo/TestCase/evidence.png\",\"storage_system\":\"obs\",\"doc_name\":\"evidence.png\"}]'
          }
        };
      }
    } as never);

    await expect(
      client.associateAttachments({
        project_id: "project-1",
        resource_uri: "case-1",
        attachments: [
          {
            file_name: "evidence.png",
            doc_id: "doc-1",
            related_type: "1",
            override: true
          }
        ],
        resource_type: "TestCase",
        system_type: "docman",
        version_uri: "version-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      resource_uri: "case-1",
      value: "success",
      raw: { status: "success", result: "success" }
    });
    await expect(
      client.uploadResourceAttachment({
        project_id: "project-1",
        resource_uri: "case-1",
        resource_type: "TestCase",
        version_uri: "version-1",
        file_name: "evidence.png",
        file_content: new Uint8Array([1, 2, 3]),
        content_type: "image/png"
      })
    ).resolves.toMatchObject({
      value: {
        value:
          '[{\"docsize\":\"20270\",\"file_path\":\"attachment_obs/demo/TestCase/evidence.png\",\"storage_system\":\"obs\",\"doc_name\":\"evidence.png\"}]'
      },
      raw: {
        value:
          '[{\"docsize\":\"20270\",\"file_path\":\"attachment_obs/demo/TestCase/evidence.png\",\"storage_system\":\"obs\",\"doc_name\":\"evidence.png\"}]'
      }
    });

    expect(requests).toHaveLength(2);
    expect(requests[0]).toEqual({
      method: "POST",
      path: "/v4/project-1/resources/case-1/attachments/association",
      body: {
        attachments: [
          {
            file_name: "evidence.png",
            doc_id: "doc-1",
            related_type: "1",
            override: true
          }
        ],
        resource_type: "TestCase",
        system_type: "docman",
        version_uri: "version-1"
      }
    });
    expect(requests[1]?.path).toBe("/v4/project-1/resources/case-1/attachments/upload");
    const uploadFile = (requests[1]?.body as FormData).get("file");
    expect(uploadFile).toBeInstanceOf(File);
    expect((uploadFile as File).name).toBe("evidence.png");
    expect((requests[1]?.body as FormData).get("version_uri")).toBe("version-1");
    expect((requests[1]?.body as FormData).get("resource_type")).toBe("TestCase");
    expect((requests[1]?.body as FormData).get("resource_uri")).toBe("case-1");
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

  it("lists authorized test suite tasks", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          total: 1,
          value: [
            {
              uri: "task-1",
              name: "authorized suite",
              version_uri: "version-1",
              status_code: 1,
              status_name: "running",
              executor_id: "user-1",
              executor_name: "alice"
            }
          ]
        };
      }
    } as never);

    const result = await client.listAuthorizedTasks({
      project_id: "project-1",
      page: 2,
      page_size: 10,
      keyword: "smoke",
      service_type: 0
    });

    expect(requestedPath).toBe("/v4/project-1/authorized-tasks/batch-query");
    expect(requestedBody).toEqual({
      page_no: 2,
      page_size: 10,
      keyword: "smoke",
      service_type: 0
    });
    expect(result).toEqual({
      tasks: [
        {
          task_id: "task-1",
          name: "authorized suite",
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

  it("lists TestPlan mindmaps and recycle entries", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        if (path.includes("/mindmaps/page")) {
          return {
            result: {
              page_list: [
                {
                  id: path.startsWith("/v3/") ? "mindmap-v3-1" : "mindmap-1",
                  name: path.startsWith("/v3/") ? "Checkout baseline" : "Checkout flow"
                }
              ],
              total: 1
            }
          };
        }
        if (path.includes("/mindmap-recycles/page")) {
          return {
            result: {
              page_list: [{ id: "recycle-1", mindmap_name: "Deleted checkout flow" }],
              total: 1
            }
          };
        }
        if (path.includes("/mindmap-backups/page")) {
          return {
            result: {
              page_list: [{ id: "backup-1", bak_name: "Nightly backup" }],
              total: 1
            }
          };
        }
        if (path.includes("/mindmaps/mindmap-total")) {
          return {
            code: "success",
            data: {
              feature_root_id: 15,
              "-1": 4
            }
          };
        }

        return { result: { page_list: [], total: 0 } };
      }
    } as never);

    await expect(
      client.listMindmapsV2({
        project_id: "project-1",
        page: 2,
        page_size: 10,
        name: "Checkout",
        id_collection: ["mindmap-1"],
        folder_id_collection: ["folder-1"],
        folder_root_id: "root-1",
        creator_name_collection: ["alice"],
        updater_name_collection: ["bob"]
      })
    ).resolves.toEqual({
      mindmaps: [{ id: "mindmap-1", name: "Checkout flow" }],
      total: 1,
      raw: {
        page_list: [{ id: "mindmap-1", name: "Checkout flow" }],
        total: 1
      }
    });
    await expect(
      client.listMindmapRecycles({
        project_id: "project-1",
        page: 3,
        page_size: 5,
        creator_num: "10001",
        text: "deleted"
      })
    ).resolves.toEqual({
      recycles: [{ id: "recycle-1", mindmap_name: "Deleted checkout flow" }],
      total: 1,
      raw: {
        page_list: [{ id: "recycle-1", mindmap_name: "Deleted checkout flow" }],
        total: 1
      }
    });
    await expect(
      client.listMindmapsV3({
        project_id: "project-1",
        page: 1,
        page_size: 10,
        name: "Checkout",
        id_collection: ["mindmap-v3-1"],
        folder_id_collection: ["folder-1"],
        folder_root_id: "feature_root_id",
        creator_name_collection: ["alice"],
        updater_name_collection: ["bob"],
        branch_uri: "branch-1",
        iterator_uri: "iterator-1",
        is_master: 1,
        confidentiality_code_collection: ["public"]
      })
    ).resolves.toEqual({
      mindmaps: [{ id: "mindmap-v3-1", name: "Checkout baseline" }],
      total: 1,
      raw: {
        page_list: [{ id: "mindmap-v3-1", name: "Checkout baseline" }],
        total: 1
      }
    });
    await expect(
      client.listMindmapBackups({
        project_id: "project-1",
        page: 1,
        page_size: 10,
        mindmap_id: "mindmap-v3-1",
        bak_name: "Nightly",
        type: "manual"
      })
    ).resolves.toEqual({
      backups: [{ id: "backup-1", bak_name: "Nightly backup" }],
      total: 1,
      raw: {
        page_list: [{ id: "backup-1", bak_name: "Nightly backup" }],
        total: 1
      }
    });
    await expect(
      client.countMindmaps({
        project_id: "project-1",
        parent_folder_id_collection: ["folder-1"],
        project_type: "scrum",
        folder_root_id: "feature_root_id",
        branch_uri: "branch-1",
        iterator_uri: "iterator-1",
        is_master: 1,
        upward_recursion: false
      })
    ).resolves.toEqual({
      counts: {
        feature_root_id: 15,
        "-1": 4
      },
      raw: {
        code: "success",
        data: {
          feature_root_id: 15,
          "-1": 4
        }
      }
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v2/project-1/mindmaps/page",
        body: {
          params: {
            project_id: "project-1",
            offset: 2,
            limit: 10,
            name: "Checkout",
            id_collection: ["mindmap-1"],
            folder_id_collection: ["folder-1"],
            folder_root_id: "root-1",
            creator_name_collection: ["alice"],
            updater_name_collection: ["bob"]
          }
        }
      },
      {
        method: "POST",
        path: "/v3/project-1/mindmap-recycles/page",
        body: {
          params: {
            project_id: "project-1",
            offset: 3,
            limit: 5,
            creator_num: "10001",
            text: "deleted"
          }
        }
      },
      {
        method: "POST",
        path: "/v3/project-1/mindmaps/page",
        body: {
          params: {
            project_id: "project-1",
            offset: 1,
            limit: 10,
            name: "Checkout",
            id_collection: ["mindmap-v3-1"],
            folder_id_collection: ["folder-1"],
            folder_root_id: "feature_root_id",
            creator_name_collection: ["alice"],
            updater_name_collection: ["bob"],
            branch_uri: "branch-1",
            iterator_uri: "iterator-1",
            is_master: 1,
            confidentiality_code_collection: ["public"]
          }
        }
      },
      {
        method: "POST",
        path: "/v3/project-1/mindmap-backups/page",
        body: {
          params: {
            offset: 1,
            limit: 10,
            mindmap_id: "mindmap-v3-1",
            bak_name: "Nightly",
            type: "manual"
          }
        }
      },
      {
        method: "POST",
        path: "/v1/project-1/mindmaps/mindmap-total",
        body: {
          params: {
            parent_folder_id_collection: ["folder-1"],
            project_type: "scrum",
            folder_root_id: "feature_root_id",
            branch_uri: "branch-1",
            iterator_uri: "iterator-1",
            is_master: 1,
            upward_recursion: false
          }
        }
      }
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

  it("gets home page overview statistics from v4 and v5 endpoints", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        return {
          result: {
            value: {
              completion_rate: "80%",
              path
            }
          }
        };
      }
    } as never);

    const input = {
      project_id: "project-1",
      version_uri: "version-1",
      module_id: "module-1",
      fixed_version_id: "fixed-1",
      owner_id: "user-1",
      own: true,
      pi_filter: { all_pi: true }
    };

    await expect(client.getHomePageCaseOverview(input)).resolves.toEqual({
      raw: {
        value: {
          completion_rate: "80%",
          path: "/v4/projects/project-1/home/overview/case"
        }
      }
    });
    await client.getHomePageDefectSeverityOverview(input);
    await client.getHomePageDefectStatusOverview(input);
    await client.getHomePageOverviewV5(input);

    expect(requests).toEqual([
      {
        path: "/v4/projects/project-1/home/overview/case",
        body: {
          version_uri: "version-1",
          module_id: "module-1",
          fixed_version_id: "fixed-1",
          owner_id: "user-1",
          own: true,
          pi_filter: { all_pi: true }
        }
      },
      {
        path: "/v4/projects/project-1/home/overview/defect/severity",
        body: {
          version_uri: "version-1",
          module_id: "module-1",
          fixed_version_id: "fixed-1",
          owner_id: "user-1",
          own: true,
          pi_filter: { all_pi: true }
        }
      },
      {
        path: "/v4/projects/project-1/home/overview/defect/status",
        body: {
          version_uri: "version-1",
          module_id: "module-1",
          fixed_version_id: "fixed-1",
          owner_id: "user-1",
          own: true,
          pi_filter: { all_pi: true }
        }
      },
      {
        path: "/v5/projects/project-1/home/overview",
        body: {
          version_uri: "version-1",
          module_id: "module-1",
          fixed_version_id: "fixed-1",
          owner_id: "user-1",
          own: true,
          pi_filter: { all_pi: true }
        }
      }
    ]);
  });

  it("lists testcase statistics and loads the project data dashboard", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path.includes("execute-info")) {
          return {
            total: 1,
            values: [{ executor: { id: "user-1", name: "alice" }, execute_count: 3 }]
          };
        }
        if (path.includes("defect-info")) {
          return {
            total: 1,
            values: [{ creator: { id: "user-2", name: "bob" }, defect_count: 2 }]
          };
        }

        return {
          defect: { total: 2 },
          case_pass_rate: { pass_rate: "90%" }
        };
      }
    } as never);

    await expect(
      client.listUserExecuteTestcaseStatistics({
        project_id: "project-1",
        offset: 0,
        limit: 20,
        execute_start_time: "2026-05-01T00:00:00+08:00",
        execute_end_time: "2026-05-23T00:00:00+08:00",
        service_type: 1
      })
    ).resolves.toEqual({
      statistics: [{ executor: { id: "user-1", name: "alice" }, execute_count: 3 }],
      total: 1,
      raw: {
        total: 1,
        values: [{ executor: { id: "user-1", name: "alice" }, execute_count: 3 }]
      }
    });
    await expect(
      client.listTestcaseDefectStatistics({
        project_id: "project-1",
        offset: 5,
        limit: 10,
        create_testcase_start_time: "2026-05-01T00:00:00+08:00",
        create_testcase_end_time: "2026-05-23T00:00:00+08:00",
        branch_id: "branch-1"
      })
    ).resolves.toEqual({
      statistics: [{ creator: { id: "user-2", name: "bob" }, defect_count: 2 }],
      total: 1,
      raw: {
        total: 1,
        values: [{ creator: { id: "user-2", name: "bob" }, defect_count: 2 }]
      }
    });
    await expect(
      client.getProjectDataDashboard({
        project_id: "project-1",
        plan_id: "plan-1",
        branch_id: "branch-1",
        module_id: "module-1",
        fixed_version_id: "fixed-1"
      })
    ).resolves.toEqual({
      raw: {
        defect: { total: 2 },
        case_pass_rate: { pass_rate: "90%" }
      }
    });

    expect(requests).toEqual([
      {
        path: "/v1/project-1/testcases/execute-info/statistic-by-user",
        body: {
          offset: 0,
          limit: 20,
          execute_start_time: "2026-05-01T00:00:00+08:00",
          execute_end_time: "2026-05-23T00:00:00+08:00",
          service_type: 1
        }
      },
      {
        path: "/v1/project-1/testcases/defect-info/list-by-creation-time",
        body: {
          offset: 5,
          limit: 10,
          create_testcase_start_time: "2026-05-01T00:00:00+08:00",
          create_testcase_end_time: "2026-05-23T00:00:00+08:00",
          branch_id: "branch-1"
        }
      },
      {
        path: "/v1/project-1/data-dashboard/overview",
        body: {
          plan_id: "plan-1",
          branch_id: "branch-1",
          module_id: "module-1",
          fixed_version_id: "fixed-1"
        }
      }
    ]);
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

  it("searches features, searches feature trees by case, and lists feature testcase counts", async () => {
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
        if (path === "/v4/features/search-by-case") {
          return {
            value: {
              uri: "feature-root",
              name: "root",
              type: "TestVersion",
              case_total: 1
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
      client.searchFeaturesByCase({
        project_uuid: "project-1",
        version_uri: "version-1",
        case_uri: "case-1",
        service_types: [0]
      })
    ).resolves.toEqual({
      feature: {
        uri: "feature-root",
        name: "root",
        type: "TestVersion",
        case_total: 1
      },
      raw: {
        value: {
          uri: "feature-root",
          name: "root",
          type: "TestVersion",
          case_total: 1
        }
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
        path: "/v4/features/search-by-case",
        body: {
          version_uri: "version-1",
          project_uuid: "project-1",
          case_uri: "case-1",
          service_types: [0]
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

  it("deletes work item testcase relations through the official v4 endpoint", async () => {
    let requestedPath = "";
    let requestedBody: Record<string, unknown> | undefined;
    const client = createTestPlanClient({
      delete: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body as Record<string, unknown>;
        return {
          value: "success"
        };
      }
    } as never);

    const result = await client.deleteWorkItemTestRelation({
      work_item_id: "REQ-1",
      test_case_uris: ["case-1", "case-2"],
      project_uuid: "project-1",
      version_uri: "version-1",
      relate_type: "requirement"
    });

    expect(requestedPath).toBe("/v4/workitems/REQ-1/relations/testrelation");
    expect(requestedBody).toEqual({
      test_case_uris: ["case-1", "case-2"],
      project_uuid: "project-1",
      version_uri: "version-1",
      relate_type: "requirement"
    });
    expect(result).toEqual({
      work_item_id: "REQ-1",
      test_case_uris: ["case-1", "case-2"],
      project_uuid: "project-1",
      version_uri: "version-1",
      relate_type: "requirement",
      value: "success",
      deleted: true,
      raw: { value: "success" }
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

  it("updates testcase execution info, status, stop, and batch update through official endpoints", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        if (path.endsWith("/execution-status")) {
          return {
            status: "success",
            result: {
              value: "status-updated"
            }
          };
        }

        return {
          value: "success"
        };
      }
    } as never);

    const payload = {
      result_code: 1,
      status_code: 2,
      execute_latest_time: "2021-01-01 00:00:00",
      execute_duration: "00:00:42",
      execute_times: 1,
      total_execute_times: 3,
      version_uri: "version-1",
      executor_id: "user-1",
      execute_status_code: 0,
      case_list: [{ uri: "case-1", result_code: 1 }]
    };

    await expect(
      client.updateTaskExecutionInfo({
        project_id: "project-1",
        task_uri: "task-1",
        ...payload
      })
    ).resolves.toEqual({
      task_uri: "task-1",
      value: "success",
      updated: true
    });
    await expect(
      client.updateTaskExecutionStatus({
        project_id: "project-1",
        task_uri: "task-1",
        ...payload
      })
    ).resolves.toEqual({
      task_uri: "task-1",
      value: "status-updated",
      updated: true
    });
    await expect(
      client.stopTaskExecutionByCase({
        project_id: "project-1",
        task_uri: "task-1",
        ...payload
      })
    ).resolves.toEqual({
      task_uri: "task-1",
      value: "success",
      stopped: true
    });
    await expect(
      client.batchUpdateTestcaseExecutionInfo({
        project_id: "project-1",
        task_uri: "task-1",
        ...payload
      })
    ).resolves.toEqual({
      project_id: "project-1",
      value: "success",
      updated: true
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v4/project-1/tasks/task-1/testcases/execution-info",
        body: {
          ...payload,
          task_uri: "task-1"
        }
      },
      {
        method: "POST",
        path: "/v4/project-1/tasks/task-1/testcases/execution-status",
        body: {
          ...payload,
          task_uri: "task-1"
        }
      },
      {
        method: "POST",
        path: "/v4/project-1/tasks/task-1/testcases/execution-stop",
        body: {
          ...payload,
          task_uri: "task-1"
        }
      },
      {
        method: "POST",
        path: "/v4/project-1/testcases/execution-info/batch-update",
        body: {
          ...payload,
          task_uri: "task-1"
        }
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

  it("downloads and batch-deletes test reports through official report APIs", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return { value: "download-token-1" };
      },
      delete: async (path: string, body?: unknown) => {
        requests.push({ method: "DELETE", path, body });
        return { value: "deleted" };
      }
    } as never);

    await expect(
      client.downloadTestReport({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "report-1"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      version_uri: "version-1",
      report_id: "report-1",
      value: "download-token-1",
      raw: { value: "download-token-1" }
    });
    await expect(
      client.batchDeleteTestReports({
        project_id: "project-1",
        report_uris: ["report-1", "report-2"]
      })
    ).resolves.toEqual({
      project_id: "project-1",
      report_ids: ["report-1", "report-2"],
      deleted: true,
      value: "deleted",
      raw: { value: "deleted" }
    });
    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v4/project-1/versions/version-1/reports/report-1/download",
        body: {}
      },
      {
        method: "DELETE",
        path: "/testreport/v4/project-1/test-reports/batch-delete",
        body: ["report-1", "report-2"]
      }
    ]);
  });

  it("lists rule check tasks and loads report and summary", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      post: async (path: string, body: unknown) => {
        requests.push(`${path} ${JSON.stringify(body)}`);
        if (path.endsWith("/violation-cases")) {
          return {
            total: 1,
            value: [
              {
                uri: "violation-1",
                case_name: "case one",
                status: 0
              }
            ]
          };
        }
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
      put: async (path: string, body: unknown) => {
        requests.push(`${path} ${JSON.stringify(body)}`);
        return { value: "success" };
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
    await expect(
      client.listRuleCheckViolationCases({
        project_id: "project-1",
        version_uri: "version-1",
        task_uri: "task-1",
        page: 1,
        page_size: 10,
        status: 0
      })
    ).resolves.toEqual({
      violations: [
        {
          uri: "violation-1",
          case_name: "case one",
          status: 0
        }
      ],
      total: 1,
      raw: {
        total: 1,
        value: [
          {
            uri: "violation-1",
            case_name: "case one",
            status: 0
          }
        ]
      }
    });
    await expect(
      client.updateRuleCheckViolation({
        project_id: "project-1",
        version_uri: "version-1",
        violation_uri: "violation-1",
        status: 1
      })
    ).resolves.toEqual({
      project_id: "project-1",
      version_uri: "version-1",
      violation_id: "violation-1",
      status: 1,
      value: "success",
      raw: { value: "success" }
    });
    expect(requests).toEqual([
      '/v4/project-1/versions/version-1/rule-check/tasks {"page_no":1,"page_size":10,"name":"rule"}',
      "/v4/project-1/versions/version-1/rule-check/tasks/task-1",
      "/v4/project-1/versions/version-1/rule-check/tasks/task-1/summary?severity=2&status=0",
      '/v4/project-1/versions/version-1/rule-check/tasks/task-1/violation-cases {"page_no":1,"page_size":10,"status":0}',
      '/v4/project-1/versions/version-1/rule-check/violations/violation-1 {"status":1}'
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
        if (path.endsWith("/asset/template")) {
          return {
            code: "success",
            data: {
              id: "asset-template-1",
              name: "Asset template"
            }
          };
        }
        if (path.startsWith("/v1/project-1/templates")) {
          return {
            status: "ok",
            result: {
              id: "download-template-1",
              name: "Download template"
            }
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
    await expect(client.downloadAssetTemplate({ project_id: "project-1" })).resolves.toEqual({
      template_id: "asset-template-1",
      name: "Asset template",
      raw: {
        id: "asset-template-1",
        name: "Asset template"
      }
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
      "/v1/project-1/asset/template",
      "/v2/project-1/templates/template-1"
    ]);
  });

  it("loads TestPlan test design template download metadata", async () => {
    const requests: string[] = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push(path);
        return {
          status: "ok",
          result: {
            id: "download-template-1",
            name: "Download template"
          }
        };
      }
    } as never);

    await expect(
      client.downloadTestDesignTemplate({
        project_id: "project-1",
        file_name: "template.xlsx"
      })
    ).resolves.toEqual({
      template_id: "download-template-1",
      name: "Download template",
      raw: {
        id: "download-template-1",
        name: "Download template"
      }
    });

    expect(requests).toEqual(["/v1/project-1/templates?file_name=template.xlsx"]);
  });

  it("loads TestPlan mindmap statistics, asset tree, and factor details", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      get: async (path: string) => {
        requests.push({ method: "GET", path });
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
        if (path.includes("/mindmaps/mindmap-export/")) {
          return {
            code: "success",
            data: {
              id: "mindmap-1",
              name: "Checkout flow export"
            }
          };
        }

        return {
          code: "success",
          data: {
            id: "factor-1",
            name: "Browser"
          }
        };
      },
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        return {
          code: "success",
          data: {
            total: 1,
            list: [{ id: "factor-2", name: "Checkout data" }],
            offset: 2,
            limit: 15
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
      client.listFactorsByAsset({
        project_id: "project-1",
        asset_id: "asset-1",
        page: 2,
        page_size: 15,
        type: "Data",
        name: "Checkout",
        parent_node_ids: ["node-1"],
        creator_num: "creator-1",
        mindmap_id: "mindmap-1",
        testpoint_id: "testpoint-1",
        mindmap_node_id: "mindmap-node-1"
      })
    ).resolves.toEqual({
      factors: [{ id: "factor-2", name: "Checkout data" }],
      total: 1,
      raw: {
        code: "success",
        data: {
          total: 1,
          list: [{ id: "factor-2", name: "Checkout data" }],
          offset: 2,
          limit: 15
        }
      }
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
    await expect(
      client.exportMindmap({
        project_id: "project-1",
        id: "mindmap-1"
      })
    ).resolves.toEqual({
      mindmap_id: "mindmap-1",
      name: "Checkout flow export",
      raw: {
        id: "mindmap-1",
        name: "Checkout flow export"
      }
    });

    expect(requests).toEqual([
      { method: "GET", path: "/v1/project-1/statistics/mindmap-1" },
      { method: "GET", path: "/v1/project-1/asset-tree/asset-1" },
      {
        method: "POST",
        path: "/v1/project-1/factor/asset-1",
        body: {
          params: {
            offset: 2,
            limit: 15,
            type: "Data",
            name: "Checkout",
            parent_node_ids: ["node-1"],
            creator_num: "creator-1",
            mindmap_id: "mindmap-1",
            testpoint_id: "testpoint-1",
            mindmap_node_id: "mindmap-node-1"
          }
        }
      },
      { method: "GET", path: "/v1/project-1/factor/factor-1" },
      { method: "GET", path: "/v1/project-1/mindmaps/mindmap-export/mindmap-1" }
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

  it("creates iterators, batch adds iterator testcases, and updates or deletes testhub services", async () => {
    const requests: Array<{ method: string; path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ method: "POST", path, body });
        if (path.includes("/iterators") && !path.includes("/batch-add")) {
          return {
            status: "success",
            result: {
              plan_id: "iterator-2"
            }
          };
        }

        return {};
      },
      put: async (path: string, body?: unknown) => {
        requests.push({ method: "PUT", path, body });
        return {
          status: "success",
          result: {
            service_id: 12,
            service_name: "manual"
          }
        };
      },
      delete: async (path: string) => {
        requests.push({ method: "DELETE", path });
        return {};
      }
    } as never);

    await expect(
      client.createTesthubIterator({
        project_id: "project-1",
        name: "Sprint 2",
        assigned_id: "user-1",
        service_id_list: [3],
        plan_cycle: {
          start_date: "2024-07-24 10:00:00",
          end_date: "2024-07-24 18:00:00"
        },
        branch_uri: "branch-1"
      })
    ).resolves.toEqual({
      iterator_id: "iterator-2",
      name: "Sprint 2",
      status: "success",
      raw: {
        plan_id: "iterator-2"
      }
    });

    await expect(
      client.batchAddIteratorTestcases({
        project_id: "project-1",
        iterator_uri: "iterator-2",
        service_id: 3,
        testcase_id_list: ["case-1", "case-2"]
      })
    ).resolves.toEqual({
      iterator_uri: "iterator-2",
      testcase_count: 2,
      added: true,
      raw: {}
    });

    await expect(
      client.updateTesthubService({
        service_id: 12,
        service_name: "manual",
        server_host: "https://example.com",
        server_type: 0
      })
    ).resolves.toEqual({
      service_id: "12",
      service_name: "manual",
      status: "success",
      raw: {
        service_id: 12,
        service_name: "manual"
      }
    });

    await expect(
      client.deleteTesthubService({
        service_id: 12
      })
    ).resolves.toEqual({
      service_id: "12",
      deleted: true,
      raw: {}
    });

    expect(requests).toEqual([
      {
        method: "POST",
        path: "/v4/testhub/projects/project-1/iterators",
        body: {
          name: "Sprint 2",
          assigned_id: "user-1",
          service_id_list: [3],
          plan_cycle: {
            start_date: "2024-07-24 10:00:00",
            end_date: "2024-07-24 18:00:00"
          },
          branch_uri: "branch-1"
        }
      },
      {
        method: "POST",
        path: "/v4/testhub/projects/project-1/iterator/iterator-2/testcases/batch-add",
        body: {
          service_id: 3,
          testcase_id_list: ["case-1", "case-2"]
        }
      },
      {
        method: "PUT",
        path: "/v4/testhub/services/12",
        body: {
          service_name: "manual",
          server_host: "https://example.com",
          server_type: 0
        }
      },
      {
        method: "DELETE",
        path: "/v4/testhub/services/12"
      }
    ]);
  });

  it("batch updates task attributes through the official endpoint", async () => {
    const requests: Array<{ path: string; body?: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        return {
          value: "success"
        };
      }
    } as never);

    await expect(
      client.batchUpdateTaskAttributes({
        project_id: "project-1",
        task_uris: ["task-1", "task-2"],
        tag_names: ["p0"],
        version_uri: "version-1",
        project_uuid: "project-uuid-1",
        is_async: false,
        is_delete: false
      })
    ).resolves.toEqual({
      project_id: "project-1",
      task_uris: ["task-1", "task-2"],
      value: "success",
      raw: {
        value: "success"
      }
    });

    expect(requests).toEqual([
      {
        path: "/v4/project-1/tasks/batch-update",
        body: {
          task_uris: ["task-1", "task-2"],
          tag_names: ["p0"],
          version_uri: "version-1",
          project_uuid: "project-uuid-1",
          is_async: false,
          is_delete: false
        }
      }
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
      },
      post: async (path: string) => {
        requests.push(path);

        if (path === "/v4/project-1/resources/exist?version_uri=version-1&type=3") {
          return { value: 1 };
        }

        return {};
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
      "/v4/project-1/resources/exist?version_uri=version-1&type=3",
      "/GT3KServer/v4/testcases/case-1/review?project_uuid=project-1&version_uri=version-1&page_no=2&page_size=5",
      "/v4/testcases/case-1/review?project_uuid=project-1&version_uri=version-1&page_no=1&page_size=10"
    ]);
  });

  it("posts TEP and official resource existence requests with expected payloads", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: unknown;
      options?: unknown;
    }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown, options?: unknown) => {
        requests.push({ method: "post", path, body, options });
        if (path === "/v4/project-1/resources/exist?version_uri=version-1&type=3") {
          return { value: 2 };
        }
        if (path === "/v3/hutaf-ticc/tm/teps/action/query") {
          return {
            result: [{ id: "tep-1", name: "tep-one" }],
            total: "1",
            status: "success"
          };
        }
        if (path === "/v1/project-1/query/designData") {
          return {
            result: { testcaseId: "case-1", variableGroupID: "group-1" }
          };
        }
        if (path === "/v2/queryTestSuitesVarList4PL/service-1") {
          return {
            result: { suiteVars: [{ id: "var-1", name: "base_url" }] }
          };
        }

        return {};
      },
      get: async (path: string, options?: unknown) => {
        requests.push({ method: "get", path, options });
        return { result: { code: "tep-register-code" } };
      },
      put: async (path: string, body?: unknown, options?: unknown) => {
        requests.push({ method: "put", path, body, options });
        return { status: "success", result: "ok" };
      }
    } as never);

    await expect(
      client.checkResourceExists({
        project_id: "project-1",
        version_uri: "version-1",
        type: 3,
        resource_uris: ["resource-1", "resource-2"]
      })
    ).resolves.toEqual({
      value: 2,
      raw: { value: 2 }
    });
    await expect(
      client.updateTepShare({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        isShare: true
      })
    ).resolves.toEqual({
      value: "ok",
      raw: { status: "success", result: "ok" }
    });
    await expect(
      client.getTepRegisterCode({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1"
      })
    ).resolves.toEqual({
      raw: { code: "tep-register-code" }
    });
    await expect(
      client.listTeps({
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        where: [{ key: "name", type: "eq", value: "tep-one" }]
      })
    ).resolves.toEqual({
      teps: [{ id: "tep-1", name: "tep-one" }],
      total: 1,
      status: "success"
    });
    await expect(
      client.getDesignData({
        project_id: "project-1",
        x_auth_token: "token-1",
        testcaseId: "case-1",
        variableGroupID: "group-1"
      })
    ).resolves.toEqual({
      raw: { testcaseId: "case-1", variableGroupID: "group-1" }
    });
    await expect(
      client.getTestSuitesVarListForPipeline({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        body: { suiteIds: ["suite-1"] }
      })
    ).resolves.toEqual({
      raw: { suiteVars: [{ id: "var-1", name: "base_url" }] }
    });

    expect(requests).toEqual([
      {
        method: "post",
        path: "/v4/project-1/resources/exist?version_uri=version-1&type=3",
        body: ["resource-1", "resource-2"],
        options: undefined
      },
      {
        method: "put",
        path: "/v3/hutaf-ticc/tm/tep/share?isShare=true",
        body: undefined,
        options: {
          headers: {
            "x-auth-tenantid": "tenant-1",
            "x-auth-groups": "project-1",
            "x-user-name": "alice",
            "x-auth-token": "token-1"
          }
        }
      },
      {
        method: "get",
        path: "/v3/hutaf-ticc/tm/tep/register-code",
        options: {
          headers: {
            "x-auth-tenantid": "tenant-1",
            "x-auth-groups": "project-1",
            "x-user-name": "alice",
            "x-auth-token": "token-1"
          }
        }
      },
      {
        method: "post",
        path: "/v3/hutaf-ticc/tm/teps/action/query",
        body: {
          where: [{ key: "name", type: "eq", value: "tep-one" }]
        },
        options: {
          headers: {
            "x-auth-tenantid": "tenant-1",
            "x-auth-groups": "project-1",
            "x-user-name": "alice",
            "x-auth-token": "token-1"
          }
        }
      },
      {
        method: "post",
        path: "/v1/project-1/query/designData",
        body: {
          variableGroupID: "group-1",
          testcaseId: "case-1"
        },
        options: {
          headers: { "X-Auth-Token": "token-1" }
        }
      },
      {
        method: "post",
        path: "/v2/queryTestSuitesVarList4PL/service-1",
        body: { suiteIds: ["suite-1"] },
        options: {
          headers: { "X-Auth-Token": "token-1" }
        }
      }
    ]);
  });

  it("calls legacy TestPlan write endpoints with X-Auth-Token headers", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: unknown;
      options?: unknown;
    }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown, options?: unknown) => {
        requests.push({ method: "post", path, body, options });
        return { status: "success", result: "ok" };
      },
      delete: async (path: string, body?: unknown, options?: unknown) => {
        requests.push({ method: "delete", path, body, options });
        return { status: "success", result: "stopped" };
      }
    } as never);

    await expect(
      client.deleteProjectNotice({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        body: { noticeIds: ["notice-1"] }
      })
    ).resolves.toEqual({
      status: "success",
      value: "ok",
      raw: { status: "success", result: "ok" }
    });
    await expect(
      client.stopCaseTask({
        testServiceId: "service-1",
        caseId: "case-1",
        x_auth_token: "token-1"
      })
    ).resolves.toEqual({
      status: "success",
      value: "stopped",
      raw: { status: "success", result: "stopped" }
    });

    expect(requests).toEqual([
      {
        method: "post",
        path: "/v2/delprojectnotice/service-1",
        body: { noticeIds: ["notice-1"] },
        options: {
          headers: { "X-Auth-Token": "token-1" }
        }
      },
      {
        method: "delete",
        path: "/v2/stopCase/service-1/case-1",
        body: undefined,
        options: {
          headers: { "X-Auth-Token": "token-1" }
        }
      }
    ]);
  });

  it("calls task-group and repository task helper endpoints with documented headers", async () => {
    const requests: Array<{
      method: string;
      path: string;
      body?: unknown;
      options?: unknown;
    }> = [];
    const client = createTestPlanClient({
      get: async (path: string, options?: unknown) => {
        requests.push({ method: "get", path, options });
        return {
          result: {
            data: [{ id: "task-1", name: "nightly task" }],
            pageInfo: { total: 1 }
          }
        };
      },
      post: async (path: string, body?: unknown, options?: unknown) => {
        requests.push({ method: "post", path, body, options });
        if (path === "/v3/task-group/detail/history") {
          return {
            result: {
              id: "group-1",
              testServiceId: "service-1",
              progress: 100
            },
            status: "success"
          };
        }
        if (path === "/v3/task-group/execution") {
          return {
            status: "success",
            result: {
              id: "group-1",
              value: "started"
            }
          };
        }
        if (path === "/v1/projects/project-1/repository/testsuites") {
          return {
            testsuite_id: "suite-1",
            testcase_ids: ["case-1", "case-2"]
          };
        }

        return {
          value: "copy-ok"
        };
      }
    } as never);

    await expect(
      client.getTaskGroupDetail({
        task_id: "task-1",
        x_auth_tenantid: "tenant-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1"
      })
    ).resolves.toEqual({
      task_id: "task-1",
      tasks: [{ id: "task-1", name: "nightly task" }],
      total: 1,
      raw: {
        data: [{ id: "task-1", name: "nightly task" }],
        pageInfo: { total: 1 }
      }
    });

    await expect(
      client.getTaskGroupHistory({
        request_id: "req-1",
        taskGroupId: "group-1",
        testServiceId: "service-1",
        x_auth_groups: "project-1",
        x_user_name: "alice",
        x_auth_token: "token-1",
        coldDataFlag: true
      })
    ).resolves.toEqual({
      task_group_id: "group-1",
      test_service_id: "service-1",
      raw: {
        id: "group-1",
        testServiceId: "service-1",
        progress: 100
      }
    });

    await expect(
      client.executeTaskGroup({
        x_auth_token: "token-1",
        x_auth_groups: "project-1",
        id: "group-1",
        testServiceId: "service-1",
        taskGroupName: "nightly",
        tasks: [{ id: "task-1" }]
      })
    ).resolves.toEqual({
      task_group_id: "group-1",
      status: "success",
      value: "started",
      raw: {
        id: "group-1",
        value: "started"
      }
    });

    await expect(
      client.createRepositoryTestsuite({
        project_id: "project-1",
        x_auth_token: "token-1",
        testsuite_name: "swaggerSuite",
        repository_id: "repo-1",
        repository_branch: "main",
        file_path: "api/swagger.yaml"
      })
    ).resolves.toEqual({
      testsuite_id: "suite-1",
      testcase_ids: ["case-1", "case-2"],
      raw: {
        testsuite_id: "suite-1",
        testcase_ids: ["case-1", "case-2"]
      }
    });

    await expect(
      client.copyTaskRelations({
        project_id: "project-1",
        original_task_uri: "task-1",
        dest_task_uri: "task-2"
      })
    ).resolves.toEqual({
      project_id: "project-1",
      original_task_uri: "task-1",
      dest_task_uri: "task-2",
      value: "copy-ok",
      raw: { value: "copy-ok" }
    });

    expect(requests).toEqual([
      {
        method: "get",
        path: "/v3/task-group/detail/task-1",
        options: {
          headers: {
            "x-auth-tenantid": "tenant-1",
            "x-auth-groups": "project-1",
            "x-user-name": "alice",
            "x-auth-token": "token-1"
          }
        }
      },
      {
        method: "post",
        path: "/v3/task-group/detail/history",
        body: {
          taskGroupId: "group-1",
          testServiceId: "service-1",
          coldDataFlag: true
        },
        options: {
          headers: {
            "x-auth-groups": "project-1",
            "x-user-name": "alice",
            "x-auth-token": "token-1",
            requestId: "req-1"
          }
        }
      },
      {
        method: "post",
        path: "/v3/task-group/execution",
        body: {
          id: "group-1",
          testServiceId: "service-1",
          taskGroupName: "nightly",
          tasks: [{ id: "task-1" }]
        },
        options: {
          headers: {
            "X-Auth-Token": "token-1",
            "x-auth-groups": "project-1"
          }
        }
      },
      {
        method: "post",
        path: "/v1/projects/project-1/repository/testsuites",
        body: {
          testsuite_name: "swaggerSuite",
          repository_id: "repo-1",
          repository_branch: "main",
          file_path: "api/swagger.yaml"
        },
        options: {
          headers: { "X-Auth-Token": "token-1" }
        }
      },
      {
        method: "post",
        path: "/v5/project-1/task/relation-copy",
        body: {
          original_task_uri: "task-1",
          dest_task_uri: "task-2"
        },
        options: undefined
      }
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

  it("lists iterator stage counts and queries TestHub ETL rows", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requests.push({ path, body });
        if (path === "/v4/project-1/iterators/stage-count") {
          return {
            result: {
              value: {
                todo: 2,
                doing: 1,
                done: 5
              }
            }
          };
        }

        return {
          result: {
            total: 1,
            value: [{ id: "row-1", suite_name: "smoke" }]
          }
        };
      }
    } as never);

    await expect(
      client.listIteratorStageCounts({
        project_uuid: "project-1",
        iterator_uri: "iterator-1",
        branch_uri: "branch-1",
        owner_ids: ["user-1"],
        filter: {
          iterator_ids: ["iterator-1"]
        }
      })
    ).resolves.toEqual({
      value: {
        todo: 2,
        doing: 1,
        done: 5
      },
      raw: {
        value: {
          todo: 2,
          doing: 1,
          done: 5
        }
      }
    });

    await expect(
      client.queryTesthubEtlData({
        offset: 0,
        limit: 100,
        table_name: "execute_case_result",
        start_time: "2026-06-01 00:00:00",
        end_time: "2026-06-06 23:59:59",
        filter_time_field: "create_time",
        sort_field: "create_time",
        schema_no: "schema-1"
      })
    ).resolves.toEqual({
      rows: [{ id: "row-1", suite_name: "smoke" }],
      total: 1,
      raw: { total: 1, value: [{ id: "row-1", suite_name: "smoke" }] }
    });

    expect(requests).toEqual([
      {
        path: "/v4/project-1/iterators/stage-count",
        body: {
          iterator_uri: "iterator-1",
          branch_uri: "branch-1",
          owner_ids: ["user-1"],
          filter: {
            iterator_ids: ["iterator-1"]
          }
        }
      },
      {
        path: "/v4/testhub/etl/query-data",
        body: {
          offset: 0,
          limit: 100,
          table_name: "execute_case_result",
          start_time: "2026-06-01 00:00:00",
          end_time: "2026-06-06 23:59:59",
          filter_time_field: "create_time",
          sort_field: "create_time",
          schema_no: "schema-1"
        }
      }
    ]);
  });

  it("queries official TestPlan ETL testreport endpoints", async () => {
    const requests: Array<{ path: string; body: unknown }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body: unknown) => {
        requests.push({ path, body });
        if (path.endsWith("/max-row-size")) {
          return { status: "success", result: { size: "500" } };
        }
        if (path.endsWith("/data-total")) {
          return { status: "success", result: { total: 2 } };
        }
        return {
          status: "success",
          result: {
            total: 1,
            values: [{ id: "row-1", name: "etl row" }]
          }
        };
      }
    } as never);
    const base = {
      offset: 0,
      limit: 50,
      table_name: "relation",
      start_time: "2026-06-01 00:00:00",
      end_time: "2026-06-06 23:59:59",
      filter_time_field: "CREATIONDATE",
      schema_no: "3",
      project_uuid: "project-1",
      query_fields: ["TESTCASEURI"]
    };

    await expect(client.getUserEtlDataTotal(base)).resolves.toMatchObject({
      total: 2,
      status: "success",
      raw: { total: 2 }
    });
    await expect(client.queryUserEtlData(base)).resolves.toMatchObject({
      rows: [{ id: "row-1", name: "etl row" }],
      total: 1,
      status: "success"
    });
    await expect(client.getTesthubEtlDataTotal(base)).resolves.toMatchObject({
      total: 2,
      status: "success"
    });
    await expect(client.queryTesthubEtlDataList(base)).resolves.toMatchObject({
      rows: [{ id: "row-1", name: "etl row" }],
      total: 1,
      status: "success"
    });
    await expect(
      client.getTesthubEtlMaxRowSize({
        table_name: "relation",
        schema_no: "3",
        project_uuid: "project-1"
      })
    ).resolves.toMatchObject({
      size: 500,
      status: "success"
    });
    expect(requests.map((request) => request.path)).toEqual([
      "/testreport/v4/user/etl/query/data-total",
      "/testreport/v4/user/etl/query/data-list",
      "/testreport/v4/testhub/etl/query/data-total",
      "/testreport/v4/testhub/etl/query/data-list",
      "/testreport/v4/testhub/etl/query/max-row-size"
    ]);
    expect(requests[0]?.body).toEqual(base);
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
        if (path === "/v1/project-1/excel/error-testcases?error_id=error-1") {
          return { result: { id: "error-1", status: "success" } };
        }
        if (
          path ===
          "/v2/project-1/logdata/upload-url?task_id=task-1&file_type=CASE_LOG_REPORT&case_id=case-1&filename=case.log&round=1"
        ) {
          return { result: { primary: { url: "https://example.com/upload" }, backup: {} } };
        }
        if (path === "/v2/project-1/logdata/archive?task_id=task-1&case_id=case-1&round=1") {
          return { result: { status: "success" } };
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
        if (path === "/v1/project-1/testcase/case-1/dataset/group-1") {
          return { result: { records: [{ name: "base_url", value: "https://example.com" }] } };
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
          "/v1/variables/getVarbyGroupWithSensitive?project_id=project-1&group_id=group-1"
        ) {
          return {
            result: [
              {
                id: "sensitive-var-1",
                name: "secret",
                isSensitiveInfo: true,
                property: "cipher-text",
                functionParams: "cipher-params"
              }
            ]
          };
        }
        if (
          path ===
          "/v1/project-1/variables/getSensitivePropertybyId?group_id=group-1&var_id=sensitive-var-1"
        ) {
          return { result: "plain-secret" };
        }
        if (path === "/v1/project-1/variables/decrypt?variable_id=sensitive-var-1") {
          return { result: "plain-secret" };
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
        if (
          path ===
          "/v1/project-1/aw_cata/update_aw_cata?cata_id=cata-1&cata_name=Smoke+Catalog&parent_id=TOP&source_type=1"
        ) {
          return { status: "success", result: "ok" };
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
      client.getExcelErrorTestcases({
        project_id: "project-1",
        error_id: "error-1"
      })
    ).resolves.toEqual({
      error_id: "error-1",
      raw: { id: "error-1", status: "success" }
    });
    await expect(
      client.getCaseLogdataUploadUrl({
        project_id: "project-1",
        task_id: "task-1",
        case_id: "case-1",
        file_type: "CASE_LOG_REPORT",
        filename: "case.log",
        round: "1"
      })
    ).resolves.toEqual({
      task_id: "task-1",
      raw: { primary: { url: "https://example.com/upload" }, backup: {} }
    });
    await expect(
      client.getCaseLogdataArchive({
        project_id: "project-1",
        task_id: "task-1",
        case_id: "case-1",
        round: "1"
      })
    ).resolves.toEqual({
      task_id: "task-1",
      case_id: "case-1",
      raw: { status: "success" }
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
    await expect(
      client.updateAwCataFirst({
        project_id: "project-1",
        cata_id: "cata-1",
        cata_name: "Smoke Catalog",
        parent_id: "TOP",
        source_type: 1
      })
    ).resolves.toEqual({
      cata_id: "cata-1",
      value: "ok",
      raw: { status: "success", result: "ok" }
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
      client.getTestcaseDataset({
        project_id: "project-1",
        case_uri: "case-1",
        group_id: "group-1"
      })
    ).resolves.toEqual({
      case_uri: "case-1",
      group_id: "group-1",
      raw: {
        records: [{ name: "base_url", value: "https://example.com" }]
      }
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
      client.listVariablesByGroupWithSensitive({
        project_id: "project-1",
        group_id: "group-1"
      })
    ).resolves.toEqual({
      variables: [
        {
          id: "sensitive-var-1",
          name: "secret",
          isSensitiveInfo: true,
          property: "[REDACTED]",
          functionParams: "[REDACTED]"
        }
      ],
      total: 1
    });
    await expect(
      client.showSensitivePropertyById({
        project_id: "project-1",
        group_id: "group-1",
        var_id: "sensitive-var-1"
      })
    ).resolves.toEqual({
      variable_id: "sensitive-var-1",
      value: "[REDACTED]",
      redacted: true,
      raw: { result: "[REDACTED]" }
    });
    await expect(
      client.showVariablesDecrypt({
        project_id: "project-1",
        variable_id: "sensitive-var-1"
      })
    ).resolves.toEqual({
      variable_id: "sensitive-var-1",
      value: "[REDACTED]",
      redacted: true,
      raw: { result: "[REDACTED]" }
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
      "/v1/project-1/excel/error-testcases?error_id=error-1",
      "/v2/project-1/logdata/upload-url?task_id=task-1&file_type=CASE_LOG_REPORT&case_id=case-1&filename=case.log&round=1",
      "/v2/project-1/logdata/archive?task_id=task-1&case_id=case-1&round=1",
      "/v1/project-1/variables/getGlobalParamNameList",
      "/v4/project-1/variables?group_id=group-1&page_no=1&page_size=20",
      "/v3/project-1/basic-aw/aw-1",
      "/v1/project-1/aw_cata/child_cata_data?parent_id=TOP&is_contain_aw=false&aw_name=login&source_type=1",
      "/v1/project-1/aw_cata/update_aw_cata?cata_id=cata-1&cata_name=Smoke+Catalog&parent_id=TOP&source_type=1",
      "/v1/project-1/get_awName_view",
      "/v1/project-1/basic-aw/aw-1/param-property",
      "/v1/project/project-1/public_aw_lib_and_aws",
      "/v1/project-1/available/config",
      "/v1/project/project-1?group_id=group-1",
      "/v1/project-1/testcase/case-1",
      "/v3/project-1/testcase/case-1?task_id=task-1",
      "/v4/project-1/testcase/case-1?task_id=task-1",
      "/v1/project-1/testcase/case-1/dataset/group-1",
      "/v1/variables/getVarGroupList?project_id=project-1&page_no=1&page_size=10",
      "/v1/project-1/notice_config/notice_config_list",
      "/v1/project-1/get_timeOut_view",
      "/v1/project-1/local/desensitization/config",
      "/v3/project-1/variables?page_no=1&page_size=5&group_id=group-1",
      "/v1/variables/getVarbyGroup?project_id=project-1&page_no=2&page_size=5&group_id=group-1",
      "/v1/variables/getVarbyGroupWithSensitive?project_id=project-1&group_id=group-1",
      "/v1/project-1/variables/getSensitivePropertybyId?group_id=group-1&var_id=sensitive-var-1",
      "/v1/project-1/variables/decrypt?variable_id=sensitive-var-1",
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

  it("lists resource operation records", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          data: {
            total: 1,
            list: [
              {
                id: "record-1",
                resource_id: "mindmap-1",
                resource_type: "mindmap",
                operation_type: "updateMindmapCreatorInfo"
              }
            ]
          }
        };
      }
    } as never);

    const result = await client.listResourceOperationRecords({
      project_id: "project-1",
      page: 2,
      page_size: 5,
      resource_id: "mindmap-1",
      resource_type: "mindmap",
      operation_type: "updateMindmapCreatorInfo"
    });

    expect(requestedPath).toBe("/v1/project-1/operation-record");
    expect(requestedBody).toEqual({
      params: {
        offset: 5,
        limit: 5,
        resource_id: "mindmap-1",
        resource_type: "mindmap",
        operation_type: "updateMindmapCreatorInfo"
      }
    });
    expect(result).toEqual({
      records: [
        {
          id: "record-1",
          resource_id: "mindmap-1",
          resource_type: "mindmap",
          operation_type: "updateMindmapCreatorInfo"
        }
      ],
      total: 1
    });
  });

  it("handles legacy case official APIs with X-Auth-Token headers", async () => {
    const requests: Array<{
      path: string;
      body: unknown;
      options?: unknown;
    }> = [];
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown, options?: unknown) => {
        requests.push({ path, body, options });
        if (path === "/v2/querycasestatus?testServiceId=service-1") {
          return {
            result: {
              casesStatusJA: [{ case_id: "case-1", status: "PASSED" }],
              totalCount: 1
            },
            status: "success"
          };
        }
        if (path === "/v3/querycasestatus?testServiceId=service-1") {
          return {
            result: {
              casesStatusJA: [{ case_id: "case-2", status: "FAILED" }],
              totalCount: 1
            },
            status: "success"
          };
        }
        if (path === "/v2/casehistory?testServiceId=service-1&taskId=task-1") {
          return {
            result: {
              caseResultList: [{ id: "history-1", result: "PASSED" }],
              totalCount: 1
            },
            status: "success"
          };
        }
        if (path === "/v2/querycasesbystid?testServiceId=service-1") {
          return {
            result: {
              casesArr: [{ id: "case-3", name: "legacy suite case" }],
              totalCount: 1
            },
            status: "success"
          };
        }
        if (path === "/v2/casestask?testServiceId=service-1") {
          return {
            result: {
              taskId: "task-legacy-1",
              needApprove: true,
              warn: ["quota warning"],
              packageType: "PUBLIC",
              isPopup: false
            },
            status: "success"
          };
        }

        return {};
      }
    } as never);

    await expect(
      client.listCasesStatus({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        cases: ["case-1"]
      })
    ).resolves.toEqual({
      statuses: [{ case_id: "case-1", status: "PASSED" }],
      total: 1,
      status: "success"
    });
    await expect(
      client.listCasesStatusV3({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        cases: ["case-2"]
      })
    ).resolves.toEqual({
      statuses: [{ case_id: "case-2", status: "FAILED" }],
      total: 1,
      status: "success"
    });
    await expect(
      client.listCaseHistory({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        case_id: "case-1",
        task_id: "task-1",
        page: 2,
        page_size: 5
      })
    ).resolves.toEqual({
      histories: [{ id: "history-1", result: "PASSED" }],
      total: 1,
      status: "success"
    });
    await expect(
      client.listCasesByStid({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        suiteid: "suite-1",
        page: 3,
        page_size: 20,
        sort_field: "name",
        sort_type: "asc",
        status: ["READY"],
        owner_ids: ["user-1"],
        results: ["PASSED"],
        plan_id: "plan-1",
        stage: 1
      })
    ).resolves.toEqual({
      cases: [{ id: "case-3", name: "legacy suite case" }],
      total: 1,
      status: "success"
    });
    await expect(
      client.createCasesTask({
        testServiceId: "service-1",
        x_auth_token: "token-1",
        cases: ["case-1", "case-2"],
        task_name: "legacy task",
        plan_id: "plan-1",
        projectId: "project-1",
        projectUUId: "project-uuid-1",
        serviceType: 1,
        functionType: "api",
        releaseversion: "1.0.0",
        resourcePool: "default"
      })
    ).resolves.toEqual({
      task_id: "task-legacy-1",
      need_approve: true,
      warn: ["quota warning"],
      package_type: "PUBLIC",
      is_popup: false,
      status: "success",
      raw: {
        taskId: "task-legacy-1",
        needApprove: true,
        warn: ["quota warning"],
        packageType: "PUBLIC",
        isPopup: false
      }
    });

    expect(requests).toEqual([
      {
        path: "/v2/querycasestatus?testServiceId=service-1",
        body: { cases: ["case-1"] },
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        path: "/v3/querycasestatus?testServiceId=service-1",
        body: { cases: ["case-2"] },
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        path: "/v2/casehistory?testServiceId=service-1&taskId=task-1",
        body: {
          caseId: "case-1",
          testServiceId: "service-1",
          pageNum: 2,
          pageSize: 5
        },
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        path: "/v2/querycasesbystid?testServiceId=service-1",
        body: {
          suiteid: "suite-1",
          sortField: "name",
          sortType: "asc",
          status: ["READY"],
          ownerIds: ["user-1"],
          results: ["PASSED"],
          planId: "plan-1",
          stage: 1,
          pageNo: 3,
          pageSize: 20
        },
        options: { headers: { "X-Auth-Token": "token-1" } }
      },
      {
        path: "/v2/casestask?testServiceId=service-1",
        body: {
          cases: ["case-1", "case-2"],
          taskName: "legacy task",
          planId: "plan-1",
          projectId: "project-1",
          projectUUId: "project-uuid-1",
          serviceType: 1,
          functionType: "api",
          releaseversion: "1.0.0",
          resourcePool: "default"
        },
        options: { headers: { "X-Auth-Token": "token-1" } }
      }
    ]);
  });

  it("gets executor runtime elements", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createTestPlanClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          type: "api_test",
          public_aw_lib_infos: [{ id: "lib-1", name: "Common Lib" }],
          testcase_src_infos: [{ class_name: "LoginTest", uri: "case-1" }]
        };
      }
    } as never);

    const result = await client.getExecutorElements({
      project_id: "project-1",
      execute_mode: "serial",
      testcase_infos: [{ uri: "case-1", case_type: 1, script_path: "/tmp/LoginTest.java" }]
    });

    expect(requestedPath).toBe("/v1/project-1/executor/elements");
    expect(requestedBody).toEqual({
      execute_mode: "serial",
      testcase_infos: [{ uri: "case-1", case_type: 1, script_path: "/tmp/LoginTest.java" }]
    });
    expect(result).toEqual({
      raw: {
        type: "api_test",
        public_aw_lib_infos: [{ id: "lib-1", name: "Common Lib" }],
        testcase_src_infos: [{ class_name: "LoginTest", uri: "case-1" }]
      }
    });
  });
});
