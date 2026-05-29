import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestcaseDatasetInput } from "../schemas.js";

type Client = {
  getTestcaseDataset: (input: {
    project_id: string;
    case_uri: string;
    group_id: string;
  }) => Promise<{
    case_uri: string;
    group_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseDatasetHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseDatasetInput.parse(input);
    const response = await client.getTestcaseDataset(parsed);
    const result = asItemResult(`Loaded TestPlan testcase dataset for ${response.case_uri}`, {
      id: response.case_uri,
      caseUri: response.case_uri,
      groupId: response.group_id,
      dataset: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
