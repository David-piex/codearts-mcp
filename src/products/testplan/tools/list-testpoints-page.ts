import { testPlanListTestpointsPageInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listTestpointsPage: (input: {
    project_id: string;
    page: number;
    page_size: number;
    offset?: number;
    deleted?: string;
    mindmap_id?: string;
    node_id?: string;
  }) => Promise<{
    testpoints: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListTestpointsPageHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTestpointsPageInput.parse(input);
    const response = await client.listTestpointsPage(parsed);
    const result = mapTestPlanRecordList(
      response.testpoints,
      response.total,
      "TestPlan testpoints",
      "testpoint",
      parsed.page,
      parsed.page_size
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: {
        ...result,
        response: response.raw
      }
    };
  };
}
