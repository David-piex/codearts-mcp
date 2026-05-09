import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestReportInput } from "../schemas.js";

export function mapTestPlanTestReport(input: {
  report_id: string;
  name?: string;
  creator?: string;
  version_uri?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded test plan test report ${input.name ?? input.report_id}`, {
    id: input.report_id,
    reportId: input.report_id,
    name: input.name,
    creator: input.creator,
    versionUri: input.version_uri,
    report: input.raw
  });
}

type TestPlanGetTestReportClient = {
  getTestReport: (input: {
    project_id: string;
    version_uri: string;
    report_uri: string;
  }) => Promise<{
    report_id: string;
    name?: string;
    creator?: string;
    version_uri?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestReportHandler(client: TestPlanGetTestReportClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestReportInput.parse(input);
    const response = await client.getTestReport(parsed);
    const result = mapTestPlanTestReport(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
