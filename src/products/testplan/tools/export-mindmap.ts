import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanExportMindmapInput } from "../schemas.js";

export function mapTestPlanExportMindmap(input: {
  mindmap_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded mindmap export metadata ${input.name ?? input.mindmap_id}`, {
    id: input.mindmap_id,
    mindmapId: input.mindmap_id,
    name: input.name,
    export: input.raw
  });
}

type TestPlanExportMindmapClient = {
  exportMindmap: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    mindmap_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanExportMindmapHandler(client: TestPlanExportMindmapClient) {
  return async (input: unknown) => {
    const parsed = testPlanExportMindmapInput.parse(input);
    const response = await client.exportMindmap(parsed);
    const result = mapTestPlanExportMindmap(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
