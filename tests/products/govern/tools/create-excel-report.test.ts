import { describe, expect, it } from "vitest";
import { createGovernCreateExcelReportHandler } from "../../../../src/products/govern/tools/create-excel-report.js";

describe("createGovernCreateExcelReportHandler", () => {
  it("supports dry run previews", async () => {
    const handler = createGovernCreateExcelReportHandler({
      createExcelReport: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({ project_id: "project-1", task_id: "task-1", dry_run: true });
    expect(result.structuredContent.item).toMatchObject({ id: "task-1", executed: false });
  });
});
