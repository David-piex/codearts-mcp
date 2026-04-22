import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUpdateExtensionEndpointInput } from "../schemas.js";
import {
  normalizePipelineExtensionEndpoint,
  type PipelineExtensionEndpoint,
  type PipelineExtensionEndpointAuthorization
} from "./extension-shared.js";

export function previewUpdatePipelineExtensionEndpoint(input: {
  uuid: string;
  project_id?: string;
  module_id?: string;
  region_name?: string;
  name?: string;
  url?: string;
  authorization?: PipelineExtensionEndpointAuthorization;
  data?: Record<string, unknown>;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline extension endpoint ${input.uuid}`, {
    uuid: input.uuid,
    projectId: input.project_id,
    moduleId: input.module_id,
    regionName: input.region_name,
    name: input.name,
    url: input.url,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineExtensionEndpoint(endpoint: PipelineExtensionEndpoint) {
  const normalized = normalizePipelineExtensionEndpoint(endpoint);

  return asItemResult(
    `Updated pipeline extension endpoint ${endpoint.uuid ?? ""}`,
    {
      ...normalized,
      executed: true
    }
  );
}

type PipelineUpdateExtensionEndpointClient = {
  updateExtensionEndpoint: (input: {
    uuid: string;
    project_id?: string;
    region_name?: string;
    module_id?: string;
    name?: string;
    url?: string;
    authorization?: PipelineExtensionEndpointAuthorization;
    data?: Record<string, unknown>;
  }) => Promise<PipelineExtensionEndpoint>;
};

export function createPipelineUpdateExtensionEndpointHandler(
  client: PipelineUpdateExtensionEndpointClient
) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateExtensionEndpointInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineExtensionEndpoint(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateExtensionEndpoint(parsed);
    const result = mapUpdatedPipelineExtensionEndpoint(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
