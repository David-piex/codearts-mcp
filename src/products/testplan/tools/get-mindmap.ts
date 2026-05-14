import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetMindmapInput } from "../schemas.js";

export function mapTestPlanMindmap(input: {
  mindmap_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded mindmap ${input.name ?? input.mindmap_id}`, {
    id: input.mindmap_id,
    mindmapId: input.mindmap_id,
    name: input.name,
    mindmap: input.raw
  });
}

type TestPlanGetMindmapClient = {
  getMindmap: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    mindmap_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetMindmapHandler(client: TestPlanGetMindmapClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetMindmapInput.parse(input);
    const response = await client.getMindmap(parsed);
    const result = mapTestPlanMindmap(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
