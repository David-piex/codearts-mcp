import { testPlanGetFunctionalTestPackageStatusInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getFunctionalTestPackageStatus: (input: Record<string, never>) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetFunctionalTestPackageStatusHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetFunctionalTestPackageStatusInput.parse(input);
    const response = await client.getFunctionalTestPackageStatus(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded functional test package status",
      "functional-test-package-status",
      "status",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
