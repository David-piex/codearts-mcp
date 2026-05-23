import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetTemplateInput } from "../schemas.js";

export function mapPipelineTemplate(input: {
  id?: string;
  name?: string;
  icon?: string;
  manifest_version?: string;
  language?: string;
  description?: string;
  is_system?: boolean;
  region?: string;
  template: Record<string, unknown>;
}) {
  return asItemResult(`Loaded pipeline template ${input.name ?? input.id ?? ""}`.trim(), {
    id: input.id,
    name: input.name,
    icon: input.icon,
    manifestVersion: input.manifest_version,
    language: input.language,
    description: input.description,
    isSystem: input.is_system,
    region: input.region,
    template: input.template
  });
}

type Client = {
  getTemplate: (input: { tenant_id: string; template_id: string }) => Promise<{
    id?: string;
    name?: string;
    icon?: string;
    manifest_version?: string;
    language?: string;
    description?: string;
    is_system?: boolean;
    region?: string;
    template: Record<string, unknown>;
  }>;
};

export function createPipelineGetTemplateHandler(client: Client) {
  return async (input: unknown) => {
    const parsed = pipelineGetTemplateInput.parse(input);
    const response = await client.getTemplate(parsed);
    const result = mapPipelineTemplate(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
