import { testPlanListMindmapBackupsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listMindmapBackups: (input: {
    project_id: string;
    page: number;
    page_size: number;
    mindmap_id?: string;
    bak_name?: string;
    type?: string;
  }) => Promise<{
    backups: Array<Record<string, unknown>>;
    total?: number;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanListMindmapBackupsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListMindmapBackupsInput.parse(input);
    const response = await client.listMindmapBackups(parsed);
    const result = mapTestPlanRecordList(
      response.backups,
      response.total,
      "TestPlan mindmap backups",
      "backup",
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
