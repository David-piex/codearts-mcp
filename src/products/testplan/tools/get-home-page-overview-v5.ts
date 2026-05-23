import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetHomePageOverviewV5Input } from "../schemas.js";

type Client = {
  getHomePageOverviewV5: (input: {
    project_id: string;
    version_uri: string;
    module_id?: string;
    fixed_version_id?: string;
    owner_id?: string;
    own?: boolean;
    pi_filter?: Record<string, unknown>;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetHomePageOverviewV5Handler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetHomePageOverviewV5Input.parse(input);
    const response = await client.getHomePageOverviewV5(parsed);
    const result = asItemResult("Loaded TestPlan v5 home page overview", {
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
