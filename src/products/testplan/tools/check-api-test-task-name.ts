import { testPlanCheckApiTestTaskNameInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  checkApiTestTaskName: (input: {
    service_id: string;
    task_name: string;
    task_id?: string;
  }) => Promise<{ value?: unknown; raw: Record<string, unknown> }>;
};

export function createTestPlanCheckApiTestTaskNameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanCheckApiTestTaskNameInput.parse(input);
    const response = await client.checkApiTestTaskName(parsed);
    const result = mapTestPlanValueItem(
      `Checked API test task name ${parsed.task_name}`,
      parsed.task_name,
      "check",
      response.value,
      response.raw,
      { serviceId: parsed.service_id, taskId: parsed.task_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
