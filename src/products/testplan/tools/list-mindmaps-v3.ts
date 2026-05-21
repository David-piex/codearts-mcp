import { testPlanListMindmapsV3Input } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listMindmapsV3: (input: {
    project_id: string;
    page: number;
    page_size: number;
    name?: string;
    id_collection?: string[];
    folder_id_collection?: string[];
    folder_root_id?: string;
    creator_name_collection?: string[];
    updater_name_collection?: string[];
    branch_uri?: string;
    iterator_uri?: string;
    is_master?: number;
    confidentiality_code_collection?: string[];
  }) => Promise<{
    mindmaps: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListMindmapsV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListMindmapsV3Input.parse(input);
    const response = await client.listMindmapsV3(parsed);
    const result = mapTestPlanRecordList(
      response.mindmaps,
      response.total,
      "TestPlan v3 mindmaps",
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
