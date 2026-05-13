import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetDomainFrozenInfoInput } from "../schemas.js";

export function mapTestPlanDomainFrozenInfo(input: {
  project_uuid: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded domain frozen info for ${input.project_uuid}`, {
    id: input.project_uuid,
    projectUuid: input.project_uuid,
    frozenInfo: input.raw
  });
}

type TestPlanGetDomainFrozenInfoClient = {
  getDomainFrozenInfo: (input: {
    project_uuid: string;
  }) => Promise<{
    project_uuid: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetDomainFrozenInfoHandler(
  client: TestPlanGetDomainFrozenInfoClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetDomainFrozenInfoInput.parse(input);
    const response = await client.getDomainFrozenInfo(parsed);
    const result = mapTestPlanDomainFrozenInfo(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
