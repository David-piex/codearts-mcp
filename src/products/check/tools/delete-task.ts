import { asItemResult } from "../../../contracts/tool-result.js";
import { checkDeleteTaskInput } from "../schemas.js";

function mapDeletedTask(input: {
  task_id: string;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Deleted" : "Dry run: delete"} Check task ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    status: input.status,
    result: input.result,
    raw: input.raw,
    authMode: "x_auth_token",
    executed: input.executed
  });
}

type Client = {
  deleteTask: (input: {
    task_id: string;
    x_auth_token: string;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckDeleteTaskHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkDeleteTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = mapDeletedTask({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteTask(parsed);
    const result = mapDeletedTask({ ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
