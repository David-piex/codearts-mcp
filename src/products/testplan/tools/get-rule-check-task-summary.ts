import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetRuleCheckTaskSummaryInput } from "../schemas.js";

export function mapTestPlanRuleCheckTaskSummary(input: {
  task_uri: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded rule check task summary ${input.task_uri}`, {
    id: input.task_uri,
    taskUri: input.task_uri,
    summary: input.raw
  });
}

type TestPlanGetRuleCheckTaskSummaryClient = {
  getRuleCheckTaskSummary: (input: {
    project_id: string;
    version_uri: string;
    task_uri: string;
    severity?: string;
    status?: number;
  }) => Promise<{
    task_uri: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetRuleCheckTaskSummaryHandler(
  client: TestPlanGetRuleCheckTaskSummaryClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetRuleCheckTaskSummaryInput.parse(input);
    const response = await client.getRuleCheckTaskSummary(parsed);
    const result = mapTestPlanRuleCheckTaskSummary(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
