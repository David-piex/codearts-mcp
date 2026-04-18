import { asItemResult } from "../../../contracts/tool-result.js";
import { deployModifyApplicationInput } from "../schemas.js";

export function previewModifyApplication(input: {
  id: string;
  project_id: string;
  name: string;
  create_type: string;
  is_draft: boolean;
  current_name?: string;
  current_arrange_info_count?: number;
  can_modify?: boolean;
  arrange_infos: Array<{
    template_id: string;
    operation_list: unknown[];
  }>;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: modify deploy application ${input.name}`, {
    id: input.id,
    projectId: input.project_id,
    name: input.name,
    createType: input.create_type,
    isDraft: input.is_draft,
    arrangeInfoCount: input.arrange_infos.length,
    operationCount: input.arrange_infos.reduce(
      (count, item) => count + item.operation_list.length,
      0
    ),
    currentName: input.current_name,
    currentArrangeInfoCount: input.current_arrange_info_count,
    canModify: input.can_modify,
    executed: !input.dry_run
  });
}

export function mapModifiedApplication(input: {
  application_id: string;
  name: string;
  task_id?: string;
}) {
  return asItemResult(`Modified deploy application ${input.name}`, {
    id: input.application_id,
    name: input.name,
    taskId: input.task_id,
    executed: true
  });
}

type DeployModifyApplicationClient = {
  getApp: (input: { application_id: string }) => Promise<{
    application_id: string;
    name: string;
    project_id?: string;
    create_type?: string;
    can_modify?: boolean;
    arrange_infos?: Array<unknown>;
  }>;
  modifyApplication: (input: {
    id: string;
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
      id?: string;
      deploy_system?: string;
      template_id: string;
      operation_list: unknown[];
    }>;
  }) => Promise<{
    application_id: string;
    name: string;
    task_id?: string;
  }>;
};

export function createDeployModifyApplicationHandler(client: DeployModifyApplicationClient) {
  return async (input: unknown) => {
    const parsed = deployModifyApplicationInput.parse(input);

    if (parsed.dry_run) {
      const app = await client.getApp({ application_id: parsed.id });
      const result = previewModifyApplication({
        ...parsed,
        current_name: app.name,
        current_arrange_info_count: app.arrange_infos?.length ?? 0,
        can_modify: app.can_modify
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.modifyApplication(parsed);
    const result = mapModifiedApplication(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
