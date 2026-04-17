import { describe, expect, it } from "vitest";
import { createGovernGetOpenSourceSummaryHandler } from "../../../../src/products/govern/tools/get-open-source-summary.js";

describe("createGovernGetOpenSourceSummaryHandler", () => {
  it("maps govern open source summary into MCP output", async () => {
    const handler = createGovernGetOpenSourceSummaryHandler({
      getOpenSourceSummary: async () => ({
        software: {
          component: 12,
          vuln: 3,
          no_version: 1
        },
        vuln: {
          critical: 1,
          high: 1,
          medium: 1,
          low: 0
        },
        license: {
          list: [{ name: "Apache-2.0", num: 4 }]
        },
        report_url: "https://report.example.com/1",
        start_time: "2026-04-16 10:00:00",
        end_time: "2026-04-16 10:03:00"
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.structuredContent.item).toMatchObject({
      componentCount: 12,
      vulnerabilityCount: 3,
      reportUrl: "https://report.example.com/1"
    });
  });
});
