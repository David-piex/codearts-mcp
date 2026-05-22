import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanCountMindmapsInput } from "../schemas.js";

type Client = {
  countMindmaps: (input: {
    project_id: string;
    parent_folder_id_collection?: string[];
    project_type?: string;
    folder_root_id?: string;
    branch_uri?: string;
    iterator_uri?: string;
    is_master?: number;
    upward_recursion?: boolean;
  }) => Promise<{
    counts: Record<string, unknown>;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCountMindmapsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanCountMindmapsInput.parse(input);
    const response = await client.countMindmaps(parsed);
    const result = asItemResult(`Loaded TestPlan mindmap counts for ${parsed.project_id}`, {
      id: parsed.project_id,
      projectId: parsed.project_id,
      counts: response.counts,
      response: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
