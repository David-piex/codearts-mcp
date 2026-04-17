import { describe, expect, it } from "vitest";
import { createCheckStopTaskHandler } from "../../../../src/products/check/tools/stop-task.js";

describe("createCheckStopTaskHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createCheckStopTaskHandler({
      stopTask: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      task_id: "task-1",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      executed: false
    });
  });

  it("maps stopped check task into MCP output", async () => {
    const handler = createCheckStopTaskHandler({
      stopTask: async () => ({
        task_id: "task-1",
        status: "stopped"
      })
    });

    const result = await handler({
      task_id: "task-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      status: "stopped",
      executed: true
    });
  });
});
