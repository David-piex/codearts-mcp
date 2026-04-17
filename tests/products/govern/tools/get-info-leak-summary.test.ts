import { describe, expect, it } from "vitest";
import { createGovernGetInfoLeakSummaryHandler } from "../../../../src/products/govern/tools/get-info-leak-summary.js";

describe("createGovernGetInfoLeakSummaryHandler", () => {
  it("maps info leak summary into MCP output", async () => {
    const handler = createGovernGetInfoLeakSummaryHandler({
      getInfoLeakSummary: async () => ({
        file_count: 5,
        start_time: "2026-04-16 10:00:00",
        end_time: "2026-04-16 10:03:00",
        items: [{ name: "硬编码密码", result: 2 }]
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.structuredContent.item).toMatchObject({
      fileCount: 5,
      itemCount: 1
    });
  });
});
