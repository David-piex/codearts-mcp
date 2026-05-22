import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanDownloadTestDesignTemplateInput } from "../schemas.js";

export function mapTestPlanDownloadTestDesignTemplate(input: {
  template_id?: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `Loaded test design template download metadata ${input.name ?? input.template_id ?? ""}`.trim(),
    {
      id: input.template_id ?? input.name ?? "test-design-template",
      templateId: input.template_id,
      name: input.name,
      template: input.raw
    }
  );
}

type TestPlanDownloadTestDesignTemplateClient = {
  downloadTestDesignTemplate: (input: {
    project_id: string;
    file_name?: string;
  }) => Promise<{
    template_id?: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanDownloadTestDesignTemplateHandler(
  client: TestPlanDownloadTestDesignTemplateClient
) {
  return async (input: unknown) => {
    const parsed = testPlanDownloadTestDesignTemplateInput.parse(input);
    const response = await client.downloadTestDesignTemplate(parsed);
    const result = mapTestPlanDownloadTestDesignTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
