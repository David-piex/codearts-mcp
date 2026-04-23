import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemTemplatesInput } from "../schemas.js";

export function mapReqWorkItemTemplates(
  items: Array<{
    id?: number | string;
    project_id?: number | string;
    tracker_id?: number;
    description?: string;
    issue_field_config?: string;
  }>
) {
  return asListResult(
    `${items.length} work item templates found`,
    items.map((item) => ({
      id: String(item.id ?? ""),
      projectId: item.project_id,
      trackerId: item.tracker_id,
      description: item.description,
      issueFieldConfig: item.issue_field_config
    }))
  );
}

type ReqListWorkItemTemplatesClient = {
  listWorkItemTemplates: (input: {
    project_id: string;
    tracker_id?: 2 | 3 | 5 | 6 | 7;
  }) => Promise<{
    templates: Array<{
      id?: number | string;
      project_id?: number | string;
      tracker_id?: number;
      description?: string;
      issue_field_config?: string;
    }>;
  }>;
};

export function createReqListWorkItemTemplatesHandler(client: ReqListWorkItemTemplatesClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemTemplatesInput.parse(input);
    const response = await client.listWorkItemTemplates(parsed);
    const result = mapReqWorkItemTemplates(response.templates);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "trackerId", get: (item) => (item as { trackerId?: number }).trackerId },
        { label: "projectId", get: (item) => (item as { projectId?: number | string }).projectId }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
