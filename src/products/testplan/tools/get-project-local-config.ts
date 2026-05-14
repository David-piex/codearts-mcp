import { testPlanGetProjectLocalConfigInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetProjectLocalConfigClient = {
  getProjectLocalConfig: (input: {
    project_id: string;
    property: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectLocalConfigHandler(
  client: TestPlanGetProjectLocalConfigClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectLocalConfigInput.parse(input);
    const response = await client.getProjectLocalConfig(parsed);
    const result = mapTestPlanRecordItem(
      `Loaded project local config ${parsed.property}`,
      parsed.project_id,
      "config",
      response.raw,
      { projectId: parsed.project_id, property: parsed.property }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
