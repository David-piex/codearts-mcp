import { describe, expect, it } from "vitest";
import { createTestPlanListDefaultTemplatesHandler } from "../../../../src/products/testplan/tools/list-default-templates.js";
import { createTestPlanListScenesPageHandler } from "../../../../src/products/testplan/tools/list-scenes-page.js";
import { createTestPlanListSystemConfigsHandler } from "../../../../src/products/testplan/tools/list-system-configs.js";
import { createTestPlanListTestcasesBatchHandler } from "../../../../src/products/testplan/tools/list-testcases-batch.js";
import { createTestPlanListTestpointsPageHandler } from "../../../../src/products/testplan/tools/list-testpoints-page.js";
import { createTestPlanListVariableGroupNamesHandler } from "../../../../src/products/testplan/tools/list-variable-group-names.js";

describe("official TestPlan page read handlers", () => {
  it("maps official page and batch read responses into structured content", async () => {
    await expect(
      createTestPlanListTestpointsPageHandler({
        listTestpointsPage: async () => ({
          testpoints: [{ id: "testpoint-1", name: "Checkout point" }],
          total: 1,
          raw: { page_list: [{ id: "testpoint-1", name: "Checkout point" }], total: 1 }
        })
      })({ project_id: "project-1", page: 1, page_size: 10 })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan testpoints found",
        items: [{ id: "testpoint-1", name: "Checkout point" }],
        response: { page_list: [{ id: "testpoint-1", name: "Checkout point" }], total: 1 }
      }
    });

    await expect(
      createTestPlanListScenesPageHandler({
        listScenesPage: async () => ({
          scenes: [{ id: "scene-1", name: "Checkout scene" }],
          total: 1,
          raw: { page_list: [{ id: "scene-1", name: "Checkout scene" }], total: 1 }
        })
      })({ project_id: "project-1", page: 1, page_size: 10 })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan scenes found",
        items: [{ id: "scene-1", name: "Checkout scene" }],
        response: { page_list: [{ id: "scene-1", name: "Checkout scene" }], total: 1 }
      }
    });

    await expect(
      createTestPlanListDefaultTemplatesHandler({
        listDefaultTemplates: async () => ({
          templates: [{ id: "template-1", name: "Default template" }],
          total: 1,
          raw: { page_list: [{ id: "template-1", name: "Default template" }], total: 1 }
        })
      })({ project_id: "project-1", page: 1, page_size: 10, name: "" })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan default templates found",
        items: [{ id: "template-1", name: "Default template" }],
        response: { page_list: [{ id: "template-1", name: "Default template" }], total: 1 }
      }
    });

    await expect(
      createTestPlanListTestcasesBatchHandler({
        listTestcasesBatch: async () => ({
          cases: [{ id: "case-1", name: "API case" }],
          total: 1,
          raw: { testcases: [{ id: "case-1", name: "API case" }], total: 1 }
        })
      })({ project_id: "project-1", page: 1, page_size: 10, service_type: -1 })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan testcases found",
        items: [{ id: "case-1", name: "API case" }],
        response: { testcases: [{ id: "case-1", name: "API case" }], total: 1 }
      }
    });

    await expect(
      createTestPlanListSystemConfigsHandler({
        listSystemConfigs: async () => ({
          configs: [{ id: "config-1", name: "timeout" }],
          total: 1,
          raw: { value: [{ id: "config-1", name: "timeout" }], total: 1 }
        })
      })({ project_id: "project-1", params: { project_id: "project-1" } })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan system configs found",
        items: [{ id: "config-1", name: "timeout" }],
        response: { value: [{ id: "config-1", name: "timeout" }], total: 1 }
      }
    });

    await expect(
      createTestPlanListVariableGroupNamesHandler({
        listVariableGroupNames: async () => ({
          groups: [{ id: "group-1", name: "Default" }],
          total: 1,
          raw: { variableGroupName: [{ id: "group-1", name: "Default" }], total: 1 }
        })
      })({ project_id: "project-1", page: 1, page_size: 10 })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "1 TestPlan variable group names found",
        items: [{ id: "group-1", name: "Default" }],
        response: { variableGroupName: [{ id: "group-1", name: "Default" }], total: 1 }
      }
    });
  });
});
