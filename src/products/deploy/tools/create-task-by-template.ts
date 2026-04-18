import { asItemResult } from "../../../contracts/tool-result.js";
import { deployCreateTaskByTemplateInput } from "../schemas.js";

export function previewCreateTaskByTemplate(input: {
  project_id: string;
  project_name: string;
  template_id: string;
  template_name?: string;
  template_operation_count?: number;
  task_name: string;
  configs: Array<{
    name: string;
    type?: string;
    description?: string;
    value?: string;
    static_status?: number;
    limits?: Array<{ name: string; value?: string }>;
  }>;
  dry_run: boolean;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";

  return asItemResult(`${mode}: create deploy task ${input.task_name} from template`, {
    projectId: input.project_id,
    projectName: input.project_name,
    templateId: input.template_id,
    templateName: input.template_name,
    templateOperationCount: input.template_operation_count,
    taskName: input.task_name,
    configCount: input.configs.length,
    executed: !input.dry_run
  });
}

export function mapCreatedTaskByTemplate(input: { task_name: string; task_id: string }) {
  return asItemResult(`Created deploy task ${input.task_name} from template`, {
    id: input.task_id,
    name: input.task_name,
    executed: true
  });
}

type DeployCreateTaskByTemplateClient = {
  getTemplateDetail: (input: {
    template_id: string;
    task_id?: string;
  }) => Promise<{
    template_id: string;
    task_id?: string;
    name?: string;
    operation_list: unknown[];
    raw: unknown;
  }>;
  createTaskByTemplate: (input: {
    project_id: string;
    project_name: string;
    template_id: string;
    task_name: string;
    configs?: Array<{
      name: string;
      type?: string;
      description?: string;
      value?: string;
      static_status?: number;
      limits?: Array<{ name: string; value?: string }>;
    }>;
  }) => Promise<{
    task_name: string;
    task_id: string;
  }>;
};

export function createDeployCreateTaskByTemplateHandler(client: DeployCreateTaskByTemplateClient) {
  return async (input: unknown) => {
    const parsed = deployCreateTaskByTemplateInput.parse(input);

    if (parsed.dry_run) {
      const template = await client.getTemplateDetail({ template_id: parsed.template_id });
      const result = previewCreateTaskByTemplate({
        ...parsed,
        template_name: template.name,
        template_operation_count: template.operation_list.length
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTaskByTemplate(parsed);
    const result = mapCreatedTaskByTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
