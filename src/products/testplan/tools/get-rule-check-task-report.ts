import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetRuleCheckTaskReportInput } from "../schemas.js";

export function mapTestPlanRuleCheckTaskReport(input: {
  report_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded rule check task report ${input.name ?? input.report_id}`, {
    id: input.report_id,
    reportId: input.report_id,
    name: input.name,
    report: input.raw
  });
}

type TestPlanGetRuleCheckTaskReportClient = {
  getRuleCheckTaskReport: (input: {
    project_id: string;
    version_uri: string;
    task_uri: string;
  }) => Promise<{
    report_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetRuleCheckTaskReportHandler(
  client: TestPlanGetRuleCheckTaskReportClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetRuleCheckTaskReportInput.parse(input);
    const response = await client.getRuleCheckTaskReport(parsed);
    const result = mapTestPlanRuleCheckTaskReport(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
