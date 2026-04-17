import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetPlanInput } from "../schemas.js";

export function mapTestPlan(input: {
  plan_id: string;
  name: string;
  owner_name?: string;
  status?: string;
  description?: string;
}) {
  return asItemResult(`Loaded test plan ${input.name}`, {
    id: input.plan_id,
    name: input.name,
    ownerName: input.owner_name,
    status: input.status,
    description: input.description
  });
}

type TestPlanGetPlanClient = {
  getPlan: (input: { project_id: string; plan_id: string }) => Promise<{
    plan_id: string;
    name: string;
    owner_name?: string;
    status?: string;
    description?: string;
  }>;
};

export function createTestPlanGetPlanHandler(client: TestPlanGetPlanClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetPlanInput.parse(input);
    const response = await client.getPlan(parsed);
    const result = mapTestPlan(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
