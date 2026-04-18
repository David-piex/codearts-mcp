import { asItemResult } from "../../../contracts/tool-result.js";
import { deployCreateApplicationInput } from "../schemas.js";

export function previewCreateApplication(input: {
  project_id: string;
  name: string;
  create_type: string;
  is_draft: boolean;
  arrange_infos: Array<{
    template_id: string;
    operation_list: unknown[];
  }>;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create deploy application ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    createType: input.create_type,
    isDraft: input.is_draft,
    arrangeInfoCount: input.arrange_infos.length,
    operationCount: input.arrange_infos.reduce(
      (count, item) => count + item.operation_list.length,
      0
    ),
    executed: !input.dry_run
  });
}

export function mapCreatedApplication(input: {
  application_id: string;
  name: string;
  task_id?: string;
}) {
  return asItemResult(`Created deploy application ${input.name}`, {
    id: input.application_id,
    name: input.name,
    taskId: input.task_id,
    executed: true
  });
}

type DeployCreateApplicationClient = {
  createApplication: (input: {
    project_id: string;
    name: string;
    description?: string;
    trigger: {
      trigger_source: string;
      artifact_source_system: string;
      artifact_type: string;
    };
    slave_cluster_id?: string;
    slave_resource_type?: string;
    create_type?: string;
    is_draft?: boolean;
    group_id?: string;
    agency_urn?: string;
    arrange_infos: Array<{
      template_id: string;
      operation_list: unknown[];
    }>;
  }) => Promise<{
    application_id: string;
    name: string;
    task_id?: string;
  }>;
};

export function createDeployCreateApplicationHandler(client: DeployCreateApplicationClient) {
  return async (input: unknown) => {
    const parsed = deployCreateApplicationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateApplication(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createApplication(parsed);
    const result = mapCreatedApplication(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
