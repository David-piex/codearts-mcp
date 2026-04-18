import { describe, expect, it } from "vitest";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient modify application", () => {
  it("updates deploy application from the frontend-observed route", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createDeployClient({
      put: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            id: "app-1",
            name: "App-20260418-updated",
            arrange_infos: [{ id: "task-1" }]
          }
        };
      }
    } as never);

    const result = await client.modifyApplication({
      id: "app-1",
      project_id: "project-1",
      name: "App-20260418-updated",
      description: "",
      trigger: {
        trigger_source: "0",
        artifact_source_system: "",
        artifact_type: ""
      },
      slave_cluster_id: "",
      slave_resource_type: "",
      create_type: "template",
      is_draft: false,
      group_id: "group-1",
      agency_urn: "agency-1",
      arrange_infos: [
        {
          id: "task-1",
          deploy_system: "linux",
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ]
    });

    expect(requestedPath).toBe("/v1/applications");
    expect(requestedBody).toEqual({
      id: "app-1",
      project_id: "project-1",
      name: "App-20260418-updated",
      description: "",
      timeout: null,
      trigger: {
        trigger_source: "0",
        artifact_source_system: "",
        artifact_type: ""
      },
      slave_cluster_id: "",
      slave_resource_type: "",
      create_type: "template",
      is_draft: false,
      group_id: "group-1",
      agency_urn: "agency-1",
      arrange_infos: [
        {
          id: "task-1",
          deploy_system: "linux",
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ]
    });
    expect(result).toEqual({
      application_id: "app-1",
      name: "App-20260418-updated",
      task_id: "task-1"
    });
  });

  it("preserves extra frontend fields when modifying an application", async () => {
    let requestedBody: unknown;
    const client = createDeployClient({
      put: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          result: {
            id: "app-2",
            name: "App-20260418-updated-extra",
            arrange_infos: [{ id: "task-2" }]
          }
        };
      }
    } as never);

    await client.modifyApplication({
      id: "app-2",
      project_id: "project-1",
      name: "App-20260418-updated-extra",
      description: "",
      timeout: null,
      trigger: {
        trigger_source: "0",
        artifact_source_system: "",
        artifact_type: ""
      },
      slave_cluster_id: "",
      create_type: "template",
      is_draft: true,
      arrange_infos: [
        {
          id: "task-2",
          deploy_system: "deployTemplate",
          template_id: "template-1",
          operation_list: [{ name: "deploy" }],
          state: "Draft"
        }
      ]
    });

    expect(requestedBody).toEqual({
      id: "app-2",
      project_id: "project-1",
      name: "App-20260418-updated-extra",
      description: "",
      timeout: null,
      trigger: {
        trigger_source: "0",
        artifact_source_system: "",
        artifact_type: ""
      },
      slave_cluster_id: "",
      slave_resource_type: "",
      create_type: "template",
      is_draft: true,
      group_id: "",
      agency_urn: "",
      arrange_infos: [
        {
          id: "task-2",
          deploy_system: "deployTemplate",
          template_id: "template-1",
          operation_list: [{ name: "deploy" }],
          state: "Draft"
        }
      ]
    });
  });
});
