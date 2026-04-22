import { asListResult } from "../../../contracts/tool-result.js";
import { pipelineListTagsInput } from "../schemas.js";

type PipelineTag = {
  tag_id?: string;
  name?: string;
  color?: string;
  project_id?: string;
  project_name?: string;
};

export function mapPipelineTagList(projectId: string, tags: PipelineTag[]) {
  return asListResult(
    `Loaded ${tags.length} pipeline tags`,
    tags.map((tag) => ({
      id: tag.tag_id ?? "",
      tagId: tag.tag_id ?? "",
      projectId: tag.project_id ?? projectId,
      projectName: tag.project_name,
      name: tag.name ?? "",
      color: tag.color
    })),
    {
      page: 1,
      pageSize: tags.length,
      total: tags.length
    }
  );
}

type PipelineListTagsClient = {
  listTags: (input: { project_id: string; proj_id?: string }) => Promise<{
    tags: PipelineTag[];
    total: number;
  }>;
};

export function createPipelineListTagsHandler(client: PipelineListTagsClient) {
  return async (input: unknown) => {
    const parsed = pipelineListTagsInput.parse(input);
    const response = await client.listTags(parsed);
    const result = mapPipelineTagList(parsed.project_id, response.tags);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
