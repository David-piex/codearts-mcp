import { asItemResult } from "../../../contracts/tool-result.js";
import { checkCreateTaskInput } from "../schemas.js";

export function previewCreateTask(input: {
  project_id: string;
  task_name: string;
  git_url: string;
  git_branch: string;
  language: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create check task ${input.task_name}`, {
    projectId: input.project_id,
    name: input.task_name,
    repositoryUrl: input.git_url,
    branchName: input.git_branch,
    language: input.language,
    executed: !input.dry_run
  });
}

export function mapCreatedTask(input: {
  task_id: string;
  task_name?: string;
  project_id?: string;
  git_url?: string;
  git_branch?: string;
  language?: string;
  status?: string;
}) {
  return asItemResult(`Created check task ${input.task_name ?? input.task_id}`, {
    id: input.task_id,
    projectId: input.project_id,
    name: input.task_name,
    repositoryUrl: input.git_url,
    branchName: input.git_branch,
    language: input.language,
    status: input.status,
    executed: true
  });
}

type CheckCreateTaskClient = {
  createTask: (input: {
    project_id: string;
    task_name: string;
    git_url: string;
    git_branch: string;
    language: string;
    rule_set_id?: string;
    task_type?: string;
  }) => Promise<{
    task_id: string;
    task_name?: string;
    project_id?: string;
    git_url?: string;
    git_branch?: string;
    language?: string;
    status?: string;
  }>;
};

export function createCheckCreateTaskHandler(client: CheckCreateTaskClient) {
  return async (input: unknown) => {
    const parsed = checkCreateTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTask(parsed);
    const result = mapCreatedTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
