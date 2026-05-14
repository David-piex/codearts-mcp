import { testPlanGetMindmapPermissionInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  getMindmapPermission: (input: { project_id: string; id: string }) => Promise<{
    id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetMindmapPermissionHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetMindmapPermissionInput.parse(input);
    const response = await client.getMindmapPermission(parsed);
    const result = mapTestPlanValueItem(
      `Loaded mindmap permission ${parsed.id}`,
      parsed.id,
      "permission",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
