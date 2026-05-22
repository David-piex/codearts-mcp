import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListWorkItemRecordsInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";

type ReqWorkItemRecord = {
  [key: string]: unknown;
  id: number | string;
  created_time?: string | number;
  user?: {
    user_id?: string;
    user_name?: string;
    user_num_id?: number;
    nick_name?: string;
  };
  details?: Array<{
    [key: string]: unknown;
    id: number | string;
    name?: string;
    new_value?: string;
    old_value?: string;
    operation?: string;
    property?: string;
  }>;
};

export function mapReqWorkItemRecords(
  items: ReqWorkItemRecord[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} work item records found`,
    items.map((item) => ({
      id: String(item.id),
      createdTime: item.created_time,
      createdTimeText: formatReqTimestampText(item.created_time),
      actor: item.user
        ? {
            id: item.user.user_id,
            name: item.user.user_name,
            numberId: item.user.user_num_id,
            nickName: item.user.nick_name
          }
        : undefined,
      changes: (item.details ?? []).map((detail) => ({
        id: String(detail.id),
        name: detail.name,
        oldValue: detail.old_value,
        newValue: detail.new_value,
        operation: detail.operation,
        property: detail.property
      })),
      rawRecord: item
    })),
    toPageInfo(page, pageSize, total),
    { records: items }
  );
}

type ReqListWorkItemRecordsClient = {
  listWorkItemRecords: (input: {
    project_id: string;
    work_item_id: string;
    page: number;
    page_size: number;
    journalized_type?: string;
  }) => Promise<{
    records: ReqWorkItemRecord[];
    total?: number;
  }>;
};

export function createReqListWorkItemRecordsHandler(client: ReqListWorkItemRecordsClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemRecordsInput.parse(input);
    const response = await client.listWorkItemRecords(parsed);
    const result = mapReqWorkItemRecords(response.records, parsed.page, parsed.page_size, response.total);
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "createdTime", get: (item) => (item as { createdTimeText?: string; createdTime?: string }).createdTimeText ?? (item as { createdTime?: string }).createdTime },
            {
              label: "actor",
              get: (item) => {
                const actor = (item as { actor?: { name?: string; id?: string } }).actor;
                return actor?.name ?? actor?.id;
              }
            }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "work item records",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
