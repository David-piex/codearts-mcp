import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetTaskInput } from "../schemas.js";
import { extractDeployStepParameters } from "./step-parameters.js";

export function mapDeployTask(input: {
  task_id: string;
  application_id?: string;
  name: string;
  project_id?: string;
  state?: string;
  can_execute?: boolean;
  can_create_env?: boolean;
  can_modify?: boolean;
  can_delete?: boolean;
  can_view?: boolean;
  can_manage?: boolean;
  is_disable?: boolean;
  create_time?: string;
  update_time?: string;
  steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
  template_id?: string;
  release_id?: number;
  app_component_list?: Array<{
    task_id?: string;
    app_id?: string;
    app_name?: string;
    comp_id?: string;
    comp_name?: string;
    region?: string;
    state?: string;
  }>;
  status?: string;
  deploy_type?: string;
  description?: string;
}) {
  const stepParameters = extractDeployStepParameters(input.steps);

  return asItemResult(`Loaded deploy task ${input.task_id}`, {
    id: input.task_id,
    applicationId: input.application_id,
    name: input.name,
    projectId: input.project_id,
    state: input.state ?? input.status,
    status: input.status ?? input.state,
    canExecute: input.can_execute,
    canCreateEnv: input.can_create_env,
    canModify: input.can_modify,
    canDelete: input.can_delete,
    canView: input.can_view,
    canManage: input.can_manage,
    disabled: input.is_disable,
    createdTime: input.create_time,
    updatedTime: input.update_time,
    templateId: input.template_id,
    releaseId: input.release_id,
    componentCount: input.app_component_list?.length ?? 0,
    components:
      input.app_component_list?.map((component) => ({
        taskId: component.task_id,
        appId: component.app_id,
        appName: component.app_name,
        componentId: component.comp_id,
        componentName: component.comp_name,
        region: component.region,
        state: component.state
      })) ?? [],
    stepCount: Object.keys(input.steps ?? {}).length,
    parameterCount: stepParameters.parameterCount,
    parameterNames: stepParameters.parameterNames,
    parameters: stepParameters.parameters,
    stepNames: Object.values(input.steps ?? {})
      .map((step) => step.name)
      .filter((name): name is string => Boolean(name)),
    steps: input.steps ?? {},
    deployType: input.deploy_type,
    description: input.description
  });
}

type DeployGetTaskClient = {
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    application_id?: string;
    name: string;
    project_id?: string;
    state?: string;
    can_execute?: boolean;
    can_create_env?: boolean;
    can_modify?: boolean;
    can_delete?: boolean;
    can_view?: boolean;
    can_manage?: boolean;
    is_disable?: boolean;
    create_time?: string;
    update_time?: string;
    steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
    template_id?: string;
    release_id?: number;
    app_component_list?: Array<{
      task_id?: string;
      app_id?: string;
      app_name?: string;
      comp_id?: string;
      comp_name?: string;
      region?: string;
      state?: string;
    }>;
    status?: string;
    deploy_type?: string;
    description?: string;
  }>;
};

export function createDeployGetTaskHandler(client: DeployGetTaskClient) {
  return async (input: unknown) => {
    const parsed = deployGetTaskInput.parse(input);
    const response = await client.getTask(parsed);
    const result = mapDeployTask(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
