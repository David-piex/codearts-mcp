import { z } from "zod";
import { asItemResult } from "../../../contracts/tool-result.js";
import * as pipelineSchemas from "../schemas.js";

type PipelinePluginPart = {
  name?: string;
  type?: string;
  required?: boolean;
  default?: unknown;
  description?: string;
  [key: string]: unknown;
};

type PipelinePluginPartQueryInput = {
  domain_id: string;
  plugin_name: string;
  display_name: string;
  version: string;
  plugin_attribution: string;
};

function normalizePipelinePluginPart(item: PipelinePluginPart) {
  return {
    ...item,
    name: item.name,
    type: item.type,
    required: item.required,
    default: item.default,
    description: item.description
  };
}

const pipelineGetPluginPartsInput =
  (pipelineSchemas as Record<string, z.ZodTypeAny | undefined>).pipelineGetPluginPartsInput ??
  z.object({
    domain_id: z.string().min(1),
    plugin_name: z.string().min(1),
    display_name: z.string().min(1),
    version: z.string().min(1),
    plugin_attribution: z.string().min(1)
  });

export function mapPipelinePluginOutputs(
  input: Omit<PipelinePluginPartQueryInput, "domain_id">,
  items: PipelinePluginPart[]
) {
  return asItemResult(`Loaded ${items.length} plugin output fields`, {
    id: `${input.plugin_name}@${input.version}:outputs`,
    pluginName: input.plugin_name,
    displayName: input.display_name,
    version: input.version,
    pluginAttribution: input.plugin_attribution,
    items: items.map((item) => normalizePipelinePluginPart(item))
  });
}

type PipelineGetPluginOutputsClient = {
  getPluginOutputs: (input: PipelinePluginPartQueryInput) => Promise<{
    items: PipelinePluginPart[];
  }>;
};

export function createPipelineGetPluginOutputsHandler(client: PipelineGetPluginOutputsClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetPluginPartsInput.parse(input) as PipelinePluginPartQueryInput;
    const response = await client.getPluginOutputs(parsed);
    const result = mapPipelinePluginOutputs(
      {
        plugin_name: parsed.plugin_name,
        display_name: parsed.display_name,
        version: parsed.version,
        plugin_attribution: parsed.plugin_attribution
      },
      response.items
    );

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
