import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateTaskOwnerMatchingSwitchInput } from "../schemas.js";

function mapUpdatedTaskOwnerMatchingSwitch(input: {
  task_id: string;
  enabled: boolean;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Updated" : "Dry run: update"} Check task owner matching switch ${input.task_id}`,
    {
      id: input.task_id,
      taskId: input.task_id,
      enabled: input.enabled,
      status: input.status,
      result: input.result,
      raw: input.raw,
      executed: input.executed
    }
  );
}

type Client = {
  updateTaskOwnerMatchingSwitch: (input: {
    task_id: string;
    enabled: boolean;
    body?: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateTaskOwnerMatchingSwitchHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateTaskOwnerMatchingSwitchInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedTaskOwnerMatchingSwitch({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskOwnerMatchingSwitch(parsed);
    const result = mapUpdatedTaskOwnerMatchingSwitch({ ...parsed, ...response, executed: true });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
