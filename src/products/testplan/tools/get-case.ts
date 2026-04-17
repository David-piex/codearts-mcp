import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetCaseInput } from "../schemas.js";

export function mapTestPlanCase(input: {
  case_id: string;
  name: string;
  result?: string;
  status?: string;
  test_type?: string;
}) {
  return asItemResult(`Loaded test case ${input.name}`, {
    id: input.case_id,
    name: input.name,
    result: input.result,
    status: input.status,
    testType: input.test_type
  });
}

type TestPlanGetCaseClient = {
  getCase: (input: { project_id: string; case_id: string }) => Promise<{
    case_id: string;
    name: string;
    result?: string;
    status?: string;
    test_type?: string;
  }>;
};

export function createTestPlanGetCaseHandler(client: TestPlanGetCaseClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetCaseInput.parse(input);
    const response = await client.getCase(parsed);
    const result = mapTestPlanCase(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
