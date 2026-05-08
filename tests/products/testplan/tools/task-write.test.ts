import { describe, expect, it } from "vitest";
import { createTestPlanBatchDeleteTasksHandler } from "../../../../src/products/testplan/tools/batch-delete-tasks.js";
import { createTestPlanCreateTaskHandler } from "../../../../src/products/testplan/tools/create-task.js";
import { createTestPlanCreateTaskRelationsHandler } from "../../../../src/products/testplan/tools/create-task-relations.js";
import { createTestPlanInitTaskExecutionHandler } from "../../../../src/products/testplan/tools/init-task-execution.js";
import { createTestPlanStopTaskExecutionHandler } from "../../../../src/products/testplan/tools/stop-task-execution.js";
import { createTestPlanUpdateTaskHandler } from "../../../../src/products/testplan/tools/update-task.js";

describe("testplan task write handlers", () => {
  it("returns dry-run previews by default", async () => {
    const createHandler = createTestPlanCreateTaskHandler({
      createTask: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const updateHandler = createTestPlanUpdateTaskHandler({
      updateTask: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const deleteHandler = createTestPlanBatchDeleteTasksHandler({
      batchDeleteTasks: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const relationsHandler = createTestPlanCreateTaskRelationsHandler({
      createTaskRelations: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const initHandler = createTestPlanInitTaskExecutionHandler({
      initTaskExecution: async () => {
        throw new Error("should not execute in dry run");
      }
    });
    const stopHandler = createTestPlanStopTaskExecutionHandler({
      stopTaskExecution: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      createHandler({ project_id: "project-1", name: "smoke suite" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create test plan task smoke suite",
        item: { executed: false }
      }
    });
    await expect(
      updateHandler({ project_id: "project-1", task_uri: "task-1", name: "smoke suite" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: update test plan task task-1",
        item: { executed: false }
      }
    });
    await expect(
      deleteHandler({ project_id: "project-1", task_uris: ["task-1", "task-2"] })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: delete 2 test plan tasks",
        item: { executed: false, deletedCount: 2 }
      }
    });
    await expect(
      relationsHandler({ project_id: "project-1", name: "suite with relations" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: create test plan task relations suite with relations",
        item: { executed: false }
      }
    });
    await expect(
      initHandler({ project_id: "project-1", task_uri: "task-1" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: initialize test plan task execution task-1",
        item: { executed: false }
      }
    });
    await expect(
      stopHandler({ project_id: "project-1", task_uri: "task-1", result_uri: "result-1" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Dry run: stop test plan task execution result-1",
        item: { executed: false }
      }
    });
  });

  it("executes when dry_run is false", async () => {
    const createHandler = createTestPlanCreateTaskHandler({
      createTask: async (input) => ({
        task_id: "task-1",
        name: input.name,
        version_uri: input.version_uri,
        status_code: 1,
        status_name: "ready"
      })
    });
    const updateHandler = createTestPlanUpdateTaskHandler({
      updateTask: async (input) => ({
        task_id: input.task_uri,
        name: input.name,
        version_uri: input.version_uri,
        status_code: 2,
        status_name: "done"
      })
    });
    const deleteHandler = createTestPlanBatchDeleteTasksHandler({
      batchDeleteTasks: async (input) => ({
        task_uris: input.task_uris,
        deleted_count: input.task_uris.length
      })
    });
    const relationsHandler = createTestPlanCreateTaskRelationsHandler({
      createTaskRelations: async (input) => ({
        task_id: "task-1",
        name: input.name,
        version_uri: input.version_uri,
        status_code: 1,
        status_name: "ready"
      })
    });
    const initHandler = createTestPlanInitTaskExecutionHandler({
      initTaskExecution: async (input) => ({
        result_id: "result-1",
        task_uri: input.task_uri,
        total: 1,
        has_more: false
      })
    });
    const stopHandler = createTestPlanStopTaskExecutionHandler({
      stopTaskExecution: async (input) => ({
        result_uri: input.result_uri,
        value: "ok",
        stopped: true
      })
    });

    await expect(
      createHandler({
        project_id: "project-1",
        name: "smoke suite",
        version_uri: "version-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "task-1", executed: true, statusName: "ready" }
      }
    });
    await expect(
      updateHandler({
        project_id: "project-1",
        task_uri: "task-1",
        name: "smoke suite updated",
        version_uri: "version-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "task-1", executed: true, statusName: "done" }
      }
    });
    await expect(
      deleteHandler({
        project_id: "project-1",
        task_uris: ["task-1", "task-2"],
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { executed: true, deletedCount: 2 }
      }
    });
    await expect(
      relationsHandler({
        project_id: "project-1",
        name: "suite with relations",
        version_uri: "version-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "task-1", executed: true, statusName: "ready" }
      }
    });
    await expect(
      initHandler({
        project_id: "project-1",
        task_uri: "task-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "result-1", executed: true, total: 1 }
      }
    });
    await expect(
      stopHandler({
        project_id: "project-1",
        task_uri: "task-1",
        result_uri: "result-1",
        dry_run: false
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "result-1", executed: true, stopped: true }
      }
    });
  });
});
