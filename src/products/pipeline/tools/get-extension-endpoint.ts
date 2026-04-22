import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetExtensionEndpointInput } from "../schemas.js";
import {
  normalizePipelineExtensionEndpoint,
  type PipelineExtensionEndpoint
} from "./extension-shared.js";

export function mapPipelineExtensionEndpoint(endpoint: PipelineExtensionEndpoint) {
  return asItemResult(
    `Loaded pipeline extension endpoint ${endpoint.uuid ?? ""}`,
    normalizePipelineExtensionEndpoint(endpoint)
  );
}

type PipelineGetExtensionEndpointClient = {
  getExtensionEndpoint: (input: { uuid: string }) => Promise<PipelineExtensionEndpoint>;
};

export function createPipelineGetExtensionEndpointHandler(
  client: PipelineGetExtensionEndpointClient
) {
  return async (input: unknown) => {
    const parsed = pipelineGetExtensionEndpointInput.parse(input);
    const response = await client.getExtensionEndpoint(parsed);
    const result = mapPipelineExtensionEndpoint(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
