import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetCaseTemplateInput } from "../schemas.js";

export function mapTestPlanCaseTemplate(input: {
  template_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded case template ${input.name ?? input.template_id}`, {
    id: input.template_id,
    templateId: input.template_id,
    name: input.name,
    template: input.raw
  });
}

type TestPlanGetCaseTemplateClient = {
  getCaseTemplate: (input: {
    project_id: string;
    template_uri: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetCaseTemplateHandler(client: TestPlanGetCaseTemplateClient) {
  return async (input: unknown) => {
    const parsed = testPlanGetCaseTemplateInput.parse(input);
    const response = await client.getCaseTemplate(parsed);
    const result = mapTestPlanCaseTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
