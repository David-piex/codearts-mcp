import { asItemResult } from "../../../contracts/tool-result.js";
import { reqBatchDeleteIterationsInput } from "../schemas.js";

export function previewBatchDeleteIterations(input: {
  project_id: string;
  iteration_ids: string[];
  dry_run: boolean;
}) {
  return asItemResult(`Dry run: batch delete ${input.iteration_ids.length} iterations`, {
    projectId: input.project_id,
    iterationIds: input.iteration_ids,
    deletedCount: 0,
    executed: false
  });
}

export function mapBatchDeletedIterations(input: {
  project_id: string;
  iteration_ids: string[];
}) {
  return asItemResult(`Deleted ${input.iteration_ids.length} iterations`, {
    projectId: input.project_id,
    iterationIds: input.iteration_ids,
    deletedCount: input.iteration_ids.length,
    executed: true
  });
}

type ReqBatchDeleteIterationsClient = {
  batchDeleteIterations: (input: {
    project_id: string;
    iteration_ids: string[];
  }) => Promise<{
    project_id: string;
    iteration_ids: string[];
    deletedCount: number;
  }>;
};

export function createReqBatchDeleteIterationsHandler(client: ReqBatchDeleteIterationsClient) {
  return async (input: unknown) => {
    const parsed = reqBatchDeleteIterationsInput.parse(input);

    if (parsed.dry_run) {
      const result = previewBatchDeleteIterations(parsed);

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.batchDeleteIterations(parsed);
    const result = mapBatchDeletedIterations(response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
