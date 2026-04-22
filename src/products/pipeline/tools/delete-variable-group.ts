import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineDeleteVariableGroupInput } from "../schemas.js";

export function previewDeletePipelineVariableGroup(input: {
  project_id: string;
  id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete pipeline variable group ${input.id}`, {
    projectId: input.project_id,
    id: input.id,
    executed: !input.dry_run
  });
}

export function mapDeletedPipelineVariableGroup(input: {
  project_id: string;
  id: string;
  success: boolean;
}) {
  return asItemResult(`Deleted pipeline variable group ${input.id}`, {
    id: input.id,
    projectId: input.project_id,
    success: input.success,
    executed: true
  });
}

type PipelineDeleteVariableGroupClient = {
  deleteVariableGroup: (input: {
    project_id: string;
    id: string;
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
};

export function createPipelineDeleteVariableGroupHandler(
  client: PipelineDeleteVariableGroupClient
) {
  return async (input: unknown) => {
    const parsed = pipelineDeleteVariableGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeletePipelineVariableGroup(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteVariableGroup(parsed);
    const result = mapDeletedPipelineVariableGroup({
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
