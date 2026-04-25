import { asItemResult } from "../../../contracts/tool-result.js";
import { reqGetWorkItemTemplateConfigInput } from "../schemas.js";

type ReqWorkItemTemplateFieldConfig = {
  field?: string;
  name?: string;
  field_type?: string;
  type_options?: unknown;
  default_value?: unknown;
  is_visible?: boolean;
  is_required?: boolean;
  position?: number;
  tracker_list?: number[];
  option?: unknown;
  default_option?: unknown;
  default_options?: unknown[];
};

type ReqWorkItemTemplateConfig = {
  project_id: string;
  tracker_id: number;
  templates: Array<{
    id?: number | string;
    name?: string;
    description?: string;
    issue_field_configs?: ReqWorkItemTemplateFieldConfig[];
  }>;
};

export function mapReqWorkItemTemplateConfig(input: ReqWorkItemTemplateConfig) {
  return asItemResult(`Loaded work item template config for tracker ${input.tracker_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    templates: input.templates.map((template) => ({
      id: template.id ? String(template.id) : undefined,
      name: template.name,
      description: template.description,
      issueFieldConfigs: (template.issue_field_configs ?? []).map((fieldConfig) => ({
        field: fieldConfig.field,
        name: fieldConfig.name,
        fieldType: fieldConfig.field_type,
        typeOptions: fieldConfig.type_options,
        defaultValue: fieldConfig.default_value,
        visible: fieldConfig.is_visible,
        required: fieldConfig.is_required,
        position: fieldConfig.position,
        trackerList: fieldConfig.tracker_list,
        option: fieldConfig.option,
        defaultOption: fieldConfig.default_option,
        defaultOptions: fieldConfig.default_options
      }))
    }))
  });
}

type ReqGetWorkItemTemplateConfigClient = {
  getWorkItemTemplateConfig: (input: {
    project_id: string;
    tracker_id: number;
  }) => Promise<ReqWorkItemTemplateConfig>;
};

export function createReqGetWorkItemTemplateConfigHandler(
  client: ReqGetWorkItemTemplateConfigClient
) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemTemplateConfigInput.parse(input);
    const response = await client.getWorkItemTemplateConfig(parsed);
    const result = mapReqWorkItemTemplateConfig(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
