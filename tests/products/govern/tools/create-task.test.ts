import { describe, expect, it } from "vitest";
import { createGovernCreateTaskHandler } from "../../../../src/products/govern/tools/create-task.js";

describe("createGovernCreateTaskHandler", () => {
  it("supports dry run previews", async () => {
    const handler = createGovernCreateTaskHandler({
      createTask: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100,
      dry_run: true
    });

    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      filePath: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      fileName: "demo.bin",
      fileSize: 100,
      executed: false
    });
  });

  it("maps created govern tasks into MCP output", async () => {
    const handler = createGovernCreateTaskHandler({
      createTask: async () => ({
        id: "task-1",
        file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
        file_name: "demo.bin",
        file_size: 100
      })
    });

    const result = await handler({
      project_id: "project-1",
      file_path: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      file_name: "demo.bin",
      file_size: 100,
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      filePath: "/secbinarycheck/pre-signed/2024/01/01/demo.bin",
      fileName: "demo.bin",
      fileSize: 100,
      executed: true
    });
  });
});
