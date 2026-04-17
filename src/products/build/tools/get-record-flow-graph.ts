import { asItemResult } from "../../../contracts/tool-result.js";
import { buildGetRecordFlowGraphInput } from "../schemas.js";

export function mapBuildRecordFlowGraph(
  recordId: string,
  input: {
    nodes: Array<{
      id?: string;
      name?: string;
      status?: string;
      type?: string;
    }>;
    edges: Array<{
      source?: string;
      target?: string;
    }>;
  }
) {
  return asItemResult(`Loaded build flow graph ${recordId}`, {
    id: recordId,
    recordId,
    nodeCount: input.nodes.length,
    edgeCount: input.edges.length,
    nodes: input.nodes,
    edges: input.edges
  });
}

type BuildGetRecordFlowGraphClient = {
  getRecordFlowGraph: (input: { record_id: string }) => Promise<{
    record_id: string;
    nodes: Array<{
      id?: string;
      name?: string;
      status?: string;
      type?: string;
    }>;
    edges: Array<{
      source?: string;
      target?: string;
    }>;
  }>;
};

export function createBuildGetRecordFlowGraphHandler(client: BuildGetRecordFlowGraphClient) {
  return async (input: unknown) => {
    const parsed = buildGetRecordFlowGraphInput.parse(input);
    const response = await client.getRecordFlowGraph(parsed);
    const result = mapBuildRecordFlowGraph(response.record_id, response);

    return {
      content: [{ type: "text" as const, text: result.summary }],
      structuredContent: result
    };
  };
}
