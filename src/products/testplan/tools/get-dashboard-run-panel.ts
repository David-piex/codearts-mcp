import { testPlanGetDashboardRunPanelInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetDashboardRunPanelClient = {
  getDashboardRunPanel: (input: { service_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetDashboardRunPanelHandler(
  client: TestPlanGetDashboardRunPanelClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetDashboardRunPanelInput.parse(input);
    const response = await client.getDashboardRunPanel(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded dashboard run panel for ${parsed.service_id}`,
      parsed.service_id,
      "panel",
      response.raw,
      { serviceId: parsed.service_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
