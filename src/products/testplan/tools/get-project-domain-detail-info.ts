import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetProjectDomainDetailInfoInput } from "../schemas.js";

export function mapTestPlanProjectDomainDetailInfo(input: {
  project_id: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded project domain detail info for ${input.project_id}`, {
    id: input.project_id,
    projectId: input.project_id,
    detail: input.raw
  });
}

type TestPlanGetProjectDomainDetailInfoClient = {
  getProjectDomainDetailInfo: (input: {
    project_id: string;
    order_query_type?: string;
  }) => Promise<{
    project_id: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetProjectDomainDetailInfoHandler(
  client: TestPlanGetProjectDomainDetailInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetProjectDomainDetailInfoInput.parse(input);
    const response = await client.getProjectDomainDetailInfo(parsed);
    const result = mapTestPlanProjectDomainDetailInfo(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
