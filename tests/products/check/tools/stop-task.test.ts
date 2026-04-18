import { describe, expect, it } from "vitest";
import { createCheckStopTaskHandler, mapStopTaskResult } from "../../../../src/products/check/tools/stop-task.js";

describe("createCheckStopTaskHandler", () => {
  it("returns a real dry-run summary for stopping a check task", async () => {
    const handler = createCheckStopTaskHandler({
      getTask: async () => ({
        task_id: "task-1",
        task_name: "gateway-check",
        project_name: "codearts-mcp",
        repository_name: "gateway",
        branch_name: "master",
        language: "ts",
        status: "RUNNING"
      }),
      stopTask: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1"
    });

    expect(result.structuredContent.summary).toContain("Dry run");
    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      taskName: "gateway-check",
      projectName: "codearts-mcp",
      repositoryName: "gateway",
      branchName: "master",
      language: "ts",
      status: "RUNNING",
      executed: false
    });
  });

  it("fails in dry-run mode when the task does not exist", async () => {
    const handler = createCheckStopTaskHandler({
      getTask: async () => {
        const error = new Error("task not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      stopTask: async () => {
        throw new Error("should not execute");
      }
    });

    await expect(
      handler({
        task_id: "task-1"
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });
});

describe("mapStopTaskResult", () => {
  it("returns normalized stop task result", () => {
    const result = mapStopTaskResult({
      task_id: "task-1",
      status: "stopped"
    });

    expect(result.item).toEqual({
      id: "task-1",
      status: "stopped",
      executed: true
    });
  });
});
