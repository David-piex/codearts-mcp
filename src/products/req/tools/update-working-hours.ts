import { asItemResult } from "../../../contracts/tool-result.js";
import { reqUpdateWorkingHoursInput } from "../schemas.js";

type WorkingHourRecord = {
  id?: string | number;
  issueId?: string | number;
  issue_id?: string | number;
  userId?: string;
  user_id?: string;
  userNumId?: string | number;
  user_num_id?: string | number;
  userName?: string;
  user_name?: string;
  nickName?: string;
  nick_name?: string;
  summary?: string;
  workDate?: string;
  work_date?: string;
  workDateTimestamp?: string | number;
  work_date_timestamp?: string | number;
  workHours?: string | number;
  work_hours?: string | number;
  status?: number;
  region?: string;
  workHourTypeId?: number;
  work_hour_type_id?: number;
  workHourTypeName?: string;
  work_hour_type_name?: string;
};

type ReqUpdateWorkingHoursClient = {
  updateWorkingHours: (input: {
    project_id: string;
    issue_id: string;
    work_hours_id: string;
    summary?: string;
    work_hours?: number;
    work_hour_type?: number;
  }) => Promise<{
    total?: number;
    work_hours: WorkingHourRecord[];
  }>;
};

export function mapUpdatedWorkingHours(input: {
  project_id: string;
  issue_id: string;
  work_hours_id: string;
  total?: number;
  work_hours: WorkingHourRecord[];
}) {
  return asItemResult(`Updated work hour ${input.work_hours_id}`, {
    projectId: input.project_id,
    issueId: input.issue_id,
    workHoursId: input.work_hours_id,
    total: input.total,
    workHours: input.work_hours.map((item) => ({
      id: typeof item.id === "undefined" ? undefined : String(item.id),
      issueId: typeof (item.issueId ?? item.issue_id) === "undefined" ? undefined : String(item.issueId ?? item.issue_id),
      summary: item.summary,
      workDate: item.workDate ?? item.work_date,
      workDateTimestamp:
        typeof (item.workDateTimestamp ?? item.work_date_timestamp) === "undefined"
          ? undefined
          : String(item.workDateTimestamp ?? item.work_date_timestamp),
      workHours: typeof (item.workHours ?? item.work_hours) === "undefined" ? undefined : String(item.workHours ?? item.work_hours),
      status: item.status,
      region: item.region,
      workHourTypeId: item.workHourTypeId ?? item.work_hour_type_id,
      workHourTypeName: item.workHourTypeName ?? item.work_hour_type_name,
      author:
        item.userId || item.user_id || item.userNumId || item.user_num_id || item.userName || item.user_name || item.nickName || item.nick_name
          ? {
              userId: item.userId ?? item.user_id,
              userNumId: item.userNumId ?? item.user_num_id,
              userName: item.userName ?? item.user_name,
              nickName: item.nickName ?? item.nick_name
            }
          : undefined
    })),
    executed: true
  });
}

export function previewUpdateWorkingHours(input: {
  project_id: string;
  issue_id: string;
  work_hours_id: string;
  summary?: string;
  work_hours?: number;
  work_hour_type?: number;
}) {
  return asItemResult(`Dry run: update work hour ${input.work_hours_id}`, {
    projectId: input.project_id,
    issueId: input.issue_id,
    workHoursId: input.work_hours_id,
    summary: input.summary,
    workHours: input.work_hours,
    workHourType: input.work_hour_type,
    executed: false
  });
}

export function createReqUpdateWorkingHoursHandler(client: ReqUpdateWorkingHoursClient) {
  return async (input: unknown) => {
    const parsed = reqUpdateWorkingHoursInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdateWorkingHours(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateWorkingHours(parsed);
    const result = mapUpdatedWorkingHours({
      project_id: parsed.project_id,
      issue_id: parsed.issue_id,
      work_hours_id: parsed.work_hours_id,
      total: response.total,
      work_hours: response.work_hours
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
