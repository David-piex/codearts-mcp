import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestcaseScriptDetailV3Input } from "../schemas.js";

type Client = {
  getTestcaseScriptDetailV3: (input: {
    project_id: string;
    tmss_case_uri: string;
    task_id?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseScriptDetailV3Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseScriptDetailV3Input.parse(input);
    const response = await client.getTestcaseScriptDetailV3(parsed);
    const result = asItemResult(`Loaded v3 testcase script detail ${response.case_id}`, {
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
