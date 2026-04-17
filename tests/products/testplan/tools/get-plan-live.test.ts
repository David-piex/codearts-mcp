import { describe, expect, it } from "vitest";
import { createTestPlanGetPlanHandler } from "../../../../src/products/testplan/tools/get-plan.js";

describe("createTestPlanGetPlanHandler", () => {
  it("maps test plan detail into MCP output", async () => {
    const handler = createTestPlanGetPlanHandler({
      getPlan: async () => ({
        plan_id: "plan-1",
        name: "Sprint 12 Regression",
        owner_name: "Yao",
        status: "ongoing",
        description: "Core regression plan"
      })
    });

    const result = await handler({ project_id: "project-1", plan_id: "plan-1" });

    expect(result.structuredContent.item).toEqual({
      id: "plan-1",
      name: "Sprint 12 Regression",
      ownerName: "Yao",
      status: "ongoing",
      description: "Core regression plan"
    });
  });
});
