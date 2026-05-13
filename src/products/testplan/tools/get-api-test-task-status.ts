import { testPlanGetApiTestTaskStatusInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetApiTestTaskStatusClient = {
  getApiTestTaskStatus: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{
    task_id: string;
    status?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetApiTestTaskStatusHandler(
  client: TestPlanGetApiTestTaskStatusClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestTaskStatusInput.parse(input);
    const response = await client.getApiTestTaskStatus(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test task ${response.task_id}`,
      response.task_id,
      "task",
      response.raw,
      { projectId: parsed.project_id, status: response.status }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
