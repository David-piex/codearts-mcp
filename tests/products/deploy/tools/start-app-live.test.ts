import { describe, expect, it } from "vitest";
import { createDeployStartAppHandler } from "../../../../src/products/deploy/tools/start-app.js";

describe("createDeployStartAppHandler", () => {
  it("maps start deploy task into MCP output", async () => {
    const handler = createDeployStartAppHandler({
      startApp: async () => ({
        task_id: "task-1",
        job_id: "job-1",
        status: "RUNNING"
      })
    });

    const result = await handler({ task_id: "task-1", dry_run: false });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      jobId: "job-1",
      status: "RUNNING",
      executed: true
    });
  });
});
