import { asItemResult } from "../../../contracts/tool-result.js";
import { deployGetAppInput } from "../schemas.js";
import { extractDeployStepParameters } from "./step-parameters.js";

export function mapDeployApp(input: {
  application_id: string;
  name: string;
  project_id?: string;
  create_type?: string;
  can_execute?: boolean;
  can_create_env?: boolean;
  can_modify?: boolean;
  can_delete?: boolean;
  can_view?: boolean;
  can_manage?: boolean;
  can_disable?: boolean;
  is_disable?: boolean;
  create_time?: string;
  update_time?: string;
  deploy_type?: string;
  description?: string;
  arrange_infos?: Array<{
    id?: string;
    state?: string;
    deploy_system?: string;
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
    can_execute?: boolean;
    can_create_env?: boolean;
    steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
  }>;
}) {
  const tasks =
    input.arrange_infos?.map((task) => {
      const stepParameters = extractDeployStepParameters(task.steps);

      return {
        id: task.id,
        state: task.state,
        deploySystem: task.deploy_system,
        templateId: task.template_id,
        releaseId: task.release_id,
        componentCount: task.app_component_list?.length ?? 0,
        components:
          task.app_component_list?.map((component) => ({
            taskId: component.task_id,
            appId: component.app_id,
            appName: component.app_name,
            componentId: component.comp_id,
            componentName: component.comp_name,
            region: component.region,
            state: component.state
          })) ?? [],
        canExecute: task.can_execute,
        canCreateEnv: task.can_create_env,
        stepCount: Object.keys(task.steps ?? {}).length,
        parameterCount: stepParameters.parameterCount,
        parameterNames: stepParameters.parameterNames,
        parameters: stepParameters.parameters,
        steps: task.steps ?? {},
        stepNames: Object.values(task.steps ?? {})
          .map((step) => step.name)
          .filter((name): name is string => Boolean(name))
      };
    }) ?? [];

  return asItemResult(`Loaded deploy application ${input.name}`, {
    id: input.application_id,
    name: input.name,
    projectId: input.project_id,
    createType: input.create_type,
    canExecute: input.can_execute,
    canCreateEnv: input.can_create_env,
    canModify: input.can_modify,
    canDelete: input.can_delete,
    canView: input.can_view,
    canManage: input.can_manage,
    canDisable: input.can_disable,
    disabled: input.is_disable,
    createdTime: input.create_time,
    updatedTime: input.update_time,
    deployType: input.deploy_type,
    description: input.description,
    taskCount: input.arrange_infos?.length ?? 0,
    taskIds: input.arrange_infos?.map((task) => task.id).filter((id): id is string => Boolean(id)) ?? [],
    tasks
  });
}

type DeployGetAppClient = {
  getApp: (input: { application_id: string }) => Promise<{
    application_id: string;
    name: string;
    project_id?: string;
    create_type?: string;
    can_execute?: boolean;
    can_create_env?: boolean;
    can_modify?: boolean;
    can_delete?: boolean;
    can_view?: boolean;
    can_manage?: boolean;
    can_disable?: boolean;
    is_disable?: boolean;
    create_time?: string;
    update_time?: string;
    deploy_type?: string;
    description?: string;
    arrange_infos?: Array<{
      id?: string;
      state?: string;
      deploy_system?: string;
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
      can_execute?: boolean;
      can_create_env?: boolean;
      steps?: Record<string, { id?: string; name?: string; enable?: boolean; params?: unknown }>;
    }>;
  }>;
};

export function createDeployGetAppHandler(client: DeployGetAppClient) {
  return async (input: unknown) => {
    const parsed = deployGetAppInput.parse(input);
    const response = await client.getApp(parsed);
    const result = mapDeployApp(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
