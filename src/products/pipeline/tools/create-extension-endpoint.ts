import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCreateExtensionEndpointInput } from "../schemas.js";
import {
  normalizePipelineExtensionEndpoint,
  type PipelineExtensionEndpoint,
  type PipelineExtensionEndpointAuthorization
} from "./extension-shared.js";

export function previewCreatePipelineExtensionEndpoint(input: {
  project_id?: string;
  module_id?: string;
  region_name?: string;
  name?: string;
  url?: string;
  authorization?: PipelineExtensionEndpointAuthorization;
  data?: Record<string, unknown>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline extension endpoint ${input.name ?? ""}`, {
    projectId: input.project_id,
    moduleId: input.module_id,
    regionName: input.region_name,
    name: input.name,
    url: input.url,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineExtensionEndpoint(endpoint: PipelineExtensionEndpoint) {
  const normalized = normalizePipelineExtensionEndpoint(endpoint);

  return asItemResult(
    `Created pipeline extension endpoint ${endpoint.uuid ?? ""}`,
    {
      ...normalized,
      executed: true
    }
  );
}

type PipelineCreateExtensionEndpointClient = {
  createExtensionEndpoint: (input: {
    project_id?: string;
    region_name?: string;
    module_id?: string;
    name?: string;
    url?: string;
    authorization?: PipelineExtensionEndpointAuthorization;
    data?: Record<string, unknown>;
  }) => Promise<PipelineExtensionEndpoint>;
};

export function createPipelineCreateExtensionEndpointHandler(
  client: PipelineCreateExtensionEndpointClient
) {
  return async (input: unknown) => {
    const parsed = pipelineCreateExtensionEndpointInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineExtensionEndpoint(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createExtensionEndpoint(parsed);
    const result = mapCreatedPipelineExtensionEndpoint(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
