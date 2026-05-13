import { testPlanGetProjectServiceRepoInput } from "../schemas.js";
import { mapTestPlanRecordItem } from "./generic-read-tools.js";

type TestPlanGetProjectServiceRepoClient = {
  getProjectServiceRepo: (input: {
    project_id: string;
    service_id: string | number;
  }) => Promise<{
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectServiceRepoHandler(
  client: TestPlanGetProjectServiceRepoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectServiceRepoInput.parse(input);
    const response = await client.getProjectServiceRepo(parsed);
    const serviceId = String(parsed.service_id);
    const result = mapTestPlanRecordItem(
      `Loaded project service repo ${serviceId}`,
      serviceId,
      "repo",
      response.raw,
      { projectId: parsed.project_id }
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
