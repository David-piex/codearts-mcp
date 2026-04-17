import { describe, expect, it } from "vitest";
import {
  mapRunTaskResult,
  previewRunTask
} from "../../../../src/products/check/tools/run-task.js";

describe("previewRunTask", () => {
  it("returns a dry-run summary for running a check task", () => {
    const result = previewRunTask({
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

describe("mapRunTaskResult", () => {
  it("returns normalized run task result", () => {
    const result = mapRunTaskResult({
      task_id: "task-1",
      job_id: "job-1",
      status: "running"
    });

    expect(result.item).toEqual({
      id: "task-1",
      jobId: "job-1",
      status: "running",
      executed: true
    });
  });
});
