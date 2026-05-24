import { describe, expect, it } from "vitest";
import { createCheckUpdateIgnoreFilesHandler, mapUpdatedIgnoreFiles } from "../../../../src/products/check/tools/update-ignore-files.js";

describe("createCheckUpdateIgnoreFilesHandler", () => {
  it("returns a dry-run preview without updating ignored files", async () => {
    const handler = createCheckUpdateIgnoreFilesHandler({
      updateIgnoreFiles: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      nodes: [
        {
          file_path: "src/generated",
          name: "generated",
          is_leaf: false,
          checkbox_status: "all"
        }
      ]
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      nodeCount: 1,
      paths: ["src/generated"],
      executed: false
    });
  });

  it("executes only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckUpdateIgnoreFilesHandler({
      updateIgnoreFiles: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          result: "updated",
          raw: { result: "updated" }
        };
      }
    });

    const result = await handler({
      task_id: "task-1",
      nodes: [
        {
          file_path: "src/generated",
          checkbox_status: "unchecked"
        }
      ],
      dry_run: false
    });

    expect(received).toMatchObject({
      task_id: "task-1",
      nodes: [
        {
          file_path: "src/generated",
          checkbox_status: "unchecked"
        }
      ]
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      result: "updated",
      executed: true
    });
  });
});

describe("mapUpdatedIgnoreFiles", () => {
  it("normalizes update result", () => {
    const result = mapUpdatedIgnoreFiles({
      task_id: "task-1",
      result: "updated",
      executed: true
    });

    expect(result.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      result: "updated",
      executed: true
    });
  });
});
