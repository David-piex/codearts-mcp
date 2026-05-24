import { describe, expect, it } from "vitest";
import { createCheckCreatePdfAsyncJobHandler, mapCreatedPdfAsyncJob } from "../../../../src/products/check/tools/create-pdf-async-job.js";

describe("createCheckCreatePdfAsyncJobHandler", () => {
  it("returns a dry-run preview without creating a PDF job", async () => {
    const handler = createCheckCreatePdfAsyncJobHandler({
      createPdfAsyncJob: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      project_name: "mall4cloud"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      taskId: "task-1",
      projectName: "mall4cloud",
      executed: false
    });
  });

  it("executes only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckCreatePdfAsyncJobHandler({
      createPdfAsyncJob: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          async_job_id: 569151,
          time_ask: 3,
          raw: { asyncJobId: 569151, timeAsk: 3 }
        };
      }
    });

    const result = await handler({
      task_id: "task-1",
      project_name: "mall4cloud",
      dry_run: false
    });

    expect(received).toEqual({
      task_id: "task-1",
      project_name: "mall4cloud",
      dry_run: false
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      asyncJobId: 569151,
      timeAsk: 3,
      executed: true
    });
  });
});

describe("mapCreatedPdfAsyncJob", () => {
  it("normalizes PDF async job result", () => {
    const result = mapCreatedPdfAsyncJob({
      task_id: "task-1",
      async_job_id: 569151,
      time_ask: 3
    });

    expect(result.item).toMatchObject({
      id: "task-1",
      asyncJobId: 569151,
      timeAsk: 3,
      executed: true
    });
  });
});
