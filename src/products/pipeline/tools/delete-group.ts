import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeleteGroupInput } from "../schemas.js";

export function previewDeletePipelineGroup(input: {
  project_id: string;
  id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline group ${input.id}`, {
    projectId: input.project_id,
    id: input.id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipelineGroup(input: {
  project_id: string;
  id: string;
  success: boolean;
}) {
  return asItemResult(`Deleted pipeline group ${input.id}`, {
    id: input.id,
    projectId: input.project_id,
    success: input.success,
    executed: true
  });
}

type PipelineDeleteGroupClient = {
  deleteGroup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
};

export function createPipelineDeleteGroupHandler(client: PipelineDeleteGroupClient) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineGroup(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteGroup(parsed);
    const result = mapDeletedPipelineGroup({
      project_id: parsed.project_id,
      id: response.id,
      success: response.success
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
