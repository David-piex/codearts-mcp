import { describe, expect, it } from "vitest";
import { createDeployGetStatusHandler } from "../../../../src/products/deploy/tools/get-status.js";

describe("createDeployGetStatusHandler", () => {
  it("maps deploy status into MCP output", async () => {
    const handler = createDeployGetStatusHandler({
      getStatus: async () => ({
        task_id: "task-1",
        state: "RUNNING",
        elapsed_time: 60,
        step_states: [
          { id: 1, name: "deploy", status: "running", region: "cn-north-4", enable: true },
          { id: 2, name: "verify", status: "waiting", region: "cn-north-4", enable: false }
        ]
      })
    });

    const result = await handler({ task_id: "task-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      taskId: "task-1",
      state: "RUNNING",
      elapsedTime: 60,
      stepCount: 2,
      stepStates: [
        { id: 1, name: "deploy", status: "running", region: "cn-north-4", enable: true },
        { id: 2, name: "verify", status: "waiting", region: "cn-north-4", enable: false }
      ]
    });
  });

  it("keeps requested record_id in deploy status output", async () => {
    const handler = createDeployGetStatusHandler({
      getStatus: async () => ({
        task_id: "task-1",
        state: "RUNNING",
        percentage: 50,
        elapsed_time: 30,
        step_states: [{ id: 1, name: "deploy", status: "running" }]
      })
    });

    const result = await handler({ task_id: "task-1", record_id: "record-1" });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      taskId: "task-1",
      recordId: "record-1",
      state: "RUNNING",
      percentage: 50,
      elapsedTime: 30,
      stepCount: 1,
      stepStates: [{ id: 1, name: "deploy", status: "running" }]
    });
  });
});
