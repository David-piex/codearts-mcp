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

const pipelineListBasePluginsInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>).pipelineListBasePluginsInput ??
  z.object({
    domain_id: z.string().min(1)
  });

export function mapPipelineBasePlugins(items: PipelineBasePlugin[]) {
  return asListResult(
    `Loaded ${items.length} pipeline base plugins`,
    items.map((item) => normalizePipelineBasePlugin(item)),
    {
      page: 1,
      pageSize: items.length,
      total: items.length
    }
  );
}

type PipelineListBasePluginsClient = {
  listBasePlugins: (input: { domain_id: string }) => Promise<{
    items: PipelineBasePlugin[];
  }>;
};

export function createPipelineListBasePluginsHandler(client: PipelineListBasePluginsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListBasePluginsInput.parse(input) as { domain_id: string };
    const response = await client.listBasePlugins(parsed);
    const result = mapPipelineBasePlugins(response.items);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
