import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetExcelErrorTestcasesInput } from "../schemas.js";

type Client = {
  getExcelErrorTestcases: (input: {
    project_id: string;
    error_id: string;
  }) => Promise<{
    error_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetExcelErrorTestcasesHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetExcelErrorTestcasesInput.parse(input);
    const response = await client.getExcelErrorTestcases(parsed);
    const result = asItemResult(`Loaded TestPlan Excel error testcases for ${response.error_id}`, {
      id: response.error_id,
      errorId: response.error_id,
      errorTestcases: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
