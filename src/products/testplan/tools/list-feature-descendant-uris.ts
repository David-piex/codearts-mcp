import { testPlanListFeatureDescendantUrisInput } from "../schemas.js";
import { formatTestPlanRecordListText, mapTestPlanRecordList } from "./generic-read-tools.js";

type TestPlanListFeatureDescendantUrisClient = {
  listFeatureDescendantUris: (input: {
    project_id: string;
    feature_uri: string;
  }) => Promise<{
    uris: Array<Record<string, unknown>>;
    total?: number;
  }>;
};

export function createTestPlanListFeatureDescendantUrisHandler(
  client: TestPlanListFeatureDescendantUrisClient
) {
  return async (input: unknown) => {
    const parsed = testPlanListFeatureDescendantUrisInput.parse(input);
    const response = await client.listFeatureDescendantUris(parsed);
    const result = mapTestPlanRecordList(
      response.uris,
      response.total,
      "feature descendant uris",
      "uri"
    );

    return {
      content: [{ type: "text" as const, text: formatTestPlanRecordListText(result) }],
      structuredContent: result
    };
  };
}
