import { describe, expect, it } from "vitest";
import { createTestPlanListRunsHandler } from "../../../../src/products/testplan/tools/list-runs.js";

describe("createTestPlanListRunsHandler", () => {
  it("maps test plan runs into MCP output", async () => {
    const handler = createTestPlanListRunsHandler({
      listRuns: async () => ({
        runs: [
          {
            run_id: "run-1",
            name: "Regression Run",
            status: "RUNNING",
            executor_name: "yao"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", plan_id: "plan-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 test plan runs");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "run-1",
      name: "Regression Run",
      status: "RUNNING",
      executorName: "yao"
    });
  });
});
