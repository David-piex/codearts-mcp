import { describe, expect, it, vi } from "vitest";
import { createCheckDeleteTaskHandler } from "../../../../src/products/check/tools/delete-task.js";
import { createCheckGetTransmissionReviewDataHandler } from "../../../../src/products/check/tools/get-transmission-review-data.js";
import { createCheckRefreshJobResultHandler } from "../../../../src/products/check/tools/refresh-job-result.js";
import { createCheckUpdateTaskSettingsHandler } from "../../../../src/products/check/tools/update-task-settings.js";

describe("Check token-header tools", () => {
  it("previews delete task and refresh job result by default", async () => {
    const deleteHandler = createCheckDeleteTaskHandler({
      deleteTask: async () => {
        throw new Error("dry run should not delete task");
      }
    });
    const refreshHandler = createCheckRefreshJobResultHandler({
      refreshJobResult: async () => {
        throw new Error("dry run should not refresh job result");
      }
    });

    await expect(deleteHandler({
      task_id: "task-1",
      x_auth_token: "token-1"
    })).resolves.toMatchObject({
      content: [{ text: expect.stringContaining("Dry run: delete Check task task-1") }]
    });
    await expect(refreshHandler({
      job_id: "job-1",
      x_auth_token: "token-2"
    })).resolves.toMatchObject({
      content: [{ text: expect.stringContaining("Dry run: refresh Check job result job-1") }]
    });
  });

  it("executes update task settings and refresh job result", async () => {
    const updateClient = {
      updateTaskSettings: vi.fn(async () => ({
        task_id: "task-1",
        status: "success",
        result: "updated",
        raw: {}
      }))
    };
    const refreshClient = {
      refreshJobResult: vi.fn(async () => ({
        job_id: "job-1",
        task_id: "task-1",
        async: false,
        status: "success",
        raw: { REPORT_URL: "https://example.com/report" }
      }))
    };

    const updateHandler = createCheckUpdateTaskSettingsHandler(updateClient);
    const refreshHandler = createCheckRefreshJobResultHandler(refreshClient);

    await expect(updateHandler({
      project_id: "project-1",
      task_id: "task-1",
      x_auth_token: "token-1",
      task_advanced_settings: [{ key: "scan_range", value: "full" }],
      dry_run: false
    })).resolves.toMatchObject({
      content: [{ text: expect.stringContaining("Updated Check task settings task-1") }]
    });
    expect(updateClient.updateTaskSettings).toHaveBeenCalledWith({
      project_id: "project-1",
      task_id: "task-1",
      x_auth_token: "token-1",
      task_advanced_settings: [{ key: "scan_range", value: "full" }],
      dry_run: false
    });

    await expect(refreshHandler({
      job_id: "job-1",
      task_id: "task-1",
      async: false,
      x_auth_token: "token-2",
      dry_run: false
    })).resolves.toMatchObject({
      content: [{ text: expect.stringContaining("Refreshed Check job result job-1") }]
    });
    expect(refreshClient.refreshJobResult).toHaveBeenCalledWith({
      job_id: "job-1",
      task_id: "task-1",
      async: false,
      x_auth_token: "token-2",
      dry_run: false
    });
  });

  it("loads transmission review data", async () => {
    const handler = createCheckGetTransmissionReviewDataHandler({
      getTransmissionReviewData: async () => ({
        status: "success",
        http_status: "OK",
        raw: {
          review_info: [{ name: "严重问题数", value: 3 }]
        }
      })
    });

    const result = await handler({
      is_check_project: 1,
      project_id: "project-1",
      x_auth_token: "token-1"
    });

    expect(result.content[0]?.text).toContain("Loaded Check transmission review data project-1");
    expect(result.structuredContent.item).toMatchObject({
      id: "project-1",
      isCheckProject: 1,
      status: "success",
      httpStatus: "OK",
      reviewData: {
        review_info: [{ name: "严重问题数", value: 3 }]
      }
    });
  });
});
