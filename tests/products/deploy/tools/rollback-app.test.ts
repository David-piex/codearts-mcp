import { describe, expect, it } from "vitest";
import { createDeployRollbackAppHandler } from "../../../../src/products/deploy/tools/rollback-app.js";

describe("createDeployRollbackAppHandler", () => {
  it("returns a real dry-run summary when requested", async () => {
    const handler = createDeployRollbackAppHandler({
      getStatus: async () => ({
        task_id: "task-1",
        state: "SUCCEEDED",
        percentage: 100
      }),
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
      status: "SUCCEEDED",
      percentage: 100,
      executed: false
    });
  });

  it("fails in dry-run mode when the source record does not exist", async () => {
    const handler = createDeployRollbackAppHandler({
      getStatus: async () => {
        const error = new Error("record not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      rollbackApp: async () => {
        throw new Error("should not run");
      }
    });

    await expect(
      handler({
        task_id: "task-1",
        record_id: "missing-record"
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });

  it("maps rollback deploy task into MCP output", async () => {
    const handler = createDeployRollbackAppHandler({
      getStatus: async () => {
        throw new Error("should not preview");
      },
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
