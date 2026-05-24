import { asItemResult } from "../../../contracts/tool-result.js";
import { checkCreatePdfAsyncJobInput } from "../schemas.js";

export function previewCreatePdfAsyncJob(input: {
  task_id: string;
  project_name: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create Check PDF async job for task ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    projectName: input.project_name,
    executed: !input.dry_run
  });
}

export function mapCreatedPdfAsyncJob(input: {
  task_id: string;
  async_job_id?: string | number;
  time_ask?: number;
  raw?: Record<string, unknown>;
}) {
  return asItemResult(`Created Check PDF async job for task ${input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    asyncJobId: input.async_job_id,
    timeAsk: input.time_ask,
    raw: input.raw,
    executed: true
  });
}

type Client = {
  createPdfAsyncJob: (input: {
    task_id: string;
    project_name: string;
  }) => Promise<{
    task_id: string;
    async_job_id?: string | number;
    time_ask?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createCheckCreatePdfAsyncJobHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = checkCreatePdfAsyncJobInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePdfAsyncJob(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createPdfAsyncJob(parsed);
    const result = mapCreatedPdfAsyncJob(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
