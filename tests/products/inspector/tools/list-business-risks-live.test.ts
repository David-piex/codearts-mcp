import { describe, expect, it } from "vitest";
import { createInspectorListBusinessRisksHandler } from "../../../../src/products/inspector/tools/list-business-risks.js";

describe("createInspectorListBusinessRisksHandler", () => {
  it("maps inspector business risks into MCP output", async () => {
    const handler = createInspectorListBusinessRisksHandler({
      listBusinessRisks: async () => ({
        total: 1,
        data: [
          {
            risk_id: "risk-1",
            risk_url: "https://example.com/risk",
            risk_type: "dead_link",
            risk_content: "https://dead.example.com",
            risk_status: "repairing",
            find_time: "2026-04-16 10:00:00"
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
      id: "risk-1",
      type: "dead_link",
      status: "repairing"
    });
  });
});
