import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestDesignTestcaseInput } from "../schemas.js";

type TestPlanGetTestDesignTestcaseClient = {
  getTestDesignTestcase: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    case_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestDesignTestcaseHandler(
  client: TestPlanGetTestDesignTestcaseClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestDesignTestcaseInput.parse(input);
    const response = await client.getTestDesignTestcase(parsed);
    const result = asItemResult(`Loaded test design testcase ${response.name ?? response.case_id}`, {
      id: response.case_id,
      testcaseId: response.case_id,
      name: response.name,
      testcase: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
