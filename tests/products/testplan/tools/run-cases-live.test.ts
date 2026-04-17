import { describe, expect, it } from "vitest";
import { createTestPlanRunCasesHandler } from "../../../../src/products/testplan/tools/run-cases.js";

describe("createTestPlanRunCasesHandler", () => {
  it("maps batch test case execution into MCP output", async () => {
    const handler = createTestPlanRunCasesHandler({
      runCases: async () => ({
        run_id: "run-1",
        accepted_count: 2,
        status: "RUNNING"
      })
    });

    const result = await handler({
      project_id: "project-1",
      execute_list: [{ case_id: "case-1" }, { case_id: "case-2" }],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "run-1",
      acceptedCount: 2,
      status: "RUNNING",
      executed: true
    });
  });
});
