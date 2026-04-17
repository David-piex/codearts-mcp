import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetInput } from "../schemas.js";

export function mapPipelineDetail(input: {
  id: string;
  name: string;
  description?: string;
  manifest_version?: string;
  creator_name?: string;
  is_publish?: boolean;
}) {
  return asItemResult(`Loaded pipeline ${input.name}`, {
    id: input.id,
    name: input.name,
    description: input.description,
    manifestVersion: input.manifest_version,
    creatorName: input.creator_name,
    isPublish: input.is_publish
  });
}

type PipelineGetPipelineClient = {
  getPipeline: (input: { project_id: string; pipeline_id: string }) => Promise<{
    id: string;
    name: string;
    description?: string;
    manifest_version?: string;
    creator_name?: string;
    is_publish?: boolean;
  }>;
};

export function createPipelineGetPipelineHandler(client: PipelineGetPipelineClient) {
  return async (input: unknown) => {
    const parsed = pipelineGetInput.parse(input);
    const response = await client.getPipeline(parsed);
    const result = mapPipelineDetail(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
