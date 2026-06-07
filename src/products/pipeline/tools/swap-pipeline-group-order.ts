import { asItemResult } from "../../../contracts/tool-result.js";
import { pipelineSwapPipelineGroupOrderInput } from "../schemas.js";

type PipelineSwapGroupClient = {
  swapPipelineGroupOrder: (input: {
    project_id: string;
    group_id_1: string;
    group_id_2: string;
  }) => Promise<{
    success: boolean;
  }>;
};

function mapSwapPipelineGroupOrder(input: {
  project_id: string;
  group_id_1: string;
  group_id_2: string;
  success?: boolean;
  executed: boolean;
}) {
  return asItemResult(
    `${input.executed ? "Swapped" : "Dry run: swap"} Pipeline group order ${input.group_id_1} and ${input.group_id_2}`,
    {
      projectId: input.project_id,
      groupId1: input.group_id_1,
      groupId2: input.group_id_2,
      success: input.success,
      executed: input.executed
    }
  );
}

export function createPipelineSwapPipelineGroupOrderHandler(client: PipelineSwapGroupClient) {
  return async (input: unknown) => {
    const parsed = pipelineSwapPipelineGroupOrderInput.parse(input);

    if (parsed.dry_run) {
      const result = mapSwapPipelineGroupOrder({
        ...parsed,
        executed: false
      });

      return {
        content: [{ type: "text" as const, text: result.summary }],
        structuredContent: result
      };
    }

    const response = await client.swapPipelineGroupOrder(parsed);
    const result = mapSwapPipelineGroupOrder({
      ...parsed,
      success: response.success,
      executed: true
    });

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
