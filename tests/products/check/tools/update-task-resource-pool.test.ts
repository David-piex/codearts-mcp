import { describe, expect, it } from "vitest";
import {
  createCheckUpdateTaskResourcePoolHandler,
  mapUpdatedTaskResourcePool
} from "../../../../src/products/check/tools/update-task-resource-pool.js";

describe("createCheckUpdateTaskResourcePoolHandler", () => {
  it("returns a dry-run preview without updating task resource pool", async () => {
    const handler = createCheckUpdateTaskResourcePoolHandler({
      updateTaskResourcePool: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      resource_pool_id: "pool-2",
      resource_pool_type: "custom"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      resourcePoolId: "pool-2",
      resourcePoolType: "custom",
      executed: false
    });
  });

  it("executes only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckUpdateTaskResourcePoolHandler({
      updateTaskResourcePool: async (input) => {
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
      resource_pool_id: "pool-2",
      resource_pool_type: "custom",
      body: {
        pool_name: "high-cpu"
      },
      dry_run: false
    });

    expect(received).toMatchObject({
      task_id: "task-1",
      resource_pool_id: "pool-2",
      resource_pool_type: "custom",
      body: {
        pool_name: "high-cpu"
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

describe("mapUpdatedTaskResourcePool", () => {
  it("normalizes update result", () => {
    const result = mapUpdatedTaskResourcePool({
      task_id: "task-1",
      resource_pool_id: "pool-2",
      resource_pool_type: "custom",
      status: "success",
      result: "updated",
      executed: true
    });

    expect(result.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      resourcePoolId: "pool-2",
      resourcePoolType: "custom",
      status: "success",
      result: "updated",
      executed: true
    });
  });
});
