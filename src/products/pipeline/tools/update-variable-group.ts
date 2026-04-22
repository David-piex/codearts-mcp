import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineUpdateVariableGroupInput } from "../schemas.js";

type PipelineVariable = {
  name?: string;
  sequence?: number;
  type?: string;
  value?: string;
  is_secret?: boolean;
  description?: string;
};

export function previewUpdatePipelineVariableGroup(input: {
  project_id: string;
  id: string;
  name: string;
  description?: string;
  variables?: PipelineVariable[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: update pipeline variable group ${input.id}`, {
    projectId: input.project_id,
    id: input.id,
    name: input.name,
    description: input.description,
    variableCount: input.variables?.length ?? 0,
    executed: !input.dry_run
  });
}

export function mapUpdatedPipelineVariableGroup(input: {
  project_id: string;
  id: string;
  name: string;
  success: boolean;
}) {
  return asItemResult(`Updated pipeline variable group ${input.id}`, {
    id: input.id,
    projectId: input.project_id,
    name: input.name,
    success: input.success,
    executed: true
  });
}

type PipelineUpdateVariableGroupClient = {
  updateVariableGroup: (input: {
    project_id: string;
    id: string;
    name: string;
    description?: string;
    variables?: PipelineVariable[];
  }) => Promise<{
    id: string;
    success: boolean;
  }>;
};

export function createPipelineUpdateVariableGroupHandler(
  client: PipelineUpdateVariableGroupClient
) {
  return async (input: unknown) => {
    const parsed = pipelineUpdateVariableGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewUpdatePipelineVariableGroup(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.updateVariableGroup(parsed);
    const result = mapUpdatedPipelineVariableGroup({
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
