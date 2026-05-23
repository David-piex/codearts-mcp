import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetHomePageDefectStatusOverviewInput } from "../schemas.js";

type Client = {
  getHomePageDefectStatusOverview: (input: {
    project_id: string;
    version_uri: string;
    module_id?: string;
    fixed_version_id?: string;
    owner_id?: string;
    own?: boolean;
    pi_filter?: Record<string, unknown>;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetHomePageDefectStatusOverviewHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetHomePageDefectStatusOverviewInput.parse(input);
    const response = await client.getHomePageDefectStatusOverview(parsed);
    const result = asItemResult("Loaded TestPlan home page defect status overview", {
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
