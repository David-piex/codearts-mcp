import { asItemResult } from "../../../contracts/tool-result.js";
import { checkStopTaskV1Input } from "../schemas.js";

function mapStoppedTaskV1(input: {
  task_id: string;
  job_id?: string;
  operator?: string;
  status?: string;
  result?: string;
  raw?: Record<string, unknown>;
  executed: boolean;
}) {
  return asItemResult(`${input.executed ? "Stopped" : "Dry run: stop"} Check v1 task ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    jobId: input.job_id,
    operator: input.operator,
    status: input.status,
    result: input.result,
    raw: input.raw,
    executed: input.executed
  });
}

type Client = {
  stopTaskV1: (input: {
    task_id: string;
    job_id?: string;
    operator?: string;
  }) => Promise<{
    task_id: string;
    job_id?: string;
    status?: string;
    result?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckStopTaskV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkStopTaskV1Input.parse(input);

    if (parsed.dry_run) {
      const result = mapStoppedTaskV1({ ...parsed, executed: false });
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopTaskV1(parsed);
    const result = mapStoppedTaskV1({ ...parsed, ...response, executed: true });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
