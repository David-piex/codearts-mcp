import { testPlanGetTestcaseChangeStatisticsInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetTestcaseChangeStatisticsClient = {
  getTestcaseChangeStatistics: (input: {
    project_id: string;
    version_uri: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestcaseChangeStatisticsHandler(
  client: TestPlanGetTestcaseChangeStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestcaseChangeStatisticsInput.parse(input);
    const response = await client.getTestcaseChangeStatistics(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded testcase change statistics for ${parsed.version_uri}`,
      parsed.version_uri,
      "statistics",
      response.raw,
      { projectId: parsed.project_id, versionUri: parsed.version_uri }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
