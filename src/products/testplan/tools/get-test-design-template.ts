import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanGetTestDesignTemplateInput } from "../schemas.js";

export function mapTestPlanTestDesignTemplate(input: {
  template_id: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(`Loaded test design template ${input.name ?? input.template_id}`, {
    id: input.template_id,
    templateId: input.template_id,
    name: input.name,
    template: input.raw
  });
}

type TestPlanGetTestDesignTemplateClient = {
  getTestDesignTemplate: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    template_id: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanGetTestDesignTemplateHandler(
  client: TestPlanGetTestDesignTemplateClient
) {
  return async (input: unknown) => {
    const parsed = testPlanGetTestDesignTemplateInput.parse(input);
    const response = await client.getTestDesignTemplate(parsed);
    const result = mapTestPlanTestDesignTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
