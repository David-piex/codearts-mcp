import { describe, expect, it } from "vitest";
import { createTestPlanListCasesHandler } from "../../../../src/products/testplan/tools/list-cases.js";

describe("createTestPlanListCasesHandler", () => {
  it("maps test cases into MCP output", async () => {
    const handler = createTestPlanListCasesHandler({
      listCases: async () => ({
        cases: [
          {
            case_id: "case-1",
            name: "Login should succeed",
            result: "passed",
            status: "ready",
            test_type: "manual"
          }
        ],
        total: 1
      })
    });

    const result = await handler({
      project_id: "project-1",
      plan_id: "plan-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.summary).toContain("1 test cases");
    expect(result.structuredContent.items?.[0]).toEqual({
      id: "case-1",
      name: "Login should succeed",
      result: "passed",
      status: "ready",
      testType: "manual"
    });
  });
});
