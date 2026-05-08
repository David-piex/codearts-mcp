import { describe, expect, it } from "vitest";
import { createTestPlanBatchDeleteTasksHandler } from "../../../../src/products/testplan/tools/batch-delete-tasks.js";
import { createTestPlanCreateTaskHandler } from "../../../../src/products/testplan/tools/create-task.js";
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
  });
});
