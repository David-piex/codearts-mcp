import { asItemResult } from "../../../contracts/tool-result.js";
import { checkBatchCopyAsyncTasksInput } from "../schemas.js";

function mapBatchCopiedAsyncTasks(input: {
  task_id: string;
  tasks: Array<Record<string, unknown>>;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Started" : "Dry run: start"} Check async task batch copy ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    taskCount: input.tasks.length,
    requestBody: input.tasks,
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  batchCopyAsyncTasks: (input: {
    task_id: string;
    tasks: Array<Record<string, unknown>>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckBatchCopyAsyncTasksHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkBatchCopyAsyncTasksInput.parse(input);

    if (parsed.dry_run) {
      const result = mapBatchCopiedAsyncTasks({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchCopyAsyncTasks(parsed);
    const result = mapBatchCopiedAsyncTasks({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
