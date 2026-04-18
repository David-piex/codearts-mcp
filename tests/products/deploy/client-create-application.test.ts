import { describe, expect, it } from "vitest";
import { createDeployClient } from "../../../src/products/deploy/client.js";

describe("createDeployClient create application", () => {
  it("creates deploy application from the frontend-observed route", async () => {
    let requestedPath = "";
    let requestedBody: unknown;
    const client = createDeployClient({
      post: async (path: string, body?: unknown) => {
        requestedPath = path;
        requestedBody = body;
        return {
          result: {
            id: "app-1",
            name: "App-20260418",
            arrange_infos: [{ id: "task-1" }]
          }
        };
      }
    } as never);

    const result = await client.createApplication({
      project_id: "project-1",
      name: "App-20260418",
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
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ]
    });

    expect(requestedPath).toBe("/v1/applications");
    expect(requestedBody).toEqual({
      project_id: "project-1",
      name: "App-20260418",
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
          template_id: "template-1",
          operation_list: [{ name: "deploy" }]
        }
      ]
    });
    expect(result).toEqual({
      application_id: "app-1",
      name: "App-20260418",
      task_id: "task-1"
    });
  });

  it("preserves extra frontend fields when creating an application", async () => {
    let requestedBody: unknown;
    const client = createDeployClient({
      post: async (_path: string, body?: unknown) => {
        requestedBody = body;
        return {
          result: {
            id: "app-2",
            name: "App-20260418-extra",
            arrange_infos: [{ id: "task-2" }]
          }
        };
      }
    } as never);

    await client.createApplication({
      project_id: "project-1",
      name: "App-20260418-extra",
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
          template_id: "template-1",
          operation_list: [{ name: "deploy" }],
          deploy_system: "deployTemplate",
          step_total: 5
        }
      ]
    });

    expect(requestedBody).toEqual({
      project_id: "project-1",
      name: "App-20260418-extra",
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
          template_id: "template-1",
          operation_list: [{ name: "deploy" }],
          deploy_system: "deployTemplate",
          step_total: 5
        }
      ]
    });
  });
});
