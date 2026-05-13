import { testPlanListTimeoutSettingsInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type Client = {
  listTimeoutSettings: (input: {
    project_id: string;
  }) => Promise<{ settings: Array<Record<string, unknown>>; total?: number }>;
};

export function createTestPlanListTimeoutSettingsHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanListTimeoutSettingsInput.parse(input);
    const response = await client.listTimeoutSettings(parsed);
    const result = mapTestPlanRecordList(
      response.settings,
      response.total,
      "timeout settings",
      "setting"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
