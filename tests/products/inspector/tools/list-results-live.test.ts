import { describe, expect, it } from "vitest";
import { createInspectorListResultsHandler } from "../../../../src/products/inspector/tools/list-results.js";

describe("createInspectorListResultsHandler", () => {
  it("maps inspector results into MCP output", async () => {
    const handler = createInspectorListResultsHandler({
      listResults: async () => ({
        total: 1,
        statistics: { middle: 1 },
        data: [
          {
            vuln_id: "vuln-1",
            url: "https://example.com/a",
            severity: "middle",
            vuln_status: "repairing",
            vuln_type: "CSRF"
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "vuln-1",
      severity: "middle",
      status: "repairing"
    });
  });
});
