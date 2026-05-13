import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanCheckUserExistsInput } from "../schemas.js";

export function mapTestPlanCheckUserExists(input: {
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult("Loaded TestPlan user existence status", {
    id: "current-user",
    value: input.value,
    user: input.raw
  });
}

type TestPlanCheckUserExistsClient = {
  checkUserExists: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanCheckUserExistsHandler(client: TestPlanCheckUserExistsClient) {
  return async (input: unknown) => {
    testPlanCheckUserExistsInput.parse(input);
    const response = await client.checkUserExists();
    const result = mapTestPlanCheckUserExists(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
