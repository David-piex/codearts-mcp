import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestcaseScriptDetailV4Input } from "../schemas.js";

type Client = {
  getTestcaseScriptDetailV4: (input: {
    project_id: string;
    tmss_case_uri: string;
    task_id?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseScriptDetailV4Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseScriptDetailV4Input.parse(input);
    const response = await client.getTestcaseScriptDetailV4(parsed);
    const result = asItemResult(`Loaded v4 testcase script detail ${response.case_id}`, {
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
