import { describe, expect, it } from "vitest";
import { deployCreateApplicationInput, deployModifyApplicationInput } from "../../../../src/products/deploy/schemas.js";

describe("deploy application schemas", () => {
  it("accepts official DeployV2OperationsDO fields and preserves template extensions", () => {
    const parsed = deployCreateApplicationInput.parse({
      project_id: "project-1",
      name: "App-20260425",
      arrange_infos: [
        {
          template_id: "template-1",
          operation_list: [
            {
              id: "step-1",
              name: "deploy",
              description: "deploy step",
              code: "https://example.com/step.zip",
              params: "[]",
              entrance: "index.handler",
              version: "1.0.0",
              module_id: "module-1",
              plugin_runtime: "nodejs"
            }
          ],
          deploy_system: "deployTemplate"
        }
      ]
    });

    expect(parsed.arrange_infos[0].operation_list[0]).toMatchObject({
      id: "step-1",
      name: "deploy",
      description: "deploy step",
      code: "https://example.com/step.zip",
      params: "[]",
      entrance: "index.handler",
      version: "1.0.0",
      module_id: "module-1",
      plugin_runtime: "nodejs"
    });
  });

  it("validates operation_list as structured objects for modify application", () => {
    expect(() =>
      deployModifyApplicationInput.parse({
        id: "app-1",
        project_id: "project-1",
        name: "App-20260425",
        arrange_infos: [
          {
            id: "task-1",
            deploy_system: "deployTemplate",
            template_id: "template-1",
            operation_list: ["deploy"]
          }
        ]
      })
    ).toThrow();
  });
});
