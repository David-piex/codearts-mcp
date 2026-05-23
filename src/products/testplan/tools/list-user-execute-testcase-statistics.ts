import { testPlanListUserExecuteTestcaseStatisticsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listUserExecuteTestcaseStatistics: (input: {
    project_id: string;
    offset: number;
    limit: number;
    execute_start_time: string;
    execute_end_time: string;
    [key: string]: unknown;
  }) => Promise<{
    statistics: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListUserExecuteTestcaseStatisticsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListUserExecuteTestcaseStatisticsInput.parse(input);
    const response = await client.listUserExecuteTestcaseStatistics(parsed);
    const page = Math.floor(parsed.offset / parsed.limit) + 1;
    const result = mapTestPlanRecordList(
      response.statistics,
      response.total,
      "TestPlan user execute testcase statistics",
      "statistic",
      page,
      parsed.limit
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        statistics: response.raw
      }
    };
  };
}
