import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetMindmapRecycleInput } from "../schemas.js";

type TestPlanGetMindmapRecycleClient = {
  getMindmapRecycle: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    recycle_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetMindmapRecycleHandler(client: TestPlanGetMindmapRecycleClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetMindmapRecycleInput.parse(input);
    const response = await client.getMindmapRecycle(parsed);
    const result = asItemResult(`Loaded mindmap recycle ${response.name ?? response.recycle_id}`, {
      id: response.recycle_id,
      recycleId: response.recycle_id,
      name: response.name,
      recycle: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
