import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createGovernDownloadExcelReportHandler } from "../../../../src/products/govern/tools/download-excel-report.js";

describe("createGovernDownloadExcelReportHandler", () => {
  it("writes the downloaded excel to local_output", async () => {
    const dir = mkdtempSync(join(tmpdir(), "govern-excel-"));
    const output = join(dir, "report.xlsx");
    const handler = createGovernDownloadExcelReportHandler({
      downloadExcelReport: async () => ({
        body: new Uint8Array([4, 5, 6]),
        content_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        file_name: "report.xlsx"
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_id: "task-1",
      local_output: output,
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({ localOutput: output, executed: true });
    expect(existsSync(output)).toBe(true);
    expect(Array.from(readFileSync(output))).toEqual([4, 5, 6]);
  });
});
