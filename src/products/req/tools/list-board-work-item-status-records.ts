import { asListResult } from "../../../contracts/tool-result.js";
import { formatProjectScopedEmptyText } from "../../../contracts/project-scoped-empty-text.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListBoardWorkItemStatusRecordsInput } from "../schemas.js";

export function mapReqBoardWorkItemStatusRecords(
  items: Array<{
    work_item_record_id?: string;
    work_item_id?: string;
    project_id?: string;
    work_item_statuses?: Array<{
      id?: string;
      status?: {
        id?: string;
        name?: string;
        type?: string;
        description?: string;
        parent_status_id?: string;
      };
    }>;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} board work item status records found`,
    items.map((item) => ({
      id: item.work_item_record_id,
      workItemId: item.work_item_id,
      projectId: item.project_id,
      statuses: (item.work_item_statuses ?? []).map((statusRecord) => ({
        id: statusRecord.id,
        status: statusRecord.status
          ? {
              id: statusRecord.status.id,
              name: statusRecord.status.name,
              type: statusRecord.status.type,
              description: statusRecord.status.description,
              parentStatusId: statusRecord.status.parent_status_id
            }
          : undefined
      }))
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListBoardWorkItemStatusRecordsClient = {
  listBoardWorkItemStatusRecords: (input: {
    project_id: string;
    page: number;
    page_size: number;
  }) => Promise<{
    records: Array<{
      work_item_record_id?: string;
      work_item_id?: string;
      project_id?: string;
      work_item_statuses?: Array<{
        id?: string;
        status?: {
          id?: string;
          name?: string;
          type?: string;
          description?: string;
          parent_status_id?: string;
        };
      }>;
    }>;
    total?: number;
  }>;
};

export function createReqListBoardWorkItemStatusRecordsHandler(
  client: ReqListBoardWorkItemStatusRecordsClient
) {
  return async (input: unknown) => {
    const parsed = reqListBoardWorkItemStatusRecordsInput.parse(input);
    const response = await client.listBoardWorkItemStatusRecords(parsed);
    const result = mapReqBoardWorkItemStatusRecords(
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
            {
              label: "statusCount",
              get: (item) => (item as { statuses?: unknown[] }).statuses?.length
            }
          ]
        })
      : formatProjectScopedEmptyText({
          summary: result.summary,
          page: parsed.page,
          projectId: parsed.project_id,
          resourceLabel: "board work item status records",
          serviceLabel: "Req / ProjectMan"
        });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
