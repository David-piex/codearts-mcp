import { z } from "zod";
import { asListResult } from "../../../contracts/tool-result.js";
import * as pipelineSchemas from "../schemas.js";

type PipelinePlugin = {
  unique_id?: string;
  plugin_name?: string;
  display_name?: string;
  version?: string;
  plugin_attribution?: string;
  business_type?: string[] | string;
  [key: string]: unknown;
};

function normalizePipelinePlugin(item: PipelinePlugin) {
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

const pipelineListStagePluginsInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>).pipelineListStagePluginsInput ??
  z.object({
    domain_id: z.string().min(1)
  });

export function mapPipelineStagePlugins(items: PipelinePlugin[]) {
  return asListResult(
    `Loaded ${items.length} pipeline stage plugins`,
    items.map((item) => normalizePipelinePlugin(item)),
    {
      page: 1,
      pageSize: items.length,
      total: items.length
    }
  );
}

type PipelineListStagePluginsClient = {
  listStagePlugins: (input: Record<string, unknown>) => Promise<{
    items: PipelinePlugin[];
  }>;
};

export function createPipelineListStagePluginsHandler(client: PipelineListStagePluginsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListStagePluginsInput.parse(input) as Record<string, unknown>;
    const response = await client.listStagePlugins(parsed);
    const result = mapPipelineStagePlugins(response.items);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
