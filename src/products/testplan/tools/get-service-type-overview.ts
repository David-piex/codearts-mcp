import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetServiceTypeOverviewInput } from "../schemas.js";

type Client = {
  getServiceTypeOverview: (input: {
    project_id: string;
    version_uri: string;
    module_id?: string;
    fixed_version_id?: string;
    owner_id?: string;
    own?: boolean;
    pi_filter?: Record<string, unknown>;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetServiceTypeOverviewHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetServiceTypeOverviewInput.parse(input);
    const response = await client.getServiceTypeOverview(parsed);
    const result = asItemResult("Loaded TestPlan service type overview", {
      id: parsed.version_uri,
      projectId: parsed.project_id,
      versionUri: parsed.version_uri,
      overview: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
