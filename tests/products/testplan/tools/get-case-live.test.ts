import { describe, expect, it } from "vitest";
import { createTestPlanGetCaseHandler } from "../../../../src/products/testplan/tools/get-case.js";

describe("createTestPlanGetCaseHandler", () => {
  it("maps test case detail into MCP output", async () => {
    const handler = createTestPlanGetCaseHandler({
      getCase: async () => ({
        case_id: "case-1",
        name: "Login should succeed",
        result: "passed",
        status: "ready",
        test_type: "manual"
      })
    });

    const result = await handler({ project_id: "project-1", case_id: "case-1" });

    expect(result.structuredContent.item).toEqual({
      id: "case-1",
      name: "Login should succeed",
      result: "passed",
      status: "ready",
      testType: "manual"
    });
  });
});
