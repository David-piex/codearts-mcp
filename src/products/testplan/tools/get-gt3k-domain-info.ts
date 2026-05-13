import { testPlanGetGt3kDomainInfoInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetGt3kDomainInfoClient = {
  getGt3kDomainInfo: (input: { project_uuid?: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kDomainInfoHandler(
  client: TestPlanGetGt3kDomainInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetGt3kDomainInfoInput.parse(input);
    const response = await client.getGt3kDomainInfo(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded GT3K domain order information",
      parsed.project_uuid ?? "current-domain",
      "domain",
      response.raw,
      { projectUuid: parsed.project_uuid }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
