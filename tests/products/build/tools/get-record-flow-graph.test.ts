import { describe, expect, it } from "vitest";
import { mapBuildRecordFlowGraph } from "../../../../src/products/build/tools/get-record-flow-graph.js";

describe("mapBuildRecordFlowGraph", () => {
  it("returns normalized build flow graph data", () => {
    const result = mapBuildRecordFlowGraph("record-1", {
      nodes: [{ id: "n1", name: "compile", status: "SUCCESS", type: "task" }],
      edges: [{ source: "n1", target: "n2" }]
    });

    expect(result.item?.recordId).toBe("record-1");
    expect(result.item?.nodeCount).toBe(1);
    expect(result.item?.edgeCount).toBe(1);
  });
});
