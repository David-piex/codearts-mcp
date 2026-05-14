import { testPlanGetFunctionalTestParallelSummaryInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getFunctionalTestParallelSummary: (input: Record<string, never>) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetFunctionalTestParallelSummaryHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetFunctionalTestParallelSummaryInput.parse(input);
    const response = await client.getFunctionalTestParallelSummary(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded functional test parallel summary",
      "functional-test-parallel-summary",
      "summary",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
