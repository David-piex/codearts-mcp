import { asItemResult } from "../../../contracts/tool-result.js";
import { reqCreateWorkItemTemplateInput } from "../schemas.js";

type ReqCreateWorkItemTemplateFieldConfig = {
  field?: string;
  is_required?: number;
  default_value?: string;
  position?: number;
  is_visible?: boolean;
};

export function previewCreateWorkItemTemplate(input: {
  project_id: string;
  tracker_id: number;
  description?: string;
  issue_field_configs?: ReqCreateWorkItemTemplateFieldConfig[];
  dry_run: boolean;
}) {
  return asItemResult(
    `Dry run: create or update work item template for tracker ${input.tracker_id}`,
    {
      projectId: input.project_id,
      trackerId: input.tracker_id,
      description: input.description,
      issueFieldConfigs: input.issue_field_configs ?? [],
      executed: false
    }
  );
}

export function mapCreatedWorkItemTemplate(input: {
  project_id: string;
  tracker_id: number;
  description?: string;
  issue_field_configs?: ReqCreateWorkItemTemplateFieldConfig[];
  status?: string;
}) {
  return asItemResult(`Created or updated work item template for tracker ${input.tracker_id}`, {
    projectId: input.project_id,
    trackerId: input.tracker_id,
    description: input.description,
    issueFieldConfigs: input.issue_field_configs ?? [],
    status: input.status,
    executed: true
  });
}

type ReqCreateWorkItemTemplateClient = {
  createWorkItemTemplate: (input: {
    project_id: string;
    tracker_id: number;
    description?: string;
    issue_field_configs?: ReqCreateWorkItemTemplateFieldConfig[];
  }) => Promise<{
    project_id: string;
    tracker_id: number;
    description?: string;
    issue_field_configs?: ReqCreateWorkItemTemplateFieldConfig[];
    status?: string;
  }>;
};

export function createReqCreateWorkItemTemplateHandler(client: ReqCreateWorkItemTemplateClient) {
  return async (input: unknown) => {
    const parsed = reqCreateWorkItemTemplateInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreateWorkItemTemplate(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createWorkItemTemplate(parsed);
    const result = mapCreatedWorkItemTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
