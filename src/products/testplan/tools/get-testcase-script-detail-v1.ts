import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestcaseScriptDetailV1Input } from "../schemas.js";

type Client = {
  getTestcaseScriptDetailV1: (input: {
    project_id: string;
    tmss_case_uri: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseScriptDetailV1Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseScriptDetailV1Input.parse(input);
    const response = await client.getTestcaseScriptDetailV1(parsed);
    const result = asItemResult(`Loaded v1 testcase script detail ${response.case_id}`, {
      id: response.case_id,
      caseId: response.case_id,
      name: response.name,
      testcase: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
