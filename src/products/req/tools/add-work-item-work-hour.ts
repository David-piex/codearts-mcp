import { asItemResult } from "../../../contracts/tool-result.js";
import { reqAddWorkItemWorkHourInput } from "../schemas.js";

export function previewAddWorkItemWorkHour(input: {
  project_id: string;
  work_item_id: string;
  work_hours: number;
  start_date?: string;
  due_date?: string;
  start_date_timestamp?: string | number;
  due_date_timestamp?: string | number;
  region?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: add work hour to work item ${input.work_item_id}`, {
    projectId: input.project_id,
    workItemId: input.work_item_id,
    workHours: input.work_hours,
    startDate: input.start_date,
    dueDate: input.due_date,
    startDateTimestamp: input.start_date_timestamp,
    dueDateTimestamp: input.due_date_timestamp,
    region: input.region,
    executed: false
  });
}

export function mapAddedWorkItemWorkHour(input: {
  id: number | string;
  work_item_id: string | number;
  work_date?: string;
  work_date_timestamp?: string | number;
  work_hours?: string | number;
  region?: string;
  user_id?: string;
  user_num_id?: number;
  user_name?: string;
  nick_name?: string;
}) {
  return asItemResult(`Added work hour to work item ${input.work_item_id}`, {
    id: String(input.id),
    workItemId: String(input.work_item_id),
    workDate: input.work_date,
    workDateTimestamp:
      typeof input.work_date_timestamp !== "undefined"
        ? String(input.work_date_timestamp)
        : undefined,
    workHours: typeof input.work_hours !== "undefined" ? String(input.work_hours) : undefined,
    region: input.region,
    author:
      input.user_id || input.user_num_id || input.user_name || input.nick_name
        ? {
            userId: input.user_id,
            userNumId: input.user_num_id,
            userName: input.user_name,
            nickName: input.nick_name
          }
        : undefined,
    executed: true
  });
}

type ReqAddWorkItemWorkHourClient = {
  addWorkItemWorkHour: (input: {
    project_id: string;
    work_item_id: string;
    work_hours: number;
    start_date?: string;
    due_date?: string;
    start_date_timestamp?: string | number;
    due_date_timestamp?: string | number;
    use_timestamp?: boolean;
    region?: string;
  }) => Promise<{
    id: number | string;
    work_item_id: string | number;
    work_date?: string;
    work_date_timestamp?: string | number;
    work_hours?: string | number;
    region?: string;
    user_id?: string;
    user_num_id?: number;
    user_name?: string;
    nick_name?: string;
  }>;
};

export function createReqAddWorkItemWorkHourHandler(client: ReqAddWorkItemWorkHourClient) {
  return async (input: unknown) => {
    const parsed = reqAddWorkItemWorkHourInput.parse(input);

    if (parsed.dry_run) {
      const result = previewAddWorkItemWorkHour(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.addWorkItemWorkHour(parsed);
    const result = mapAddedWorkItemWorkHour(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
