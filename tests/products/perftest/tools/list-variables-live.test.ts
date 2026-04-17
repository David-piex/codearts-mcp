import { describe, expect, it } from "vitest";
import { createPerfTestListVariablesHandler } from "../../../../src/products/perftest/tools/list-variables.js";

describe("createPerfTestListVariablesHandler", () => {
  it("maps perftest variables into MCP output", async () => {
    const handler = createPerfTestListVariablesHandler({
      listVariables: async () => ({
        variable_list: [{ id: 21, name: "var1", variable_type: 2, variable: ["a"] }]
      })
    });

    const result = await handler({ project_id: "project-1", test_suite_id: 1, variable_type: 2 });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "21", name: "var1" });
  });
});
