import { describe, expect, it } from "vitest";
import { createGovernGetSecCompileSummaryHandler } from "../../../../src/products/govern/tools/get-sec-compile-summary.js";

describe("createGovernGetSecCompileSummaryHandler", () => {
  it("maps sec compile summary into MCP output", async () => {
    const handler = createGovernGetSecCompileSummaryHandler({
      getSecCompileSummary: async () => ({
        version: "v1.0",
        all_file_nums: 9,
        items: [
          {
            index: "9.1",
            name: "BIND_NOW",
            severity: "high",
            result: { count: 1, coverage: "80%" }
          }
        ]
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.structuredContent.item).toMatchObject({
      version: "v1.0",
      fileCount: 9,
      itemCount: 1
    });
  });
});
