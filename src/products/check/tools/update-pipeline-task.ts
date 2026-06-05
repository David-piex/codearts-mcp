import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdatePipelineTaskInput } from "../schemas.js";

export function mapUpdatedPipelineTask(input: {
  task_id: string;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Updated" : "Dry run: update"} Check pipeline task ${input.task_id}`,
    {
      id: input.task_id,
      taskId: input.task_id,
      status: input.status,
      result: input.result,
      raw: input.raw,
      executed: input.executed
    }
  );
}

type Client = {
  updatePipelineTask: (input: {
    task_id: string;
    body?: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdatePipelineTaskHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdatePipelineTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedPipelineTask({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updatePipelineTask(parsed);
    const result = mapUpdatedPipelineTask({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
