import { describe, expect, it } from "vitest";
import { createInspectorListTaskHistoriesHandler } from "../../../../src/products/inspector/tools/list-task-histories.js";

describe("createInspectorListTaskHistoriesHandler", () => {
  it("maps inspector task histories into MCP output", async () => {
    const handler = createInspectorListTaskHistoriesHandler({
      listTaskHistories: async () => ({
        total: 1,
        data: [{ task_id: "task-1", task_name: "scan-main", task_status: "success" }]
      })
    });

    const result = await handler({
      project_id: "project-1",
      domain_id: "domain-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "task-1",
      status: "success"
    });
  });
});
