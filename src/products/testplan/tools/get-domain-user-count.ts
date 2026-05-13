import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetDomainUserCountInput } from "../schemas.js";

export function mapTestPlanDomainUserCount(input: {
  project_id: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded domain user count for ${input.project_id}`, {
    id: input.project_id,
    projectId: input.project_id,
    value: input.value,
    count: input.raw
  });
}

type TestPlanGetDomainUserCountClient = {
  getDomainUserCount: (input: {
    project_id: string;
  }) => Promise<{
    project_id: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetDomainUserCountHandler(
  client: TestPlanGetDomainUserCountClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetDomainUserCountInput.parse(input);
    const response = await client.getDomainUserCount(parsed);
    const result = mapTestPlanDomainUserCount(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
