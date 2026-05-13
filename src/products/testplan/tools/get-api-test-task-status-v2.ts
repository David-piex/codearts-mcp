import { testPlanGetApiTestTaskStatusV2Input } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getApiTestTaskStatusV2: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{ task_id: string; status?: string; raw: Record<string, unknown> }>;
};

export function createTestPlanGetApiTestTaskStatusV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestTaskStatusV2Input.parse(input);
    const response = await client.getApiTestTaskStatusV2(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test v2 task ${response.task_id}`,
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
