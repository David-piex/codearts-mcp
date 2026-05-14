import { testPlanGetMindmapCreatorNameInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type Client = {
  getMindmapCreatorName: (input: { project_id: string }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetMindmapCreatorNameHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetMindmapCreatorNameInput.parse(input);
    const response = await client.getMindmapCreatorName(parsed);
    const result = mapTestPlanValueItem(
      `Loaded mindmap creator name for ${parsed.project_id}`,
      parsed.project_id,
      "creator",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
