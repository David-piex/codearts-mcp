import { describe, expect, it } from "vitest";
import { createBuildGetRecordFlowGraphHandler } from "../../../../src/products/build/tools/get-record-flow-graph.js";

describe("createBuildGetRecordFlowGraphHandler", () => {
  it("maps build flow graph into MCP output", async () => {
    const handler = createBuildGetRecordFlowGraphHandler({
      getRecordFlowGraph: async () => ({
        record_id: "record-1",
        nodes: [{ id: "n1", name: "compile", status: "SUCCESS", type: "task" }],
        edges: [{ source: "n1", target: "n2" }]
      })
    });

    const result = await handler({ record_id: "record-1" });

    expect(result.structuredContent.item?.recordId).toBe("record-1");
    expect(result.structuredContent.item?.nodeCount).toBe(1);
    expect(result.structuredContent.item?.edgeCount).toBe(1);
  });
});
