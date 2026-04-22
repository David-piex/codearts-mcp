import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListPluginsInput } from "../schemas.js";
import {
  normalizePipelinePlugin,
  type PipelinePlugin
} from "./plugin-shared.js";

export function mapPipelinePlugins(
  items: PipelinePlugin[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${items.length} pipeline plugins`,
    items.map((item) => normalizePipelinePlugin(item)),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListPluginsClient = {
  listPlugins: (input: {
    domain_id: string;
    offset: number;
    limit: number;
    plugin_attribution?: string;
    business_type?: string[];
    maintainer?: string;
    plugin_name?: string;
  }) => Promise<{
    items: PipelinePlugin[];
    total?: number;
  }>;
};

export function createPipelineListPluginsHandler(client: PipelineListPluginsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListPluginsInput.parse(input);
    const response = await client.listPlugins(parsed);
    const result = mapPipelinePlugins(response.items, parsed.offset, parsed.limit, response.total);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
