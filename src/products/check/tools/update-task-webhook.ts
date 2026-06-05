import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateTaskWebhookInput } from "../schemas.js";

function mapUpdatedTaskWebhook(input: {
  task_id: string;
  body: Record<string, unknown>;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Updated" : "Dry run: update"} Check task webhook ${input.task_id}`,
    {
      id: input.task_id,
      taskId: input.task_id,
      requestBody: input.body,
      status: input.status,
      result: input.result,
      raw: input.raw,
      executed: input.executed
    }
  );
}

type Client = {
  updateTaskWebhook: (input: {
    task_id: string;
    body: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateTaskWebhookHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateTaskWebhookInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedTaskWebhook({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskWebhook(parsed);
    const result = mapUpdatedTaskWebhook({ ...parsed, ...response, executed: true });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
