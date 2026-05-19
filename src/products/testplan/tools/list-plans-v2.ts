import { testPlanListPlansV2Input } from "../schemas.js";
import { mapTestPlans } from "./list-plans.js";

type TestPlanListPlansV2Client = {
  listPlansV2: (input: {
    project_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    current_stage?: string;
    fix_version_ids?: string;
    branch_uri?: string;
    query_all_version?: boolean;
  }) => Promise<{
    plans: Array<{
      plan_id: string;
      name: string;
      owner_name?: string;
      status?: string;
    }>;
    total?: number;
  }>;
};

export function createTestPlanListPlansV2Handler(client: TestPlanListPlansV2Client) {
  return async (input: unknown) => {
    const parsed = testPlanListPlansV2Input.parse(input);
    const response = await client.listPlansV2(parsed);
    const result = mapTestPlans(response.plans, parsed.page, parsed.page_size, response.total);

    return {
      content: [
        {
          type: "text" as const,
          text: `${result.summary}\nFilters: current_stage=${parsed.current_stage ?? "*"}, branch_uri=${parsed.branch_uri ?? "*"}`
        }
      ],
      structuredContent: result
    };
  };
}
