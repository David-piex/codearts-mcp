import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetFactorInput } from "../schemas.js";

type TestPlanGetFactorClient = {
  getFactor: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    factor_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetFactorHandler(client: TestPlanGetFactorClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetFactorInput.parse(input);
    const response = await client.getFactor(parsed);
    const result = asItemResult(`Loaded factor ${response.name ?? response.factor_id}`, {
      id: response.factor_id,
      factorId: response.factor_id,
      name: response.name,
      factor: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
