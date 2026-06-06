import { describe, expect, it } from "vitest";
import { createTestPlanDownloadTestReportHandler } from "../../../../src/products/testplan/tools/download-test-report.js";

describe("testplan download test report handler", () => {
  it("maps test report download metadata", async () => {
    const handler = createTestPlanDownloadTestReportHandler({
      downloadTestReport: async (input) => ({
        project_id: input.project_id,
        version_uri: input.version_uri,
        report_id: input.report_uri,
        value: "download-token-1",
        raw: { value: "download-token-1" }
      })
    });

    await expect(
      handler({
        project_id: "project-1",
        version_uri: "version-1",
        report_uri: "report-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded test report download metadata report-1",
        item: {
          id: "report-1",
          reportId: "report-1",
          value: "download-token-1"
        }
      }
    });
  });
});
