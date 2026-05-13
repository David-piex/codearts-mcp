import { testPlanGetDomainDetailInfoInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetDomainDetailInfoClient = {
  getDomainDetailInfo: (input: {
    domain_id?: string;
    region?: string;
    order_query_type?: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetDomainDetailInfoHandler(
  client: TestPlanGetDomainDetailInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetDomainDetailInfoInput.parse(input);
    const response = await client.getDomainDetailInfo(parsed);
    const result = mapTestPlanValueItem(
      "Loaded domain detail information",
      parsed.domain_id ?? "current-domain",
      "detail",
      response.value,
      response.raw,
      { domainId: parsed.domain_id, region: parsed.region }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
