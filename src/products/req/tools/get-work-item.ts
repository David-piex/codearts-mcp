import { asItemResult } from "../../../contracts/tool-result.js";
import { formatItemToolText } from "../../../contracts/tool-result-text.js";
import { reqGetWorkItemInput } from "../schemas.js";
import type { ReqWorkItemAssignee } from "./work-item-assignee.js";
import {
  mapReqWorkItemSummaryFields,
  type ReqWorkItemSummarySource
} from "./work-item-summary.js";

type ReqWorkItem = ReqWorkItemSummarySource & {
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
};

export function mapReqWorkItem(input: ReqWorkItem) {
  const summaryFields = mapReqWorkItemSummaryFields(input);
  const assigneeText = summaryFields.assignedToName ? ` (assignee: ${summaryFields.assignedToName})` : "";

  return asItemResult(`Loaded work item ${input.id}${assigneeText}`, {
    ...summaryFields,
    rawWorkItem: input
  }, input);
}

type ReqGetWorkItemClient = {
  getWorkItem: (input: { project_id: string; work_item_id: string }) => Promise<ReqWorkItem>;
};

export function createReqGetWorkItemHandler(client: ReqGetWorkItemClient) {
  return async (input: unknown) => {
    const parsed = reqGetWorkItemInput.parse(input);
    const response = await client.getWorkItem(parsed);
    const result = mapReqWorkItem(response);
    const text = formatItemToolText(result, {
      fields: [
        { label: "id", get: (item) => item.id },
        { label: "title", get: (item) => item.title },
        { label: "status", get: (item) => item.status },
        { label: "type", get: (item) => item.type },
        { label: "assignee", get: (item) => item.assignedToName },
        { label: "priority", get: (item) => item.priorityName },
        { label: "severity", get: (item) => item.severityName },
        { label: "module", get: (item) => item.moduleName },
        { label: "domain", get: (item) => item.domainName },
        { label: "fixedVersion", get: (item) => item.fixedVersionName },
        { label: "doneRatio", get: (item) => item.doneRatio },
        { label: "description", get: (item) => item.description },
        { label: "createdOn", get: (item) => item.createdOnText ?? item.createdOn },
        { label: "updatedOn", get: (item) => item.updatedOnText ?? item.updatedOn },
        { label: "startDate", get: (item) => item.startDateText ?? item.startDate },
        { label: "dueDate", get: (item) => item.dueDateText ?? item.dueDate }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
