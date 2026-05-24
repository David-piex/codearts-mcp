import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateCheckModeInput } from "../schemas.js";

export function mapUpdatedCheckMode(input: {
  task_id: string;
  mr_check_mode?: 0 | 4 | 5;
  operator?: string;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Updated" : "Dry run: update"} Check MR check mode ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    mrCheckMode: input.mr_check_mode,
    operator: input.operator,
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  updateCheckMode: (input: {
    task_id: string;
    mr_check_mode: 0 | 4 | 5;
    operator?: string;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateCheckModeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateCheckModeInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedCheckMode({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateCheckMode(parsed);
    const result = mapUpdatedCheckMode({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
