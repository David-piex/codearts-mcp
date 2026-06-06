import { describe, expect, it } from "vitest";
import { createCheckBatchCopyAsyncTasksHandler } from "../../../../src/products/check/tools/batch-copy-async-tasks.js";
import { createCheckStopTaskV1Handler } from "../../../../src/products/check/tools/stop-task-v1.js";
import { createCheckUpdateDefectStatusHandler } from "../../../../src/products/check/tools/update-defect-status.js";
import { createCheckUpdateIgnorePathHandler } from "../../../../src/products/check/tools/update-ignore-path.js";
import { createCheckUpdateTaskRulesetHandler } from "../../../../src/products/check/tools/update-task-ruleset.js";

describe("official Check task mutation handlers", () => {
  it("previews v1 stop task by default", async () => {
    const handler = createCheckStopTaskV1Handler({
      stopTaskV1: async () => {
        throw new Error("should not execute");
      }
    });

    const result = await handler({
      task_id: "task-1",
      job_id: "job-1",
      operator: "szh"
    });

    expect(result.content[0]?.text).toContain("Dry run");
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      jobId: "job-1",
      operator: "szh",
      executed: false
    });
  });

  it("executes v1 stop task only when dry_run is false", async () => {
    let received: unknown;
    const handler = createCheckStopTaskV1Handler({
      stopTaskV1: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          job_id: input.job_id,
          status: "ok",
          result: "success",
          raw: { status: "ok", result: "success" }
        };
      }
    });

    const result = await handler({
      task_id: "task-1",
      job_id: "job-1",
      dry_run: false
    });

    expect(received).toMatchObject({
      task_id: "task-1",
      job_id: "job-1"
    });
    expect(result.structuredContent.item).toMatchObject({
      id: "task-1",
      status: "ok",
      result: "success",
      executed: true
    });
  });

  it("previews and executes task ruleset updates", async () => {
    let received: unknown;
    const handler = createCheckUpdateTaskRulesetHandler({
      updateTaskRuleset: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          status: "ok",
          result: "updated",
          raw: { status: "ok", result: "updated" }
        };
      }
    });

    const dryRun = await handler({
      task_id: "task-1",
      rulesets: [
        {
          language: "cpp",
          rule_set_id: "ruleset-1",
          if_use: "1"
        }
      ]
    });
    expect(dryRun.structuredContent.item).toMatchObject({
      id: "task-1",
      rulesetCount: 1,
      rulesetIds: ["ruleset-1"],
      executed: false
    });

    const executed = await handler({
      task_id: "task-1",
      rulesets: [
        {
          language: "cpp",
          rule_set_id: "ruleset-1",
          if_use: "1"
        }
      ],
      dry_run: false
    });
    expect(received).toMatchObject({
      task_id: "task-1",
      rulesets: [
        {
          language: "cpp",
          rule_set_id: "ruleset-1",
          if_use: "1",
          status: "1"
        }
      ]
    });
    expect(executed.structuredContent.item).toMatchObject({
      result: "updated",
      executed: true
    });
  });

  it("previews and executes ignore path updates", async () => {
    let received: unknown;
    const handler = createCheckUpdateIgnorePathHandler({
      updateIgnorePath: async (input) => {
        received = input;
        return {
          project_id: input.project_id,
          task_id: input.task_id,
          status: "ok",
          result: "updated",
          raw: { status: "ok", result: "updated" }
        };
      }
    });

    const dryRun = await handler({
      project_id: "project-1",
      task_id: "task-1",
      ignore_path_settings: [
        {
          file_path: ".LAST_RELEASE",
          checkbox_status: "all"
        }
      ]
    });
    expect(dryRun.structuredContent.item).toMatchObject({
      id: "task-1",
      projectId: "project-1",
      pathCount: 1,
      paths: [".LAST_RELEASE"],
      executed: false
    });

    const executed = await handler({
      project_id: "project-1",
      task_id: "task-1",
      ignore_path_settings: [
        {
          file_path: ".LAST_RELEASE",
          checkbox_status: "all"
        }
      ],
      dry_run: false
    });
    expect(received).toMatchObject({
      project_id: "project-1",
      task_id: "task-1"
    });
    expect(executed.structuredContent.item).toMatchObject({
      result: "updated",
      executed: true
    });
  });

  it("previews and executes defect status updates", async () => {
    let received: unknown;
    const handler = createCheckUpdateDefectStatusHandler({
      updateDefectStatus: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          defect_id: input.defect_id,
          defect_status: input.defect_status,
          status: "ok",
          result: "updated",
          raw: { status: "ok", result: "updated" }
        };
      }
    });

    const dryRun = await handler({
      task_id: "task-1",
      defect_id: "defect-1",
      defect_status: "1"
    });
    expect(dryRun.structuredContent.item).toMatchObject({
      id: "defect-1",
      taskId: "task-1",
      defectStatus: "1",
      executed: false
    });

    const executed = await handler({
      task_id: "task-1",
      defect_id: "defect-1",
      defect_status: "1",
      dry_run: false
    });
    expect(received).toMatchObject({
      task_id: "task-1",
      defect_id: "defect-1",
      defect_status: "1"
    });
    expect(executed.structuredContent.item).toMatchObject({
      result: "updated",
      executed: true
    });
  });

  it("previews and executes async task batch copy", async () => {
    let received: unknown;
    const handler = createCheckBatchCopyAsyncTasksHandler({
      batchCopyAsyncTasks: async (input) => {
        received = input;
        return {
          task_id: input.task_id,
          status: "ok",
          result: "queued",
          raw: { status: "ok", result: "queued" }
        };
      }
    });

    const dryRun = await handler({
      task_id: "task-1",
      tasks: [
        {
          task_id: "source-task-1",
          task_name: "copied-check"
        }
      ]
    });
    expect(dryRun.structuredContent.item).toMatchObject({
      id: "task-1",
      taskCount: 1,
      executed: false
    });

    const executed = await handler({
      task_id: "task-1",
      tasks: [
        {
          task_id: "source-task-1",
          task_name: "copied-check"
        }
      ],
      dry_run: false
    });
    expect(received).toMatchObject({
      task_id: "task-1",
      tasks: [
        {
          task_id: "source-task-1",
          task_name: "copied-check"
        }
      ]
    });
    expect(executed.structuredContent.item).toMatchObject({
      result: "queued",
      executed: true
    });
  });
});
