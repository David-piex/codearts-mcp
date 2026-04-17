import { describe, expect, it } from "vitest";
import { createPerfTestListTaskCasesHandler } from "../../../../src/products/perftest/tools/list-task-cases.js";

describe("createPerfTestListTaskCasesHandler", () => {
  it("maps perftest task cases into MCP output", async () => {
    const handler = createPerfTestListTaskCasesHandler({
      getTask: async () => ({
        case_list: [{ case_id: 7, case_name: "login", case_uri: "/cases/7", temp_id: 1 }]
      })
    });

    const result = await handler({ project_id: "project-1", task_id: 11 });

    expect(result.structuredContent.items?.[0]).toMatchObject({ id: "7", name: "login" });
  });
});
