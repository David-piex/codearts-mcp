import { z } from "zod";
import { asListResult } from "../../../contracts/tool-result.js";
import * as pipelineSchemas from "../schemas.js";

type PipelineBasePlugin = {
  unique_id?: string;
  plugin_name?: string;
  display_name?: string;
  version?: string;
  plugin_attribution?: string;
  business_type?: string[] | string;
  [key: string]: unknown;
};

function normalizePipelineBasePlugin(item: PipelineBasePlugin) {
  return {
    ...item,
    id: item.unique_id ?? item.plugin_name ?? "",
    uniqueId: item.unique_id,
    pluginName: item.plugin_name,
    displayName: item.display_name,
    pluginAttribution: item.plugin_attribution,
    businessType: item.business_type
  };
}

const pipelineListBasePluginsPagedInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>)
    .pipelineListBasePluginsPagedInput ??
  z.object({
    domain_id: z.string().min(1),
    offset: z.number().int().min(0).default(0),
    limit: z.number().int().min(1).default(20)
  });

export function mapPipelineBasePluginsPaged(
  items: PipelineBasePlugin[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${items.length} pipeline base plugins`,
    items.map((item) => normalizePipelineBasePlugin(item)),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListBasePluginsPagedClient = {
  listBasePluginsPaged: (input: { domain_id: string; offset: number; limit: number }) => Promise<{
    items: PipelineBasePlugin[];
    total?: number;
  }>;
};

export function createPipelineListBasePluginsPagedHandler(
  client: PipelineListBasePluginsPagedClient
) {
  return async (input: unknown) => {
    const parsed = pipelineListBasePluginsPagedInput.parse(input) as {
      domain_id: string;
      offset: number;
      limit: number;
    };
    const response = await client.listBasePluginsPaged(parsed);
    const result = mapPipelineBasePluginsPaged(
      response.items,
      parsed.offset,
      parsed.limit,
      response.total
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
