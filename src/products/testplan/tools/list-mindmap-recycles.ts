import { testPlanListMindmapRecyclesInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listMindmapRecycles: (input: {
    project_id: string;
    page: number;
    page_size: number;
    creator_num?: string;
    text?: string;
  }) => Promise<{
    recycles: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListMindmapRecyclesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListMindmapRecyclesInput.parse(input);
    const response = await client.listMindmapRecycles(parsed);
    const result = mapTestPlanRecordList(
      response.recycles,
      response.total,
      "TestPlan mindmap recycles",
      "recycle",
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
