import { describe, expect, it } from "vitest";
import { createCheckRunTaskHandler } from "../../../../src/products/check/tools/run-task.js";

describe("createCheckRunTaskHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createCheckRunTaskHandler({
      runTask: async () => {
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

  it("maps executed check task into MCP output", async () => {
    const handler = createCheckRunTaskHandler({
      runTask: async () => ({
        task_id: "task-1",
        job_id: "job-1",
        status: "running"
      })
    });

    const result = await handler({
      task_id: "task-1",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      jobId: "job-1",
      status: "running",
      executed: true
    });
  });
});
