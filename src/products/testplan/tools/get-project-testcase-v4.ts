import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectTestcaseV4Input } from "../schemas.js";

export function mapTestPlanProjectTestcaseV4(input: {
  case_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded project v4 testcase ${input.name ?? input.case_id}`, {
    id: input.case_id,
    caseId: input.case_id,
    name: input.name,
    testcase: input.raw
  });
}

type TestPlanGetProjectTestcaseV4Client = {
  getProjectTestcaseV4: (input: {
    project_id: string;
    testcase_uri: string;
    plan_id?: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectTestcaseV4Handler(
  client: TestPlanGetProjectTestcaseV4Client
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectTestcaseV4Input.parse(input);
    const response = await client.getProjectTestcaseV4(parsed);
    const result = mapTestPlanProjectTestcaseV4(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
