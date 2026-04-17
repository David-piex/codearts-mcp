import { describe, expect, it } from "vitest";
import { createGovernGetSecConfigSummaryHandler } from "../../../../src/products/govern/tools/get-sec-config-summary.js";

describe("createGovernGetSecConfigSummaryHandler", () => {
  it("maps sec config summary into MCP output", async () => {
    const handler = createGovernGetSecConfigSummaryHandler({
      getSecConfigSummary: async () => ({
        version: "v1.0",
        start_time: "Jul 13 2023 10:25:02",
        end_time: "Jul 13 2023 10:25:02",
        items: [
          {
            index: "1.1",
            name: "预置账号信息检查",
            severity: "high",
            result: "NA",
            confirmation: null
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
      itemCount: 1
    });
  });
});
