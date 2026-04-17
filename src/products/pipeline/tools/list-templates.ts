import { asListResult } from "../../../contracts/tool-result.js";
import { toPageInfo } from "../../../core/pagination/page-info.js";
import { pipelineListTemplatesInput } from "../schemas.js";

export function mapPipelineTemplates(
  items: Array<{
    id?: string;
    name?: string;
    icon?: string;
    manifest_version?: string;
    language?: string;
    description?: string;
    is_system?: boolean;
    region?: string;
  }>,
  page: number,
  pageSize: number,
  total?: number
) {
  return asListResult(
    `${items.length} pipeline templates found`,
    items.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      manifestVersion: item.manifest_version,
      language: item.language,
      description: item.description,
      isSystem: item.is_system,
      region: item.region
    })),
    toPageInfo(page, pageSize, total)
  );
}

type PipelineListTemplatesClient = {
  listTemplates: (input: {
    tenant_id: string;
    page: number;
    page_size: number;
    keyword?: string;
    language?: string;
    is_system?: boolean;
  }) => Promise<{
    templates: Array<{
      id?: string;
      name?: string;
      icon?: string;
      manifest_version?: string;
      language?: string;
      description?: string;
      is_system?: boolean;
      region?: string;
    }>;
    total?: number;
  }>;
};

export function createPipelineListTemplatesHandler(client: PipelineListTemplatesClient) {
  return async (input: unknown) => {
    const parsed = pipelineListTemplatesInput.parse(input);
    const response = await client.listTemplates(parsed);
    const result = mapPipelineTemplates(response.templates, parsed.page, parsed.page_size, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
