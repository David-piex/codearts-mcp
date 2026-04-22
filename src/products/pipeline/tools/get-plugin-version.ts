import { z } from "zod";
import { asItemResult } from "../../../contracts/tool-result.js";
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

const pipelineGetPluginVersionInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>).pipelineGetPluginVersionInput ??
  z.object({
    domain_id: z.string().min(1),
    plugin_name: z.string().min(1),
    version: z.string().min(1)
  });

export function mapPipelinePluginVersion(item: PipelinePluginVersion) {
  const normalized = normalizePipelinePluginVersion(item);
  return asItemResult(`Loaded plugin version ${normalized.version ?? ""}`, normalized);
}

type PipelineGetPluginVersionClient = {
  getPluginVersion: (input: {
    domain_id: string;
    plugin_name: string;
    version: string;
  }) => Promise<{
    item: PipelinePluginVersion;
  }>;
};

export function createPipelineGetPluginVersionHandler(client: PipelineGetPluginVersionClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetPluginVersionInput.parse(input) as {
      domain_id: string;
      plugin_name: string;
      version: string;
    };
    const response = await client.getPluginVersion(parsed);
    const result = mapPipelinePluginVersion(response.item);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
