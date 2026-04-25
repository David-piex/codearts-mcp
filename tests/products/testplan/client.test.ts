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
      plan_id: "plan-1"
    });

    expect(requestedPath).toBe(
      "/v1/projects/project-1/plans/plan-1/issues?offset=0&limit=100"
    );
    expect(result).toEqual({
      issues: []
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
});
