import { z } from "zod";
import { asListResult } from "../../../contracts/tool-result.js";
import * as pipelineSchemas from "../schemas.js";

type PipelinePluginVersion = {
  unique_id?: string;
  plugin_name?: string;
  display_name?: string;
  version?: string;
  plugin_attribution?: string;
  business_type?: string[] | string;
  [key: string]: unknown;
};

function normalizePipelinePluginVersion(item: PipelinePluginVersion) {
  return {
    ...item,
    id: item.unique_id ?? `${item.plugin_name ?? ""}@${item.version ?? ""}`,
    uniqueId: item.unique_id,
    pluginName: item.plugin_name,
    displayName: item.display_name,
    pluginAttribution: item.plugin_attribution,
    businessType: item.business_type
  };
}

const pipelineListPluginVersionsInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>)
    .pipelineListPluginVersionsInput ??
  z.object({
    domain_id: z.string().min(1),
    plugin_name: z.string().min(1),
    offset: z.number().int().min(0).default(0),
    limit: z.number().int().min(1).default(20)
  });

export function mapPipelinePluginVersions(
  items: PipelinePluginVersion[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${items.length} plugin versions`,
    items.map((item) => normalizePipelinePluginVersion(item)),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListPluginVersionsClient = {
  listPluginVersions: (input: {
    domain_id: string;
    plugin_name: string;
    offset: number;
    limit: number;
  }) => Promise<{
    items: PipelinePluginVersion[];
    total?: number;
  }>;
};

export function createPipelineListPluginVersionsHandler(client: PipelineListPluginVersionsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListPluginVersionsInput.parse(input) as {
      domain_id: string;
      plugin_name: string;
      offset: number;
      limit: number;
    };
    const response = await client.listPluginVersions(parsed);
    const result = mapPipelinePluginVersions(response.items, parsed.offset, parsed.limit, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
