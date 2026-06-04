import { describe, expect, it } from "vitest";
import { createTestPlanGetExecutorElementsHandler } from "../../../../src/products/testplan/tools/get-executor-elements.js";

describe("get executor elements handler", () => {
  it("maps executor runtime metadata", async () => {
    const handler = createTestPlanGetExecutorElementsHandler({
      getExecutorElements: async () => ({
        raw: {
          type: "api_test",
          public_aw_lib_infos: [{ id: "lib-1", name: "Common Lib" }],
          testcase_src_infos: [{ class_name: "LoginTest", uri: "case-1" }]
        }
      })
    });

    await expect(
      handler({
        project_id: "project-1",
        execute_mode: "serial",
        testcase_infos: [{ uri: "case-1", case_type: 1 }]
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "Loaded TestPlan executor elements for project project-1",
        item: {
          id: "project-1",
          projectId: "project-1",
          executeMode: "serial",
          testcaseCount: 1,
          executorElements: {
            type: "api_test"
          }
        }
      }
    });
  });
});
