import { describe, expect, it } from "vitest";
import {
  createTestPlanExecuteTaskGroupHandler,
  createTestPlanGetTaskGroupDetailHandler,
  createTestPlanListTaskGroupDetailHistoryHandler
} from "../../../../src/products/testplan/tools/task-group-tools.js";

describe("testplan task group tools", () => {
  it("maps task group detail into MCP output", async () => {
    const handler = createTestPlanGetTaskGroupDetailHandler({
      getTaskGroupDetail: async (input) => ({
        task_id: input.task_id,
        tasks: [{ id: input.task_id, name: "nightly run", progress: 75, status: "ok" }],
        total: 1,
        raw: {
          data: [{ id: input.task_id, name: "nightly run", progress: 75, status: "ok" }],
          pageInfo: { total: 1 }
        }
      })
    });

    const result = await handler({
      task_id: "task-group-1",
      x_auth_tenantid: "tenant-1",
      x_auth_groups: "project-1",
      x_user_name: "alice",
      x_auth_token: "token-1"
    });

    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "task-group-1",
      name: "nightly run",
      progress: 75,
      status: "ok"
    });
    expect(result.structuredContent.page_info).toMatchObject({ total: 1 });
  });

  it("maps task group detail history into MCP output", async () => {
    const handler = createTestPlanListTaskGroupDetailHistoryHandler({
      getTaskGroupHistory: async (input) => ({
        task_group_id: input.taskGroupId,
        test_service_id: input.testServiceId,
        raw: {
          data: [
            { id: "history-1", name: "nightly run 1", progress: 100, status: "success" },
            { id: "history-2", name: "nightly run 2", progress: 50, status: "running" }
          ],
          pageInfo: { pageNo: 1, pageSize: 10, totalCount: 2 }
        }
      })
    });

    const result = await handler({
      request_id: "req-1",
      taskGroupId: "tg-1",
      testServiceId: "svc-1",
      x_auth_groups: "project-1",
      x_user_name: "alice",
      x_auth_token: "token-1"
    });

    expect(result.structuredContent.items).toHaveLength(2);
    expect(result.structuredContent.items?.[0]).toMatchObject({
      id: "history-1",
      name: "nightly run 1",
      progress: 100
    });
    expect(result.structuredContent.page_info).toMatchObject({ total: 2 });
  });

  it("returns dry-run preview for task group execution by default", async () => {
    const handler = createTestPlanExecuteTaskGroupHandler({
      executeTaskGroup: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      x_auth_token: "token-1",
      id: "tg-1",
      taskGroupName: "nightly run",
      testServiceId: "svc-1",
      tasks: [{ id: "task-1", task_name: "suite-1" }]
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "tg-1",
      taskGroupId: "tg-1",
      taskGroupName: "nightly run",
      taskCount: 1,
      executed: false
    });
  });

  it("executes task group when dry_run is false", async () => {
    const handler = createTestPlanExecuteTaskGroupHandler({
      executeTaskGroup: async (input) => ({
        task_group_id: input.id,
        value: "run-1",
        raw: { value: "run-1" }
      })
    });

    const result = await handler({
      x_auth_token: "token-1",
      id: "tg-1",
      taskGroupName: "nightly run",
      testServiceId: "svc-1",
      tasks: [{ id: "task-1", task_name: "suite-1" }],
      dry_run: false
    });

    expect(result.structuredContent.item).toMatchObject({
      id: "tg-1",
      taskGroupId: "tg-1",
      value: "run-1",
      taskCount: 1,
      executed: true
    });
  });
});
