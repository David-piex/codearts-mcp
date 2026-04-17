import { describe, expect, it } from "vitest";
import { createDeployGetHistoryDetailHandler } from "../../../../src/products/deploy/tools/get-history-detail.js";

describe("createDeployGetHistoryDetailHandler", () => {
  it("maps deploy history detail into MCP output", async () => {
    const handler = createDeployGetHistoryDetailHandler({
      getHistoryDetail: async () => ({
        task_id: "task-1",
        record_id: "record-1",
        state: "SUCCEEDED",
        percentage: 100,
        operator_name: "yao",
        start_time: "2026-04-16T10:00:00Z",
        end_time: "2026-04-16T10:10:00Z",
        step_states: [{ step_name: "deploy", status: "SUCCEEDED" }]
      })
    });

    const result = await handler({
      task_id: "task-1",
      record_id: "record-1"
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      recordId: "record-1",
      state: "SUCCEEDED",
      percentage: 100,
      operatorName: "yao",
      startedAt: "2026-04-16T10:00:00Z",
      finishedAt: "2026-04-16T10:10:00Z",
      stepCount: 1
    });
  });
});
