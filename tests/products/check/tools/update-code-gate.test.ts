import { describe, expect, it } from "vitest";
import { createCheckUpdateCodeGateHandler, mapUpdatedCodeGate } from "../../../../src/products/check/tools/update-code-gate.js";

describe("createCheckUpdateCodeGateHandler", () => {
  it("returns a dry-run preview without updating code gate", async () => {
    const handler = createCheckUpdateCodeGateHandler({
      updateCodeGate: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      review_data: [
        {
          compare_type: ">=",
          is_check: 1,
          name: "fatal",
          value: 0
        }
      ]
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      reviewDataCount: 1,
      executed: false
    });
  });

  it("executes only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckUpdateCodeGateHandler({
      updateCodeGate: async (input) => {
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
      review_data: [
        {
          compare_type: ">=",
          is_check: 1,
          name: "fatal",
          value: 0
        }
      ],
      dry_run: false
    });

    expect(received).toMatchObject({
      task_id: "task-1",
      review_data: [
        {
          compare_type: ">=",
          is_check: 1,
          name: "fatal",
          value: 0
        }
      ]
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      status: "success",
      result: "updated",
      executed: true
    });
  });
});

describe("mapUpdatedCodeGate", () => {
  it("normalizes update result", () => {
    const result = mapUpdatedCodeGate({
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
