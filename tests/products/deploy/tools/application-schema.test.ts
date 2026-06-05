import { describe, expect, it } from "vitest";
import {
  deployCreateApplicationInput,
  deployModifyApplicationInput,
  deployMoveApplicationGroupInput,
  deployMoveApplicationsToGroupInput,
  deployUpdateEnvironmentPermissionsInput,
  deployUpdateHostGroupPermissionsInput
} from "../../../../src/products/deploy/schemas.js";

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

  it("accepts official deploy application group movement values", () => {
    const parsed = deployMoveApplicationGroupInput.parse({
      project_id: "project-1",
      id: "group-1",
      movement: 1
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      id: "group-1",
      movement: 1,
      dry_run: true
    });
  });

  it("accepts official deploy move applications to group payload", () => {
    const parsed = deployMoveApplicationsToGroupInput.parse({
      project_id: "project-1",
      group_id: "group-1",
      application_ids: ["app-1", "app-2"]
    });

    expect(parsed).toMatchObject({
      project_id: "project-1",
      group_id: "group-1",
      application_ids: ["app-1", "app-2"],
      dry_run: true
    });
  });

  it("accepts host group permission update payload", () => {
    const parsed = deployUpdateHostGroupPermissionsInput.parse({
      group_id: "group-1",
      project_id: "project-1",
      role_id: "role-1",
      permission_name: "can_add_host",
      permission_value: true
    });

    expect(parsed).toMatchObject({
      group_id: "group-1",
      project_id: "project-1",
      role_id: "role-1",
      permission_name: "can_add_host",
      permission_value: true,
      dry_run: true
    });
  });

  it("accepts environment permission update payload", () => {
    const parsed = deployUpdateEnvironmentPermissionsInput.parse({
      application_id: "app-1",
      environment_id: "env-1",
      permission_name: "can_deploy",
      permission_value: false
    });

    expect(parsed).toMatchObject({
      application_id: "app-1",
      environment_id: "env-1",
      permission_name: "can_deploy",
      permission_value: false,
      dry_run: true
    });
  });
});
