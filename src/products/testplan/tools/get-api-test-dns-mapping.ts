import { testPlanGetApiTestDnsMappingInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type Client = {
  getApiTestDnsMapping: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetApiTestDnsMappingHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetApiTestDnsMappingInput.parse(input);
    const response = await client.getApiTestDnsMapping(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded API test DNS mapping for project ${parsed.project_id}`,
      parsed.project_id,
      "dnsMapping",
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
