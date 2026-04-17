import { describe, expect, it } from "vitest";
import { createGovernGetExcelReportStatusHandler } from "../../../../src/products/govern/tools/get-excel-report-status.js";

describe("createGovernGetExcelReportStatusHandler", () => {
  it("maps excel report status", async () => {
    const handler = createGovernGetExcelReportStatusHandler({
      getExcelReportStatus: async () => ({ id: "task-1", status: "R" })
    });

    const result = await handler({ project_id: "project-1", task_id: "task-1" });
    expect(result.structuredContent.item).toMatchObject({ id: "task-1", status: "R" });
  });
});
