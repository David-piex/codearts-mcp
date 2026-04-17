import { asItemResult } from "../../../contracts/tool-result.js";
import { checkStopTaskInput } from "../schemas.js";

export function previewStopTask(input: { task_id: string; dry_run: boolean }) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: stop check task ${input.task_id}`, {
    id: input.task_id,
    executed: !input.dry_run
  });
}

export function mapStopTaskResult(input: { task_id: string; status?: string }) {
  return asItemResult(`Stopped check task ${input.task_id}`, {
    id: input.task_id,
    status: input.status,
    executed: true
  });
}

type CheckStopTaskClient = {
  stopTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    status?: string;
  }>;
};

export function createCheckStopTaskHandler(client: CheckStopTaskClient) {
  return async (input: unknown) => {
    const parsed = checkStopTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewStopTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopTask(parsed);
    const result = mapStopTaskResult(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
