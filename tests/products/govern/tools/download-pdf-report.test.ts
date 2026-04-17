import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createGovernDownloadPdfReportHandler } from "../../../../src/products/govern/tools/download-pdf-report.js";

describe("createGovernDownloadPdfReportHandler", () => {
  it("writes the downloaded pdf to local_output", async () => {
    const dir = mkdtempSync(join(tmpdir(), "govern-pdf-"));
    const output = join(dir, "report.pdf");
    const handler = createGovernDownloadPdfReportHandler({
      downloadPdfReport: async () => ({
        body: new Uint8Array([1, 2, 3]),
        content_type: "application/pdf",
        file_name: "report.pdf"
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
    expect(Array.from(readFileSync(output))).toEqual([1, 2, 3]);
  });
});
