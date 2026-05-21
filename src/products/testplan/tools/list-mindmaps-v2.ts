import { testPlanListMindmapsV2Input } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listMindmapsV2: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    id_collection?: string[];
    folder_id_collection?: string[];
    folder_root_id?: string;
    creator_name_collection?: string[];
    updater_name_collection?: string[];
  }) => Promise<{
    mindmaps: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListMindmapsV2Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListMindmapsV2Input.parse(input);
    const response = await client.listMindmapsV2(parsed);
    const result = mapTestPlanRecordList(
      response.mindmaps,
      response.total,
      "TestPlan mindmaps",
      "mindmap",
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
