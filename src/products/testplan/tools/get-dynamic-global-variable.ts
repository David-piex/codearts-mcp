import { testPlanGetDynamicGlobalVariableInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getDynamicGlobalVariable: (input: {
    project_id: string;
    task_id: string;
    key: string;
  }) => Promise<{
    project_id: string;
    task_id: string;
    key: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetDynamicGlobalVariableHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetDynamicGlobalVariableInput.parse(input);
    const response = await client.getDynamicGlobalVariable(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded dynamic global variable ${parsed.key}`,
      parsed.key,
      "variable",
      response.raw,
      {
        projectId: parsed.project_id,
        taskId: parsed.task_id,
        value: response.value
      }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
