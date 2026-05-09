import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTesthubCaseInput } from "../schemas.js";

export function mapTestPlanTesthubCase(input: {
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

type TestPlanGetTesthubCaseClient = {
  getTesthubCase: (input: {
    project_id: string;
    case_uri: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTesthubCaseHandler(client: TestPlanGetTesthubCaseClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetTesthubCaseInput.parse(input);
    const response = await client.getTesthubCase(parsed);
    const result = mapTestPlanTesthubCase(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
