import { asItemResult } from "../../../contracts/tool-result.js";
import { checkStopTaskInput } from "../schemas.js";

export function previewStopTask(input: {
  task_id: string;
  task_name?: string;
  project_name?: string;
  repository_name?: string;
  branch_name?: string;
  language?: string;
  status?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: stop check task ${input.task_id}`, {
    id: input.task_id,
    taskName: input.task_name,
    projectName: input.project_name,
    repositoryName: input.repository_name,
    branchName: input.branch_name,
    language: input.language,
    status: input.status,
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
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    task_name: string;
    project_name?: string;
    repository_name?: string;
    branch_name?: string;
    language?: string;
    status?: string;
  }>;
  stopTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    status?: string;
  }>;
};

export function createCheckStopTaskHandler(client: CheckStopTaskClient) {
  return async (input: unknown) => {
    const parsed = checkStopTaskInput.parse(input);

    if (parsed.dry_run) {
      const task = await client.getTask(parsed);
      const result = previewStopTask({
        ...parsed,
        task_name: task.task_name,
        project_name: task.project_name,
        repository_name: task.repository_name,
        branch_name: task.branch_name,
        language: task.language,
        status: task.status
      });

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
