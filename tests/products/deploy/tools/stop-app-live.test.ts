import { describe, expect, it } from "vitest";
import { createDeployStopAppHandler } from "../../../../src/products/deploy/tools/stop-app.js";

describe("createDeployStopAppHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createDeployStopAppHandler({
      stopApp: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      task_id: "task-1",
      record_id: "record-1",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      recordId: "record-1",
      executed: false
    });
  });

  it("maps stop deploy task into MCP output", async () => {
    const handler = createDeployStopAppHandler({
      stopApp: async () => ({
        task_id: "task-1",
        record_id: "record-1",
        status: "STOPPED"
      })
    });

    const result = await handler({ task_id: "task-1", record_id: "record-1", dry_run: false });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      recordId: "record-1",
      status: "STOPPED",
      executed: true
    });
  });
});
