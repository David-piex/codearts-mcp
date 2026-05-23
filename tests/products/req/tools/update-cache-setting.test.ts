import { describe, expect, it, vi } from "vitest";
import { reqUpdateCacheSettingInput as reqUpdateCacheSettingInputFromBarrel } from "../../../../src/products/req/schemas.js";
import { reqUpdateCacheSettingInput } from "../../../../src/products/req/schemas/work-item.js";
import {
  createReqUpdateCacheSettingHandler,
  mapUpdatedCacheSetting,
  previewUpdateCacheSetting
} from "../../../../src/products/req/tools/update-cache-setting.js";

const input = {
  project_id: "project-1",
  type: "backlog",
  fields: ["subject", "status"]
};

describe("update cache setting tool", () => {
  it("keeps the barrel export compatible with the work-item schema module", () => {
    expect(reqUpdateCacheSettingInput.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
    expect(reqUpdateCacheSettingInputFromBarrel.parse(input)).toEqual({
      ...input,
      dry_run: true
    });
  });

  it("previews dry-run setting updates", () => {
    const result = previewUpdateCacheSetting({ ...input, dry_run: true });

    expect(result.summary).toBe("Dry run: update cache setting for type backlog");
    expect(result.item).toEqual({
      projectId: "project-1",
      type: "backlog",
      fieldIds: ["subject", "status"],
      fields: [],
      visibleFields: [],
      executed: false
    });
  });

  it("maps executed setting updates", () => {
    const result = mapUpdatedCacheSetting({
      project_id: "project-1",
      type: "backlog",
      fields: [{ field: "subject", name: "Subject", type: "text" }],
      visible_fields: [{ field: "status", name: "Status", type: "option" }]
    });

    expect(result.summary).toBe("Updated cache setting for type backlog");
    expect(result.item).toEqual({
      projectId: "project-1",
      type: "backlog",
      fields: [{ field: "subject", name: "Subject", type: "text" }],
      visibleFields: [{ field: "status", name: "Status", type: "option" }],
      executed: true
    });
  });

  it("short-circuits dry runs without calling the client", async () => {
    const client = {
      updateCacheSetting: vi.fn()
    };
    const handler = createReqUpdateCacheSettingHandler(client);

    const result = await handler({ ...input, dry_run: true });

    expect(client.updateCacheSetting).not.toHaveBeenCalled();
    expect(result.content[0]?.text).toBe("Dry run: update cache setting for type backlog");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      fieldIds: ["subject", "status"],
      executed: false
    });
  });

  it("executes setting updates through the client", async () => {
    const client = {
      updateCacheSetting: vi.fn(async () => ({
        project_id: "project-1",
        type: "backlog",
        fields: [{ field: "subject", name: "Subject", type: "text" }],
        visible_fields: [{ field: "status", name: "Status", type: "option" }]
      }))
    };
    const handler = createReqUpdateCacheSettingHandler(client);

    const result = await handler({ ...input, dry_run: false });

    expect(client.updateCacheSetting).toHaveBeenCalledWith({
      ...input,
      dry_run: false
    });
    expect(result.content[0]?.text).toBe("Updated cache setting for type backlog");
    expect(result.structuredContent.item).toMatchObject({
      projectId: "project-1",
      fields: [{ field: "subject", name: "Subject", type: "text" }],
      visibleFields: [{ field: "status", name: "Status", type: "option" }],
      executed: true
    });
  });
});
