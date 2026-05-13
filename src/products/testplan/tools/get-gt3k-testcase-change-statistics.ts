import { testPlanGetGt3kTestcaseChangeStatisticsInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetGt3kTestcaseChangeStatisticsClient = {
  getGt3kTestcaseChangeStatistics: (input: {
    project_id: string;
    version_id: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kTestcaseChangeStatisticsHandler(
  client: TestPlanGetGt3kTestcaseChangeStatisticsClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetGt3kTestcaseChangeStatisticsInput.parse(input);
    const response = await client.getGt3kTestcaseChangeStatistics(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded GT3K testcase change statistics for ${parsed.version_id}`,
      parsed.version_id,
      "statistics",
      response.raw,
      { projectId: parsed.project_id, versionId: parsed.version_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
