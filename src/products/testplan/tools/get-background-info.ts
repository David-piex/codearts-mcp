import { testPlanGetBackgroundInfoInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetBackgroundInfoClient = {
  getBackgroundInfo: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetBackgroundInfoHandler(
  client: TestPlanGetBackgroundInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetBackgroundInfoInput.parse(input);
    const response = await client.getBackgroundInfo(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded background information",
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
