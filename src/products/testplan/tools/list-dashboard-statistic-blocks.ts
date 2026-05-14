import { testPlanListDashboardStatisticBlocksInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listDashboardStatisticBlocks: (input: {
    service_id: string;
    start_time: number;
    end_time: number;
    executor_type?: string;
    label: string;
    location_id?: string;
    page: number;
    page_size: number;
  }) => Promise<{ blocks: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListDashboardStatisticBlocksHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListDashboardStatisticBlocksInput.parse(input);
    const response = await client.listDashboardStatisticBlocks(parsed);
    const result = mapTestPlanRecordList(
      response.blocks,
      response.total,
      "dashboard statistic blocks",
      "block",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
