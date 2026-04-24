import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListProjectWorkItemRecordsInput } from "../schemas.js";

type ReqProjectWorkItemRecord = {
  id: number | string;
  issue_id?: number | string;
  field_key?: string;
  field_name?: string;
  new_value?: string;
  old_value?: string;
  operated_time?: number;
  operation?: string;
  property?: string;
  operator?: {
    id?: number;
    name?: string;
    nick_name?: string;
    user_id?: string;
    user_num_id?: number;
    first_name?: string;
  };
};

export function mapReqProjectWorkItemRecords(
  items: ReqProjectWorkItemRecord[],
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} project work item records found`,
    items.map((item) => ({
      id: String(item.id),
      workItemId: typeof item.issue_id !== "undefined" ? String(item.issue_id) : undefined,
      fieldKey: item.field_key,
      fieldName: item.field_name,
      oldValue: item.old_value,
      newValue: item.new_value,
      operatedTime: item.operated_time,
      operation: item.operation,
      property: item.property,
      operator: item.operator
        ? {
            id: item.operator.id,
            name: item.operator.name,
            nickName: item.operator.nick_name,
            userId: item.operator.user_id,
            userNumId: item.operator.user_num_id,
            firstName: item.operator.first_name
          }
        : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListProjectWorkItemRecordsClient = {
  listProjectWorkItemRecords: (input: {
    project_id: string;
    page: number;
    page_size: number;
    operated_time_interval?: string;
  }) => Promise<{
    records: ReqProjectWorkItemRecord[];
    total?: number;
  }>;
};

export function createReqListProjectWorkItemRecordsHandler(
  client: ReqListProjectWorkItemRecordsClient
) {
  return async (input: unknown) => {
    const parsed = reqListProjectWorkItemRecordsInput.parse(input);
    const response = await client.listProjectWorkItemRecords(parsed);
    const result = mapReqProjectWorkItemRecords(
      response.records,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = result.items?.length
      ? formatListToolText(result, {
          fields: [
            { label: "id", get: (item) => (item as { id?: string }).id },
            { label: "workItemId", get: (item) => (item as { workItemId?: string }).workItemId },
            { label: "field", get: (item) => (item as { fieldName?: string }).fieldName },
            { label: "operation", get: (item) => (item as { operation?: string }).operation }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "project work item records",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
