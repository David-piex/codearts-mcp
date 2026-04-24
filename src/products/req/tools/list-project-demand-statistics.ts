import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListProjectDemandStatisticsInput } from "../schemas.js";

type ReqDemandStatistic = {
  module?: string;
  total?: number;
  new_num?: number;
  process_num?: number;
  solved_num?: number;
  test_num?: number;
  closed_num?: number;
  rejected_num?: number;
};

export function mapReqProjectDemandStatistics(items: ReqDemandStatistic[]) {
  return asListResult(
    `${items.length} project demand statistics found`,
    items.map((item) => ({
      module: item.module,
      total: item.total,
      newNum: item.new_num,
      processNum: item.process_num,
      solvedNum: item.solved_num,
      testNum: item.test_num,
      closedNum: item.closed_num,
      rejectedNum: item.rejected_num
    }))
  );
}

type ReqListProjectDemandStatisticsClient = {
  listProjectDemandStatistics: (input: { project_id: string }) => Promise<{
    project_id: string;
    demand_statistics: ReqDemandStatistic[];
  }>;
};

export function createReqListProjectDemandStatisticsHandler(
  client: ReqListProjectDemandStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = reqListProjectDemandStatisticsInput.parse(input);
    const response = await client.listProjectDemandStatistics(parsed);
    const result = mapReqProjectDemandStatistics(response.demand_statistics);
    const text = formatListToolText(result, {
      fields: [
        { label: "module", get: (item) => (item as { module?: string }).module },
        { label: "total", get: (item) => (item as { total?: number }).total },
        { label: "new", get: (item) => (item as { newNum?: number }).newNum },
        { label: "process", get: (item) => (item as { processNum?: number }).processNum },
        { label: "closed", get: (item) => (item as { closedNum?: number }).closedNum }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
