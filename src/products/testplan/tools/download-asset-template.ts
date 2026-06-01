import { asItemResult } from "../../../contracts/tool-result.js";
import { testPlanDownloadAssetTemplateInput } from "../schemas.js";

export function mapTestPlanDownloadAssetTemplate(input: {
  template_id?: string;
  name?: string;
  raw: Record<string, unknown>;
}) {
  return asItemResult(
    `Loaded asset template download metadata ${input.name ?? input.template_id ?? ""}`.trim(),
    {
      id: input.template_id ?? input.name ?? "asset-template",
      templateId: input.template_id,
      name: input.name,
      template: input.raw
    }
  );
}

type TestPlanDownloadAssetTemplateClient = {
  downloadAssetTemplate: (input: {
    project_id: string;
  }) => Promise<{
    template_id?: string;
    name?: string;
    raw: Record<string, unknown>;
  }>;
};

export function createTestPlanDownloadAssetTemplateHandler(
  client: TestPlanDownloadAssetTemplateClient
) {
  return async (input: unknown) => {
    const parsed = testPlanDownloadAssetTemplateInput.parse(input);
    const response = await client.downloadAssetTemplate(parsed);
    const result = mapTestPlanDownloadAssetTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
