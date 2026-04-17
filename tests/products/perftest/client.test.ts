import { describe, expect, it } from "vitest";
import { createPerfTestClient } from "../../../src/products/perftest/client.js";

describe("createPerfTestClient", () => {
  it("maps list projects responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        projects: [{ id: 1, name: "demo", description: "desc", source: 0 }]
      })
    } as never);

    const result = await client.listProjects({ project_id: "project-1", page: 1, page_size: 20 });

    expect(result.total).toBe(1);
    expect(result.projects[0]?.id).toBe(1);
  });

  it("maps get project responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        project: { id: 1, name: "demo", group: "tenant-1" }
      })
    } as never);

    const result = await client.getProject({ project_id: "project-1", test_suite_id: 1 });

    expect(result).toEqual({
      id: 1,
      name: "demo",
      description: undefined,
      group: "tenant-1",
      source: undefined,
      create_time: undefined,
      update_time: undefined
    });
  });

  it("maps list tasks responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        tasks: [{ id: 11, name: "task-a", task_run_info: { id: 99, run_type: 0 } }]
      })
    } as never);

    const result = await client.listTasks({
      project_id: "project-1",
      test_suite_id: 1,
      page: 1,
      page_size: 20
    });

    expect(result.total).toBe(1);
    expect(result.tasks[0]?.id).toBe(11);
  });

  it("maps get task responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        taskInfo: { id: 11, name: "task-a", run_status: 2, related_temp_running_data: [] }
      })
    } as never);

    const result = await client.getTask({ project_id: "project-1", task_id: 11 });

    expect(result.id).toBe(11);
    expect(result.run_status).toBe(2);
  });

  it("maps list variables responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        variable_list: [{ id: 21, name: "var1", variable_type: 2, variable: ["a"] }]
      })
    } as never);

    const result = await client.listVariables({
      project_id: "project-1",
      test_suite_id: 1,
      variable_type: 2
    });

    expect(result.variable_list[0]?.id).toBe(21);
    expect(result.variable_list[0]?.variable).toEqual(["a"]);
  });

  it("maps task cases and latest runs from get task responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        taskInfo: {
          id: 11,
          case_list: [{ case_id: 7, case_name: "login", case_uri: "/cases/7", temp_id: 1 }],
          related_temp_running_data: [{ task_run_info_id: 99, related_temp_running_id: 101 }]
        }
      })
    } as never);

    const result = await client.getTask({ project_id: "project-1", task_id: 11 });

    expect(result.case_list?.[0]?.case_id).toBe(7);
    expect(result.related_temp_running_data?.[0]?.task_run_info_id).toBe(99);
  });

  it("maps offline reports responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        log_list: [{ run_id: 101, name: "run-1", run_type: 0 }]
      })
    } as never);

    const result = await client.listOfflineReports({ project_id: "project-1", task_id: 11 });

    expect(result.log_list[0]?.run_id).toBe(101);
  });

  it("maps report detail responses", async () => {
    const client = createPerfTestClient({
      get: async () => ({
        result: {
          detail: {
            performance: { caseUri: "/cases/7", alias: "login", avgTps: 10 },
            detailDatas: [{ awId: "aw-1", alias: "login-api", avgTps: 5 }]
          }
        }
      })
    } as never);

    const result = await client.getReport({
      project_id: "project-1",
      task_run_id: 101,
      case_run_id: 201,
      brokens_limit_count: 60
    });

    expect(result.detail?.performance?.caseUri).toBe("/cases/7");
    expect(result.detail?.detailDatas?.[0]?.awId).toBe("aw-1");
  });
});
