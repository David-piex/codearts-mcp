import { describe, expect, it } from "vitest";
import { createTestPlanListPlansHandler } from "../../../../src/products/testplan/tools/list-plans.js";

describe("createTestPlanListPlansHandler", () => {
  it("maps test plan list responses into MCP output", async () => {
    const handler = createTestPlanListPlansHandler({
      listPlans: async () => ({
        plans: [
          {
            plan_id: "plan-1",
            name: "Sprint 12 Regression",
            owner_name: "Yao",
            status: "ongoing"
          }
        ],
        total: 1
      })
    });

    const result = await handler({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.structuredContent.summary).toContain("1 test plans");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "plan-1",
      name: "Sprint 12 Regression",
      ownerName: "Yao",
      status: "ongoing"
    });
  });
});
