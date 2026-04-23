import { describe, expect, it, vi } from "vitest";
import { reqGetProjectPublicConfigInput as reqGetProjectPublicConfigInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqGetProjectPublicConfigInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqGetProjectPublicConfigHandler,
  mapReqProjectPublicConfig
} from "../../../../src/products/req/tools/get-project-public-config.js";

describe("mapReqProjectPublicConfig", () => {
  it("returns normalized project public config", () => {
    const result = mapReqProjectPublicConfig({
      project_id: "project-1",
      closed_workitem_readonly_mode: true
    });

    expect(result.item).toEqual({
      projectId: "project-1",
      closedWorkItemReadonlyMode: true
    });
  });
});

describe("reqGetProjectPublicConfigInput exports", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    const input = {
      project_id: "project-1"
    };

    expect(reqGetProjectPublicConfigInput.parse(input)).toEqual(input);
    expect(reqGetProjectPublicConfigInputFromBarrel.parse(input)).toEqual(input);
  });
});

describe("createReqGetProjectPublicConfigHandler", () => {
  it("returns normalized project public config", async () => {
    const client = {
      getProjectPublicConfig: vi.fn(async () => ({
        project_id: "project-1",
        closed_workitem_readonly_mode: true
      }))
    };
    const handler = createReqGetProjectPublicConfigHandler(client);

    const result = await handler({
      project_id: "project-1"
    });

    expect(client.getProjectPublicConfig).toHaveBeenCalledWith({
      project_id: "project-1"
    });
    expect(result.content[0]?.text).toContain("Loaded project public config for project-1");
    expect(result.structuredContent.item).toEqual({
      projectId: "project-1",
      closedWorkItemReadonlyMode: true
    });
  });
});
