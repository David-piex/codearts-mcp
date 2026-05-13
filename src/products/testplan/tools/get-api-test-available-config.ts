import { testPlanGetApiTestAvailableConfigInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getApiTestAvailableConfig: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetApiTestAvailableConfigHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestAvailableConfigInput.parse(input);
    const response = await client.getApiTestAvailableConfig(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test available config for project ${parsed.project_id}`,
      parsed.project_id,
      "config",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
