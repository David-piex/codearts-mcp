import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineCreateGroupInput } from "../schemas.js";

export function previewCreatePipelineGroup(input: {
  project_id: string;
  name: string;
  parent_id?: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: create pipeline group ${input.name}`, {
    projectId: input.project_id,
    name: input.name,
    parentId: input.parent_id,
    executed: !input.dry_run
  });
}

export function mapCreatedPipelineGroup(input: {
  id?: string;
  project_id: string;
  name: string;
  parent_id?: string;
}) {
  return asItemResult(`Created pipeline group ${input.name}`, {
    id: input.id ?? "",
    projectId: input.project_id,
    name: input.name,
    parentId: input.parent_id,
    executed: true
  });
}

type PipelineCreateGroupClient = {
  createGroup: (input: {
    project_id: string;
    name: string;
    parent_id?: string;
  }) => Promise<{
    id?: string;
    project_id?: string;
    name?: string;
    parent_id?: string;
  }>;
};

export function createPipelineCreateGroupHandler(client: PipelineCreateGroupClient) {
  return async (input: unknown) => {
    const parsed = pipelineCreateGroupInput.parse(input);

    if (parsed.dry_run) {
      const result = previewCreatePipelineGroup(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.createGroup(parsed);
    const result = mapCreatedPipelineGroup({
      id: response.id,
      project_id: response.project_id ?? parsed.project_id,
      name: response.name ?? parsed.name,
      parent_id: response.parent_id ?? parsed.parent_id
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
