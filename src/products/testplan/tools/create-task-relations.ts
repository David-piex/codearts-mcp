import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanCreateTaskRelationsInput } from "../schemas.js";

type CreateTaskRelationsInput = {
  project_id: string;
  name: string;
  uri?: string;
  stage?: string;
  number?: string;
  tags?: string;
  description?: string;
  region?: string;
  version_uri?: string;
  owner_id?: string;
  parent_uri?: string;
  test_case_condition?: string;
  service_type?: number;
  module_id?: string;
  module_name?: string;
  release_dev?: string;
  status_code?: number;
  ext_param?: string;
  execute_way?: number;
  dry_run: boolean;
};

export function previewCreateTaskRelations(input: CreateTaskRelationsInput) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create test plan task relations ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    uri: input.uri,
    versionUri: input.version_uri,
    ownerId: input.owner_id,
    moduleId: input.module_id,
    serviceType: input.service_type,
    executeWay: input.execute_way,
    executed: !input.dry_run
  });
}

export function mapCreatedTaskRelations(input: {
  task_id: string;
  name?: string;
  version_uri?: string;
  status_code?: number;
  status_name?: string;
}) {
  return asItemResult(`Created test plan task relations ${input.name ?? input.task_id}`, {
    id: input.task_id,
    taskId: input.task_id,
    name: input.name,
    versionUri: input.version_uri,
    statusCode: input.status_code,
    statusName: input.status_name,
    executed: true
  });
}

type TestPlanCreateTaskRelationsClient = {
  createTaskRelations: (input: Omit<CreateTaskRelationsInput, "dry_run">) => Promise<{
    task_id: string;
    name?: string;
    version_uri?: string;
    status_code?: number;
    status_name?: string;
  }>;
};

export function createTestPlanCreateTaskRelationsHandler(
  client: TestPlanCreateTaskRelationsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanCreateTaskRelationsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateTaskRelations(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTaskRelations(parsed);
    const result = mapCreatedTaskRelations(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
