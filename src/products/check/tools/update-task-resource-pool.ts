import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateTaskResourcePoolInput } from "../schemas.js";

export function mapUpdatedTaskResourcePool(input: {
  task_id: string;
  resource_pool_id?: string;
  resource_pool_type?: "default" | "custom";
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Updated" : "Dry run: update"} Check task resource pool ${input.task_id}`,
    {
      id: input.task_id,
      taskId: input.task_id,
      resourcePoolId: input.resource_pool_id,
      resourcePoolType: input.resource_pool_type,
      status: input.status,
      result: input.result,
      raw: input.raw,
      executed: input.executed
    }
  );
}

type Client = {
  updateTaskResourcePool: (input: {
    task_id: string;
    resource_pool_id?: string;
    resource_pool_type?: "default" | "custom";
    body?: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateTaskResourcePoolHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateTaskResourcePoolInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedTaskResourcePool({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskResourcePool(parsed);
    const result = mapUpdatedTaskResourcePool({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
