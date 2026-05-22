import { asItemResult } from "../../../contracts/tool-result.js";
import { formatItemToolText } from "../../../contracts/tool-result-text.js";
import { reqGetWorkItemInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";
import {
  mapReqWorkItemAssignee,
  type ReqWorkItemAssignee
} from "./work-item-assignee.js";

type ReqWorkItem = {
  [key: string]: unknown;
  id: number | string;
  subject?: string;
  name?: string;
  status?: { name?: string };
  tracker?: { name?: string };
  tracker_name?: string;
  description?: string;
  created_on?: string | number;
  created_time?: string | number;
  updated_on?: string | number;
  updated_time?: string | number;
  start_date?: string | number;
  due_date?: string | number;
  begin_time?: string | number;
  end_time?: string | number;
  assigned_to?: ReqWorkItemAssignee;
  assigned_user?: ReqWorkItemAssignee;
  assigned_id?: string;
  assigned_to_id?: number | string;
};

export function mapReqWorkItem(input: ReqWorkItem) {
  const assignee = mapReqWorkItemAssignee(input);
  const assigneeText = assignee?.displayName ? ` (assignee: ${assignee.displayName})` : "";
  const createdOn = input.created_on ?? input.created_time;
  const updatedOn = input.updated_on ?? input.updated_time;
  const startDate = input.start_date ?? input.begin_time;
  const dueDate = input.due_date ?? input.end_time;

  return asItemResult(`Loaded work item ${input.id}${assigneeText}`, {
    id: String(input.id),
    title: input.subject ?? input.name ?? "",
    status: input.status?.name,
    type: input.tracker_name ?? input.tracker?.name,
    description: input.description,
    createdOn,
    createdOnText: formatReqTimestampText(createdOn),
    updatedOn,
    updatedOnText: formatReqTimestampText(updatedOn),
    startDate,
    startDateText: formatReqTimestampText(startDate),
    dueDate,
    dueDateText: formatReqTimestampText(dueDate),
    assignee,
    assignedToName: assignee?.displayName,
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
