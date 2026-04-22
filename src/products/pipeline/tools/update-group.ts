import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUpdateGroupInput } from "../schemas.js";

export function previewUpdatePipelineGroup(input: {
  project_id: string;
  id: string;
  name: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline group ${input.id}`, {
    projectId: input.project_id,
    id: input.id,
    name: input.name,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineGroup(input: {
  project_id: string;
  id: string;
  name: string;
  success: boolean;
}) {
  return asItemResult(`Updated pipeline group ${input.id}`, {
    id: input.id,
    projectId: input.project_id,
    name: input.name,
    success: input.success,
    executed: true
  });
}

type PipelineUpdateGroupClient = {
  updateGroup: (input: {
    project_id: string;
    id: string;
    name: string;
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
};

export function createPipelineUpdateGroupHandler(client: PipelineUpdateGroupClient) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineGroup(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateGroup(parsed);
    const result = mapUpdatedPipelineGroup({
      project_id: parsed.project_id,
      id: response.id,
      name: parsed.name,
      success: response.success
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
