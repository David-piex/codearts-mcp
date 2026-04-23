import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemStatusAttributesInput } from "../schemas.js";

export function mapReqWorkItemStatusAttributes(
  items: Array<{
    name?: string;
    type?: string;
    project_id?: string;
  }>
) {
  return asListResult(
    `${items.length} work item status attributes found`,
    items.map((item) => ({
      name: item.name,
      type: item.type,
      projectId: item.project_id
    }))
  );
}

type ReqListWorkItemStatusAttributesClient = {
  listWorkItemStatusAttributes: (input: { project_id: string }) => Promise<{
    issue_status_attributes: Array<{
      name?: string;
      type?: string;
      project_id?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListWorkItemStatusAttributesHandler(
  client: ReqListWorkItemStatusAttributesClient
) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemStatusAttributesInput.parse(input);
    const response = await client.listWorkItemStatusAttributes(parsed);
    const result = mapReqWorkItemStatusAttributes(response.issue_status_attributes);
    const text = formatListToolText(result, {
      fields: [
        { label: "name", get: (item) => (item as { name?: string }).name },
        { label: "type", get: (item) => (item as { type?: string }).type }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
