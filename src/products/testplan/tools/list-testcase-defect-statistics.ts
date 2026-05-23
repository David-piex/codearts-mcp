import { testPlanListTestcaseDefectStatisticsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listTestcaseDefectStatistics: (input: {
    project_id: string;
    offset: number;
    limit: number;
    create_testcase_start_time: string;
    create_testcase_end_time: string;
    branch_id?: string;
    associate_defect_start_time?: string;
    associate_defect_end_time?: string;
    [key: string]: unknown;
  }) => Promise<{
    statistics: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListTestcaseDefectStatisticsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTestcaseDefectStatisticsInput.parse(input);
    const response = await client.listTestcaseDefectStatistics(parsed);
    const page = Math.floor(parsed.offset / parsed.limit) + 1;
    const result = mapTestPlanRecordList(
      response.statistics,
      response.total,
      "TestPlan testcase defect statistics",
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
