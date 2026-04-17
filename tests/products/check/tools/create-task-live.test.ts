import { describe, expect, it } from "vitest";
import { createCheckCreateTaskHandler } from "../../../../src/products/check/tools/create-task.js";

describe("createCheckCreateTaskHandler", () => {
  it("returns a dry-run summary when requested", async () => {
    const handler = createCheckCreateTaskHandler({
      createTask: async () => {
        throw new Error("should not run");
      }
    });

    const result = await handler({
      project_id: "project-1",
      task_name: "gateway-main",
      git_url: "https://codehub.example.com/gateway.git",
      git_branch: "main",
      language: "java",
      dry_run: true
    });

    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      name: "gateway-main",
      repositoryUrl: "https://codehub.example.com/gateway.git",
      branchName: "main",
      language: "java",
      executed: false
    });
  });

  it("maps created check task into MCP output", async () => {
    const handler = createCheckCreateTaskHandler({
      createTask: async () => ({
        task_id: "task-1",
        task_name: "gateway-main",
        project_id: "project-1",
        git_url: "https://codehub.example.com/gateway.git",
        git_branch: "main",
        language: "java",
        status: "created"
      })
    });

    const result = await handler({
      project_id: "project-1",
      task_name: "gateway-main",
      git_url: "https://codehub.example.com/gateway.git",
      git_branch: "main",
      language: "java",
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      projectId: "project-1",
      name: "gateway-main",
      repositoryUrl: "https://codehub.example.com/gateway.git",
      branchName: "main",
      language: "java",
      status: "created",
      executed: true
    });
  });
});
