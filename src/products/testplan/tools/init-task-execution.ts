import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanInitTaskExecutionInput } from "../schemas.js";

export function previewInitTaskExecution(input: {
  project_id: string;
  task_uri: string;
  release_dev?: string;
  version_uri?: string;
  is_query?: boolean;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: initialize test plan task execution ${input.task_uri}`, {
    projectId: input.project_id,
    taskId: input.task_uri,
    releaseDev: input.release_dev,
    versionUri: input.version_uri,
    isQuery: input.is_query,
    executed: !input.dry_run
  });
}

export function mapInitializedTaskExecution(input: {
  result_id?: string;
  task_uri: string;
  total?: number;
  has_more?: boolean;
}) {
  return asItemResult(`Initialized test plan task execution ${input.task_uri}`, {
    id: input.result_id ?? input.task_uri,
    resultId: input.result_id,
    taskId: input.task_uri,
    total: input.total,
    hasMore: input.has_more,
    executed: true
  });
}

type TestPlanInitTaskExecutionClient = {
  initTaskExecution: (input: {
    project_id: string;
    task_uri: string;
    release_dev?: string;
    version_uri?: string;
    is_query?: boolean;
  }) => Promise<{
    result_id?: string;
    task_uri: string;
    total?: number;
    has_more?: boolean;
  }>;
};

export function createTestPlanInitTaskExecutionHandler(
  client: TestPlanInitTaskExecutionClient
) {
  return async (input: unknown) => {
    const parsed = testPlanInitTaskExecutionInput.parse(input);

    if (parsed.dry_run) {
      const result = previewInitTaskExecution(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.initTaskExecution(parsed);
    const result = mapInitializedTaskExecution(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
