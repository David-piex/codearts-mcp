import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCreateTagInput } from "../schemas.js";

export function previewCreatePipelineTag(input: {
  project_id: string;
  name: string;
  color: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline tag ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    color: input.color,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineTag(input: {
  project_id: string;
  name: string;
  color: string;
  success?: boolean;
}) {
  return asItemResult(`Created pipeline tag ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    color: input.color,
    success: input.success ?? true,
    executed: true
  });
}

type PipelineCreateTagClient = {
  createTag: (input: { project_id: string; name: string; color: string }) => Promise<{
    success: boolean;
    project_id: string;
    name: string;
    color: string;
  }>;
};

export function createPipelineCreateTagHandler(client: PipelineCreateTagClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateTagInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineTag(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createTag(parsed);
    const result = mapCreatedPipelineTag(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
