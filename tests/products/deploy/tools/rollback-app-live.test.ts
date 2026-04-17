import { describe, expect, it } from "vitest";
import { createDeployRollbackAppHandler } from "../../../../src/products/deploy/tools/rollback-app.js";

describe("createDeployRollbackAppHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createDeployRollbackAppHandler({
      rollbackApp: async () => {
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

  it("maps rollback deploy task into MCP output", async () => {
    const handler = createDeployRollbackAppHandler({
      rollbackApp: async () => ({
        task_id: "task-1",
        record_id: "record-2",
        status: "RUNNING"
      })
    });

    const result = await handler({ task_id: "task-1", record_id: "record-1", dry_run: false });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      recordId: "record-2",
      sourceRecordId: "record-1",
      status: "RUNNING",
      executed: true
    });
  });
});
