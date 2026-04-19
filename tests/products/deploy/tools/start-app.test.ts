import { describe, expect, it } from "vitest";
import { createDeployStartAppHandler } from "../../../../src/products/deploy/tools/start-app.js";

describe("createDeployStartAppHandler", () => {
  it("returns a real dry-run preview by default", async () => {
    const handler = createDeployStartAppHandler({
      getTask: async () => ({
        task_id: "task-1",
        name: "demo-task",
        project_id: "project-1",
        state: "READY",
        can_execute: true
      }),
      startApp: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    const result = await handler({
      task_id: "task-1",
      trigger_source: 1,
      params: [{ name: "CODEARTS_ARTIFACT_VERSION", type: "text", value: "1.0.0" }]
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      taskName: "demo-task",
      projectId: "project-1",
      status: "READY",
      canExecute: true,
      triggerSource: 1,
      paramCount: 1,
      executed: false
    });
  });

  it("fails in dry-run mode when the task does not exist", async () => {
    const handler = createDeployStartAppHandler({
      getTask: async () => {
        const error = new Error("task not found") as Error & { status?: number };
        error.status = 404;
        throw error;
      },
      startApp: async () => {
        throw new Error("should not execute in dry run");
      }
    });

    await expect(
      handler({
        task_id: "missing-task"
      })
    ).rejects.toMatchObject({
      status: 404
    });
  });

  it("maps start deploy task into MCP output", async () => {
    const handler = createDeployStartAppHandler({
      getTask: async () => {
        throw new Error("should not preview");
      },
      startApp: async () => ({
        task_id: "task-1",
        record_id: "record-1",
        job_name: "demo-task",
        status: "RUNNING",
        app_component_list: [
          {
            task_id: "task-1",
            app_id: "app-1",
            app_name: "gateway-prod",
            comp_id: "component-1",
            comp_name: "gateway",
            region: "cn-north-4",
            state: "RUNNING"
          }
        ]
      })
    });

    const result = await handler({
      task_id: "task-1",
      trigger_source: 1,
      params: [{ name: "CODEARTS_ARTIFACT_VERSION", type: "text", value: "1.0.0" }],
      dry_run: false
    });

    expect(result.structuredContent.item).toEqual({
      id: "task-1",
      recordId: "record-1",
      jobName: "demo-task",
      status: "RUNNING",
      componentCount: 1,
      components: [
        {
          taskId: "task-1",
          appId: "app-1",
          appName: "gateway-prod",
          componentId: "component-1",
          componentName: "gateway",
          region: "cn-north-4",
          state: "RUNNING"
        }
      ],
      executed: true
    });
  });
});
