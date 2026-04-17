import { describe, expect, it } from "vitest";
import { createInspectorGetReportStatusHandler } from "../../../../src/products/inspector/tools/get-report-status.js";

describe("createInspectorGetReportStatusHandler", () => {
  it("maps inspector report status into MCP output", async () => {
    const handler = createInspectorGetReportStatusHandler({
      getReportStatus: async () => ({
        task_id: "task-1",
        report_status: "generated"
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      reportStatus: "generated"
    });
  });
});
