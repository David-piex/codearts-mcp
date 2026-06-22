import { describe, expect, it, vi } from "vitest";
import type { OfficialApiRequestInput } from "../../../src/products/official-api.js";
import {
  createOfficialEndpointToolHandler,
  type OfficialEndpointToolDefinition
} from "../../../src/products/shared-tools/official-endpoint-tool.js";

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

describe("official endpoint tool handler", () => {
  it("renders path params and executes GET tools as non-dry-run", async () => {
    const tool: OfficialEndpointToolDefinition = {
      name: "build_get_log_real_time_log_test",
      method: "GET",
      pathTemplate: "/v1/log/{job_id}/{build_no}/real-time-log",
      description: "Get CodeArts Build real-time log",
      write: false
    };
    const client = createClient();
    const handler = createOfficialEndpointToolHandler(tool, client);

    await handler({
      job_id: "job one",
      build_no: 12,
      query: { offset: 0 }
    });

    expect(client.requestOfficialApi).toHaveBeenCalledWith({
      method: "GET",
      path: "/v1/log/job%20one/12/real-time-log",
      query: { offset: 0 },
      body: undefined,
      dry_run: false
    });
  });

  it("keeps write tools dry-run by default", async () => {
    const tool: OfficialEndpointToolDefinition = {
      name: "deploy_delete_host_group_test",
      method: "DELETE",
      pathTemplate: "/v2/host-groups/{group_id}",
      description: "Delete CodeArts Deploy host group",
      write: true
    };
    const client = createClient();
    const handler = createOfficialEndpointToolHandler(tool, client);

    await handler({
      path_params: { group_id: "group/one" },
      body: { force: true }
    });

    expect(client.requestOfficialApi).toHaveBeenCalledWith({
      method: "DELETE",
      path: "/v2/host-groups/group%2Fone",
      query: undefined,
      body: { force: true },
      dry_run: true
    });
  });
});
