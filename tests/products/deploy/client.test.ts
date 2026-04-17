import { describe, expect, it } from "vitest";
import { AppError } from "../../../src/core/errors/app-error.js";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient", () => {
  it("maps execution params list responses", async () => {
    const client = createDeployClient({
      get: async () => [{ name: "service_port", type: "text", value: "8080" }]
    } as never);

    const result = await client.getExecutionParams({ task_id: "task-1", record_id: "record-1" });

    expect(result).toEqual({
      task_id: "task-1",
      record_id: "record-1",
      params: [{ name: "service_port", type: "text", value: "8080" }]
    });
  });

  it("maps app log responses with nested result", async () => {
    let requestedPath = "";
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            has_more: true,
            text: "[INFO] ok",
            offset: "0",
            end_offset: "42"
          },
          status: "success"
        };
      }
    } as never);

    const result = await client.getAppLog({
      application_id: "app-1",
      record_id: "record-1",
      offset: "0",
      end_offset: "0"
    });

    expect(result).toEqual({
      application_id: "app-1",
      record_id: "record-1",
      status: "success",
      has_more: true,
      text: "[INFO] ok",
      offset: "0",
      end_offset: "42"
    });
    expect(requestedPath).toContain("/v1/applications/app-1/records/record-1/logs?");
  });

  it("passes optional step_id when loading app log", async () => {
    let requestedPath = "";
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPath = path;
        return { status: "success" };
      }
    } as never);

    await client.getAppLog({
      application_id: "app-1",
      record_id: "record-1",
      step_id: "step-1",
      offset: "0",
      end_offset: "100"
    });

    expect(requestedPath).toContain("step_id=step-1");
  });

  it("uses page and size when listing deploy applications", async () => {
    let requestedBody: unknown;
    const client = createDeployClient({
      post: async (_path: string, body: unknown) => {
        requestedBody = body;
        return {
          applications: [{ application_id: "app-1", name: "gateway-prod" }],
          total_num: 1
        };
      }
    } as never);

    const result = await client.listApps({ project_id: "project-1", page: 2, page_size: 20 });

    expect(requestedBody).toEqual({
      project_id: "project-1",
      page: 2,
      size: 20,
      name: undefined
    });
    expect(result.total).toBe(1);
  });

  it("uses page and size when listing deploy tasks", async () => {
    let requestedPath = "";
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          tasks: [{ task_id: "task-1", application_name: "gateway-prod" }],
          total_count: 1
        };
      }
    } as never);

    const result = await client.listTasks({ project_id: "project-1", page: 2, page_size: 20 });

    expect(requestedPath).toContain("/v2/project-1/tasks/list?page=2&size=20");
    expect(result.total).toBe(1);
  });

  it("prefers new execution params endpoint and falls back compatibly", async () => {
    const seen: string[] = [];
    const client = createDeployClient({
      get: async (path: string) => {
        seen.push(path);
        if (path.includes("/v2/history/tasks/")) {
          return [{ name: "service_port", type: "text", value: "8080" }];
        }

        throw new Error("unexpected fallback");
      }
    } as never);

    const result = await client.getExecutionParams({ task_id: "task-1", record_id: "record-1" });

    expect(seen[0]).toContain("/v2/history/tasks/task-1/params?record_id=record-1");
    expect(result.params).toEqual([{ name: "service_port", type: "text", value: "8080" }]);
  });

  it("does not mask provider errors from the new execution params endpoint", async () => {
    const seen: string[] = [];
    const providerError = new AppError(
      "provider_error",
      "无执行记录",
      "Deploy.00011303"
    );
    const client = createDeployClient({
      get: async (path: string) => {
        seen.push(path);
        if (path.includes("/v2/history/tasks/")) {
          throw providerError;
        }

        throw new Error("unexpected fallback");
      }
    } as never);

    await expect(
      client.getExecutionParams({ task_id: "task-1", record_id: "record-1" })
    ).rejects.toBe(providerError);
    expect(seen).toEqual(["/v2/history/tasks/task-1/params?record_id=record-1"]);
  });

  it("prefers new histories endpoint when date filters are provided", async () => {
    const seen: string[] = [];
    const client = createDeployClient({
      get: async (path: string) => {
        seen.push(path);
        return {
          result: [{ id: "history-1", task_id: "task-1", operator_name: "yao", status: "success" }],
          total_num: 1
        };
      }
    } as never);

    const result = await client.listHistories({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20,
      start_date: "2026-04-01",
      end_date: "2026-04-16"
    });

    expect(seen[0]).toContain("/v2/project-1/task/task-1/history?page=1&size=20");
    expect(seen[0]).toContain("start_date=2026-04-01");
    expect(seen[0]).toContain("end_date=2026-04-16");
    expect(result.histories).toEqual([
      {
        id: "history-1",
        task_id: "task-1",
        operator_name: "yao",
        status: "success"
      }
    ]);
    expect(result.total).toBe(1);
  });

  it("requires start_date and end_date when listing histories", async () => {
    const client = createDeployClient({
      get: async (path: string) => {
        throw new Error(`unexpected request: ${path}`);
      }
    } as never);

    await expect(
      client.listHistories({
        project_id: "project-1",
        task_id: "task-1",
        page: 2,
        page_size: 20
      })
    ).rejects.toEqual(
      new AppError(
        "validation_error",
        "Deploy history queries require both start_date and end_date."
      )
    );
  });

  it("passes optional date filters when listing histories", async () => {
    let requestedPath = "";
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPath = path;
        return { result: [], total_num: 0 };
      }
    } as never);

    await client.listHistories({
      project_id: "project-1",
      task_id: "task-1",
      page: 1,
      page_size: 20,
      start_date: "2026-04-01",
      end_date: "2026-04-16"
    });

    expect(requestedPath).toContain("start_date=2026-04-01");
    expect(requestedPath).toContain("end_date=2026-04-16");
  });

  it("passes record_id when loading deploy status", async () => {
    let requestedPath = "";
    const client = createDeployClient({
      get: async (path: string) => {
        requestedPath = path;
        return {
          result: {
            status: "RUNNING",
            elapsed_time: 50,
            step_state: [{ name: "deploy" }]
          }
        };
      }
    } as never);

    const result = await client.getStatus({ task_id: "task-1", record_id: "record-1" });

    expect(requestedPath).toContain("/v2/tasks/task-1/state?record_id=record-1");
    expect(result.state).toBe("RUNNING");
    expect(result.elapsed_time).toBe(50);
    expect(result.step_states).toEqual([{ name: "deploy" }]);
  });
});
