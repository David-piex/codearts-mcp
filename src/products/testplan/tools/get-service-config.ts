import { testPlanGetServiceConfigInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetServiceConfigClient = {
  getServiceConfig: (input: {
    service_id: string;
    key: string;
    type: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetServiceConfigHandler(client: TestPlanGetServiceConfigClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetServiceConfigInput.parse(input);
    const response = await client.getServiceConfig(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded service config ${parsed.key}`,
      parsed.key,
      "config",
      response.raw,
      { serviceId: parsed.service_id, type: parsed.type }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
