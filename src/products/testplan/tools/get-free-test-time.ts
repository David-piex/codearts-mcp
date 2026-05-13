import { testPlanGetFreeTestTimeInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getFreeTestTime: (input: { testServiceId: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetFreeTestTimeHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetFreeTestTimeInput.parse(input);
    const response = await client.getFreeTestTime(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded free test time for ${parsed.testServiceId}`,
      parsed.testServiceId,
      "freeTestTime",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
