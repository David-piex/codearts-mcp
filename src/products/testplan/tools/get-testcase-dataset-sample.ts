import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestcaseDatasetSampleInput } from "../schemas.js";

type Client = {
  getTestcaseDatasetSample: (input: { project_id: string }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseDatasetSampleHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseDatasetSampleInput.parse(input);
    const response = await client.getTestcaseDatasetSample(parsed);
    const result = asItemResult(`Loaded TestPlan testcase dataset sample for ${parsed.project_id}`, {
      id: parsed.project_id,
      projectId: parsed.project_id,
      dataset: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
