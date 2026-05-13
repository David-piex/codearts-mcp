import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectAdvancedFeatureTrialInput } from "../schemas.js";

export function mapTestPlanProjectAdvancedFeatureTrial(input: {
  project_id: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded project advanced feature trial for ${input.project_id}`, {
    id: input.project_id,
    projectId: input.project_id,
    trial: input.raw
  });
}

type TestPlanGetProjectAdvancedFeatureTrialClient = {
  getProjectAdvancedFeatureTrial: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectAdvancedFeatureTrialHandler(
  client: TestPlanGetProjectAdvancedFeatureTrialClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectAdvancedFeatureTrialInput.parse(input);
    const response = await client.getProjectAdvancedFeatureTrial(parsed);
    const result = mapTestPlanProjectAdvancedFeatureTrial(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
