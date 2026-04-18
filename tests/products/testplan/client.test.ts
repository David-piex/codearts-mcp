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
});
