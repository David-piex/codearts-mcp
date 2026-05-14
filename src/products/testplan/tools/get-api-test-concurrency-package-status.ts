import { testPlanGetApiTestConcurrencyPackageStatusInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getApiTestConcurrencyPackageStatus: (input: {
    test_type?: string;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetApiTestConcurrencyPackageStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestConcurrencyPackageStatusInput.parse(input);
    const response = await client.getApiTestConcurrencyPackageStatus(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test concurrency package status${parsed.test_type ? ` for ${parsed.test_type}` : ""}`,
      parsed.test_type ?? "concurrency",
      "status",
      response.raw,
      { testType: parsed.test_type }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
