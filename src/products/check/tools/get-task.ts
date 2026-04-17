import { asItemResult } from "../../../contracts/tool-result.js";
import { checkGetTaskInput } from "../schemas.js";

export function mapCheckTask(input: {
  task_id: string;
  task_name: string;
  project_name?: string;
  repository_name?: string;
  branch_name?: string;
  language?: string;
  status?: string;
  last_check_time?: string;
}) {
  return asItemResult(`Loaded check task ${input.task_name}`, {
    id: input.task_id,
    name: input.task_name,
    projectName: input.project_name,
    repositoryName: input.repository_name,
    branchName: input.branch_name,
    language: input.language,
    status: input.status,
    lastCheckTime: input.last_check_time
  });
}

type CheckGetTaskClient = {
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    task_name: string;
    project_name?: string;
    repository_name?: string;
    branch_name?: string;
    language?: string;
    status?: string;
    last_check_time?: string;
  }>;
};

export function createCheckGetTaskHandler(client: CheckGetTaskClient) {
  return async (input: unknown) => {
    const parsed = checkGetTaskInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapCheckTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
