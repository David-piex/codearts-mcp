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
  preview_source?: "template_detail" | "local_fallback";
  template_detail_available?: boolean;
  warning?: string;
}) {
  const mode = input.dry_run ? "Dry run" : "Executed";
  const fallbackSuffix =
    input.preview_source === "local_fallback" ? " (local preview only)" : "";

  return asItemResult(
    `${mode}: create deploy task ${input.task_name} from template${fallbackSuffix}`,
    {
      projectId: input.project_id,
      projectName: input.project_name,
      templateId: input.template_id,
      templateName: input.template_name,
      templateOperationCount: input.template_operation_count,
      taskName: input.task_name,
      configCount: input.configs.length,
      executed: !input.dry_run,
      previewSource: input.preview_source,
      templateDetailAvailable: input.template_detail_available,
      warning: input.warning
    }
  );
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

function isTemplateDetailGatewayUnpublished(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const code = "code" in error && typeof error.code === "string" ? error.code : undefined;
  return code === "APIGW.0101" || /not been published in the environment/i.test(error.message);
}

export function createDeployCreateTaskByTemplateHandler(client: DeployCreateTaskByTemplateClient) {
  return async (input: unknown) => {
    const parsed = deployCreateTaskByTemplateInput.parse(input);

    if (parsed.dry_run) {
      let templateName: string | undefined;
      let templateOperationCount: number | undefined;
      let previewSource: "template_detail" | "local_fallback" = "template_detail";
      let templateDetailAvailable = true;
      let warning: string | undefined;

      try {
        const template = await client.getTemplateDetail({ template_id: parsed.template_id });
        templateName = template.name;
        templateOperationCount = template.operation_list.length;
      } catch (error) {
        if (!isTemplateDetailGatewayUnpublished(error)) {
          throw error;
        }

        previewSource = "local_fallback";
        templateDetailAvailable = false;
        warning =
          "Template detail API is not published on the AK/SK gateway; returning a local dry-run preview only.";
      }

      const result = previewCreateTaskByTemplate({
        ...parsed,
        template_name: templateName,
        template_operation_count: templateOperationCount,
        preview_source: previewSource,
        template_detail_available: templateDetailAvailable,
        warning
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
