import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanDownloadTestReportInput } from "../schemas.js";

type TestPlanDownloadTestReportClient = {
  downloadTestReport: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    project_id: string;
    version_uri: string;
    report_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanDownloadTestReportHandler(
  client: TestPlanDownloadTestReportClient
) {
  return async (input: unknown) => {
    const parsed = testPlanDownloadTestReportInput.parse(input);
    const response = await client.downloadTestReport(parsed);
    const result = asItemResult(`Loaded test report download metadata ${response.report_id}`, {
      id: response.report_id,
      reportId: response.report_id,
      projectId: response.project_id,
      versionUri: response.version_uri,
      value: response.value,
      response: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
