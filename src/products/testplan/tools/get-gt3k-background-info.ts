import { testPlanGetGt3kBackgroundInfoInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetGt3kBackgroundInfoClient = {
  getGt3kBackgroundInfo: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetGt3kBackgroundInfoHandler(
  client: TestPlanGetGt3kBackgroundInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetGt3kBackgroundInfoInput.parse(input);
    const response = await client.getGt3kBackgroundInfo(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded GT3K background information",
      parsed.project_id,
      "background",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
