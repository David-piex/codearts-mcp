import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTesthubCaseByNumberInput } from "../schemas.js";

export function mapTestPlanTesthubCaseByNumber(input: {
  case_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded testhub testcase ${input.name ?? input.case_id}`, {
    id: input.case_id,
    caseId: input.case_id,
    name: input.name,
    testcase: input.raw
  });
}

type TestPlanGetTesthubCaseByNumberClient = {
  getTesthubCaseByNumber: (input: {
    project_id: string;
    testcase_number: string;
    version_uri?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTesthubCaseByNumberHandler(
  client: TestPlanGetTesthubCaseByNumberClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetTesthubCaseByNumberInput.parse(input);
    const response = await client.getTesthubCaseByNumber(parsed);
    const result = mapTestPlanTesthubCaseByNumber(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
