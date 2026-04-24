import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { reqListProjectWorkHoursInput } from "../schemas.js";

export function mapReqProjectWorkHours(
  items: Array<{
    issue_id?: number | string;
    issue_type?: string;
    subject?: string;
    project_name?: string;
    user_id?: string;
    user_name?: string;
    nick_name?: string;
    work_date?: string;
    work_hours_num?: string | number;
    summary?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} project work hours found`,
    items.map((item) => ({
      issueId: typeof item.issue_id !== "undefined" ? String(item.issue_id) : undefined,
      issueType: item.issue_type,
      title: item.subject,
      projectName: item.project_name,
      workDate: item.work_date,
      workHours:
        typeof item.work_hours_num !== "undefined" ? String(item.work_hours_num) : undefined,
      summary: item.summary,
      author:
        item.user_id || item.user_name || item.nick_name
          ? {
              userId: item.user_id,
              userName: item.user_name,
              nickName: item.nick_name
            }
          : undefined
    })),
    toPageInfo(page, pageSize, total)
  );
}

type ReqListProjectWorkHoursClient = {
  listProjectWorkHours: (input: {
    page: number;
    page_size: number;
    project_ids: string[];
    begin_time?: string;
    end_time?: string;
    work_hours_dates?: string;
    work_hours_types?: string;
  }) => Promise<{
    work_hours: Array<{
      issue_id?: number | string;
      issue_type?: string;
      subject?: string;
      project_name?: string;
      user_id?: string;
      user_name?: string;
      nick_name?: string;
      work_date?: string;
      work_hours_num?: string | number;
      summary?: string;
    }>;
    total?: number;
  }>;
};

export function createReqListProjectWorkHoursHandler(client: ReqListProjectWorkHoursClient) {
  return async (input: unknown) => {
    const parsed = reqListProjectWorkHoursInput.parse(input);
    const response = await client.listProjectWorkHours(parsed);
    const result = mapReqProjectWorkHours(
      response.work_hours,
      parsed.page,
      parsed.page_size,
      response.total
    );
    const text = formatListToolText(result, {
      fields: [
        { label: "issueId", get: (item) => (item as { issueId?: string }).issueId },
        { label: "title", get: (item) => (item as { title?: string }).title },
        { label: "workDate", get: (item) => (item as { workDate?: string }).workDate },
        { label: "workHours", get: (item) => (item as { workHours?: string }).workHours }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
