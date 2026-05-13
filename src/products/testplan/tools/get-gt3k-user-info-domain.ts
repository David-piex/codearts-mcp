import { testPlanGetGt3kUserInfoDomainInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetGt3kUserInfoDomainClient = {
  getGt3kUserInfoDomain: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kUserInfoDomainHandler(
  client: TestPlanGetGt3kUserInfoDomainClient
) {
  return async (input: unknown) => {
    testPlanGetGt3kUserInfoDomainInput.parse(input);
    const response = await client.getGt3kUserInfoDomain();
    const result = mapTestPlanValueItem(
      "Loaded GT3K user domain information",
      "gt3k-user-info-domain",
      "domain",
      response.value,
      response.raw
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
