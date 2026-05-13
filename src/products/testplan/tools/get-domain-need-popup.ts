import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetDomainNeedPopupInput } from "../schemas.js";

export function mapTestPlanDomainNeedPopup(input: {
  project_uuid?: string;
  value?: unknown;
  raw: Record<string, unknown>;
}) {
  return asItemResult("Loaded domain popup reminder status", {
    id: input.project_uuid ?? "current-domain",
    projectUuid: input.project_uuid,
    value: input.value,
    popup: input.raw
  });
}

type TestPlanGetDomainNeedPopupClient = {
  getDomainNeedPopup: (input: {
    project_uuid?: string;
  }) => Promise<{
    project_uuid?: string;
    value?: unknown;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetDomainNeedPopupHandler(
  client: TestPlanGetDomainNeedPopupClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetDomainNeedPopupInput.parse(input);
    const response = await client.getDomainNeedPopup(parsed);
    const result = mapTestPlanDomainNeedPopup(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
