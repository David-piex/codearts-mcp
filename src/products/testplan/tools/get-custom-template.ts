import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetCustomTemplateInput } from "../schemas.js";

export function mapTestPlanCustomTemplate(input: {
  template_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded custom template ${input.name ?? input.template_id}`, {
    id: input.template_id,
    templateId: input.template_id,
    name: input.name,
    template: input.raw
  });
}

type TestPlanGetCustomTemplateClient = {
  getCustomTemplate: (input: {
    project_id: string;
    version_uri: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetCustomTemplateHandler(
  client: TestPlanGetCustomTemplateClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetCustomTemplateInput.parse(input);
    const response = await client.getCustomTemplate(parsed);
    const result = mapTestPlanCustomTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
