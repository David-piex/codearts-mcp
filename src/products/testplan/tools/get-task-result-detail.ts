import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTaskResultDetailInput } from "../schemas.js";

export function mapTestPlanTaskResultDetail(input: {
  result_id: string;
  task_result?: Record<string, unknown>;
  test_results: Array<Record<string, unknown>>;
  total?: number;
}) {
  return asItemResult(`Loaded test plan task result ${input.result_id}`, {
    id: input.result_id,
    resultId: input.result_id,
    taskResult: input.task_result,
    testResults: input.test_results,
    total: input.total
  });
}

type TestPlanGetTaskResultDetailClient = {
  getTaskResultDetail: (input: {
    project_id: string;
    task_uri: string;
    result_uri: string;
    page: number;
    page_size: number;
    result?: string;
  }) => Promise<{
    result_id: string;
    task_result?: Record<string, unknown>;
    test_results: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanGetTaskResultDetailHandler(
  client: TestPlanGetTaskResultDetailClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetTaskResultDetailInput.parse(input);
    const response = await client.getTaskResultDetail(parsed);
    const result = mapTestPlanTaskResultDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
