import { asItemResult } from "../../../contracts/tool-result.js";
import { governStopTaskInput } from "../schemas.js";

export function previewGovernStopTask(input: {
  project_id: string;
  task_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: stop govern task ${input.task_id}`, {
    id: input.task_id,
    projectId: input.project_id,
    executed: !input.dry_run
  });
}

export function mapGovernStoppedTask(input: { id: string; result?: string }) {
  return asItemResult(`Stopped govern task ${input.id}`, {
    id: input.id,
    result: input.result,
    executed: true
  });
}

type GovernStopTaskClient = {
  stopTask: (input: { project_id: string; task_id: string }) => Promise<{
    id: string;
    result?: string;
  }>;
};

export function createGovernStopTaskHandler(client: GovernStopTaskClient) {
  return async (input: unknown) => {
    const parsed = governStopTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGovernStopTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.stopTask(parsed);
    const result = mapGovernStoppedTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
