import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectTestcaseInput } from "../schemas.js";

export function mapTestPlanProjectTestcase(input: {
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

type TestPlanGetProjectTestcaseClient = {
  getProjectTestcase: (input: {
    project_id: string;
    testcase_id: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectTestcaseHandler(
  client: TestPlanGetProjectTestcaseClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectTestcaseInput.parse(input);
    const response = await client.getProjectTestcase(parsed);
    const result = mapTestPlanProjectTestcase(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
