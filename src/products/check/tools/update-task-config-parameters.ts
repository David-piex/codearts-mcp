import { asItemResult } from "../../../contracts/tool-result.js";
import { checkUpdateTaskConfigParametersInput } from "../schemas.js";

function mapUpdatedTaskConfigParameters(input: {
  project_id: string;
  task_id: string;
  body: Record<string, unknown>;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Updated" : "Dry run: update"} Check task config parameters ${input.task_id}`,
    {
      id: input.task_id,
      projectId: input.project_id,
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
  updateTaskConfigParameters: (input: {
    project_id: string;
    task_id: string;
    body: Record<string, unknown>;
  }) => Promise<{
    task_id: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckUpdateTaskConfigParametersHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkUpdateTaskConfigParametersInput.parse(input);

    if (parsed.dry_run) {
      const result = mapUpdatedTaskConfigParameters({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTaskConfigParameters(parsed);
    const result = mapUpdatedTaskConfigParameters({ ...parsed, ...response, executed: true });
    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
