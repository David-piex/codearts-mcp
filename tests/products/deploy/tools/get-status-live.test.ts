import { describe, expect, it } from "vitest";
import { createDeployGetStatusHandler } from "../../../../src/products/deploy/tools/get-status.js";

describe("createDeployGetStatusHandler", () => {
  it("maps deploy status into MCP output", async () => {
    const handler = createDeployGetStatusHandler({
      getStatus: async () => ({
        task_id: "task-1",
        state: "RUNNING",
        elapsed_time: 60,
        step_states: [{ name: "deploy" }, { name: "verify" }]
      })
    });

    const result = await handler({ task_id: "task-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      state: "RUNNING",
      elapsedTime: 60,
      stepCount: 2
    });
  });
});
