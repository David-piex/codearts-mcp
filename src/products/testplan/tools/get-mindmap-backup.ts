import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetMindmapBackupInput } from "../schemas.js";

type TestPlanGetMindmapBackupClient = {
  getMindmapBackup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    backup_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetMindmapBackupHandler(client: TestPlanGetMindmapBackupClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetMindmapBackupInput.parse(input);
    const response = await client.getMindmapBackup(parsed);
    const result = asItemResult(`Loaded mindmap backup ${response.name ?? response.backup_id}`, {
      id: response.backup_id,
      backupId: response.backup_id,
      name: response.name,
      backup: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
