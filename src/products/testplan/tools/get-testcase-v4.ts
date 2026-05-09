import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestcaseV4Input } from "../schemas.js";

export function mapTestPlanTestcaseV4(input: {
  case_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded testcase ${input.name ?? input.case_id}`, {
    id: input.case_id,
    caseId: input.case_id,
    name: input.name,
    testcase: input.raw
  });
}

type TestPlanGetTestcaseV4Client = {
  getTestcaseV4: (input: {
    project_uuid: string;
    version_uri: string;
    case_uri: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseV4Handler(client: TestPlanGetTestcaseV4Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseV4Input.parse(input);
    const response = await client.getTestcaseV4(parsed);
    const result = mapTestPlanTestcaseV4(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
