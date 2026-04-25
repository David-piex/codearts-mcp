import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemCustomFieldsInput } from "../schemas.js";

export function mapReqWorkItemCustomFields(
  items: Array<{
    tracker_list?: string[];
    region?: string;
    id?: number | string;
    project_id?: number | string;
    tracker_id?: number;
    custom_field?: string;
    type?: string;
    name?: string;
    sort?: number;
    memo?: string;
    created?: string;
    modified?: string;
    is_delete?: boolean;
  }>
) {
  return asListResult(
    `${items.length} work item custom fields found`,
    items.map((item) => ({
      id: String(item.id ?? ""),
      projectId: item.project_id,
      trackerId: item.tracker_id,
      trackerList: item.tracker_list,
      region: item.region,
      customField: item.custom_field,
      type: item.type,
      name: item.name,
      sort: item.sort,
      memo: item.memo,
      created: item.created,
      modified: item.modified,
      deleted: item.is_delete
    }))
  );
}

type ReqListWorkItemCustomFieldsClient = {
  listWorkItemCustomFields: (input: {
    project_id: string;
    tracker_id?: number;
  }) => Promise<{
    custom_field: Array<{
      tracker_list?: string[];
      region?: string;
      id?: number | string;
      project_id?: number | string;
      tracker_id?: number;
      custom_field?: string;
      type?: string;
      name?: string;
      sort?: number;
      memo?: string;
      created?: string;
      modified?: string;
      is_delete?: boolean;
    }>;
  }>;
};

export function createReqListWorkItemCustomFieldsHandler(client: ReqListWorkItemCustomFieldsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemCustomFieldsInput.parse(input);
    const response = await client.listWorkItemCustomFields(parsed);
    const result = mapReqWorkItemCustomFields(response.custom_field);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
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
