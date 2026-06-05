import { describe, expect, it } from "vitest";
import {
  createCheckUpdatePipelineTaskHandler,
  mapUpdatedPipelineTask
} from "../../../../src/products/check/tools/update-pipeline-task.js";

describe("createCheckUpdatePipelineTaskHandler", () => {
  it("returns a dry-run preview without updating pipeline task", async () => {
    const handler = createCheckUpdatePipelineTaskHandler({
      updatePipelineTask: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      body: {
        task_name: "pipeline-check"
      }
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      executed: false
    });
  });

  it("executes only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckUpdatePipelineTaskHandler({
      updatePipelineTask: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          status: "success",
          result: "updated",
          raw: { status: "success", result: "updated" }
        };
      }
    });

    const result = await handler({
      task_id: "task-1",
      body: {
        task_name: "pipeline-check"
      },
      dry_run: false
    });

    expect(received).toMatchObject({
      task_id: "task-1",
      body: {
        task_name: "pipeline-check"
      }
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      status: "success",
      result: "updated",
      executed: true
    });
  });
});

describe("mapUpdatedPipelineTask", () => {
  it("normalizes update result", () => {
    const result = mapUpdatedPipelineTask({
      task_id: "task-1",
      status: "success",
      result: "updated",
      executed: true
    });

    expect(result.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      status: "success",
      result: "updated",
      executed: true
    });
  });
});
