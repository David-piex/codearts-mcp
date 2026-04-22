import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListExtensionEndpointsInput } from "../schemas.js";
import {
  normalizePipelineExtensionEndpoint,
  type PipelineExtensionEndpoint
} from "./extension-shared.js";

export function mapPipelineExtensionEndpointList(
  projectId: string,
  endpoints: PipelineExtensionEndpoint[],
  offset: number,
  limit: number,
  total?: number
) {
  return asListResult(
    `Loaded ${endpoints.length} pipeline extension endpoints`,
    endpoints.map((endpoint) => ({
      ...normalizePipelineExtensionEndpoint({
        ...endpoint,
        project_uuid: endpoint.project_uuid ?? projectId
      })
    })),
    {
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      total
    }
  );
}

type PipelineListExtensionEndpointsClient = {
  listExtensionEndpoints: (input: {
    project_id: string;
    region_name: string;
    module_id?: string;
    offset?: number;
    limit?: number;
  }) => Promise<{
    endpoints: PipelineExtensionEndpoint[];
    total: number;
  }>;
};

export function createPipelineListExtensionEndpointsHandler(
  client: PipelineListExtensionEndpointsClient
) {
  return async (input: unknown) => {
    const parsed = pipelineListExtensionEndpointsInput.parse(input);
    const response = await client.listExtensionEndpoints(parsed);
    const result = mapPipelineExtensionEndpointList(
      parsed.project_id,
      response.endpoints,
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
