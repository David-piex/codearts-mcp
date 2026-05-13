import { testPlanGetDomainAccessInfoInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetDomainAccessInfoClient = {
  getDomainAccessInfo: (input: { project_uuid: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetDomainAccessInfoHandler(
  client: TestPlanGetDomainAccessInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetDomainAccessInfoInput.parse(input);
    const response = await client.getDomainAccessInfo(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded domain access information",
      parsed.project_uuid,
      "access",
      response.raw,
      { projectUuid: parsed.project_uuid }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
