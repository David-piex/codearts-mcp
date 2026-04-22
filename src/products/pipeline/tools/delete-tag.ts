import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeleteTagInput } from "../schemas.js";

export function previewDeletePipelineTag(input: {
  project_id: string;
  tag_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline tag ${input.tag_id}`, {
    projectId: input.project_id,
    tagId: input.tag_id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipelineTag(input: {
  project_id: string;
  tag_id: string;
  success?: boolean;
}) {
  return asItemResult(`Deleted pipeline tag ${input.tag_id}`, {
    id: input.tag_id,
    projectId: input.project_id,
    tagId: input.tag_id,
    success: input.success ?? true,
    executed: true
  });
}

type PipelineDeleteTagClient = {
  deleteTag: (input: { project_id: string; tag_id: string }) => Promise<{
    success: boolean;
    project_id: string;
    tag_id: string;
  }>;
};

export function createPipelineDeleteTagHandler(client: PipelineDeleteTagClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteTagInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineTag(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteTag(parsed);
    const result = mapDeletedPipelineTag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
