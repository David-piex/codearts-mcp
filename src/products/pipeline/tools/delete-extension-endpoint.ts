import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeleteExtensionEndpointInput } from "../schemas.js";

export function previewDeletePipelineExtensionEndpoint(input: {
  uuid: string;
  project_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline extension endpoint ${input.uuid}`, {
    uuid: input.uuid,
    projectId: input.project_id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipelineExtensionEndpoint(input: {
  uuid: string;
  project_id?: string;
  success: boolean;
}) {
  return asItemResult(`Deleted pipeline extension endpoint ${input.uuid}`, {
    id: input.uuid,
    uuid: input.uuid,
    projectId: input.project_id,
    success: input.success,
    executed: true
  });
}

type PipelineDeleteExtensionEndpointClient = {
  deleteExtensionEndpoint: (input: {
    uuid: string;
    project_id?: string;
  }) => Promise<{
    uuid: string;
    success: boolean;
  }>;
};

export function createPipelineDeleteExtensionEndpointHandler(
  client: PipelineDeleteExtensionEndpointClient
) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteExtensionEndpointInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineExtensionEndpoint(parsed);
      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteExtensionEndpoint(parsed);
    const result = mapDeletedPipelineExtensionEndpoint({
      uuid: response.uuid,
      project_id: parsed.project_id,
      success: response.success
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
