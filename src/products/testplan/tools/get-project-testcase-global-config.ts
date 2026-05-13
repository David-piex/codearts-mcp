import { testPlanGetProjectTestcaseGlobalConfigInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetProjectTestcaseGlobalConfigClient = {
  getProjectTestcaseGlobalConfig: (input: { project_id: string }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectTestcaseGlobalConfigHandler(
  client: TestPlanGetProjectTestcaseGlobalConfigClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectTestcaseGlobalConfigInput.parse(input);
    const response = await client.getProjectTestcaseGlobalConfig(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded project testcase global config for ${parsed.project_id}`,
      parsed.project_id,
      "config",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
