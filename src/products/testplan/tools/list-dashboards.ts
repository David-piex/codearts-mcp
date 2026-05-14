import { testPlanListDashboardsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listDashboards: (input: {
    service_id: string;
    name?: string;
    page: number;
    page_size: number;
  }) => Promise<{ dashboards: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListDashboardsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListDashboardsInput.parse(input);
    const response = await client.listDashboards(parsed);
    const result = mapTestPlanRecordList(
      response.dashboards,
      response.total,
      "dashboards",
      "dashboard",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
