import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListWorkItemWorkHoursInput } from "../schemas.js";
import { formatReqTimestampText } from "./time-format.js";

export function mapReqWorkItemWorkHours(
  items: Array<{
    id: number | string;
    work_date?: string;
    work_date_timestamp?: string | number;
    work_hours?: string | number;
    region?: string;
    user_id?: string;
    user_num_id?: number;
    user_name?: string;
    nick_name?: string;
  }>
) {
  return asListResult(
    `${items.length} work item work hours found`,
    items.map((item) => ({
      id: String(item.id),
      workDate: item.work_date,
      workDateTimestamp:
        typeof item.work_date_timestamp !== "undefined"
          ? String(item.work_date_timestamp)
          : undefined,
      workDateText: formatReqTimestampText(item.work_date_timestamp ?? item.work_date),
      workHours: typeof item.work_hours !== "undefined" ? String(item.work_hours) : undefined,
      region: item.region,
      author:
        item.user_id || item.user_num_id || item.user_name || item.nick_name
          ? {
              userId: item.user_id,
              userNumId: item.user_num_id,
              userName: item.user_name,
              nickName: item.nick_name
            }
          : undefined,
      rawWorkHour: item
    }))
  );
}

type ReqListWorkItemWorkHoursClient = {
  listWorkItemWorkHours: (input: {
    project_id: string;
    work_item_id: string;
  }) => Promise<{
    work_hours: Array<{
      id: number | string;
      work_date?: string;
      work_date_timestamp?: string | number;
      work_hours?: string | number;
      region?: string;
      user_id?: string;
      user_num_id?: number;
      user_name?: string;
      nick_name?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListWorkItemWorkHoursHandler(client: ReqListWorkItemWorkHoursClient) {
  return async (input: unknown) => {
    const parsed = reqListWorkItemWorkHoursInput.parse(input);
    const response = await client.listWorkItemWorkHours(parsed);
    const result = mapReqWorkItemWorkHours(response.work_hours);
    const text = formatListToolText(result, {
      fields: [
        { label: "id", get: (item) => (item as { id?: string }).id },
        { label: "workDate", get: (item) => (item as { workDate?: string }).workDate },
        { label: "workHours", get: (item) => (item as { workHours?: string }).workHours },
        {
          label: "author",
          get: (item) => {
            const author = (item as { author?: { userName?: string; nickName?: string } }).author;
            return author?.userName ?? author?.nickName;
          }
        }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
