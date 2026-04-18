import { asItemResult } from "../../../contracts/tool-result.js";
import { deployStartAppInput } from "../schemas.js";

export function previewStartApp(input: {
  task_id: string;
  task_name?: string;
  project_id?: string;
  status?: string;
  can_execute?: boolean;
  trigger_source?: 0 | 1 | "0" | "1";
  params: Array<{ name: string; type?: string; value?: string }>;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: start deploy task ${input.task_id}`, {
    id: input.task_id,
    taskName: input.task_name,
    projectId: input.project_id,
    status: input.status,
    canExecute: input.can_execute,
    triggerSource: input.trigger_source,
    paramCount: input.params.length,
    executed: !input.dry_run
  });
}

export function mapStartedApp(input: {
  task_id: string;
  record_id?: string;
  job_name?: string;
  status?: string;
  app_component_list?: Array<{
    task_id?: string;
    app_id?: string;
    app_name?: string;
    comp_id?: string;
    comp_name?: string;
    region?: string;
    state?: string;
  }>;
}) {
  return asItemResult(`Started deploy task ${input.task_id}`, {
    id: input.task_id,
    recordId: input.record_id,
    jobName: input.job_name,
    status: input.status,
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
    executed: true
  });
}

type DeployStartAppClient = {
  getTask: (input: { task_id: string }) => Promise<{
    task_id: string;
    name: string;
    project_id?: string;
    state?: string;
    can_execute?: boolean;
  }>;
  startApp: (input: {
    task_id: string;
    trigger_source?: 0 | 1 | "0" | "1";
    params?: Array<{ name?: string; type?: string; value?: string }>;
  }) => Promise<{
    task_id: string;
    record_id?: string;
    job_name?: string;
    status?: string;
    app_component_list?: Array<{
      task_id?: string;
      app_id?: string;
      app_name?: string;
      comp_id?: string;
      comp_name?: string;
      region?: string;
      state?: string;
    }>;
  }>;
};

export function createDeployStartAppHandler(client: DeployStartAppClient) {
  return async (input: unknown) => {
    const parsed = deployStartAppInput.parse(input);

    if (parsed.dry_run) {
      const task = await client.getTask({ task_id: parsed.task_id });
      const result = previewStartApp({
        ...parsed,
        task_name: task.name,
        project_id: task.project_id,
        status: task.state,
        can_execute: task.can_execute
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.startApp(parsed);
    const result = mapStartedApp(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
