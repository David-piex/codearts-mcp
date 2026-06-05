import { asItemResult } from "../../../contracts/tool-result.js";
import { checkRefreshJobResultInput } from "../schemas.js";

function mapRefreshedJobResult(input: {
  job_id: string;
  task_id?: string;
  async: boolean;
  status?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Refreshed" : "Dry run: refresh"} Check job result ${input.job_id}`, {
    id: input.job_id,
    jobId: input.job_id,
    taskId: input.task_id,
    async: input.async,
    status: input.status,
    report: input.raw,
    authMode: "x_auth_token",
    executed: input.executed
  });
}

type Client = {
  refreshJobResult: (input: {
    job_id: string;
    task_id?: string;
    async: boolean;
    x_auth_token: string;
  }) => Promise<{
    job_id: string;
    task_id?: string;
    async: boolean;
    status?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckRefreshJobResultHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkRefreshJobResultInput.parse(input);

    if (parsed.dry_run) {
      const result = mapRefreshedJobResult({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.refreshJobResult(parsed);
    const result = mapRefreshedJobResult({ ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
