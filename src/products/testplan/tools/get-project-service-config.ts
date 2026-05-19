import { testPlanGetProjectServiceConfigInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetProjectServiceConfigClient = {
  getProjectServiceConfig: (input: {
    project_id: string;
    key?: string;
    type?: string;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectServiceConfigHandler(
  client: TestPlanGetProjectServiceConfigClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectServiceConfigInput.parse(input);
    const response = await client.getProjectServiceConfig(parsed);
    const result = mapTestPlanRecordItem(
      "Loaded project service configuration",
      parsed.project_id,
      "config",
      response.raw,
      { projectId: parsed.project_id, key: parsed.key, type: parsed.type }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
