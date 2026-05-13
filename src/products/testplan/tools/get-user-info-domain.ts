import { testPlanGetUserInfoDomainInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetUserInfoDomainClient = {
  getUserInfoDomain: () => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetUserInfoDomainHandler(client: TestPlanGetUserInfoDomainClient) {
  return async (input: unknown) => {
    testPlanGetUserInfoDomainInput.parse(input);
    const response = await client.getUserInfoDomain();
    const result = mapTestPlanValueItem(
      "Loaded user domain information",
      "user-info-domain",
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
