import { describe, expect, it } from "vitest";
import {
  createCheckGetMetricsHandler,
  mapCheckMetrics
} from "../../../../src/products/check/tools/get-metrics.js";

describe("mapCheckMetrics", () => {
  it("returns normalized check metrics data", () => {
    const result = mapCheckMetrics({
      task_id: "task-1",
      code_lines: 1200,
      issues_count: 8,
      duplicated_lines: 24
    });

    expect(result.item).toEqual({
      id: "task-1",
      codeLines: 1200,
      issuesCount: 8,
      duplicatedLines: 24
    });
  });

  it("passes optional project_id through to the client", async () => {
    let receivedInput: unknown;
    const handler = createCheckGetMetricsHandler({
      getMetrics: async (input) => {
        receivedInput = input;
        return {
          task_id: input.task_id
        };
      }
    });

    await handler({
      project_id: "project-1",
      task_id: "task-1"
    });

    expect(receivedInput).toEqual({
      project_id: "project-1",
      task_id: "task-1"
    });
  });
});
