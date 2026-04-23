import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListIterationStatusStatisticsInput } from "../schemas.js";

type ReqListIterationStatusStatisticsInputValue = {
  project_id: string;
  iteration_id: string;
  tracker_id?: number;
  status_id?: number;
};

type ReqIterationStatusStatistic = {
  user?: {
    id?: number;
    name?: string;
    nick_name?: string;
    user_id?: string;
    user_num_id?: number;
    first_name?: string;
  };
  item_count?: number;
  data?: Record<string, number>;
};

export function mapReqIterationStatusStatistics(items: ReqIterationStatusStatistic[]) {
  return asListResult(
    `${items.length} iteration status statistics found`,
    items.map((item) => ({
      user: item.user
        ? {
            id: item.user.id,
            name: item.user.name,
            nickName: item.user.nick_name,
            userId: item.user.user_id,
            userNumId: item.user.user_num_id,
            firstName: item.user.first_name
          }
        : undefined,
      itemCount: item.item_count ?? 0,
      data: item.data ?? {}
    }))
  );
}

type ReqListIterationStatusStatisticsClient = {
  listIterationStatusStatistics: (input: ReqListIterationStatusStatisticsInputValue) => Promise<{
    statistics: ReqIterationStatusStatistic[];
  }>;
};

export function createReqListIterationStatusStatisticsHandler(
  client: ReqListIterationStatusStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = reqListIterationStatusStatisticsInput.parse(
      input
    ) as ReqListIterationStatusStatisticsInputValue;
    const response = await client.listIterationStatusStatistics(parsed);
    const result = mapReqIterationStatusStatistics(response.statistics);
    const text = formatListToolText(result, {
      fields: [
        {
          label: "user",
          get: (item) =>
            (item as { user?: { nickName?: string; name?: string; userId?: string } }).user?.nickName ??
            (item as { user?: { nickName?: string; name?: string; userId?: string } }).user?.name ??
            (item as { user?: { nickName?: string; name?: string; userId?: string } }).user?.userId
        },
        { label: "itemCount", get: (item) => (item as { itemCount?: number }).itemCount },
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
