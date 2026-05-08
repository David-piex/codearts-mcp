import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTaskExecutionParamInput } from "../schemas.js";

export function mapTestPlanTaskExecutionParam(input: {
  task_uri: string;
  parameters: Record<string, unknown>;
}) {
  return asItemResult(`Loaded test plan task execution parameters ${input.task_uri}`, {
    id: input.task_uri,
    taskId: input.task_uri,
    parameters: input.parameters
  });
}

type TestPlanGetTaskExecutionParamClient = {
  getTaskExecutionParam: (input: {
    task_uri: string;
    project_uuid?: string;
  }) => Promise<{
    task_uri: string;
    parameters: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTaskExecutionParamHandler(
  client: TestPlanGetTaskExecutionParamClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetTaskExecutionParamInput.parse(input);
    const response = await client.getTaskExecutionParam(parsed);
    const result = mapTestPlanTaskExecutionParam(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
