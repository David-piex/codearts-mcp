import { describe, expect, it } from "vitest";
import { createCheckRunTaskHandler } from "../../../../src/products/check/tools/run-task.js";

describe("createCheckRunTaskHandler", () => {
  it("returns a dry-run summary when requested", async () => {
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
        throw new Error("should not run");
      }
    });

    const result = await handler({
      task_id: "task-1",
      dry_run: true
    });

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

  it("maps executed check task into MCP output", async () => {
    const handler = createCheckRunTaskHandler({
      getTask: async () => {
        throw new Error("should not preview");
      },
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
