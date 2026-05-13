import { testPlanGetApiTestPackageChargeMessageInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetApiTestPackageChargeMessageClient = {
  getApiTestPackageChargeMessage: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetApiTestPackageChargeMessageHandler(
  client: TestPlanGetApiTestPackageChargeMessageClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestPackageChargeMessageInput.parse(input);
    const response = await client.getApiTestPackageChargeMessage(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test package charge message for project ${parsed.project_id}`,
      parsed.project_id,
      "message",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
