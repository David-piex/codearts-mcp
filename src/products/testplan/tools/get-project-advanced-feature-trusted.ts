import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectAdvancedFeatureTrustedInput } from "../schemas.js";

export function mapTestPlanProjectAdvancedFeatureTrusted(input: {
  project_id: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded project advanced feature trusted status for ${input.project_id}`, {
    id: input.project_id,
    projectId: input.project_id,
    value: input.value,
    trusted: input.raw
  });
}

type TestPlanGetProjectAdvancedFeatureTrustedClient = {
  getProjectAdvancedFeatureTrusted: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectAdvancedFeatureTrustedHandler(
  client: TestPlanGetProjectAdvancedFeatureTrustedClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectAdvancedFeatureTrustedInput.parse(input);
    const response = await client.getProjectAdvancedFeatureTrusted(parsed);
    const result = mapTestPlanProjectAdvancedFeatureTrusted(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
