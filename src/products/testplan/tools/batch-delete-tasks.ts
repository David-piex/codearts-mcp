import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanBatchDeleteTasksInput } from "../schemas.js";

export function previewBatchDeleteTestPlanTasks(input: {
  project_id: string;
  task_uris: string[];
  version_uri?: string;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: delete ${input.task_uris.length} test plan tasks`, {
    projectId: input.project_id,
    taskUris: input.task_uris,
    versionUri: input.version_uri,
    deletedCount: input.task_uris.length,
    executed: !input.dry_run
  });
}

export function mapBatchDeletedTestPlanTasks(input: {
  task_uris: string[];
  deleted_count?: number;
}) {
  return asItemResult(`Deleted ${input.deleted_count ?? input.task_uris.length} test plan tasks`, {
    taskUris: input.task_uris,
    deletedCount: input.deleted_count ?? input.task_uris.length,
    executed: true
  });
}

type TestPlanBatchDeleteTasksClient = {
  batchDeleteTasks: (input: {
    project_id: string;
    task_uris: string[];
    version_uri?: string;
  }) => Promise<{
    deleted_count?: number;
    task_uris: string[];
  }>;
};

export function createTestPlanBatchDeleteTasksHandler(client: TestPlanBatchDeleteTasksClient) {
  return async (input: unknown) => {
    const parsed = testPlanBatchDeleteTasksInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteTestPlanTasks(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteTasks(parsed);
    const result = mapBatchDeletedTestPlanTasks(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
