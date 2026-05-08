import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanCreateTaskInput } from "../schemas.js";

export function previewCreateTestPlanTask(input: {
  project_id: string;
  name: string;
  uri?: string;
  description?: string;
  version_uri?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create test plan task ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    uri: input.uri,
    description: input.description,
    versionUri: input.version_uri,
    executed: !input.dry_run
  });
}

export function mapCreatedTestPlanTask(input: {
  task_id: string;
  name?: string;
  version_uri?: string;
  status_code?: number;
  status_name?: string;
}) {
  return asItemResult(`Created test plan task ${input.name ?? input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    name: input.name,
    versionUri: input.version_uri,
    statusCode: input.status_code,
    statusName: input.status_name,
    executed: true
  });
}

type TestPlanCreateTaskClient = {
  createTask: (input: {
    project_id: string;
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

export function createTestPlanCreateTaskHandler(client: TestPlanCreateTaskClient) {
  return async (input: unknown) => {
    const parsed = testPlanCreateTaskInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateTestPlanTask(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTask(parsed);
    const result = mapCreatedTestPlanTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
