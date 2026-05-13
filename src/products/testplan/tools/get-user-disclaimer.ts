import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetUserDisclaimerInput } from "../schemas.js";

export function mapTestPlanUserDisclaimer(input: {
  type: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded user disclaimer record for ${input.type}`, {
    id: input.type,
    type: input.type,
    value: input.value,
    disclaimer: input.raw
  });
}

type TestPlanGetUserDisclaimerClient = {
  getUserDisclaimer: (input: {
    type: string;
  }) => Promise<{
    type: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetUserDisclaimerHandler(
  client: TestPlanGetUserDisclaimerClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetUserDisclaimerInput.parse(input);
    const response = await client.getUserDisclaimer(parsed);
    const result = mapTestPlanUserDisclaimer(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
