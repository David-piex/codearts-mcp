import { testPlanGetApiTestPackageChargePopupInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetApiTestPackageChargePopupClient = {
  getApiTestPackageChargePopup: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetApiTestPackageChargePopupHandler(
  client: TestPlanGetApiTestPackageChargePopupClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestPackageChargePopupInput.parse(input);
    const response = await client.getApiTestPackageChargePopup(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test package charge popup for project ${parsed.project_id}`,
      parsed.project_id,
      "popup",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
