import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetMindmapStatisticsInput } from "../schemas.js";

type TestPlanGetMindmapStatisticsClient = {
  getMindmapStatistics: (input: {
    project_id: string;
    mindmap_id: string;
  }) => Promise<{
    mindmap_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetMindmapStatisticsHandler(
  client: TestPlanGetMindmapStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetMindmapStatisticsInput.parse(input);
    const response = await client.getMindmapStatistics(parsed);
    const result = asItemResult(`Loaded mindmap statistics for ${response.mindmap_id}`, {
      id: response.mindmap_id,
      mindmapId: response.mindmap_id,
      statistics: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
