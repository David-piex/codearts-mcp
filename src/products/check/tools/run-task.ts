import { asItemResult } from "../../../contracts/tool-result.js";
import { checkRunTaskInput } from "../schemas.js";

export function previewRunTask(input: { task_id: string; dry_run: boolean }) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: run check task ${input.task_id}`, {
    id: input.task_id,
    executed: !input.dry_run
  });
}

export function mapRunTaskResult(input: { task_id: string; job_id?: string; status?: string }) {
  return asItemResult(`Executed check task ${input.task_id}`, {
    id: input.task_id,
    jobId: input.job_id,
    status: input.status,
    executed: true
  });
}

type CheckRunTaskClient = {
  runTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    job_id?: string;
    status?: string;
  }>;
};

export function createCheckRunTaskHandler(client: CheckRunTaskClient) {
  return async (input: unknown) => {
    const parsed = checkRunTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewRunTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.runTask(parsed);
    const result = mapRunTaskResult(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
