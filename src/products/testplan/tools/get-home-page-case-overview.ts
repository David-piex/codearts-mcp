import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetHomePageCaseOverviewInput } from "../schemas.js";

type Client = {
  getHomePageCaseOverview: (input: {
    project_id: string;
    version_uri: string;
    module_id?: string;
    fixed_version_id?: string;
    owner_id?: string;
    own?: boolean;
    pi_filter?: Record<string, unknown>;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetHomePageCaseOverviewHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetHomePageCaseOverviewInput.parse(input);
    const response = await client.getHomePageCaseOverview(parsed);
    const result = asItemResult("Loaded TestPlan home page case overview", {
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
