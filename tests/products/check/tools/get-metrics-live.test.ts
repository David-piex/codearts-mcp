import { describe, expect, it } from "vitest";
import { createCheckGetMetricsHandler } from "../../../../src/products/check/tools/get-metrics.js";

describe("createCheckGetMetricsHandler", () => {
  it("maps check metrics into MCP output", async () => {
    const handler = createCheckGetMetricsHandler({
      getMetrics: async () => ({
        task_id: "task-1",
        code_lines: 1200,
        issues_count: 18,
        duplicated_lines: 24
      })
    });

    const result = await handler({ task_id: "task-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      codeLines: 1200,
      issuesCount: 18,
      duplicatedLines: 24
    });
  });
});
