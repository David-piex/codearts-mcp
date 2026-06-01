import { describe, expect, it } from "vitest";
import {
  createTestPlanListVariableSynchronizationHandler,
  createTestPlanListVariableSynchronizationTwoHandler,
  createTestPlanShowMindmapCreatorNameHandler,
  createTestPlanShowTaskStatusHandler,
  createTestPlanShowTaskStatusTwoHandler
} from "../../../../src/products/testplan/tools/official-v1-alias-tools.js";

describe("official TestPlan alias read tools", () => {
  const client = {
    getApiTestTaskStatus: async () => ({
      task_id: "task-1",
      status: "success",
      raw: { id: "task-1", status: "success" }
    }),
    getApiTestTaskStatusV2: async () => ({
      task_id: "task-2",
      status: "running",
      raw: { id: "task-2", status: "running" }
    }),
    getMindmapCreatorName: async () => ({
      project_id: "project-1",
      value: ["creator-a"],
      raw: { data: ["creator-a"] }
    }),
    getVariableSynchronization: async () => ({
      raw: { syncable: [{ id: "env-1" }], conflict: [] }
    }),
    getVariableSynchronizationV2: async () => ({
      raw: { syncable: [{ id: "env-2" }], conflict: [] }
    })
  };

  it("maps official task status aliases", async () => {
    await expect(
      createTestPlanShowTaskStatusHandler(client)({
        project_id: "project-1",
        task_id: "task-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded official task status task-1",
        item: { id: "task-1", status: "success" }
      }
    });

    await expect(
      createTestPlanShowTaskStatusTwoHandler(client)({
        project_id: "project-1",
        task_id: "task-2"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded official v2 task status task-2",
        item: { id: "task-2", status: "running" }
      }
    });
  });

  it("maps official mindmap creator and variable synchronization aliases", async () => {
    await expect(
      createTestPlanShowMindmapCreatorNameHandler(client)({
        project_id: "project-1"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        item: { id: "project-1", value: ["creator-a"] }
      }
    });

    await expect(
      createTestPlanListVariableSynchronizationHandler(client)({
        project_id: "project-1",
        variable_name: "base_url"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded official variable synchronization info for base_url"
      }
    });

    await expect(
      createTestPlanListVariableSynchronizationTwoHandler(client)({
        project_id: "project-1",
        variable_name: "base_url"
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded official v2 variable synchronization info for base_url"
      }
    });
  });
});
