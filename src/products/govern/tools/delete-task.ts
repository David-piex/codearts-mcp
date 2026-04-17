import { asItemResult } from "../../../contracts/tool-result.js";
import { governDeleteTaskInput } from "../schemas.js";

export function previewGovernDeleteTask(input: {
  project_id: string;
  task_id: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: delete govern task ${input.task_id}`, {
    id: input.task_id,
    projectId: input.project_id,
    executed: !input.dry_run
  });
}

export function mapGovernDeletedTask(input: { id: string; result?: string }) {
  return asItemResult(`Deleted govern task ${input.id}`, {
    id: input.id,
    result: input.result,
    executed: true
  });
}

type GovernDeleteTaskClient = {
  deleteTask: (input: { project_id: string; task_id: string }) => Promise<{
    id: string;
    result?: string;
  }>;
};

export function createGovernDeleteTaskHandler(client: GovernDeleteTaskClient) {
  return async (input: unknown) => {
    const parsed = governDeleteTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewGovernDeleteTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteTask(parsed);
    const result = mapGovernDeletedTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
