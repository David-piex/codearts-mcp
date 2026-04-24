import { asListResult } from "../../../contracts/tool-result.js";
import { formatListToolText } from "../../../contracts/tool-result-text.js";
import { reqListProjectBugStatisticsInput } from "../schemas.js";

type ReqBugStatistic = {
  module?: string;
  total?: number;
  critical_num?: number;
  serious_num?: number;
  normal_num?: number;
  tip_num?: number;
  defect_index?: number;
};

type ReqProjectBugStatistics = {
  project_id: string;
  bug_statistics: ReqBugStatistic[];
};

export function mapReqProjectBugStatistics(input: ReqProjectBugStatistics) {
  return asListResult(
    `${input.bug_statistics.length} project bug statistics found`,
    input.bug_statistics.map((item) => ({
      module: item.module,
      total: item.total,
      criticalNum: item.critical_num,
      seriousNum: item.serious_num,
      normalNum: item.normal_num,
      tipNum: item.tip_num,
      defectIndex: item.defect_index
    }))
  );
}

type ReqListProjectBugStatisticsClient = {
  listProjectBugStatistics: (input: {
    project_id: string;
  }) => Promise<ReqProjectBugStatistics>;
};

export function createReqListProjectBugStatisticsHandler(
  client: ReqListProjectBugStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = reqListProjectBugStatisticsInput.parse(input);
    const response = await client.listProjectBugStatistics(parsed);
    const result = mapReqProjectBugStatistics(response);
    const text = formatListToolText(result, {
      fields: [
        { label: "module", get: (item) => (item as { module?: string }).module },
        { label: "total", get: (item) => (item as { total?: number }).total },
        {
          label: "critical",
          get: (item) => (item as { criticalNum?: number }).criticalNum
        },
        { label: "normal", get: (item) => (item as { normalNum?: number }).normalNum }
      ]
    });

    return {
      content: [{ type: "text" as const, text }],
      structuredContent: result
    };
  };
}
