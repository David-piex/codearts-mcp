import { describe, expect, it } from "vitest";
import { createCheckUpdateCheckModeHandler, mapUpdatedCheckMode } from "../../../../src/products/check/tools/update-check-mode.js";

describe("createCheckUpdateCheckModeHandler", () => {
  it("returns a dry-run preview without updating check mode", async () => {
    const handler = createCheckUpdateCheckModeHandler({
      updateCheckMode: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      mr_check_mode: 0
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      mrCheckMode: 0,
      executed: false
    });
  });

  it("executes only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckUpdateCheckModeHandler({
      updateCheckMode: async (input) => {
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
      mr_check_mode: 4,
      dry_run: false
    });

    expect(received).toMatchObject({
      task_id: "task-1",
      mr_check_mode: 4
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      status: "success",
      result: "updated",
      executed: true
    });
  });
});

describe("mapUpdatedCheckMode", () => {
  it("normalizes update result", () => {
    const result = mapUpdatedCheckMode({
      task_id: "task-1",
      mr_check_mode: 5,
      status: "success",
      result: "updated",
      executed: true
    });

    expect(result.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      mrCheckMode: 5,
      status: "success",
      result: "updated",
      executed: true
    });
  });
});
