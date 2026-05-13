import { testPlanGetProjectSystemConfigInput } from "../schemas.js";
import { mapTestPlanValueItem } from "./generic-read-tools.js";

type TestPlanGetProjectSystemConfigClient = {
  getProjectSystemConfig: (input: {
    project_uuid: string;
    owner_id: string;
    feature_name: string;
  }) => Promise<{
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectSystemConfigHandler(
  client: TestPlanGetProjectSystemConfigClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectSystemConfigInput.parse(input);
    const response = await client.getProjectSystemConfig(parsed);
    const result = mapTestPlanValueItem(
      `Loaded system config ${parsed.feature_name}`,
      parsed.feature_name,
      "config",
      response.value,
      response.raw,
      { projectUuid: parsed.project_uuid, ownerId: parsed.owner_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
