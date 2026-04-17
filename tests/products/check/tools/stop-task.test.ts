import { describe, expect, it } from "vitest";
import {
  mapStopTaskResult,
  previewStopTask
} from "../../../../src/products/check/tools/stop-task.js";

describe("previewStopTask", () => {
  it("returns a dry-run summary for stopping a check task", () => {
    const result = previewStopTask({
      task_id: "task-1",
      dry_run: true
    });

    expect(result.summary).toContain("Dry run");
    expect(result.item).toEqual({
      id: "task-1",
      executed: false
    });
  });
});

describe("mapStopTaskResult", () => {
  it("returns normalized stop task result", () => {
    const result = mapStopTaskResult({
      task_id: "task-1",
      status: "stopped"
    });

    expect(result.item).toEqual({
      id: "task-1",
      status: "stopped",
      executed: true
    });
  });
});
