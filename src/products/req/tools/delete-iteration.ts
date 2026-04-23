import { asItemResult } from "../../../contracts/tool-result.js";
import { reqDeleteIterationInput } from "../schemas.js";

export function previewDeleteIteration(input: {
  project_id: string;
  iteration_id: string;
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: delete iteration ${input.iteration_id}`, {
    id: input.iteration_id,
    projectId: input.project_id,
    deleted: false,
    executed: false
  });
}

export function mapDeletedIteration(input: {
  project_id: string;
  iteration_id: string;
}) {
  return asItemResult(`Deleted iteration ${input.iteration_id}`, {
    id: input.iteration_id,
    projectId: input.project_id,
    deleted: true,
    executed: true
  });
}

type ReqDeleteIterationClient = {
  deleteIteration: (input: { project_id: string; iteration_id: string }) => Promise<{
    project_id: string;
    iteration_id: string;
    deleted: true;
  }>;
};

export function createReqDeleteIterationHandler(client: ReqDeleteIterationClient) {
  return async (input: unknown) => {
    const parsed = reqDeleteIterationInput.parse(input);

    if (parsed.dry_run) {
      const result = previewDeleteIteration(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.deleteIteration(parsed);
    const result = mapDeletedIteration(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
