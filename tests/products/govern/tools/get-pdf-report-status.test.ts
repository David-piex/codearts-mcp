import { describe, expect, it } from "vitest";
import { createGovernGetPdfReportStatusHandler } from "../../../../src/products/govern/tools/get-pdf-report-status.js";

describe("createGovernGetPdfReportStatusHandler", () => {
  it("maps pdf report status", async () => {
    const handler = createGovernGetPdfReportStatusHandler({
      getPdfReportStatus: async () => ({ id: "task-1", status: "R" })
    });

    const result = await handler({ project_id: "project-1", task_id: "task-1" });
    expect(result.structuredContent.item).toMatchObject({ id: "task-1", status: "R" });
  });
});
