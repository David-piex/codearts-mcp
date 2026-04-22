import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUpdateTagInput } from "../schemas.js";

export function previewUpdatePipelineTag(input: {
  project_id: string;
  tag_id: string;
  name: string;
  color: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline tag ${input.tag_id}`, {
    projectId: input.project_id,
    tagId: input.tag_id,
    name: input.name,
    color: input.color,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineTag(input: {
  project_id: string;
  tag_id: string;
  name: string;
  color: string;
  success?: boolean;
}) {
  return asItemResult(`Updated pipeline tag ${input.tag_id}`, {
    id: input.tag_id,
    projectId: input.project_id,
    tagId: input.tag_id,
    name: input.name,
    color: input.color,
    success: input.success ?? true,
    executed: true
  });
}

type PipelineUpdateTagClient = {
  updateTag: (input: {
    project_id: string;
    tag_id: string;
    name: string;
    color: string;
  }) => Promise<{
    success: boolean;
    project_id: string;
    tag_id: string;
    name: string;
    color: string;
  }>;
};

export function createPipelineUpdateTagHandler(client: PipelineUpdateTagClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateTagInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineTag(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateTag(parsed);
    const result = mapUpdatedPipelineTag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
