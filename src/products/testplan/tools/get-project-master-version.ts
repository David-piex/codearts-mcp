import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectMasterVersionInput } from "../schemas.js";

export function mapTestPlanProjectMasterVersion(input: {
  project_id: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded project master version for ${input.project_id}`, {
    id: input.project_id,
    projectId: input.project_id,
    value: input.value,
    masterVersion: input.raw
  });
}

type TestPlanGetProjectMasterVersionClient = {
  getProjectMasterVersion: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectMasterVersionHandler(
  client: TestPlanGetProjectMasterVersionClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectMasterVersionInput.parse(input);
    const response = await client.getProjectMasterVersion(parsed);
    const result = mapTestPlanProjectMasterVersion(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
