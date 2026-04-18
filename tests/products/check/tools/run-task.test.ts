import { describe, expect, it } from "vitest";
import { createCheckRunTaskHandler, mapRunTaskResult } from "../../../../src/products/check/tools/run-task.js";

describe("createCheckRunTaskHandler", () => {
  it("returns a real dry-run summary for running a check task", async () => {
    const handler = createCheckRunTaskHandler({
      getTask: async () => ({
        task_id: "task-1",
        task_name: "gateway-check",
        project_name: "codearts-mcp",
        repository_name: "gateway",
        branch_name: "master",
        language: "ts",
        status: "READY"
      }),
      runTask: async () => {
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
      status: "READY",
      executed: false
    });
  });

  it("fails in dry-run mode when the task does not exist", async () => {
    const handler = createCheckRunTaskHandler({
      getTask: async () => {
        const error = new Error("task not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      runTask: async () => {
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

describe("mapRunTaskResult", () => {
  it("returns normalized run task result", () => {
    const result = mapRunTaskResult({
      task_id: "task-1",
      job_id: "job-1",
      status: "running"
    });

    expect(result.item).toEqual({
      id: "task-1",
      jobId: "job-1",
      status: "running",
      executed: true
    });
  });
});
