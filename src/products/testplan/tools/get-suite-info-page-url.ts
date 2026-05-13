import { testPlanGetSuiteInfoPageUrlInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetSuiteInfoPageUrlClient = {
  getSuiteInfoPageUrl: (input: {
    testServiceId: string;
    suiteId: string;
  }) => Promise<{
    page_url?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetSuiteInfoPageUrlHandler(
  client: TestPlanGetSuiteInfoPageUrlClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetSuiteInfoPageUrlInput.parse(input);
    const response = await client.getSuiteInfoPageUrl(parsed);
    const result = mapTestPlanValueItem(
      `Loaded suite info page URL for ${parsed.suiteId}`,
      parsed.suiteId,
      "page",
      response.page_url,
      response.raw,
      { testServiceId: parsed.testServiceId }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
