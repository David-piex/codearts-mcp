import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanUpdateTaskInput } from "../schemas.js";

export function previewUpdateTestPlanTask(input: {
  project_id: string;
  task_uri: string;
  name: string;
  uri?: string;
  description?: string;
  version_uri?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: update test plan task ${input.task_uri}`, {
    projectId: input.project_id,
    taskId: input.task_uri,
    name: input.name,
    uri: input.uri,
    description: input.description,
    versionUri: input.version_uri,
    executed: !input.dry_run
  });
}

export function mapUpdatedTestPlanTask(input: {
  task_id: string;
  name?: string;
  version_uri?: string;
  status_code?: number;
  status_name?: string;
}) {
  return asItemResult(`Updated test plan task ${input.name ?? input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    name: input.name,
    versionUri: input.version_uri,
    statusCode: input.status_code,
    statusName: input.status_name,
    executed: true
  });
}

type TestPlanUpdateTaskClient = {
  updateTask: (input: {
    project_id: string;
    task_uri: string;
    name: string;
    uri?: string;
    description?: string;
    version_uri?: string;
  }) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
  }>;
};

export function createTestPlanUpdateTaskHandler(client: TestPlanUpdateTaskClient) {
  return async (input: unknown) => {
    const parsed = testPlanUpdateTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateTestPlanTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTask(parsed);
    const result = mapUpdatedTestPlanTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
