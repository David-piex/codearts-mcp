import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanListDynamicGlobalVariablesInput } from "../schemas.js";

type Client = {
  listDynamicGlobalVariables: (input: {
    project_id: string;
    task_id: string;
  }) => Promise<{
    project_id: string;
    task_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListDynamicGlobalVariablesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListDynamicGlobalVariablesInput.parse(input);
    const response = await client.listDynamicGlobalVariables(parsed);
    const result = asItemResult(`Loaded dynamic global variables for task ${parsed.task_id}`, {
      id: parsed.task_id,
      projectId: parsed.project_id,
      taskId: parsed.task_id,
      value: response.value,
      variables: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
