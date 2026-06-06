import { testPlanListScenesPageInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listScenesPage: (input: {
    project_id: string;
    page: number;
    page_size: number;
    offset?: number;
    deleted?: string;
    mindmap_id?: string;
    node_id?: string;
  }) => Promise<{
    scenes: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListScenesPageHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListScenesPageInput.parse(input);
    const response = await client.listScenesPage(parsed);
    const result = mapTestPlanRecordList(
      response.scenes,
      response.total,
      "TestPlan scenes",
      "scene",
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
