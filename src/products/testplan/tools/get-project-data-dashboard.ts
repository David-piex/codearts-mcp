import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectDataDashboardInput } from "../schemas.js";

type Client = {
  getProjectDataDashboard: (input: {
    project_id: string;
    plan_id?: string;
    branch_id?: string;
    module_id?: string;
    fixed_version_id?: string;
    [key: string]: unknown;
  }) => Promise<{ raw: Record<string, unknown> }>;
};

export function createTestPlanGetProjectDataDashboardHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectDataDashboardInput.parse(input);
    const response = await client.getProjectDataDashboard(parsed);
    const result = asItemResult("Loaded TestPlan project data dashboard", {
      id: parsed.plan_id ?? parsed.branch_id ?? parsed.project_id,
      projectId: parsed.project_id,
      dashboard: response.raw
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
