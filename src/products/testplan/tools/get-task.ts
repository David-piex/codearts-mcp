import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTaskInput } from "../schemas.js";

export function mapTestPlanTask(input: {
  task_id: string;
  name?: string;
  version_uri?: string;
  status_code?: number;
  status_name?: string;
  executor_id?: string;
  executor_name?: string;
}) {
  return asItemResult(`Loaded test plan task ${input.name ?? input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    name: input.name,
    versionUri: input.version_uri,
    statusCode: input.status_code,
    statusName: input.status_name,
    executorId: input.executor_id,
    executorName: input.executor_name
  });
}

type TestPlanGetTaskClient = {
  getTask: (input: {
    project_id: string;
    task_uri: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
    executor_id?: string;
    executor_name?: string;
  }>;
};

export function createTestPlanGetTaskHandler(client: TestPlanGetTaskClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetTaskInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapTestPlanTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
