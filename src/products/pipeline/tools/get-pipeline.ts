import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineGetInput } from "../schemas.js";

export function mapPipelineDetail(input: {
  id: string;
  name: string;
  description?: string;
  manifest_version?: string;
  creator_name?: string;
  is_publish?: boolean;
  project_id?: string;
  project_name?: string;
  detail_url?: string;
  modify_url?: string;
}) {
  return asItemResult(`Loaded pipeline ${input.name}`, {
    id: input.id,
    name: input.name,
    description: input.description,
    manifestVersion: input.manifest_version,
    creatorName: input.creator_name,
    isPublish: input.is_publish,
    projectId: input.project_id,
    projectName: input.project_name,
    detailUrl: input.detail_url,
    modifyUrl: input.modify_url
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
    project_id?: string;
    project_name?: string;
    detail_url?: string;
    modify_url?: string;
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
