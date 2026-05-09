import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTaskSuccessTestCasesCountInput } from "../schemas.js";

export function mapTestPlanTaskSuccessTestCasesCount(input: {
  task_uri: string;
  success_count?: number;
  value?: unknown;
}) {
  return asItemResult(`Loaded successful testcase count for task ${input.task_uri}`, {
    id: input.task_uri,
    taskId: input.task_uri,
    successCount: input.success_count,
    value: input.value
  });
}

type TestPlanGetTaskSuccessTestCasesCountClient = {
  getTaskSuccessTestCasesCount: (input: {
    project_uuid: string;
    version_uri: string;
    task_uri: string;
  }) => Promise<{
    task_uri: string;
    success_count?: number;
    value?: unknown;
  }>;
};

export function createTestPlanGetTaskSuccessTestCasesCountHandler(
  client: TestPlanGetTaskSuccessTestCasesCountClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetTaskSuccessTestCasesCountInput.parse(input);
    const response = await client.getTaskSuccessTestCasesCount(parsed);
    const result = mapTestPlanTaskSuccessTestCasesCount(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
