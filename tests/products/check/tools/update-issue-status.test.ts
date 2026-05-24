import { describe, expect, it } from "vitest";
import { createCheckUpdateIssueStatusHandler, mapUpdatedIssueStatus } from "../../../../src/products/check/tools/update-issue-status.js";

describe("createCheckUpdateIssueStatusHandler", () => {
  it("returns a dry-run preview without updating the issue", async () => {
    const handler = createCheckUpdateIssueStatusHandler({
      updateIssueStatus: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      status: "5",
      comment: "tool false positive",
      merge_key: "merge-1"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "merge-1",
      taskId: "task-1",
      status: "5",
      comment: "tool false positive",
      executed: false
    });
  });

  it("executes only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckUpdateIssueStatusHandler({
      updateIssueStatus: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          merge_key: input.merge_key,
          status: "success",
          result: "ok",
          raw: { status: "success", result: "ok" }
        };
      }
    });

    const result = await handler({
      task_id: "task-1",
      status: "2",
      comment: "fixed",
      merge_key: "merge-1",
      dry_run: false
    });

    expect(received).toMatchObject({
      task_id: "task-1",
      merge_key: "merge-1",
      status: "2"
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "merge-1",
      result: "ok",
      executed: true
    });
  });
});

describe("mapUpdatedIssueStatus", () => {
  it("normalizes update result", () => {
    const result = mapUpdatedIssueStatus({
      task_id: "task-1",
      merge_key: "merge-1",
      status: "success",
      result: "ok"
    });

    expect(result.item).toMatchObject({
      id: "merge-1",
      taskId: "task-1",
      status: "success",
      result: "ok",
      executed: true
    });
  });
});
