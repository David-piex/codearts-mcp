import { describe, expect, it } from "vitest";
import { createDeployStopAppHandler } from "../../../../src/products/deploy/tools/stop-app.js";

describe("createDeployStopAppHandler", () => {
  it("returns a real dry-run summary when requested", async () => {
    const handler = createDeployStopAppHandler({
      getStatus: async () => ({
        task_id: "task-1",
        state: "RUNNING",
        percentage: 60
      }),
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
      status: "RUNNING",
      percentage: 60,
      executed: false
    });
  });

  it("fails in dry-run mode when the task record does not exist", async () => {
    const handler = createDeployStopAppHandler({
      getStatus: async () => {
        const error = new Error("record not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      stopApp: async () => {
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

  it("maps stop deploy task into MCP output", async () => {
    const handler = createDeployStopAppHandler({
      getStatus: async () => {
        throw new Error("should not preview");
      },
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
