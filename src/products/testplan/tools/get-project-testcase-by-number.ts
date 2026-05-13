import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectTestcaseByNumberInput } from "../schemas.js";

export function mapTestPlanProjectTestcaseByNumber(input: {
  case_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded project testcase ${input.name ?? input.case_id}`, {
    id: input.case_id,
    caseId: input.case_id,
    name: input.name,
    testcase: input.raw
  });
}

type TestPlanGetProjectTestcaseByNumberClient = {
  getProjectTestcaseByNumber: (input: {
    project_id: string;
    testcase_number: string;
    version_uri?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectTestcaseByNumberHandler(
  client: TestPlanGetProjectTestcaseByNumberClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectTestcaseByNumberInput.parse(input);
    const response = await client.getProjectTestcaseByNumber(parsed);
    const result = mapTestPlanProjectTestcaseByNumber(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
