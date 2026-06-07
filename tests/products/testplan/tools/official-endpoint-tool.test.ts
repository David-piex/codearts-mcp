import { describe, expect, it, vi } from "vitest";
import type { OfficialApiRequestInput } from "../../../../src/products/official-api.js";
import type { TestPlanOfficialEndpointTool } from "../../../../src/products/testplan/official-endpoint-tools.js";
import { createTestPlanOfficialEndpointToolHandler } from "../../../../src/products/testplan/tools/official-endpoint-tool.js";

function createClient() {
  return {
    requestOfficialApi: vi.fn(async (input: OfficialApiRequestInput) => ({
      method: input.method,
      path: input.path,
      dryRun: input.dry_run ?? false,
      response: { ok: true }
    }))
  };
}

describe("official TestPlan endpoint tool handler", () => {
  it("renders top-level path params and executes GET tools as non-dry-run", async () => {
    const tool: TestPlanOfficialEndpointTool = {
      name: "testplan_get_aw_cata_child_cata_data",
      method: "GET",
      pathTemplate: "/v1/{project_id}/aw_cata/child_cata_data",
      description: "Get CodeArts TestPlan AW catalog child catalog data through the official v1 API",
      write: false
    };
    const client = createClient();
    const handler = createTestPlanOfficialEndpointToolHandler(tool, client);

    await expect(
      handler({
        project_id: "project one",
        query: { type: "case", include_deleted: false }
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "testplan_get_aw_cata_child_cata_data: GET /v1/project%20one/aw_cata/child_cata_data completed",
        item: {
          id: "/v1/project%20one/aw_cata/child_cata_data",
          dryRun: false,
          response: { ok: true }
        }
      }
    });
    expect(client.requestOfficialApi).toHaveBeenCalledWith({
      method: "GET",
      path: "/v1/project%20one/aw_cata/child_cata_data",
      query: { type: "case", include_deleted: false },
      body: undefined,
      dry_run: false
    });
  });

  it("renders explicit path_params and keeps write tools dry-run by default", async () => {
    const tool: TestPlanOfficialEndpointTool = {
      name: "testplan_upload_images_v4",
      method: "POST",
      pathTemplate: "/v4/{project_id}/images/upload",
      description: "Upload CodeArts TestPlan images through the official v4 API (dry-run by default)",
      write: true
    };
    const client = createClient();
    const handler = createTestPlanOfficialEndpointToolHandler(tool, client);

    await expect(
      handler({
        path_params: { project_id: "project/one" },
        body: { file_name: "image.png" }
      })
    ).resolves.toMatchObject({
      structuredContent: {
        summary: "testplan_upload_images_v4: POST /v4/project%2Fone/images/upload dry-run",
        item: {
          id: "/v4/project%2Fone/images/upload",
          dryRun: true,
          response: { ok: true }
        }
      }
    });
    expect(client.requestOfficialApi).toHaveBeenCalledWith({
      method: "POST",
      path: "/v4/project%2Fone/images/upload",
      query: undefined,
      body: { file_name: "image.png" },
      dry_run: true
    });
  });

  it("allows write tools to execute when dry_run is explicitly false", async () => {
    const tool: TestPlanOfficialEndpointTool = {
      name: "testplan_update_resource_number_rule_v4",
      method: "PUT",
      pathTemplate: "/v4/{project_id}/resource-number-rule/{uri}",
      description: "Update CodeArts TestPlan resource number rule through the official v4 API (dry-run by default)",
      write: true
    };
    const client = createClient();
    const handler = createTestPlanOfficialEndpointToolHandler(tool, client);

    await handler({
      project_id: "project-1",
      uri: "rule-1",
      body: { prefix: "CASE" },
      dry_run: false
    });

    expect(client.requestOfficialApi).toHaveBeenCalledWith({
      method: "PUT",
      path: "/v4/project-1/resource-number-rule/rule-1",
      query: undefined,
      body: { prefix: "CASE" },
      dry_run: false
    });
  });

  it("requires all path parameters before calling the official API bridge", async () => {
    const tool: TestPlanOfficialEndpointTool = {
      name: "testplan_update_combined_aw_v4",
      method: "PUT",
      pathTemplate: "/v4/{project_id}/basic-aw/combined-aw/{aw_id}",
      description: "Update CodeArts TestPlan combined AW through the official v4 API (dry-run by default)",
      write: true
    };
    const client = createClient();
    const handler = createTestPlanOfficialEndpointToolHandler(tool, client);

    await expect(handler({ project_id: "project-1" })).rejects.toThrow(
      "Missing required path parameter: aw_id"
    );
    expect(client.requestOfficialApi).not.toHaveBeenCalled();
  });
});
