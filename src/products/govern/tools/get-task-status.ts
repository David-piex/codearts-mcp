import { asItemResult } from "../../../contracts/tool-result.js";
import { governGetTaskStatusInput } from "../schemas.js";

export function mapGovernTaskStatus(input: { id: string; status?: string }) {
  return asItemResult(`Loaded govern task status ${input.id}`, {
    id: input.id,
    status: input.status
  });
}

type GovernGetTaskStatusClient = {
  getTaskStatus: (input: { project_id: string; task_id: string }) => Promise<{
    id: string;
    status?: string;
  }>;
};

export function createGovernGetTaskStatusHandler(client: GovernGetTaskStatusClient) {
  return async (input: unknown) => {
    const parsed = governGetTaskStatusInput.parse(input);
    const response = await client.getTaskStatus(parsed);
    const result = mapGovernTaskStatus(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
